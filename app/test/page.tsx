"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { QUESTIONS } from "@/content/questions";
import type { Answer } from "@/lib/scoring";

export default function TestPage() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [direction, setDirection] = useState<"forward" | "backward">("forward");
  const [mounted, setMounted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
    const code = sessionStorage.getItem("activationCode");
    if (!code) {
      router.replace("/");
    }
  }, [router]);

  const currentQuestion = QUESTIONS[currentIndex];
  const totalQuestions = QUESTIONS.length;
  const progress = ((currentIndex + 1) / totalQuestions) * 100;

  async function submitFinal(newAnswers: Answer[]) {
    const code = sessionStorage.getItem("activationCode");
    if (!code) {
      router.replace("/");
      return;
    }
    setSubmitting(true);
    setSubmitError(null);
    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, answers: newAnswers }),
      });
      const data = await res.json();
      if (!res.ok) {
        setSubmitting(false);
        setSubmitError(data.error ?? "提交失败");
        return;
      }
      sessionStorage.removeItem("activationCode");
      router.push(`/result/${data.token}`);
    } catch {
      setSubmitting(false);
      setSubmitError("网络错误，请重试");
    }
  }

  function handleAnswer(optionId: "A" | "B" | "C" | "D") {
    const newAnswers = [...answers];
    newAnswers[currentIndex] = {
      questionId: currentQuestion.id,
      optionId,
    };
    setAnswers(newAnswers);

    if (currentIndex < totalQuestions - 1) {
      setDirection("forward");
      setCurrentIndex(currentIndex + 1);
    } else {
      submitFinal(newAnswers);
    }
  }

  function handlePrev() {
    if (currentIndex > 0) {
      setDirection("backward");
      setCurrentIndex(currentIndex - 1);
    }
  }

  function handleSelectExisting(): "A" | "B" | "C" | "D" | null {
    return answers[currentIndex]?.optionId ?? null;
  }

  if (!mounted) return null;

  const selected = handleSelectExisting();

  return (
    <main className="min-h-screen flex flex-col bg-white">
      {/* 进度条 */}
      <div className="border-b-2 border-[#1A1A2E] bg-[#FFF8E7]">
        <div className="max-w-2xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-2">
            <div className="font-pixel text-xs text-[#1A1A2E]">
              {String(currentIndex + 1).padStart(2, "0")} / {String(totalQuestions).padStart(2, "0")}
            </div>
            <div className="text-xs text-[#6B6B7B]">
              {Math.round(progress)}% 已完成
            </div>
          </div>
          <div className="h-3 bg-white border-2 border-[#1A1A2E]">
            <div
              className="h-full bg-[#F6EC35] transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* 题目区 */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div
          key={currentIndex}
          className="w-full max-w-2xl"
          style={{
            animation: `${direction === "forward" ? "slideInRight" : "slideInLeft"} 0.3s ease-out`,
          }}
        >
          {/* 场景标签 */}
          <div className="inline-block bg-[#1A1A2E] text-[#F6EC35] font-pixel text-xs px-3 py-1 mb-4">
            {currentQuestion.scene}
          </div>

          {/* 题目 */}
          <h1 className="text-2xl sm:text-3xl font-bold text-[#1A1A2E] mb-8 leading-relaxed">
            {currentQuestion.title}
          </h1>

          {/* 选项 */}
          <div className="space-y-3">
            {currentQuestion.options.map((option) => {
              const isSelected = selected === option.id;
              return (
                <button
                  key={option.id}
                  onClick={() => handleAnswer(option.id)}
                  disabled={submitting}
                  className={`w-full text-left p-4 border-2 border-[#1A1A2E] transition-all disabled:opacity-50
                    ${isSelected
                      ? "bg-[#F6EC35] shadow-[2px_2px_0_#1A1A2E] translate-x-[2px] translate-y-[2px]"
                      : "bg-white hover:bg-[#FFF8E7] shadow-[4px_4px_0_#1A1A2E] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_#1A1A2E]"
                    }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="font-pixel text-sm text-[#1A1A2E] w-6">
                      {option.id}
                    </span>
                    <span className="text-[#1A1A2E] text-base">
                      {option.text}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* 提交错误 */}
          {submitError && (
            <div className="mt-6 border-2 border-[#D01013] bg-white px-4 py-3 text-sm text-[#D01013]">
              ⚠ {submitError}
            </div>
          )}

          {/* 提交中提示 */}
          {submitting && (
            <div className="mt-6 font-pixel text-xs text-[#1A1A2E] animate-pulse">
              SUBMITTING...
            </div>
          )}

          {/* 上一题按钮 */}
          {currentIndex > 0 && !submitting && (
            <button
              onClick={handlePrev}
              className="mt-8 text-sm text-[#6B6B7B] hover:text-[#1A1A2E] underline"
            >
              ← 上一题
            </button>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </main>
  );
}
