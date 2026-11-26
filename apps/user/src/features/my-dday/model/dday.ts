import { WEEKDAY_LABELS, parseDateKey, startOfDay } from "@/shared/lib/date";

const DAY_MS = 24 * 60 * 60 * 1000;

// 오늘 기준 남은 날
export const getDaysUntil = (dateKey: string, today: Date) =>
  Math.round(
    (parseDateKey(dateKey).getTime() - startOfDay(today).getTime()) / DAY_MS,
  );

// "D-2", "D-DAY" (지난 D-day는 자동으로 지워져서 D+는 없음)
export const formatDdayLabel = (days: number) =>
  days === 0 ? "D-DAY" : `D-${days}`;

// "10월 23일(금)"
export const formatDdayDate = (dateKey: string) => {
  const date = parseDateKey(dateKey);
  return `${date.getMonth() + 1}월 ${date.getDate()}일(${WEEKDAY_LABELS[date.getDay()]})`;
};
