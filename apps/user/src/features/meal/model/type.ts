export interface Dish {
  name: string;
  allergies: string[];
}

export const MEAL_TYPES = ["조식", "중식", "석식"] as const;

export type MealType = (typeof MEAL_TYPES)[number];

export type CurrentLabel = "오늘" | "내일";

export interface MealEachProps {
  title: MealType;
  meal: Dish[];
  calorie: string;
}

export interface MealRow {
  MMEAL_SC_NM: string;
  DDISH_NM: string;
  CAL_INFO: string;
  MLSV_YMD: string;
}

export interface MealResponse {
  mealServiceDietInfo?: { row?: MealRow[] }[];
}

export const PERIODS = ["일", "주", "월"] as const;

export type Period = (typeof PERIODS)[number];

export const WEEKDAY_NAMES = ["월", "화", "수", "목", "금"] as const;

export type OtherMonth = "지난달" | "다음달";
