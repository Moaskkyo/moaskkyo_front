import styled from "@emotion/styled";
import { useMemo } from "react";
import type { Schedule } from "@/entities/schedule";
import { getMonthWeeks, WEEKDAY_LABELS } from "@/shared/lib/date";
import { colors } from "@/shared/styles/colors";
import CalendarWeekRow from "@/widgets/calendar-month/ui/CalendarWeekRow";

interface CalendarMonthProps {
  /** 보여줄 월. 어느 날짜든 그 달의 그리드를 그린다. */
  monthDate: Date;
  today: Date;
  selectedDate: Date | null;
  schedules: Schedule[];
  onSelectDate: (date: Date) => void;
  /** 특정 일정 클릭(상세 내용 조회). 상세가 있는 일정에만 연결된다. */
  onSelectSchedule?: (schedule: Schedule) => void;
}

const SUNDAY_INDEX = 0;
const SATURDAY_INDEX = 6;

export default function CalendarMonth({
  monthDate,
  today,
  selectedDate,
  schedules,
  onSelectDate,
  onSelectSchedule,
}: CalendarMonthProps) {
  const weeks = useMemo(() => getMonthWeeks(monthDate), [monthDate]);

  return (
    <Wrapper>
      <WeekdayHeader>
        {WEEKDAY_LABELS.map((label, index) => (
          <WeekdayLabel
            key={label}
            $isSunday={index === SUNDAY_INDEX}
            $isSaturday={index === SATURDAY_INDEX}
          >
            {label}
          </WeekdayLabel>
        ))}
      </WeekdayHeader>
      <Grid>
        {weeks.map((weekDates) => (
          <CalendarWeekRow
            key={weekDates[0].getTime()}
            weekDates={weekDates}
            monthDate={monthDate}
            today={today}
            selectedDate={selectedDate}
            schedules={schedules}
            onSelectDate={onSelectDate}
            onSelectSchedule={onSelectSchedule}
          />
        ))}
      </Grid>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  padding: 14px;
  background-color: ${colors.surface};
  border: 1px solid ${colors.border};
  border-radius: 16px;
`;

const WeekdayHeader = styled.div`
  display: grid;
  grid-template-columns: repeat(7, minmax(0, 1fr));
  height: 40px;
  align-items: center;
`;

const WeekdayLabel = styled.div<{ $isSunday: boolean; $isSaturday: boolean }>`
  text-align: center;
  color: ${({ $isSunday, $isSaturday }) => {
    if ($isSunday) return colors.sunday;
    if ($isSaturday) return colors.primary;
    return colors.textMuted;
  }};
  font-size: 14px;
  font-weight: 500;
`;

const Grid = styled.div`
  display: grid;
  grid-auto-rows: minmax(104px, 1fr);
  flex: 1;
  border-top: 1px solid ${colors.border};
  border-left: 1px solid ${colors.border};
`;
