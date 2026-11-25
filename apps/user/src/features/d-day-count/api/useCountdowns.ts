import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { getMsUntilKstMidnight, getRemainingMs } from "../utils/countdown";
import getCountdowns from "./getCountdowns";

const MIDNIGHT_BUFFER_MS = 5000;

export const useCountdowns = () => {
  const query = useQuery({
    queryKey: ["countdowns"],
    queryFn: async () => {
      const data = await getCountdowns();
      // 기기 시계와 서버 시계의 차이. 서버 현재 시각 = 기기 시각 + offset
      return { ...data, offset: Date.parse(data.serverNow) - Date.now() };
    },
    // 처음 요청 + 재시도 1번, 최대 2번까지만 요청
    retry: 1,
  });

  const { data, dataUpdatedAt, refetch } = query;
  const offset = data?.offset ?? 0;
  const targetAt = data?.countdowns?.find(
    (item) => item.type === "HOME",
  )?.targetAt;

  // 하교 시간이 되는 순간 한 번 다시 받아옴 (이미 지난 시각이면 예약하지 않음)
  useEffect(() => {
    if (!targetAt) return;
    const remainingMs = getRemainingMs(targetAt, offset);
    if (remainingMs <= 0) return;

    const timer = setTimeout(() => refetch(), remainingMs);
    return () => clearTimeout(timer);
  }, [targetAt, offset, refetch]);

  // 밤 12시(KST)가 지나면 새 하교 시간을 받아옴. 받아올 때마다 다음 자정으로 다시 예약
  // serverNow가 초 단위라 offset이 최대 1초 어긋날 수 있어, 자정 직전으로 계산돼 연달아 요청하지 않도록 5초 여유를 둠
  // 응답에 serverNow가 없으면 offset이 NaN → setTimeout이 바로 실행돼 요청이 무한 반복되므로 막음
  useEffect(() => {
    if (!dataUpdatedAt || !Number.isFinite(offset)) return;
    const delay = getMsUntilKstMidnight(offset) + MIDNIGHT_BUFFER_MS;
    const timer = setTimeout(() => refetch(), delay);
    return () => clearTimeout(timer);
  }, [dataUpdatedAt, offset, refetch]);

  return query;
};
