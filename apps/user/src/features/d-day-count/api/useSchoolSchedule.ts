import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { addDays, startOfDay } from "@/shared/lib/date";
import { toYmd } from "../utils/schedule";
import getSchoolSchedule from "./getSchoolSchedule";

const PAST_DAYS = 90;
const FUTURE_DAYS = 365;

export const useSchoolSchedule = (today: Date) => {
  const from = toYmd(addDays(startOfDay(today), -PAST_DAYS));
  const to = toYmd(addDays(startOfDay(today), FUTURE_DAYS));

  return useQuery({
    queryKey: ["schoolSchedule", from, to],
    queryFn: () => getSchoolSchedule(from, to),
    staleTime: 1000 * 60 * 60,
    retry: 1,
    placeholderData: keepPreviousData,
  });
};
