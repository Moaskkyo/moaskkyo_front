export interface Assessment {
  id: string;
  title: string;
  subject: string;
  dueDate: string;
  grade: string;
  classNumber: string;
  description: string;
}

export const subjects = ["국어", "수학", "영어", "사회", "과학", "정보"];
export const grades = ["1", "2", "3"];
export const classes = ["1", "2", "3"];

export function assessmentTarget({ grade, classNumber }: Assessment) {
  return `${grade}학년 ${classNumber ? `${classNumber}반` : "전체"}`;
}

export const mockAssessments: Assessment[] = [
  ["독서 감상문 제출", "국어", "02", "1", ""],
  ["수학 탐구 보고서", "수학", "03", "2", ""],
  ["영어 발표", "영어", "04", "1", ""],
  ["사회 이슈 분석", "사회", "05", "3", ""],
  ["과학 실험 보고서", "과학", "06", "2", ""],
  ["프로그래밍 과제", "정보", "09", "1", ""],
  ["문학 작품 분석", "국어", "10", "1", "2"],
  ["토론 발표", "국어", "11", "1", "3"],
  ["매체 비평", "국어", "12", "1", "1"],
  ["독서 포트폴리오", "국어", "13", "1", "2"],
  ["문법 탐구 보고서", "국어", "16", "1", "3"],
  ["영어 에세이", "영어", "17", "3", "1"],
].map(([title, subject, day, grade, classNumber], index) => ({
  id: String(index + 1), title, subject, dueDate: `2026-11-${day}`, grade, classNumber,
  description: index === 0 ? "지정 도서를 읽고 감상문을 작성해 제출해 주세요.\n분량: A4 2쪽 / 제출: 온라인 과제함" : "",
}));
