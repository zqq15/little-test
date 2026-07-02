import { NextRequest, NextResponse } from "next/server";
import { randomBytes } from "crypto";
import { supabaseService } from "@/lib/supabase";
import { scoreTest, type Answer } from "@/lib/scoring";

function generateToken(): string {
  return randomBytes(8).toString("hex"); // 16 字符 hex
}

export async function POST(req: NextRequest) {
  try {
    const { code, answers } = await req.json();

    if (!code || !Array.isArray(answers) || answers.length === 0) {
      return NextResponse.json({ error: "参数缺失" }, { status: 400 });
    }

    const normalized = String(code).trim().toUpperCase();

    // 1. 校验激活码状态
    const { data: codeRow, error: codeErr } = await supabaseService
      .from("activation_codes")
      .select("code, status, expires_at, result_token")
      .eq("code", normalized)
      .single();

    if (codeErr || !codeRow) {
      return NextResponse.json({ error: "激活码不存在" }, { status: 404 });
    }

    if (codeRow.result_token) {
      return NextResponse.json({
        ok: true,
        alreadyCompleted: true,
        token: codeRow.result_token,
      });
    }

    if (codeRow.status !== "used") {
      return NextResponse.json({ error: `激活码状态异常（${codeRow.status}）` }, { status: 410 });
    }

    if (codeRow.expires_at && new Date(codeRow.expires_at) < new Date()) {
      await supabaseService
        .from("activation_codes")
        .update({ status: "expired" })
        .eq("code", normalized);
      return NextResponse.json({ error: "激活码已过期" }, { status: 410 });
    }

    // 2. 算分
    const typedAnswers = answers as Answer[];
    const result = scoreTest(typedAnswers);

    // 3. 生成 token，重试一次防止碰撞
    let token = generateToken();
    let insertOk = false;
    let retry = 0;
    while (!insertOk && retry < 3) {
      const { error: insertErr } = await supabaseService.from("test_results").insert({
        token,
        activation_code: normalized,
        persona_code: result.persona.code,
        dimension_scores: result.dimensionScores,
        answers: typedAnswers,
      });
      if (insertErr) {
        if (insertErr.code === "23505") {
          // 主键冲突，换 token 重试
          token = generateToken();
          retry++;
          continue;
        }
        console.error("[submit] insert failed", insertErr);
        return NextResponse.json({ error: "保存失败" }, { status: 500 });
      }
      insertOk = true;
    }

    return NextResponse.json({
      ok: true,
      token,
      personaCode: result.persona.code,
      matchScore: result.matchScore,
    });
  } catch (e) {
    console.error("[submit]", e);
    return NextResponse.json({ error: "服务器异常" }, { status: 500 });
  }
}
