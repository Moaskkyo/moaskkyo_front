export interface Countdown {
  type: "HOME";
  title: string;
  targetAt: string;
}

export interface CountdownsResponse {
  serverNow: string;
  countdowns: Countdown[];
}

export interface SchoolScheduleRow {
  AA_YMD: string;
  EVENT_NM: string;
  ONE_GRADE_EVENT_YN: string;
  TW_GRADE_EVENT_YN: string;
  THREE_GRADE_EVENT_YN: string;
}

export interface NeisResult {
  CODE: string;
  MESSAGE: string;
}

export interface SchoolScheduleResponse {
  SchoolSchedule?: {
    head?: unknown[];
    row?: SchoolScheduleRow[];
  }[];
  RESULT?: NeisResult;
}

export type ScheduleKind = "EXAM" | "VACATION";

export interface ScheduleEvent {
  name: string;
  date: Date;
}
