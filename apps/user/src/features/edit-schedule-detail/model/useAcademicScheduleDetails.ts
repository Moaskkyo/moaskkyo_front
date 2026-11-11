import { useCallback, useState } from "react";
import type { AcademicSchedule } from "@/entities/schedule";

/**
 * 학사일정 상세 내용 등록/수정/삭제의 로컬 상태.
 * API 명세가 없어 mock 배열을 상태로 들고 있으며, 연동 시 mutation(등록/수정/삭제)과 재조회로 교체한다.
 * 명세: 등록·수정 후 바로 조회로 돌아간다.
 */
export function useAcademicScheduleDetails(initialSchedules: AcademicSchedule[]) {
  const [academicSchedules, setAcademicSchedules] = useState(initialSchedules);

  const saveDetail = useCallback((scheduleId: string, detail: string) => {
    setAcademicSchedules((current) =>
      current.map((schedule) =>
        schedule.id === scheduleId ? { ...schedule, detail } : schedule,
      ),
    );
  }, []);

  const deleteDetail = useCallback((scheduleId: string) => {
    setAcademicSchedules((current) =>
      current.map((schedule) =>
        schedule.id === scheduleId ? { ...schedule, detail: null } : schedule,
      ),
    );
  }, []);

  return { academicSchedules, saveDetail, deleteDetail };
}
