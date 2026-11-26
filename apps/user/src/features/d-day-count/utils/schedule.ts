import { WEEKDAY_LABELS, startOfDay } from "@/shared/lib/date";
import type {
  ScheduleEvent,
  ScheduleKind,
  SchoolScheduleRow,
} from "../model/types";

const DAY_MS = 24 * 60 * 60 * 1000;

export const toYmd = (date: Date) =>
  `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, "0")}${String(date.getDate()).padStart(2, "0")}`;

const fromYmd = (ymd: string) =>
  new Date(
    Number(ymd.slice(0, 4)),
    Number(ymd.slice(4, 6)) - 1,
    Number(ymd.slice(6, 8)),
  );

const KEYWORDS: Record<ScheduleKind, { include: string[]; exclude: string[] }> =
  {
    EXAM: {
      include: ["고사", "지필", "시험"],
      exclude: ["수능", "수학능력", "모의", "검정", "재시험", "진단", "연수"],
    },
    VACATION: {
      include: ["방학"],
      exclude: ["방과후"],
    },
  };

const isKind = (kind: ScheduleKind, eventName: string) => {
  const { include, exclude } = KEYWORDS[kind];
  return (
    include.some((word) => eventName.includes(word)) &&
    !exclude.some((word) => eventName.includes(word))
  );
};

const GRADE_FIELDS: Record<number, keyof SchoolScheduleRow> = {
  1: "ONE_GRADE_EVENT_YN",
  2: "TW_GRADE_EVENT_YN",
  3: "THREE_GRADE_EVENT_YN",
};

const GRADE_MARK = /\(([\d\s,.]+)(?:학년|년)?\)/;

const isForGrade = (row: SchoolScheduleRow, grade: number | null) => {
  if (grade === null) return true;
  const mark = GRADE_MARK.exec(row.EVENT_NM);
  if (mark) return mark[1].includes(String(grade));
  return row[GRADE_FIELDS[grade]] === "Y";
};

const VACATION_GAP_DAYS = 7;

const SEASON_VACATION = /(여름|하계|겨울|동계|봄|학년말|학년도말)\s*방학/;

const toVacationName = (names: string[]) =>
  names.find((name) => !name.includes("식") && !name.includes("선언")) ??
  names.map((name) => SEASON_VACATION.exec(name)?.[0]).find(Boolean) ??
  "방학";

export const findNextEvent = (
  rows: SchoolScheduleRow[],
  kind: ScheduleKind,
  today: Date,
  grade: number | null,
): ScheduleEvent | null => {
  const todayStart = startOfDay(today);
  const events = rows
    .filter((row) => isKind(kind, row.EVENT_NM))
    .filter((row) => kind !== "EXAM" || isForGrade(row, grade))
    .map((row) => ({ name: row.EVENT_NM, date: fromYmd(row.AA_YMD) }))
    .sort((a, b) => a.date.getTime() - b.date.getTime());

  if (kind === "EXAM") {
    return events.find((event) => event.date >= todayStart) ?? null;
  }

  const periods: ScheduleEvent[][] = [];
  events.forEach((event, index) => {
    const isNewPeriod =
      index === 0 ||
      getDaysUntil(event.date, events[index - 1].date) > VACATION_GAP_DAYS;
    if (isNewPeriod) periods.push([event]);
    else periods[periods.length - 1].push(event);
  });

  const next = periods.find((period) => period[0].date >= todayStart);
  if (!next) return null;

  return {
    name: toVacationName(next.map((event) => event.name)),
    date: next[0].date,
  };
};

export const getDaysUntil = (date: Date, today: Date) =>
  Math.round((date.getTime() - startOfDay(today).getTime()) / DAY_MS);

export const formatMonthDay = (date: Date) =>
  `${date.getMonth() + 1}월 ${date.getDate()}일(${WEEKDAY_LABELS[date.getDay()]})`;

export const formatFullDate = (date: Date) =>
  `${date.getFullYear()}. ${date.getMonth() + 1}. ${date.getDate()}.(${WEEKDAY_LABELS[date.getDay()]})`;
