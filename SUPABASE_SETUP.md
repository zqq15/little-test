# Supabase 配置指引（你来做这步）

> 你做这步的同时，我会并行写代码（算分逻辑、像素小人偶组件、字体接入、测试页、结果页）。
> 预计你 5-10 分钟搞定，搞完把 URL 和 key 发给我即可。

---

## 步骤 1：注册账号（1 分钟）

1. 访问 https://supabase.com
2. 点右上角 `Start your project`
3. 用 GitHub 账号登录（最快，不用单独注册）

---

## 步骤 2：创建项目（2 分钟）

1. 点 `New project`
2. 填写：
   - **Name**: `little-test`（随便填）
   - **Database Password**: 点 `Generate a password` 自动生成 → **务必复制保存**（丢了要重置）
   - **Region**: `Southeast Asia (Singapore)` 离中国最近，延迟最低
   - **Pricing Plan**: `Free`（免费档够用）
3. 点 `Create new project`，等约 2 分钟初始化

---

## 步骤 3：跑数据库 schema（1 分钟）

1. 进入项目后，左侧菜单点 `SQL Editor`
2. 点 `New query`
3. 打开你电脑上的 `/Users/zqqx/Xiaobandeng/little-test/supabase/schema.sql` 文件
4. 复制全部内容，粘贴到 SQL Editor
5. 点 `Run`（CTRL+Enter）
6. 应该看到 `Success. No rows returned`（执行成功）

---

## 步骤 4：把 API 凭证发给我（1 分钟）

1. 左侧菜单点 `Project Settings`（齿轮图标）
2. 点 `API`
3. 找到 3 个东西，复制下来：

```
Project URL:   https://xxxxxxxxxxxx.supabase.co
anon public:   eyJxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
service_role:  eyJxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx  ← 这个是私密钥匙，仅服务端用！
```

4. 把这 3 个发给我（service_role 是私密钥匙，**不要发到任何公开仓库**，但发给我没问题，我只会写到本地 `.env.local` 文件，不会上传）

---

## 步骤 5：验证激活码能导入（可选）

跑完 schema 后，可以测试一下激活码导入：

1. 在本地跑（我已经写好脚本）：
   ```bash
   cd /Users/zqqx/Xiaobandeng/little-test
   npm run gen-codes -- --count 10 --batch 2026-07-02-test
   ```
2. 会生成 `scripts/output/codes-2026-07-02-test.csv`
3. 在 Supabase Dashboard → `Table Editor` → `activation_codes` → `Import data from CSV`
4. 上传 CSV 文件
5. 进 `Table Editor` 看激活码是否入库（应该有 10 行，status 都是 unused）

---

## FAQ

**Q: 免费档够用吗？**
A: 完全够。免费档 500MB 存储、5 万月活用户。你这个项目估计前 3 个月都用不到 1MB。

**Q: 数据库密码忘了怎么办？**
A: 进 Project Settings → Database → Reset database password。但已有的连接字符串会失效，要重新配。

**Q: 一定要选 Singapore 吗？**
A: 不一定。Singapore 对国内访问最快。如果未来用户主要在海外，可以选 US East / EU。

**Q: 我能不能等代码写完再注册？**
A: 完全可以。我会先把不依赖 Supabase 的部分写好，等你注册完再接通 API。
