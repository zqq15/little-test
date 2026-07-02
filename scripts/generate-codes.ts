#!/usr/bin/env tsx
// ============================================================
// 激活码生成脚本
// 用法：
//   npx tsx scripts/generate-codes.ts --count 50 --batch 2026-07-02
//
// 输出：
//   1. CSV 文件到 scripts/output/codes-{batch}.csv（供你导入 Supabase）
//   2. 同时打印到终端
// ============================================================

import { writeFileSync, mkdirSync } from "node:fs";

// 去除易混字符对：0/O, 1/I, 5/S, 8/B
// 字母去掉：I O S B（剩 22 个）
// 数字去掉：0 1 5 8（剩 6 个：2 3 4 6 7 9）
// 组合容量：28^4 ≈ 61 万，足够
const CHARSET = "ACDEFGHJKLMNPQRTUVWXYZ234679";
const PREFIX = "GAOQIAN";
const SEG_LEN = 4;

interface Args {
  count: number;
  batch: string;
}

function parseArgs(): Args {
  const args = process.argv.slice(2);
  const parsed: Args = { count: 50, batch: new Date().toISOString().slice(0, 10) };

  for (let i = 0; i < args.length; i++) {
    if (args[i] === "--count" && args[i + 1]) {
      parsed.count = parseInt(args[i + 1], 10);
      i++;
    } else if (args[i] === "--batch" && args[i + 1]) {
      parsed.batch = args[i + 1];
      i++;
    }
  }

  if (parsed.count <= 0 || parsed.count > 10000) {
    console.error("❌ count 必须在 1-10000 之间");
    process.exit(1);
  }

  return parsed;
}

function randomSegment(): string {
  let s = "";
  for (let i = 0; i < SEG_LEN; i++) {
    s += CHARSET[Math.floor(Math.random() * CHARSET.length)];
  }
  return s;
}

function generateCode(): string {
  return [PREFIX, randomSegment(), randomSegment(), randomSegment()].join("-");
}

function generateBatch(count: number): string[] {
  const codes = new Set<string>();
  let attempts = 0;
  const maxAttempts = count * 5; // 防止死循环

  while (codes.size < count && attempts < maxAttempts) {
    codes.add(generateCode());
    attempts++;
  }

  if (codes.size < count) {
    console.error(`⚠️ 只生成了 ${codes.size} 个唯一码（目标 ${count}）`);
  }

  return Array.from(codes);
}

function toCSV(codes: string[], batch: string): string {
  const header = "code,status,batch_id,created_at";
  const rows = codes.map((code) => {
    return `${code},unused,${batch},${new Date().toISOString()}`;
  });
  return [header, ...rows].join("\n");
}

function main() {
  const { count, batch } = parseArgs();
  console.log(`\n🎨 生成 ${count} 个激活码 · 批次 ${batch}\n`);

  const codes = generateBatch(count);

  // 打印到终端
  codes.forEach((code, i) => {
    const num = String(i + 1).padStart(3, "0");
    console.log(`  ${num}.  ${code}`);
  });

  // 写 CSV
  const outputDir = "scripts/output";
  mkdirSync(outputDir, { recursive: true });
  const csvPath = `${outputDir}/codes-${batch}.csv`;
  const csv = toCSV(codes, batch);
  writeFileSync(csvPath, csv);

  console.log(`\n✅ 已生成 ${codes.length} 个激活码`);
  console.log(`📁 CSV 文件：${csvPath}`);
  console.log(`\n下一步：把 CSV 导入 Supabase 的 activation_codes 表`);
  console.log(`   Supabase Dashboard → Table Editor → activation_codes → Import CSV\n`);
}

main();
