// 算分核心逻辑
// 输入：用户的 24 题答案
// 输出：6 维度归一化分数 + 匹配的人格

import { QUESTIONS, type Dimension, type Option } from "@/content/questions";
import {
  PERSONAS,
  findClosestPersona,
  type Persona,
} from "@/content/personas";

// 用户单题答案
export interface Answer {
  questionId: number;
  optionId: "A" | "B" | "C" | "D";
}

// 6 维度分数（-1 到 1）
export type DimensionScores = Record<Dimension, number>;

// 维度显示用的百分比形式（0-100）
export type DimensionPercentages = Record<Dimension, number>;

// 完整的算分结果
export interface ScoringResult {
  dimensionScores: DimensionScores;       // -1 到 1
  dimensionPercentages: DimensionPercentages; // 0 到 100
  persona: Persona;                       // 匹配的人格
  matchScore: number;                     // 匹配度 0-100
  answers: Answer[];                      // 原始答案（便于存数据库）
}

// ============================================================

/**
 * 主算分函数
 * 输入 24 题答案，返回维度分数 + 匹配人格
 */
export function scoreTest(answers: Answer[]): ScoringResult {
  const dimensionScores = calculateDimensionScores(answers);
  const dimensionPercentages = toPercentages(dimensionScores);
  const persona = findClosestPersona(dimensionScores);
  const matchScore = calculateMatchScore(dimensionScores, persona);

  return {
    dimensionScores,
    dimensionPercentages,
    persona,
    matchScore,
    answers,
  };
}

/**
 * 计算每个维度的归一化分数
 * 算法：(正向次数 - 负向次数) / (正向次数 + 负向次数)
 * 范围：-1 到 1
 */
function calculateDimensionScores(answers: Answer[]): DimensionScores {
  const positive: Record<Dimension, number> = {
    D1_RISK: 0,
    D2_SOCIAL: 0,
    D3_TIME: 0,
    D4_SKILL: 0,
    D5_DRIVE: 0,
    D6_STRESS: 0,
  };
  const negative: Record<Dimension, number> = { ...positive };

  for (const answer of answers) {
    const option = findOption(answer.questionId, answer.optionId);
    if (!option) continue;

    for (const weight of option.weights) {
      if (weight.value > 0) {
        positive[weight.dimension]++;
      } else {
        negative[weight.dimension]++;
      }
    }
  }

  const scores: Partial<DimensionScores> = {};
  (Object.keys(positive) as Dimension[]).forEach((dim) => {
    const total = positive[dim] + negative[dim];
    scores[dim] = total === 0 ? 0 : (positive[dim] - negative[dim]) / total;
  });

  return scores as DimensionScores;
}

/**
 * 找到题目对应的选项
 */
function findOption(questionId: number, optionId: string): Option | undefined {
  const question = QUESTIONS.find((q) => q.id === questionId);
  if (!question) return undefined;
  return question.options.find((o) => o.id === optionId);
}

/**
 * 把 -1~1 的维度分数转成 0~100 的百分比（用于显示）
 * 中性 = 50%
 */
function toPercentages(scores: DimensionScores): DimensionPercentages {
  const result: Partial<DimensionPercentages> = {};
  (Object.keys(scores) as Dimension[]).forEach((dim) => {
    // 把 -1~1 映射到 0~100：score * 50 + 50
    result[dim] = Math.round(scores[dim] * 50 + 50);
  });
  return result as DimensionPercentages;
}

/**
 * 计算用户向量与人格向量的余弦相似度，转为 0-100 匹配度
 */
export function calculateMatchScore(userScores: DimensionScores, persona: Persona): number {
  const cosine = cosineSimilarity(userScores, persona.vector);
  // 余弦相似度范围 -1 到 1，转为 0-100
  return Math.round((cosine + 1) * 50);
}

function cosineSimilarity(
  a: DimensionScores,
  b: Persona["vector"]
): number {
  const keys = Object.keys(a) as Dimension[];
  let dot = 0;
  let normA = 0;
  let normB = 0;
  for (const k of keys) {
    dot += a[k] * b[k];
    normA += a[k] * a[k];
    normB += b[k] * b[k];
  }
  const denom = Math.sqrt(normA) * Math.sqrt(normB);
  return denom === 0 ? 0 : dot / denom;
}

