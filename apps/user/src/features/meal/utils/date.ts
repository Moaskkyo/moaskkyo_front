import type { OtherMonth } from "../model/type";

// Date 객체를 YYYYMMDD 형식으로 변환
export const toApiDate = (date: Date) =>
  `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, "0")}${String(date.getDate()).padStart(2, "0")}`;

export const toDisplayDate = (date: Date) =>
  date.toLocaleDateString("ko-KR", {
    month: "long",
    day: "numeric",
    weekday: "long",
  });

const WEEKDAYS = ["일", "월", "화", "수", "목", "금", "토"];

// 2026-10-19 → "10월 19일"
export const toShortDate = (date: Date) =>
  `${date.getMonth() + 1}월 ${date.getDate()}일`;

// 2026-10-19 → "10월 19일 (월)"
export const toDayLabel = (date: Date) =>
  `${toShortDate(date)} (${WEEKDAYS[date.getDay()]})`;

export const isSameDay = (a: Date, b: Date) => toApiDate(a) === toApiDate(b);

export const addDays = (date: Date, days: number) => {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
};

// date가 속한 주의 월~금
export const getWeekDays = (date: Date) => {
  const day = date.getDay();
  const monday = addDays(date, day === 0 ? -6 : 1 - day);
  return [0, 1, 2, 3, 4].map((offset) => addDays(monday, offset));
};

export const isWeekend = (date: Date) =>
  date.getDay() === 0 || date.getDay() === 6;

const WEEK_MS = 7 * 24 * 60 * 60 * 1000;

// 기준일이 속한 주와 비교해 몇 주 차이인지 → "이번 주", "다음 주", "지난 주", "2주 후"
export const toWeekLabel = (date: Date, base: Date) => {
  const offset = Math.round(
    (getWeekDays(date)[0].getTime() - getWeekDays(base)[0].getTime()) / WEEK_MS,
  );

  if (offset === 0) return "이번 주";
  if (offset === 1) return "다음 주";
  if (offset === -1) return "지난 주";
  return offset > 0 ? `${offset}주 후` : `${-offset}주 전`;
};

// 2026-10 → "2026년 10월"
export const toMonthTitle = (date: Date) =>
  `${date.getFullYear()}년 ${date.getMonth() + 1}월`;

export const getMonthStart = (date: Date) =>
  new Date(date.getFullYear(), date.getMonth(), 1);

export const getMonthEnd = (date: Date) =>
  new Date(date.getFullYear(), date.getMonth() + 1, 0);

export const addMonths = (date: Date, months: number) =>
  new Date(date.getFullYear(), date.getMonth() + months, 1);

export const getMonthWeekdays = (date: Date) => {
  const first = getMonthStart(date);
  const last = getMonthEnd(date);
  const days: Date[] = [];

  let monday = getWeekDays(isWeekend(first) ? addDays(first, 2) : first)[0];
  for (; monday <= last; monday = addDays(monday, 7)) {
    days.push(...getWeekDays(monday));
  }

  return days;
};

// 기준일이 속한 달과 비교 → "이번 달", "다음 달", "지난 달", "2달 후"
export const toMonthLabel = (date: Date, base: Date) => {
  const offset =
    (date.getFullYear() - base.getFullYear()) * 12 +
    (date.getMonth() - base.getMonth());

  if (offset === 0) return "이번 달";
  if (offset === 1) return "다음 달";
  if (offset === -1) return "지난 달";
  return offset > 0 ? `${offset}달 후` : `${-offset}달 전`;
};

// 보고 있는 달이 아닌 칸이면 지난달/다음달 표시
export const getOtherMonth = (
  day: Date,
  month: Date,
): OtherMonth | undefined => {
  if (day.getMonth() === month.getMonth()) return undefined;
  return day < month ? "지난달" : "다음달";
};
