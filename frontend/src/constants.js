// ── Design tokens (matching the original Confucius Institute site) ────────────
export const T = {
  red: "#B71C1C",
  redMid: "#C62828",
  redLight: "#FFEBEE",
  gold: "#C9A84C",
  goldLight: "#FDF6E3",
  ink: "#1C1C1C",
  inkSoft: "#444",
  muted: "#888",
  bg: "#FAFAF8",
  card: "#fff",
  border: "rgba(0,0,0,0.09)",
  shadowSm: "0 2px 12px rgba(0,0,0,0.06)",
  shadowMd: "0 6px 28px rgba(0,0,0,0.10)",
};

// ── HSK Levels ────────────────────────────────────────────────────────────────
export const LEVELS = ["HSK 1", "HSK 2", "HSK 3", "HSK 4", "HSK 5", "HSK 6"];

// ── Level color map ───────────────────────────────────────────────────────────
export const levelColors = {
  "HSK 1": "#B71C1C",
  "HSK 2": "#7B6000",
  "HSK 3": "#1A237E",
  "HSK 4": "#1B5E20",
  "HSK 5": "#4A148C",
  "HSK 6": "#BF360C",
};

// ── Status configuration ──────────────────────────────────────────────────────
export const statusConfig = {
  pending:  { label: "قيد المراجعة", bg: "#FFF8E1", color: "#F57F17" },
  approved: { label: "مقبول",        bg: "#E8F5E9", color: "#2E7D32" },
  rejected: { label: "مرفوض",        bg: "#FFEBEE", color: "#B71C1C" },
};
