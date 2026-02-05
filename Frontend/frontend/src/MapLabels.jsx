import { COUNTRY_LABELS, WORLD_LABEL_PRIORITY } from "./config/countryLabels";

const buildOverrides = () => {
  const map = new Map();
  COUNTRY_LABELS.forEach((label) => {
    map.set(label.code, label);
  });
  return map;
};

const overrides = buildOverrides();

export default function MapLabels({
  viewBox,
  zoomLevel,
  labelPositions,
  getCountryName,
  hoveredCode,
  selectedCode,
}) {
  if (!labelPositions || labelPositions.size === 0) return null;

  const [vx, vy, vw, vh] = viewBox;
  const isZoomed = zoomLevel > 1.3;
  const worldPriority = WORLD_LABEL_PRIORITY;

  const shouldShow = (code, pos) => {
    if (isZoomed) return true;
    const override = overrides.get(code);
    if (!override) return false;
    if (pos && pos.width * pos.height < 140) return false;
    return override.priority <= worldPriority;
  };

  const isInsideView = (pos) =>
    pos.x >= vx && pos.x <= vx + vw && pos.y >= vy && pos.y <= vy + vh;

  const entries = [];
  labelPositions.forEach((pos, code) => {
    if (!pos || !isInsideView(pos)) return;
    if (!shouldShow(code, pos)) return;
    const override = overrides.get(code);
    entries.push({
      code,
      label: override?.label || getCountryName(code),
      x: override?.x ?? pos.x,
      y: override?.y ?? pos.y,
    });
  });

  const highlightCodes = [hoveredCode, selectedCode].filter(Boolean);
  highlightCodes.forEach((code) => {
    if (!labelPositions.has(code)) return;
    const override = overrides.get(code);
    const pos = labelPositions.get(code);
    if (!pos || !isInsideView(pos)) return;
    if (entries.find((entry) => entry.code === code)) return;
    entries.push({
      code,
      label: override?.label || getCountryName(code),
      x: override?.x ?? pos.x,
      y: override?.y ?? pos.y,
      emphasize: true,
    });
  });

  return (
    <g
      className={`map-labels ${isZoomed ? "map-labels--zoomed" : ""}`}
      aria-hidden="true"
    >
      {entries.map((label) => (
        <text
          key={label.code}
          x={label.x}
          y={label.y}
          textAnchor="middle"
          dominantBaseline="middle"
          className={label.emphasize ? "map-labels__emphasis" : ""}
        >
          {label.label}
        </text>
      ))}
    </g>
  );
}
