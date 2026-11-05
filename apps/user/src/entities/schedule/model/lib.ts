import { toDateKey } from "../../../shared/lib/date";
import type { Schedule } from "./types";

/** 생일 칩은 이름 3자까지만 보이고 나머지(이름 뒷부분, 학번)는 생략한다. (명세: 김김김…) */
const BIRTHDAY_NAME_VISIBLE_LENGTH = 3;

export function isMultiDaySchedule(schedule: Schedule): boolean {
  return schedule.startDate !== schedule.endDate;
}

/** 'YYYY-MM-DD' 키는 자릿수가 고정돼 문자열 비교로 날짜 순서를 판정할 수 있다. */
export function includesDate(schedule: Schedule, date: Date): boolean {
  const key = toDateKey(date);
  return schedule.startDate <= key && key <= schedule.endDate;
}

export function getSchedulesOnDate(schedules: Schedule[], date: Date): Schedule[] {
  return schedules.filter((schedule) => includesDate(schedule, date));
}

/** 상세 패널 등 전체 제목. 생일은 "이름 학번". */
export function getScheduleTitle(schedule: Schedule): string {
  if (schedule.category === "BIRTHDAY") {
    return `${schedule.name} ${schedule.studentNumber}`;
  }
  return schedule.title;
}

/** 달력 칩 라벨. 생일은 이름 3자 + 생략 기호, 나머지는 제목(길면 CSS 말줄임). */
export function getScheduleChipLabel(schedule: Schedule): string {
  if (schedule.category === "BIRTHDAY") {
    return `${schedule.name.slice(0, BIRTHDAY_NAME_VISIBLE_LENGTH)}…`;
  }
  return schedule.title;
}
