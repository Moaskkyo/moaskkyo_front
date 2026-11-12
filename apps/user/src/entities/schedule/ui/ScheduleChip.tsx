import styled from "@emotion/styled";
import { SCHEDULE_CATEGORY_CONFIG } from "@/entities/schedule/model/category";
import {
  getScheduleChipLabel,
  getScheduleTitle,
} from "@/entities/schedule/model/lib";
import type { Schedule } from "@/entities/schedule/model/types";

interface ScheduleChipProps {
  schedule: Schedule;
  /** 이 칩이 일정의 시작일을 포함하면 왼쪽 모서리를 둥글게 처리한다. */
  isStart?: boolean;
  /** 이 칩이 일정의 종료일을 포함하면 오른쪽 모서리를 둥글게 처리한다. */
  isEnd?: boolean;
  /** 주어지면 버튼으로 렌더해 "특정 일정 클릭"을 받는다. */
  onClick?: (schedule: Schedule) => void;
}

export default function ScheduleChip({
  schedule,
  isStart = true,
  isEnd = true,
  onClick,
}: ScheduleChipProps) {
  const config = SCHEDULE_CATEGORY_CONFIG[schedule.category];
  const title = getScheduleTitle(schedule);
  const styleProps = {
    $text: config.text,
    $background: config.background,
    $isStart: isStart,
    $isEnd: isEnd,
  };

  if (onClick) {
    return (
      <ChipButton
        type="button"
        title={title}
        aria-label={`${title} 상세 보기`}
        onClick={() => onClick(schedule)}
        {...styleProps}
      >
        {getScheduleChipLabel(schedule)}
      </ChipButton>
    );
  }

  return (
    <Wrapper title={title} {...styleProps}>
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

const ChipButton = styled(Wrapper.withComponent("button"))`
  display: block;
  width: 100%;
  margin: 0;
  border: none;
  font-family: inherit;
  text-align: left;
  cursor: pointer;
  pointer-events: auto;

  &:hover {
    filter: brightness(0.96);
  }

  &:focus-visible {
    outline: 2px solid currentColor;
    outline-offset: 1px;
  }
`;
