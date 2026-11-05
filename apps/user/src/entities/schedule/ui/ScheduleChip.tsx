import styled from "@emotion/styled";
import { SCHEDULE_CATEGORY_CONFIG } from "../model/category";
import { getScheduleChipLabel, getScheduleTitle } from "../model/lib";
import type { Schedule } from "../model/types";

interface ScheduleChipProps {
  schedule: Schedule;
  /** 이 칩이 일정의 시작일을 포함하면 왼쪽 모서리를 둥글게 처리한다. */
  isStart?: boolean;
  /** 이 칩이 일정의 종료일을 포함하면 오른쪽 모서리를 둥글게 처리한다. */
  isEnd?: boolean;
}

export default function ScheduleChip({
  schedule,
  isStart = true,
  isEnd = true,
}: ScheduleChipProps) {
  const config = SCHEDULE_CATEGORY_CONFIG[schedule.category];

  return (
    <Wrapper
      title={getScheduleTitle(schedule)}
      $text={config.text}
      $background={config.background}
      $isStart={isStart}
      $isEnd={isEnd}
    >
      {getScheduleChipLabel(schedule)}
    </Wrapper>
  );
}

const Wrapper = styled.div<{
  $text: string;
  $background: string;
  $isStart: boolean;
  $isEnd: boolean;
}>`
  height: 20px;
  padding: 0 6px;
  color: ${({ $text }) => $text};
  background-color: ${({ $background }) => $background};
  border-radius: ${({ $isStart, $isEnd }) =>
    `${$isStart ? "4px" : "0"} ${$isEnd ? "4px" : "0"} ${$isEnd ? "4px" : "0"} ${$isStart ? "4px" : "0"}`};
  font-size: 12px;
  font-weight: 500;
  line-height: 20px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
