import type { CurrentLabel, MealType } from "../model/type";
import { addDays, isSameDay } from "./date";

export interface CurrentMeal {
  date: Date;
  title: MealType;
}

const BREAKFAST_END = 8 * 60 + 30; // 08:30
const LUNCH_END = 13 * 60; // 13:00
const DINNER_END = 18 * 60 + 30; // 18:30

export const getCurrentMeal = (now: Date): CurrentMeal => {
  const minutes = now.getHours() * 60 + now.getMinutes();

  if (minutes <= BREAKFAST_END) return { date: now, title: "조식" };
  if (minutes <= LUNCH_END) return { date: now, title: "중식" };
  if (minutes <= DINNER_END) return { date: now, title: "석식" };
  return { date: addDays(now, 1), title: "조식" };
};

// day가 지금 보여줄 끼니의 날짜면 "오늘"/"내일", 아니면 undefined
export const getCurrentLabel = (
  day: Date,
  current: CurrentMeal,
  today: Date,
): CurrentLabel | undefined => {
  if (!isSameDay(day, current.date)) return undefined;
  return isSameDay(day, today) ? "오늘" : "내일";
};
