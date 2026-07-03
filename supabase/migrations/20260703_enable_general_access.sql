-- ============================================================
-- 启用「通用密码」入口（方案 A：一周一码 / 全员共用一个密码）
-- 改动点：
--   1. test_results.activation_code 改为可空（通用密码提交时不带 FK）
--   2. trigger 函数加 NULL 守卫，避免回写失败
-- 幂等：可重复执行
-- ============================================================

-- 1. test_results.activation_code 改 nullable
ALTER TABLE test_results ALTER COLUMN activation_code DROP NOT NULL;

-- 2. 改 trigger 函数：仅在 activation_code 非空时回写
CREATE OR REPLACE FUNCTION link_code_to_result()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.activation_code IS NOT NULL THEN
    UPDATE activation_codes
    SET result_token = NEW.token
    WHERE code = NEW.activation_code;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- trigger 本身无需重建（已经 AFTER INSERT FOR EACH ROW）
