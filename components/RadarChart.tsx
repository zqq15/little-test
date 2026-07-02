// 6 维度雷达图 · 纯 SVG 手绘，不引第三方依赖

import { DIMENSION_META, type Dimension } from "@/content/questions";
import type { DimensionPercentages } from "@/lib/scoring";

interface RadarChartProps {
  percentages: DimensionPercentages;
  size?: number;
  personaColor?: string;
}

const DIMENSIONS: Dimension[] = [
  "D1_RISK",
  "D2_SOCIAL",
  "D3_TIME",
  "D4_SKILL",
  "D5_DRIVE",
  "D6_STRESS",
];

export function RadarChart({
  percentages,
  size = 280,
  personaColor = "#FF6B35",
}: RadarChartProps) {
  const center = size / 2;
  const radius = size / 2 - 50; // 留空间给标签
  const angleStep = (Math.PI * 2) / DIMENSIONS.length;

  // 网格：5 圈（20%, 40%, 60%, 80%, 100%）
  const gridLevels = [0.2, 0.4, 0.6, 0.8, 1.0];

  // 计算每个维度的点位置
  const dataPoints = DIMENSIONS.map((dim, i) => {
    const angle = i * angleStep - Math.PI / 2; // 从顶部开始
    const value = percentages[dim] / 100;
    const x = center + Math.cos(angle) * radius * value;
    const y = center + Math.sin(angle) * radius * value;
    return { dim, x, y, angle, value };
  });

  // 数据多边形 points 字符串
  const dataPolygon = dataPoints.map((p) => `${p.x},${p.y}`).join(" ");

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {/* 网格 */}
      {gridLevels.map((level, levelIdx) => {
        const points = DIMENSIONS.map((_, i) => {
          const angle = i * angleStep - Math.PI / 2;
          const x = center + Math.cos(angle) * radius * level;
          const y = center + Math.sin(angle) * radius * level;
          return `${x},${y}`;
        }).join(" ");
        return (
          <polygon
            key={levelIdx}
            points={points}
            fill="none"
            stroke="#1A1A2E"
            strokeWidth={levelIdx === gridLevels.length - 1 ? 2 : 1}
            strokeOpacity={levelIdx === gridLevels.length - 1 ? 1 : 0.3}
          />
        );
      })}

      {/* 6 条轴线 */}
      {DIMENSIONS.map((_, i) => {
        const angle = i * angleStep - Math.PI / 2;
        const x = center + Math.cos(angle) * radius;
        const y = center + Math.sin(angle) * radius;
        return (
          <line
            key={i}
            x1={center}
            y1={center}
            x2={x}
            y2={y}
            stroke="#1A1A2E"
            strokeWidth={1}
            strokeOpacity={0.3}
          />
        );
      })}

      {/* 数据多边形 */}
      <polygon
        points={dataPolygon}
        fill={personaColor}
        fillOpacity={0.3}
        stroke={personaColor}
        strokeWidth={2}
      />

      {/* 数据点 */}
      {dataPoints.map((p, i) => (
        <circle
          key={i}
          cx={p.x}
          cy={p.y}
          r={4}
          fill={personaColor}
          stroke="#1A1A2E"
          strokeWidth={1.5}
        />
      ))}

      {/* 维度标签 */}
      {DIMENSIONS.map((dim, i) => {
        const angle = i * angleStep - Math.PI / 2;
        const labelRadius = radius + 24;
        const x = center + Math.cos(angle) * labelRadius;
        const y = center + Math.sin(angle) * labelRadius;
        const meta = DIMENSION_META[dim];

        // 文本对齐
        let textAnchor: "start" | "middle" | "end" = "middle";
        if (x < center - 5) textAnchor = "end";
        else if (x > center + 5) textAnchor = "start";

        return (
          <g key={dim}>
            <text
              x={x}
              y={y}
              textAnchor={textAnchor}
              dominantBaseline="middle"
              fontSize="11"
              fontWeight="700"
              fill="#1A1A2E"
            >
              {meta.name}
            </text>
            <text
              x={x}
              y={y + 12}
              textAnchor={textAnchor}
              dominantBaseline="middle"
              fontSize="10"
              fill="#6B6B7B"
            >
              {percentages[dim]}%
            </text>
          </g>
        );
      })}
    </svg>
  );
}
