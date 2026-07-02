// 像素小人偶 React 组件
// 根据 personaCode 渲染对应 16×16 像素 SVG

import { getSprite } from "@/content/sprites";

interface PixelSpriteProps {
  personaCode: string;        // G1 ~ G8
  size?: number;              // 显示像素，默认 128
  className?: string;
}

export function PixelSprite({
  personaCode,
  size = 128,
  className,
}: PixelSpriteProps) {
  const sprite = getSprite(personaCode);
  const GRID = 16;

  const rects: React.ReactNode[] = [];
  sprite.grid.forEach((row, y) => {
    for (let x = 0; x < row.length; x++) {
      const ch = row[x];
      const color = sprite.palette[ch];
      if (color) {
        rects.push(
          <rect
            key={`${x}-${y}`}
            x={x}
            y={y}
            width={1}
            height={1}
            fill={color}
          />
        );
      }
    }
  });

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${GRID} ${GRID}`}
      shapeRendering="crispEdges"
      width={size}
      height={size}
      className={className}
      style={{ imageRendering: "pixelated" }}
    >
      {rects}
    </svg>
  );
}
