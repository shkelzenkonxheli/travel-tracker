// Label positions are defined in SVG viewBox coordinates (0 0 1008 651).
// Priority: 1 = always in world view, 2 = world view if space, 3 = zoom-only.
export const COUNTRY_LABELS = [
  { code: "US", label: "USA", x: 220, y: 260, priority: 1 },
  { code: "CA", label: "Canada", x: 200, y: 190, priority: 1 },
  { code: "MX", label: "Mexico", x: 230, y: 330, priority: 2 },
  { code: "BR", label: "Brazil", x: 320, y: 480, priority: 1 },
  { code: "AR", label: "Argentina", x: 300, y: 600, priority: 2 },
  { code: "CL", label: "Chile", x: 260, y: 560, priority: 3 },
  { code: "GB", label: "UK", x: 470, y: 240, priority: 1 },
  { code: "FR", label: "France", x: 485, y: 270, priority: 2 },
  { code: "DE", label: "Germany", x: 510, y: 255, priority: 2 },
  { code: "ES", label: "Spain", x: 470, y: 300, priority: 2 },
  { code: "IT", label: "Italy", x: 520, y: 300, priority: 2 },
  { code: "RU", label: "Russia", x: 680, y: 210, priority: 1 },
  { code: "CN", label: "China", x: 720, y: 320, priority: 1 },
  { code: "IN", label: "India", x: 700, y: 380, priority: 1 },
  { code: "JP", label: "Japan", x: 820, y: 340, priority: 2 },
  { code: "SA", label: "Saudi", x: 620, y: 360, priority: 3 },
  { code: "EG", label: "Egypt", x: 540, y: 360, priority: 3 },
  { code: "NG", label: "Nigeria", x: 490, y: 430, priority: 3 },
  { code: "ZA", label: "S. Africa", x: 540, y: 560, priority: 2 },
  { code: "AU", label: "Australia", x: 860, y: 520, priority: 1 },
  { code: "NZ", label: "New Zealand", x: 930, y: 585, priority: 3 },
];

export const WORLD_LABEL_PRIORITY = 2;
