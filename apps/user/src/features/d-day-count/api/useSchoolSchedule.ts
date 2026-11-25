import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { addDays, startOfDay } from "@/shared/lib/date";
import { toYmd } from "../utils/schedule";
import getSchoolSchedule from "./getSchoolSchedule";

export const useSchoolSchedule = (today: Date) => {
  const from = toYmd(startOfDay(today));
  const to = toYmd(addDays(startOfDay(today), 365));

  return useQuery({
    queryKey: ["schoolSchedule", from, to],
    queryFn: () => getSchoolSchedule(from, to),
    staleTime: 1000 * 60 * 60,
    retry: 1,
    placeholderData: keepPreviousData,
  });
};
