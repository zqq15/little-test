-- ============================================================
-- 搞钱体质测试 · Supabase Schema
-- 2 张核心表 + 必要索引 + RLS 策略
-- ============================================================

-- 1. 激活码表
CREATE TABLE IF NOT EXISTS activation_codes (
  code            VARCHAR(30) PRIMARY KEY,
  status          VARCHAR(20) NOT NULL DEFAULT 'unused'
                    CHECK (status IN ('unused', 'used', 'expired', 'disabled')),
  batch_id        VARCHAR(30),
  used_at         TIMESTAMPTZ,
  used_ip         VARCHAR(50),
  used_user_agent TEXT,
  result_token    VARCHAR(50) UNIQUE,
  expires_at      TIMESTAMPTZ,    -- 激活后 +24h 截止；NULL 表示未激活
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_codes_status     ON activation_codes(status);
CREATE INDEX IF NOT EXISTS idx_codes_batch      ON activation_codes(batch_id);
CREATE INDEX IF NOT EXISTS idx_codes_result_tok ON activation_codes(result_token);

-- 2. 测试结果表
CREATE TABLE IF NOT EXISTS test_results (
  token            VARCHAR(50) PRIMARY KEY,
  activation_code  VARCHAR(30) NOT NULL REFERENCES activation_codes(code),
  persona_code     VARCHAR(5)  NOT NULL,    -- G1 ~ G8
  dimension_scores JSONB       NOT NULL,    -- {D1_RISK: 0.7, D2_SOCIAL: -0.3, ...}
  answers          JSONB,                  -- 原始答案数组，便于调优算法
  share_count      INT         NOT NULL DEFAULT 0,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_results_token   ON test_results(token);
CREATE INDEX IF NOT EXISTS idx_results_persona ON test_results(persona_code);

-- ============================================================
-- Row-Level Security 策略
-- 设计原则：客户端只能"读"自己的结果（按 token），不能直接操作激活码
-- ============================================================

ALTER TABLE activation_codes ENABLE ROW LEVEL SECURITY;
ALTER TABLE test_results     ENABLE ROW LEVEL SECURITY;

-- 激活码：客户端只能通过服务端（service_role）操作，前端 anon 角色完全禁止
CREATE POLICY "deny_all_anon_on_codes" ON activation_codes
  FOR ALL USING (auth.role() = 'service_role') WITH CHECK (auth.role() = 'service_role');

-- 测试结果：前端可以按 token 查询（用于分享链接），但不能写入
CREATE POLICY "read_results_by_token" ON test_results
  FOR SELECT USING (true);  -- 公开读（分享链接需要）；写入只能通过 service_role

-- ============================================================
-- 触发器：插入测试结果时，自动回写到激活码的 result_token
-- ============================================================
CREATE OR REPLACE FUNCTION link_code_to_result()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE activation_codes
  SET result_token = NEW.token
  WHERE code = NEW.activation_code;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_link_code_to_result ON test_results;
CREATE TRIGGER trg_link_code_to_result
  AFTER INSERT ON test_results
  FOR EACH ROW EXECUTE FUNCTION link_code_to_result();

-- ============================================================
-- 视图：用于运营看数据（你的后台用）
-- ============================================================
CREATE OR REPLACE VIEW v_activation_stats AS
SELECT
  batch_id,
  COUNT(*)                                              AS total,
  COUNT(*) FILTER (WHERE status = 'unused')             AS unused,
  COUNT(*) FILTER (WHERE status = 'used')               AS used,
  COUNT(*) FILTER (WHERE status = 'expired')            AS expired,
  COUNT(*) FILTER (WHERE status = 'disabled')           AS disabled,
  COUNT(*) FILTER (WHERE used_at >= NOW() - INTERVAL '24 hours') AS used_last_24h
FROM activation_codes
GROUP BY batch_id
ORDER BY batch_id DESC;

-- ============================================================
-- 注释（便于 Supabase 后台查看）
-- ============================================================
COMMENT ON TABLE  activation_codes IS '激活码池';
COMMENT ON COLUMN activation_codes.code IS '格式 GAOQIAN-XXXX-XXXX-XXXX';
COMMENT ON COLUMN activation_codes.status IS 'unused=未使用 / used=已用 / expired=超时 / disabled=作废';
COMMENT ON COLUMN activation_codes.expires_at IS '激活后 24h 截止；NULL=未激活';

COMMENT ON TABLE  test_results IS '测试结果';
COMMENT ON COLUMN test_results.token IS '分享链接 token，公开可读';
COMMENT ON COLUMN test_results.dimension_scores IS '6 维度归一化分数，-1 到 1';
