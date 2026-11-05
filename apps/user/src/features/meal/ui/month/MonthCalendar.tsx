import styled from "@emotion/styled";
import { WEEKDAY_NAMES, type Dish } from "../../model/type";
import { getCurrentLabel, type CurrentMeal } from "../../utils/mealTime";
import { getMonthWeekdays, getOtherMonth, toApiDate } from "../../utils/date";
import MonthDay from "./MonthDay";

interface MonthCalendarProps {
  month: Date;
  dishesByDate: Record<string, Dish[]>;
  current: CurrentMeal;
  today: Date;
  isPending: boolean;
}

export default function MonthCalendar({
  month,
  dishesByDate,
  current,
  today,
  isPending,
}: MonthCalendarProps) {
  return (
    <Calendar>
      <WeekdayRow>
        {WEEKDAY_NAMES.map((name) => (
          <WeekdayName key={name}>{name}</WeekdayName>
        ))}
      </WeekdayRow>
      <Grid>
        {getMonthWeekdays(month).map((day) => (
          <MonthDay
            key={toApiDate(day)}
            date={day}
            dishes={dishesByDate[toApiDate(day)] ?? []}
            otherMonth={getOtherMonth(day, month)}
            currentLabel={getCurrentLabel(day, current, today)}
            isPending={isPending}
          />
        ))}
      </Grid>
    </Calendar>
  );
}

const Calendar = styled.div`
  width: 100%;
  padding: 16px 11px;
  background-color: white;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  box-sizing: border-box;
`;

const WeekdayRow = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 2px;
  padding: 0 2px;
`;

const WeekdayName = styled.div`
  padding-bottom: 10px;
  font-size: 14px;
  line-height: 20px;
  color: #475569;
  text-align: center;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 2px;
  background-color: #e2e8f0;
  border: 2px solid #e2e8f0;
`;
