/**
 * 일정 도메인 타입. 기능명세서(docs/functional_spec/clendar) 기준.
 * - 학사일정 / 수행평가 / 생일은 각각 "조회 대상 월"로 따로 조회되는 하위 일정이다.
 * - 날짜는 'YYYY-MM-DD' 문자열(로컬 날짜)로 보관한다. 단일 일정은 startDate === endDate.
 * - 서버 응답 필드명은 API 명세가 없어 추정이다 (확인 필요).
 */
export type ScheduleCategory = "ACADEMIC" | "ASSESSMENT" | "BIRTHDAY";

interface ScheduleBase {
  id: string;
  category: ScheduleCategory;
  startDate: string;
  endDate: string;
}

/** 학사일정 조회 출력: 날짜별 일정 이름 */
export interface AcademicSchedule extends ScheduleBase {
  category: "ACADEMIC";
  title: string;
}

/** 수행평가 일정 조회 출력: 날짜에 따른 수행평가 이름 */
export interface AssessmentSchedule extends ScheduleBase {
  category: "ASSESSMENT";
  title: string;
}

/** 전교생 생일 조회 출력: 날짜에 따른 생일자의 이름과 학번. 항상 하루짜리 일정이다. */
export interface BirthdaySchedule extends ScheduleBase {
  category: "BIRTHDAY";
  name: string;
  studentNumber: string;
}

export type Schedule = AcademicSchedule | AssessmentSchedule | BirthdaySchedule;
