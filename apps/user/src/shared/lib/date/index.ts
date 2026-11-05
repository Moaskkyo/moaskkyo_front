/**
 * 네이티브 Date 기반 날짜 유틸.
 * 날짜 키('YYYY-MM-DD')는 로컬 날짜 기준이며 시간 정보를 갖지 않는다.
 */

export const WEEKDAY_LABELS = ["일", "월", "화", "수", "목", "금", "토"] as const;

const WEEKDAY_FULL_LABELS = [
  "일요일",
  "월요일",
  "화요일",
  "수요일",
  "목요일",
  "금요일",
  "토요일",
] as const;

const DATE_KEY_PATTERN = /^(\d{4})-(\d{2})-(\d{2})$/;

export const DAYS_PER_WEEK = 7;

export function toDateKey(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

/** 'YYYY-MM-DD' 형식과 실제 존재하는 날짜인지 검증한 뒤 로컬 자정 Date를 돌려준다. */
export function parseDateKey(key: string): Date {
  const match = DATE_KEY_PATTERN.exec(key);
  if (!match) {
    throw new Error(`잘못된 날짜 형식입니다 (YYYY-MM-DD 필요): ${key}`);
  }

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const date = new Date(year, month - 1, day);

  const isValid =
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day;
  if (!isValid) {
    throw new Error(`존재하지 않는 날짜입니다: ${key}`);
  }

  return date;
}

export function startOfDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

export function startOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

export function addDays(date: Date, amount: number): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + amount);
}

/** 월 이동용. 결과는 항상 해당 월의 1일이다. */
export function addMonths(date: Date, amount: number): Date {
  return new Date(date.getFullYear(), date.getMonth() + amount, 1);
}

export function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export function isSameMonth(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth();
}

/** 해당 월의 마지막 날짜(28~31). */
export function getDaysInMonth(date: Date): number {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
}

/**
 * 일요일 시작의 월간 그리드 날짜 배열(주 수 x 7).
 * 해당 월의 날짜가 하나라도 포함된 주까지만 만들므로 주 수는 4~6 사이다.
 */
export function getMonthWeeks(monthDate: Date): Date[][] {
  const firstDay = startOfMonth(monthDate);
  const gridStart = addDays(firstDay, -firstDay.getDay());
  const weekCount = Math.ceil((firstDay.getDay() + getDaysInMonth(firstDay)) / DAYS_PER_WEEK);

  return Array.from({ length: weekCount }, (_, weekIndex) =>
    Array.from({ length: DAYS_PER_WEEK }, (_, dayIndex) =>
      addDays(gridStart, weekIndex * DAYS_PER_WEEK + dayIndex),
    ),
  );
}

/** 예: 2026년 10월 */
export function formatMonthTitle(date: Date): string {
  return `${date.getFullYear()}년 ${date.getMonth() + 1}월`;
}

/** 예: 10월 28일 수요일 */
export function formatDayTitle(date: Date): string {
  return `${date.getMonth() + 1}월 ${date.getDate()}일 ${WEEKDAY_FULL_LABELS[date.getDay()]}`;
}

/** 예: 10/28 */
export function formatShortDate(date: Date): string {
  return `${date.getMonth() + 1}/${date.getDate()}`;
}
