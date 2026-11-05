import { startOfMonth, toDateKey } from "../../../shared/lib/date";
import type { AcademicSchedule, AssessmentSchedule, BirthdaySchedule } from "./types";

/**
 * 퍼블리싱 확인용 mock. 명세의 하위 조회 3종(학사일정 / 수행평가 / 생일)이
 * 각각 "조회 대상 월"로 따로 조회되므로 카테고리별 배열로 둔다. API 연동 시 각 조회 결과로 교체한다.
 * 항상 데이터가 보이도록 현재 월 기준으로 배치한다(모든 일이 28 이하라 어떤 달에도 존재).
 */
const baseMonth = startOfMonth(new Date());

function dayOfCurrentMonth(day: number): string {
  return toDateKey(new Date(baseMonth.getFullYear(), baseMonth.getMonth(), day));
}

function dayOfNextMonth(day: number): string {
  return toDateKey(new Date(baseMonth.getFullYear(), baseMonth.getMonth() + 1, day));
}

function academic(id: string, title: string, startDay: number, endDay = startDay): AcademicSchedule {
  return {
    id,
    category: "ACADEMIC",
    title,
    startDate: dayOfCurrentMonth(startDay),
    endDate: dayOfCurrentMonth(endDay),
  };
}

function assessment(id: string, title: string, day: number): AssessmentSchedule {
  const date = dayOfCurrentMonth(day);
  return { id, category: "ASSESSMENT", title, startDate: date, endDate: date };
}

function birthday(id: string, name: string, studentNumber: string, day: number): BirthdaySchedule {
  const date = dayOfCurrentMonth(day);
  return { id, category: "BIRTHDAY", name, studentNumber, startDate: date, endDate: date };
}

export const mockAcademicSchedules: AcademicSchedule[] = [
  academic("aca-01", "개천절", 3),
  academic("aca-02", "체육대회", 8),
  academic("aca-03", "한글날", 9),
  academic("aca-04", "학부모 상담", 15),
  academic("aca-05", "중간고사 대비 학습 안내", 16),
  academic("aca-06", "중간고사", 21, 23),
  {
    id: "aca-07",
    category: "ACADEMIC",
    title: "수학여행",
    startDate: dayOfCurrentMonth(28),
    endDate: dayOfNextMonth(3),
  },
];

export const mockAssessmentSchedules: AssessmentSchedule[] = [
  assessment("ass-01", "과학 보고서", 7),
  assessment("ass-02", "영어 에세이", 13),
  assessment("ass-03", "확률 보고서", 19),
  assessment("ass-04", "국어 발표", 20),
  assessment("ass-05", "정보 프로젝트", 28),
];

export const mockBirthdaySchedules: BirthdaySchedule[] = [
  birthday("bir-01", "한지민", "2315", 6),
  birthday("bir-02", "남궁민수", "1207", 20),
  birthday("bir-03", "최우", "3102", 27),
];
