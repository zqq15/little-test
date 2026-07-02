import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !anonKey || !serviceKey) {
  throw new Error("Supabase env vars missing");
}

// 客户端可见，权限受 RLS 限制（只能读 test_results，不能操作 activation_codes）
export const supabaseAnon = createClient(url, anonKey);

// 仅服务端用，绕过 RLS。绝对不要 import 进 client component。
export const supabaseService = createClient(url, serviceKey);
