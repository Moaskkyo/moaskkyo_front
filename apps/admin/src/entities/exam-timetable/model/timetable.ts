export const exams = [
  {
    id: "2026-2-midterm",
    name: "2026학년도 2학기 중간고사",
    dates: ["10월 28일 (수)", "10월 29일 (목)", "10월 30일 (금)"],
  },
  {
    id: "2026-2-final",
    name: "2026년 2학기 기말고사",
    dates: ["12월 7일 (월)", "12월 8일 (화)", "12월 9일 (수)"],
  },
] as const;

export const grades = ["1", "2", "3"] as const;
export const classNumbers = ["1", "2", "3"] as const;
export const periods = [1, 2, 3, 4] as const;

export type ExamId = (typeof exams)[number]["id"];
export type Grade = (typeof grades)[number];
export type ClassNumber = (typeof classNumbers)[number];
export type Timetable = string[][];

const sampleTimetable: Timetable = [
  ["국어", "수학", "영어"],
  ["통합사회", "통합과학", "한국사"],
  ["정보", "프로그래밍", "자습"],
  ["자습", "자습", "자습"],
];

function storageKey(exam: ExamId, grade: Grade, classNumber: ClassNumber) {
  return `moaskkyo.exam-timetable.${exam}.${grade}.${classNumber}`;
}

function isTimetable(value: unknown, dateCount: number): value is Timetable {
  return Array.isArray(value) && value.length === periods.length &&
    value.every((row) => Array.isArray(row) && row.length === dateCount &&
      row.every((subject: unknown) => typeof subject === "string"));
}

function getTimetable(exam: ExamId, grade: Grade, classNumber: ClassNumber) {
  try {
    const saved: unknown = JSON.parse(localStorage.getItem(storageKey(exam, grade, classNumber)) ?? "null");
    const dateCount = exams.find(({ id }) => id === exam)?.dates.length ?? 0;
    if (isTimetable(saved, dateCount)) return saved;
  } catch {
    // Use the sample timetable when browser storage is unavailable or invalid.
  }
  return sampleTimetable;
}

export function getClassTimetables(exam: ExamId, grade: Grade, classNumber: ClassNumber | "all") {
  const selectedClasses = classNumber === "all" ? classNumbers : [classNumber];
  return selectedClasses.map((selectedClass) => getTimetable(exam, grade, selectedClass));
}

export function saveTimetable(exam: ExamId, grade: Grade, classNumber: ClassNumber, timetable: Timetable) {
  localStorage.setItem(storageKey(exam, grade, classNumber), JSON.stringify(timetable));
}
