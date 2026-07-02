import { NextRequest, NextResponse } from "next/server";
import { supabaseService } from "@/lib/supabase";
import { PERSONAS } from "@/content/personas";
import { calculateMatchScore, type DimensionScores, type DimensionPercentages } from "@/lib/scoring";
import type { Dimension } from "@/content/questions";

const DIMENSIONS: Dimension[] = [
  "D1_RISK",
  "D2_SOCIAL",
  "D3_TIME",
  "D4_SKILL",
  "D5_DRIVE",
  "D6_STRESS",
];

function toPercentages(scores: DimensionScores): DimensionPercentages {
  const out = {} as DimensionPercentages;
  for (const dim of DIMENSIONS) {
    out[dim] = Math.round((scores[dim] ?? 0) * 50 + 50);
  }
  return out;
}

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  const { token } = await params;

  if (!token || !/^[a-f0-9]+$/i.test(token)) {
    return NextResponse.json({ error: "无效链接" }, { status: 400 });
  }

  const { data, error } = await supabaseService
    .from("test_results")
    .select("token, persona_code, dimension_scores, share_count, created_at")
    .eq("token", token.toLowerCase())
    .single();

  if (error || !data) {
    return NextResponse.json({ error: "结果不存在或已删除" }, { status: 404 });
  }

  const persona = PERSONAS.find((p) => p.code === data.persona_code);
  if (!persona) {
    return NextResponse.json({ error: "人格数据缺失" }, { status: 500 });
  }

  const scores = data.dimension_scores as DimensionScores;
  const percentages = toPercentages(scores);
  const matchScore = calculateMatchScore(scores, persona);

  return NextResponse.json({
    token: data.token,
    persona,
    dimensionScores: scores,
    dimensionPercentages: percentages,
    matchScore,
    shareCount: data.share_count,
    createdAt: data.created_at,
  });
}

export async function PATCH(
  _req: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  // 简单的分享计数 +1
  const { token } = await params;
  if (!token) return NextResponse.json({ error: "no token" }, { status: 400 });

  const { data: row } = await supabaseService
    .from("test_results")
    .select("share_count")
    .eq("token", token.toLowerCase())
    .single();

  if (!row) return NextResponse.json({ error: "not found" }, { status: 404 });

  await supabaseService
    .from("test_results")
    .update({ share_count: (row.share_count ?? 0) + 1 })
    .eq("token", token.toLowerCase());

  return NextResponse.json({ ok: true });
}
