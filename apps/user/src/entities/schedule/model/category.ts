import type { ScheduleCategory } from "@/entities/schedule/model/types";

export interface ScheduleCategoryConfig {
  label: string;
  /** 칩·뱃지 글자색 */
  text: string;
  /** 칩·뱃지 배경색 */
  background: string;
  /** 상세 카드 좌측 테두리색 */
  accent: string;
}

/** 화면 표시 순서(토글, 범례)에도 그대로 쓴다. */
export const SCHEDULE_CATEGORIES: readonly ScheduleCategory[] = [
  "ACADEMIC",
  "ASSESSMENT",
  "BIRTHDAY",
];

export const SCHEDULE_CATEGORY_CONFIG: Record<ScheduleCategory, ScheduleCategoryConfig> = {
  ACADEMIC: {
    label: "학사일정",
    text: "#0F5F56",
    background: "#CCFBF1",
    accent: "#0F766E",
  },
  ASSESSMENT: {
    label: "수행평가",
    text: "#5B21B6",
    background: "#EDE9FE",
    accent: "#7C3AED",
  },
  BIRTHDAY: {
    label: "생일",
    text: "#92400E",
    background: "#FEF3C7",
    accent: "#D97706",
  },
};
