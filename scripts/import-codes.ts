#!/usr/bin/env tsx
// 把生成的 CSV 直接灌到 Supabase
// 用法: npx tsx scripts/import-codes.ts scripts/output/codes-2026-07-launch.csv

import { readFileSync } from "node:fs";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;

async function main() {
  const csvPath = process.argv[2];
  if (!csvPath) {
    console.error("用法: npx tsx scripts/import-codes.ts <csv-path>");
    process.exit(1);
  }

  const csv = readFileSync(csvPath, "utf-8");
  const lines = csv.trim().split("\n").slice(1); // 跳过 header

  const rows = lines.map((line) => {
    const [code, status, batch_id, created_at] = line.split(",");
    return { code, status, batch_id, created_at };
  });

  console.log(`📤 准备导入 ${rows.length} 条激活码...`);

  // Supabase REST API 单次最多 ~500 行，分批保险
  const BATCH = 100;
  for (let i = 0; i < rows.length; i += BATCH) {
    const chunk = rows.slice(i, i + BATCH);
    const res = await fetch(`${SUPABASE_URL}/rest/v1/activation_codes`, {
      method: "POST",
      headers: {
        apikey: SERVICE_KEY,
        Authorization: `Bearer ${SERVICE_KEY}`,
        "Content-Type": "application/json",
        Prefer: "return=representation",
      },
      body: JSON.stringify(chunk),
    });
    if (!res.ok) {
      const text = await res.text();
      console.error(`❌ 第 ${i + 1}-${i + chunk.length} 行导入失败:`, text);
      process.exit(1);
    }
    console.log(`  ✓ 第 ${i + 1}-${i + chunk.length} 行已导入`);
  }

  console.log(`\n✅ 全部 ${rows.length} 条激活码已导入 Supabase`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
