import styled from "@emotion/styled";
import { useState, type ReactNode } from "react";
import { useMeal } from "../../api/useMeal";
import { MEAL_ERROR_TEXT } from "../../model/message";
import { toDishesByDate } from "../../utils/parseMeal";
import { getCurrentLabel, getCurrentMeal } from "../../utils/mealTime";
import {
  addDays,
  getWeekDays,
  isWeekend,
  toApiDate,
  toShortDate,
  toWeekLabel,
} from "../../utils/date";
import MealHeader from "../MealHeader";
import MealMessage from "../MealMessage";
import DayMeal from "./DayMeal";
import WeekCurrent from "./WeekCurrent";

interface MealsProps {
  // 헤더 오른쪽에 들어갈 요소 (일/주/월 선택 등)
  headerRight?: ReactNode;
}

export default function MealsWeek({ headerRight }: MealsProps) {
  const [today] = useState(() => new Date());
  const [current] = useState(() => getCurrentMeal(today));
  const [date, setDate] = useState(() =>
    isWeekend(current.date) ? addDays(current.date, 7) : current.date,
  );

  const weekDays = getWeekDays(date);
  const monday = weekDays[0];
  const friday = weekDays[weekDays.length - 1];
  const from = toApiDate(monday);
  const to = toApiDate(friday);

  const { data: rows = [], isPending, isError } = useMeal(from, to);
  const dishesByDate = toDishesByDate(rows, current.title);

  return (
    <Wrapper>
      <MealHeader
        title={`${toShortDate(monday)} ~ ${toShortDate(friday)}`}
        prevText="이전 주"
        nextText="다음 주"
        onPrev={() => setDate((prev) => addDays(prev, -7))}
        onNext={() => setDate((prev) => addDays(prev, 7))}
        badge={
          <WeekCurrent week={toWeekLabel(date, today)} type={current.title} />
        }
        right={headerRight}
      />
      {isError && <MealMessage>{MEAL_ERROR_TEXT}</MealMessage>}
      <MealWrapper>
        {weekDays.map((day) => (
          <DayMeal
            key={toApiDate(day)}
            date={day}
            dishes={dishesByDate[toApiDate(day)] ?? []}
            currentLabel={getCurrentLabel(day, current, today)}
            isPending={isPending}
          />
        ))}
      </MealWrapper>
    </Wrapper>
  );
}

const MealWrapper = styled.div`
  display: flex;
  gap: 24px;
`;

const Wrapper = styled.div`
  display: flex;
  gap: 24px;
  flex-direction: column;
`;
