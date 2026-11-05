import styled from "@emotion/styled";
import { useMemo } from "react";
import { ScheduleChip, type Schedule } from "../../../entities/schedule";
import { isSameDay, isSameMonth } from "../../../shared/lib/date";
import { buildWeekSegments } from "../model/buildWeekSegments";
import CalendarDayCell from "./CalendarDayCell";

interface CalendarWeekRowProps {
  weekDates: Date[];
  monthDate: Date;
  today: Date;
  selectedDate: Date | null;
  schedules: Schedule[];
  onSelectDate: (date: Date) => void;
}

const DAY_NUMBER_ROW_HEIGHT = 36;
const LANE_HEIGHT = 24;

/**
 * 한 주를 하나의 CSS Grid로 그린다.
 * 날짜 셀은 모든 행을 차지해 배경·테두리·클릭을 맡고, 일정 구간은 그 위 줄(lane)에 열 범위로 얹힌다.
 * 오버레이 없이 같은 그리드를 쓰므로 셀과 다일 바의 열이 항상 정확히 맞는다.
 */
export default function CalendarWeekRow({
  weekDates,
  monthDate,
  today,
  selectedDate,
  schedules,
  onSelectDate,
}: CalendarWeekRowProps) {
  const { segments, laneCount } = useMemo(
    () => buildWeekSegments(weekDates, schedules),
    [weekDates, schedules],
  );

  return (
    <Wrapper $laneCount={laneCount}>
      {weekDates.map((date, index) => (
        <CalendarDayCell
          key={date.getTime()}
          date={date}
          column={index + 1}
          isOutsideMonth={!isSameMonth(date, monthDate)}
          isToday={isSameDay(date, today)}
          isSelected={selectedDate !== null && isSameDay(date, selectedDate)}
          onSelect={onSelectDate}
        />
      ))}
      {segments.map((segment) => (
        <Segment
          key={`${segment.schedule.id}-${segment.startCol}`}
          $lane={segment.lane}
          $startCol={segment.startCol}
          $endCol={segment.endCol}
          $isStart={segment.isStart}
          $isEnd={segment.isEnd}
        >
          <ScheduleChip
            schedule={segment.schedule}
            isStart={segment.isStart}
            isEnd={segment.isEnd}
          />
        </Segment>
      ))}
    </Wrapper>
  );
}

const Wrapper = styled.div<{ $laneCount: number }>`
  display: grid;
  grid-template-columns: repeat(7, minmax(0, 1fr));
  grid-template-rows: ${({ $laneCount }) =>
    `${DAY_NUMBER_ROW_HEIGHT}px repeat(${$laneCount}, ${LANE_HEIGHT}px) minmax(8px, 1fr)`};
  min-height: 104px;
`;

const Segment = styled.div<{
  $lane: number;
  $startCol: number;
  $endCol: number;
  $isStart: boolean;
  $isEnd: boolean;
}>`
  grid-row: ${({ $lane }) => $lane + 2};
  grid-column: ${({ $startCol, $endCol }) => `${$startCol + 1} / ${$endCol + 2}`};
  min-width: 0;
  padding-left: ${({ $isStart }) => ($isStart ? "6px" : "0")};
  padding-right: ${({ $isEnd }) => ($isEnd ? "6px" : "0")};
  pointer-events: none;
`;
