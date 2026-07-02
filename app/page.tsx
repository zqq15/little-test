"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const trimmed = code.trim().toUpperCase();
    if (!trimmed) {
      setError("请输入激活码");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/activate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: trimmed }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "激活失败");
        return;
      }

      // 已完成测试：直接看结果
      if (data.alreadyCompleted && data.token) {
        router.push(`/result/${data.token}`);
        return;
      }

      // 激活成功：记下激活码，进答题页
      sessionStorage.setItem("activationCode", trimmed);
      router.push("/test");
    } catch {
      setError("网络错误，请重试");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 py-12 bg-white">
      <div className="w-full max-w-md">
        {/* 头部 */}
        <div className="text-center mb-10">
          <div className="inline-block bg-[#1A1A2E] text-[#F6EC35] font-pixel text-xs px-3 py-1 mb-6">
            PIXEL PRESS
          </div>
          <h1 className="text-4xl font-bold text-[#1A1A2E] mb-3 leading-tight">
            搞钱体质测试
          </h1>
          <p className="text-[#6B6B7B] text-sm leading-relaxed">
            24 题 · 5 分钟 · 测出你最适合的副业方向
            <br />
            <span className="text-[#1A1A2E] font-medium">+ 90 天行动清单</span>
          </p>
        </div>

        {/* 输入卡 */}
        <form
          onSubmit={handleSubmit}
          className="border-2 border-[#1A1A2E] bg-[#FFF8E7] p-6 shadow-[6px_6px_0_#1A1A2E]"
        >
          <label className="block font-pixel text-xs text-[#1A1A2E] mb-3">
            ACTIVATION CODE
          </label>
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
            placeholder="GAOQIAN-XXXX-XXXX-XXXX"
            autoComplete="off"
            autoCapitalize="characters"
            spellCheck={false}
            className="w-full bg-white border-2 border-[#1A1A2E] px-4 py-3 font-mono text-base text-[#1A1A2E] tracking-wider focus:outline-none focus:bg-[#F6EC35]/30 placeholder:text-[#6B6B7B]/50"
          />

          {error && (
            <div className="mt-4 border-2 border-[#D01013] bg-white px-3 py-2 text-sm text-[#D01013] font-medium">
              ⚠ {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-6 w-full bg-[#F6EC35] border-2 border-[#1A1A2E] py-3 font-pixel text-xs shadow-[4px_4px_0_#1A1A2E] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_#1A1A2E] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-x-0 disabled:hover:translate-y-0 disabled:hover:shadow-[4px_4px_0_#1A1A2E]"
          >
            {loading ? "LOADING..." : "START TEST ▶"}
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-[#6B6B7B] leading-relaxed">
          激活后 24 小时内完成测试有效
          <br />
          报告生成后可永久分享查看
        </p>
      </div>
    </main>
  );
}
