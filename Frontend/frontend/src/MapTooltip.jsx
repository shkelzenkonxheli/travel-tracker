const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

export default function MapTooltip({ data, viewBox }) {
  if (!data) return null;
  const [vx, vy, vw, vh] = viewBox;
  const padding = 4;
  const fontSize = 12;
  const textWidth = data.name.length * 7;
  const boxWidth = textWidth + padding * 2;
  const boxHeight = fontSize + padding * 2;

  const x = clamp(data.x + 10, vx + 4, vx + vw - boxWidth - 4);
  const y = clamp(data.y - 16, vy + 4, vy + vh - boxHeight - 4);

  return (
    <g className="map-tooltip" pointerEvents="none">
      <rect
        x={x}
        y={y}
        width={boxWidth}
        height={boxHeight}
        rx={6}
        ry={6}
      />
      <text
        x={x + boxWidth / 2}
        y={y + boxHeight / 2 + 1}
        textAnchor="middle"
        dominantBaseline="middle"
      >
        {data.name}
      </text>
    </g>
  );
}
