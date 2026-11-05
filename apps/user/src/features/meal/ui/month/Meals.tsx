import styled from "@emotion/styled";
import { useState, type ReactNode } from "react";
import { useMeal } from "../../api/useMeal";
import { MEAL_ERROR_TEXT } from "../../model/message";
import { toDishesByDate } from "../../utils/parseMeal";
import { getCurrentMeal } from "../../utils/mealTime";
import {
  addMonths,
  getMonthEnd,
  getMonthStart,
  toApiDate,
  toMonthLabel,
  toMonthTitle,
} from "../../utils/date";
import MealHeader from "../MealHeader";
import MealMessage from "../MealMessage";
import WeekCurrent from "../week/WeekCurrent";
import MonthCalendar from "./MonthCalendar";

interface MealsProps {
  headerRight: ReactNode;
}

export default function MealsMonth({ headerRight }: MealsProps) {
  const [today] = useState(() => new Date());
  const [current] = useState(() => getCurrentMeal(today));
  const [month, setMonth] = useState(() => getMonthStart(current.date));

  const from = toApiDate(getMonthStart(month));
  const to = toApiDate(getMonthEnd(month));

  const { data: rows = [], isPending, isError } = useMeal(from, to);
  const dishesByDate = toDishesByDate(rows, current.title);

  return (
    <Wrapper>
      <MealHeader
        title={toMonthTitle(month)}
        prevText="이전 달"
        nextText="다음 달"
        onPrev={() => setMonth((prev) => addMonths(prev, -1))}
        onNext={() => setMonth((prev) => addMonths(prev, 1))}
        badge={
          <WeekCurrent week={toMonthLabel(month, today)} type={current.title} />
        }
        right={headerRight}
      />
      {isError && <MealMessage>{MEAL_ERROR_TEXT}</MealMessage>}
      <MonthCalendar
        month={month}
        dishesByDate={dishesByDate}
        current={current}
        today={today}
        isPending={isPending}
      />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  gap: 24px;
  flex-direction: column;
`;
