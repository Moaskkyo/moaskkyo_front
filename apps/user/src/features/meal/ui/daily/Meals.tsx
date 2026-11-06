import styled from "@emotion/styled";
import { useState, type ReactNode } from "react";
import { useMeal } from "../../api/useMeal";
import { toMeals } from "../../utils/parseMeal";
import { addDays, toApiDate, toDisplayDate } from "../../utils/date";
import MealEach from "../MealEach";
import MealHeader from "../MealHeader";
import MealMessage from "../MealMessage";
import { MEAL_EMPTY_TEXT, MEAL_ERROR_TEXT } from "../../model/message";

interface MealsProps {
  headerRight: ReactNode;
}

export default function MealsToday({ headerRight }: MealsProps) {
  const [date, setDate] = useState(() => new Date());
  const { data: rows = [], isPending, isError } = useMeal(toApiDate(date));
  const meals = toMeals(rows);

  return (
    <Wrapper>
      <MealHeader
        title={toDisplayDate(date)}
        prevText="이전 날"
        nextText="다음 날"
        onPrev={() => setDate((prev) => addDays(prev, -1))}
        onNext={() => setDate((prev) => addDays(prev, 1))}
        right={headerRight}
      />
      <MealWrapper>
        {isError && <MealMessage>{MEAL_ERROR_TEXT}</MealMessage>}
        {!isPending && !isError && meals.length === 0 && (
          <MealMessage>{MEAL_EMPTY_TEXT}</MealMessage>
        )}
        {meals.map(({ title, meal, calorie }) => (
          <MealEach key={title} title={title} meal={meal} calorie={calorie} />
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
