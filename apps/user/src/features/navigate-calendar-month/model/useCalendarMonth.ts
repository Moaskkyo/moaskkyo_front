import { useCallback, useState } from "react";
import { addMonths, startOfMonth } from "@/shared/lib/date";

/** 달력이 보여주는 월(해당 월 1일) 상태. */
export function useCalendarMonth(initialDate: Date) {
  const [viewMonth, setViewMonth] = useState(() => startOfMonth(initialDate));

  const goToPreviousMonth = useCallback(() => {
    setViewMonth((current) => addMonths(current, -1));
  }, []);

  const goToNextMonth = useCallback(() => {
    setViewMonth((current) => addMonths(current, 1));
  }, []);

  const goToMonthOf = useCallback((date: Date) => {
    setViewMonth(startOfMonth(date));
  }, []);

  return { viewMonth, goToPreviousMonth, goToNextMonth, goToMonthOf };
}
