"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import type { DimensionPercentages } from "@/lib/scoring";
import { PERSONAS, type Persona } from "@/content/personas";
import { PixelSprite } from "@/components/PixelSprite";
import { RadarChart } from "@/components/RadarChart";
import { DIMENSION_META, type Dimension } from "@/content/questions";

interface ApiResult {
  token: string;
  persona: Persona;
  dimensionPercentages: DimensionPercentages;
  matchScore: number;
  shareCount: number;
  createdAt: string;
}

export default function ResultPage() {
  const params = useParams();
  const token = params.token as string;
  const [result, setResult] = useState<ApiResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [showDimDetails, setShowDimDetails] = useState(false);

  useEffect(() => {
    let aborted = false;
    fetch(`/api/result/${token}`)
      .then((r) => r.json())
      .then((data) => {
        if (aborted) return;
        if (!data.persona) {
          setError(data.error ?? "未找到结果");
          return;
        }
        setResult(data);
      })
      .catch(() => {
        if (!aborted) setError("网络错误");
      });
    return () => {
      aborted = true;
    };
  }, [token]);

  if (error) {
    return (
      <main className="min-h-screen flex items-center justify-center p-6">
        <div className="text-center">
          <div className="font-pixel text-2xl text-[#D01013] mb-4">ERROR</div>
          <p className="text-[#6B6B7B]">{error}</p>
        </div>
      </main>
    );
  }

  if (!result) {
    return (
      <main className="min-h-screen flex items-center justify-center p-6">
        <div className="font-pixel text-sm text-[#1A1A2E]">LOADING...</div>
      </main>
    );
  }

  const { persona, dimensionPercentages, matchScore } = result;

  // 把 persona code 映射到完整 persona 对象（用于最佳拍档展示）
  const personaByCode: Record<string, Persona> = Object.fromEntries(
    PERSONAS.map((p) => [p.code, p])
  );

  function handleCopyLink() {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <main className="min-h-screen bg-white pb-20">
      {/* ============ 头图 ============ */}
      <header className="border-b-4 border-[#1A1A2E] py-12">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <div className="inline-block bg-[#1A1A2E] text-[#F6EC35] font-pixel text-xs px-3 py-1 mb-6">
            你的搞钱体质
          </div>

          <div className="flex justify-center mb-6">
            <div
              className="border-2 border-[#1A1A2E] bg-[#FFF8E7] p-4 shadow-[6px_6px_0_#1A1A2E]"
              style={{ backgroundColor: persona.vector ? undefined : "#FFF8E7" }}
            >
              <PixelSprite personaCode={persona.code} size={160} />
            </div>
          </div>

          <div className="font-pixel text-3xl text-[#1A1A2E] mb-2">
            {persona.code}
          </div>
          <h1 className="text-4xl font-bold text-[#1A1A2E] mb-3">
            {persona.name}
          </h1>
          <p className="text-lg text-[#6B6B7B] mb-4">{persona.archetype}</p>
          <p className="text-xl text-[#1A1A2E] font-medium max-w-xl mx-auto">
            「{persona.tagline}」
          </p>
          <div className="mt-6 inline-flex items-center gap-2 bg-[#F6EC35] border-2 border-[#1A1A2E] px-4 py-2 shadow-[3px_3px_0_#1A1A2E]">
            <span className="font-pixel text-xs">MATCH</span>
            <span className="font-pixel text-lg">{matchScore}%</span>
          </div>
          <div className="mt-3 text-xs text-[#6B6B7B]">
            {persona.populationRatio}
          </div>
        </div>
      </header>

      {/* ============ 雷达图 ============ */}
      <section className="py-12 border-b-2 border-[#1A1A2E]">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="font-pixel text-sm text-[#1A1A2E] mb-6 text-center">
            YOUR 6 DIMENSIONS
          </h2>
          <div className="flex justify-center">
            <RadarChart
              percentages={dimensionPercentages}
              personaColor={getPersonaColor(persona.code)}
            />
          </div>
          <div className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-3">
            {(Object.keys(dimensionPercentages) as Dimension[]).map((dim) => (
              <div
                key={dim}
                className="border-2 border-[#1A1A2E] p-3 text-center"
              >
                <div className="text-xs text-[#6B6B7B] mb-1">
                  {DIMENSION_META[dim].name}
                </div>
                <div className="font-pixel text-lg">
                  {dimensionPercentages[dim]}%
                </div>
                <div className="text-xs text-[#6B6B7B] mt-1">
                  {dimensionPercentages[dim] >= 60
                    ? DIMENSION_META[dim].rightLabel
                    : dimensionPercentages[dim] <= 40
                    ? DIMENSION_META[dim].leftLabel
                    : "中性"}
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => setShowDimDetails((v) => !v)}
            className="mt-6 mx-auto block text-xs text-[#6B6B7B] hover:text-[#1A1A2E] underline"
          >
            {showDimDetails ? "▲ 收起维度说明" : "▼ 这些维度到底在测什么？"}
          </button>

          {showDimDetails && (
            <div className="mt-4 space-y-2 text-left">
              {(Object.keys(dimensionPercentages) as Dimension[]).map((dim) => (
                <div
                  key={dim}
                  className="border-l-2 border-[#1A1A2E] pl-3 py-1"
                >
                  <div className="text-sm font-bold text-[#1A1A2E]">
                    {DIMENSION_META[dim].name}
                    <span className="ml-2 font-pixel text-xs text-[#6B6B7B]">
                      {dimensionPercentages[dim]}%
                    </span>
                  </div>
                  <div className="text-xs text-[#6B6B7B] mt-1">
                    {DIMENSION_META[dim].description}
                  </div>
                  <div className="text-xs text-[#1A1A2E] mt-1">
                    你的倾向：
                    <span className="font-medium">
                      {dimensionPercentages[dim] >= 60
                        ? DIMENSION_META[dim].rightLabel
                        : dimensionPercentages[dim] <= 40
                        ? DIMENSION_META[dim].leftLabel
                        : "中性平衡"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ============ 详细画像 ============ */}
      <section className="py-12 border-b-2 border-[#1A1A2E]">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="font-pixel text-sm text-[#1A1A2E] mb-6">
            PORTRAIT · 详细画像
          </h2>
          <div className="space-y-4">
            {persona.portrait.map((p, i) => (
              <p key={i} className="text-[#1A1A2E] leading-relaxed text-base">
                {p}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 优势 & 致命伤 ============ */}
      <section className="py-12 border-b-2 border-[#1A1A2E] bg-[#FFF8E7]">
        <div className="max-w-3xl mx-auto px-6 grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-pixel text-sm text-[#1A1A2E] mb-4">
              ✦ STRENGTHS
            </h3>
            <ul className="space-y-2">
              {persona.strengths.map((s, i) => (
                <li key={i} className="flex gap-2 text-[#1A1A2E]">
                  <span className="text-[#2DBE2C] font-bold">+</span>
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-pixel text-sm text-[#1A1A2E] mb-4">
              ☠ FATAL FLAWS
            </h3>
            <ul className="space-y-2">
              {persona.fatalFlaws.map((f, i) => (
                <li key={i} className="flex gap-2 text-[#1A1A2E]">
                  <span className="text-[#D01013] font-bold">−</span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ============ Top 3 副业 ============ */}
      <section className="py-12 border-b-2 border-[#1A1A2E]">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="font-pixel text-sm text-[#1A1A2E] mb-6">
            ★ TOP 3 副业方向
          </h2>
          <div className="space-y-6">
            {persona.topSideHustles.map((job) => (
              <div
                key={job.rank}
                className="border-2 border-[#1A1A2E] shadow-[4px_4px_0_#1A1A2E] bg-white"
              >
                <div
                  className="flex items-center justify-between p-4 border-b-2 border-[#1A1A2E]"
                  style={{ backgroundColor: getPersonaColor(persona.code) + "20" }}
                >
                  <div className="flex items-center gap-3">
                    <span className="font-pixel text-2xl">#{job.rank}</span>
                    <span className="text-2xl">{job.emoji}</span>
                    <span className="text-lg font-bold text-[#1A1A2E]">
                      {job.name}
                    </span>
                  </div>
                  <div className="font-pixel text-sm bg-[#1A1A2E] text-[#F6EC35] px-2 py-1">
                    {job.matchScore}%
                  </div>
                </div>
                <div className="p-4 space-y-2 text-sm">
                  <Row label="月入潜力" value={job.monthlyPotential} />
                  <Row label="启动成本" value={job.startupCost} />
                  <Row label="时间投入" value={job.timeRequired} />
                  <Row label="推荐平台" value={job.platforms.join(" · ")} />
                  <div className="pt-2 border-t border-[#1A1A2E]/20">
                    <div className="text-xs text-[#6B6B7B] mb-1">为什么适合你</div>
                    <p className="text-[#1A1A2E]">{job.reason}</p>
                  </div>
                  <div className="pt-2 border-t border-[#1A1A2E]/20">
                    <div className="text-xs text-[#6B6B7B] mb-1">第一步</div>
                    <p className="text-[#1A1A2E] font-medium">▶ {job.firstStep}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 避坑 ============ */}
      <section className="py-12 border-b-2 border-[#1A1A2E] bg-[#FFF8E7]">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="font-pixel text-sm text-[#D01013] mb-6">
            ⚠ 必须避开的副业
          </h2>
          <div className="space-y-3">
            {persona.avoidList.map((item, i) => (
              <div
                key={i}
                className="border-2 border-[#1A1A2E] bg-white p-4 flex gap-4"
              >
                <span className="text-2xl">{item.emoji}</span>
                <div>
                  <div className="font-bold text-[#1A1A2E]">{item.name}</div>
                  <p className="text-sm text-[#6B6B7B] mt-1">{item.reason}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 90 天清单 ============ */}
      <section className="py-12 border-b-2 border-[#1A1A2E]">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="font-pixel text-sm text-[#1A1A2E] mb-6">
            ▶ 90 天行动清单
          </h2>
          <div className="space-y-6">
            {persona.plan90d.map((phase, i) => (
              <div
                key={i}
                className="border-l-4 border-[#1A1A2E] pl-4"
              >
                <div className="flex items-baseline gap-3 mb-3">
                  <span className="font-pixel text-xs text-[#1A1A2E]">
                    {phase.weeks}
                  </span>
                  <span className="text-lg font-bold text-[#1A1A2E]">
                    {phase.phase}
                  </span>
                </div>
                <ul className="space-y-2">
                  {phase.goals.map((goal, j) => (
                    <li key={j} className="flex gap-2">
                      <span className="text-[#1A1A2E]">□</span>
                      <span className="text-[#1A1A2E]">{goal}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 相似体质 & 最佳拍档 ============ */}
      <section className="py-12 border-b-2 border-[#1A1A2E]">
        <div className="max-w-3xl mx-auto px-6">
          {/* 相似体质 */}
          <h2 className="font-pixel text-sm text-[#1A1A2E] mb-4">
            ◆ 相似体质的人
          </h2>
          <p className="text-xs text-[#6B6B7B] mb-4">
            这些身份的人，跟你的搞钱逻辑高度同频
          </p>
          <div className="flex flex-wrap gap-2 mb-8">
            {persona.celebritySame.map((c, i) => (
              <span
                key={i}
                className="border-2 border-[#1A1A2E] bg-white px-3 py-1 text-sm text-[#1A1A2E]"
                style={{ backgroundColor: getPersonaColor(persona.code) + "15" }}
              >
                {c}
              </span>
            ))}
          </div>

          {/* 最佳拍档 */}
          <h2 className="font-pixel text-sm text-[#1A1A2E] mb-4">
            ◆ 你的最佳拍档
          </h2>
          <p className="text-xs text-[#6B6B7B] mb-4">
            搞钱路上需要补位的人，组队就找 ta
          </p>
          <div className="space-y-3">
            {persona.bestMatch.map((m, i) => {
              const match = personaByCode[m.code];
              if (!match) return null;
              return (
                <div
                  key={i}
                  className="border-2 border-[#1A1A2E] bg-white p-4 flex gap-4 items-start shadow-[3px_3px_0_#1A1A2E]"
                >
                  <div
                    className="shrink-0 w-12 h-12 flex items-center justify-center border-2 border-[#1A1A2E] text-2xl"
                    style={{ backgroundColor: getPersonaColor(m.code) + "30" }}
                  >
                    {match.emoji}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="font-pixel text-xs text-[#6B6B7B]">
                        {match.code}
                      </span>
                      <span className="font-bold text-[#1A1A2E]">
                        {match.name}
                      </span>
                    </div>
                    <p className="text-sm text-[#1A1A2E] leading-relaxed">
                      {m.reason}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============ 分享区 ============ */}
      <section className="py-12">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="font-pixel text-sm text-[#1A1A2E] mb-3">
            SHARE YOUR RESULT
          </h2>
          <p className="text-sm text-[#6B6B7B] mb-6">
            复制链接发给朋友，看看 ta 是哪种搞钱体质
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <button
              onClick={handleCopyLink}
              className="bg-[#F6EC35] border-2 border-[#1A1A2E] px-6 py-3 font-pixel text-xs shadow-[4px_4px_0_#1A1A2E] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_#1A1A2E] transition-all"
            >
              {copied ? "✓ LINK COPIED" : "COPY LINK"}
            </button>
            <button
              onClick={() => alert("海报生成功能后续接入 @vercel/og")}
              className="bg-white border-2 border-[#1A1A2E] px-6 py-3 font-pixel text-xs shadow-[4px_4px_0_#1A1A2E] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_#1A1A2E] transition-all"
            >
              DOWNLOAD POSTER
            </button>
          </div>
          <div className="mt-8 text-xs text-[#6B6B7B] font-mono">
            TOKEN: {token}
          </div>
        </div>
      </section>
    </main>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-3">
      <span className="text-xs text-[#6B6B7B] w-20 shrink-0 pt-1">{label}</span>
      <span className="text-[#1A1A2E]">{value}</span>
    </div>
  );
}

// TODO: 把这个移到 design-tokens.ts 作为辅助函数
function getPersonaColor(code: string): string {
  const colors: Record<string, string> = {
    G1: "#FF6B35",
    G2: "#0055BF",
    G3: "#2DBE2C",
    G4: "#6C2E9C",
    G5: "#FF00AA",
    G6: "#4B9F4B",
    G7: "#D01012",
    G8: "#F2C94C",
  };
  return colors[code] ?? "#FF6B35";
}
