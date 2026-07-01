import type { Category } from "@/lib/projects";

export type MaterialCategory = Category | "ALL";

export type MaterialColor = {
  /** Active state text color */
  accent: string;
  /** Hover tint */
  tint: string;
};

export const ACTIVE_BACKGROUND = "#c9caca";

export const MATERIAL_PALETTE: Record<MaterialCategory, MaterialColor> = {
  주거: {
    accent: "#FF6A00",
    tint: "#FFE8D6",
  },
  상업: {
    accent: "#2DB84D",
    tint: "#D4F0DB",
  },
  "공장, 연구소": {
    accent: "#0057FF",
    tint: "#D6E4FF",
  },
  공공: {
    accent: "#FF3B30",
    tint: "#FFD8D6",
  },
  교회: {
    accent: "#8A2BE2",
    tint: "#E8D4F7",
  },
  계획: {
    accent: "#00BFC6",
    tint: "#D0F5F7",
  },
  ALL: {
    accent: "#000000",
    tint: "#E8E8E8",
  },
};

export const NAV_ACTIVE_COLOR = ACTIVE_BACKGROUND;
export const NAV_ACTIVE_TEXT = "#000000";

export function getMaterialColor(category: MaterialCategory): MaterialColor {
  return MATERIAL_PALETTE[category];
}
