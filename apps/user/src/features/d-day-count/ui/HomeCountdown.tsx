import styled from "@emotion/styled";
import { colors } from "@/shared/styles/colors";
import { useCountdowns } from "../api/useCountdowns";
import { useServerNow } from "../model/useServerNow";
import { formatRemaining, isSameKstDay, toKstParts } from "../utils/countdown";
import DdayBlockLayout from "./DdayBlockLayout";

const BLOCK_SIZE = { width: 652, height: 264 };

export default function HomeCountdown() {
  const { data, isError } = useCountdowns();
  const now = useServerNow(data?.offset ?? 0);

  const home = data?.countdowns?.find((item) => item.type === "HOME");

  if (!home) {
    const status =
      isError || data ? "불러오지 못했습니다" : "불러오는 중입니다...";
    return (
      <DdayBlockLayout
        title="하교"
        {...BLOCK_SIZE}
        text={`오늘 하교 시간 : ${status}`}
        time={<Status>{status}</Status>}
      />
    );
  }

  const targetMs = Date.parse(home.targetAt);
  const { month, day, hour, minute } = toKstParts(targetMs);
  const dayLabel = isSameKstDay(targetMs, now) ? "오늘" : `${month}월 ${day}일`;
  const remainingMs = targetMs - now;

  return (
    <DdayBlockLayout
      title={home.title}
      {...BLOCK_SIZE}
      text={`${dayLabel} ${home.title} 시간 ${hour}:${minute}`}
      background={remainingMs > 0 ? undefined : colors.primarySoft}
      time={
        remainingMs > 0 ? (
          formatRemaining(remainingMs)
        ) : (
          <Status>오늘 하교가 끝났어요</Status>
        )
      }
    />
  );
}

const Status = styled.span`
  display: block;
  font-size: 48px;
`;
