import { NextRequest, NextResponse } from "next/server";
import { supabaseService } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    const { code } = await req.json();
    if (!code || typeof code !== "string") {
      return NextResponse.json({ error: "请输入激活码" }, { status: 400 });
    }

    const normalized = code.trim().toUpperCase();

    const { data, error } = await supabaseService
      .from("activation_codes")
      .select("code, status, expires_at, result_token")
      .eq("code", normalized)
      .single();

    if (error || !data) {
      return NextResponse.json({ error: "激活码不存在" }, { status: 404 });
    }

    // 已生成报告：直接告诉前端 token
    if (data.result_token) {
      return NextResponse.json({
        ok: true,
        alreadyCompleted: true,
        token: data.result_token,
      });
    }

    if (data.status === "used") {
      // 激活了但还没提交：检查是否过期
      if (data.expires_at && new Date(data.expires_at) < new Date()) {
        await supabaseService
          .from("activation_codes")
          .update({ status: "expired" })
          .eq("code", normalized);
        return NextResponse.json({ error: "激活码已过期（超过 24 小时未完成测试）" }, { status: 410 });
      }
      // 已激活且未过期：允许继续答题
      return NextResponse.json({ ok: true, alreadyActivated: true });
    }

    if (data.status === "used" || data.status === "expired" || data.status === "disabled") {
      return NextResponse.json({ error: `激活码状态异常（${data.status}）` }, { status: 410 });
    }

    // 激活：标记 used + 设 24h 截止
    const now = new Date();
    const expiresAt = new Date(now.getTime() + 24 * 3600 * 1000);

    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? null;
    const userAgent = req.headers.get("user-agent") ?? null;

    const { error: updateErr } = await supabaseService
      .from("activation_codes")
      .update({
        status: "used",
        used_at: now.toISOString(),
        used_ip: ip,
        used_user_agent: userAgent,
        expires_at: expiresAt.toISOString(),
      })
      .eq("code", normalized);

    if (updateErr) {
      return NextResponse.json({ error: "激活失败，请重试" }, { status: 500 });
    }

    return NextResponse.json({ ok: true, expiresAt: expiresAt.toISOString() });
  } catch (e) {
    console.error("[activate]", e);
    return NextResponse.json({ error: "服务器异常" }, { status: 500 });
  }
}
