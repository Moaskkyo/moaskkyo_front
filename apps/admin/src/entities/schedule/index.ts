export interface AcademicSchedule {
  id: string;
  date: string;
  title: string;
  memo: string;
}

export const initialSchedules: AcademicSchedule[] = [
  { id: "midterm", date: "2026-10-12", title: "중간고사", memo: "" },
  { id: "counseling", date: "2026-10-19", title: "진로 상담", memo: "" },
  { id: "lecture", date: "2026-10-27", title: "진로 특강", memo: "진로 특강은 강당에서 진행됩니다.\n시작 10분 전까지 입실해 주세요." },
  { id: "club", date: "2026-10-28", title: "동아리 발표회", memo: "" },
  { id: "trip", date: "2026-10-30", title: "현장체험학습", memo: "" },
];
