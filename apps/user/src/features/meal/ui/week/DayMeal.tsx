import styled from "@emotion/styled";
import type { CurrentLabel, Dish } from "../../model/type";
import { MEAL_EMPTY_TEXT } from "../../model/message";
import { toDayLabel } from "../../utils/date";

interface DayMealProps {
  date: Date;
  dishes: Dish[];
  currentLabel?: CurrentLabel;
  isPending: boolean;
}

export default function DayMeal({
  date,
  dishes,
  currentLabel,
  isPending,
}: DayMealProps) {
  const isCurrent = currentLabel !== undefined;

  return (
    <Wrapper $isCurrent={isCurrent}>
      <Title $isCurrent={isCurrent}>
        {toDayLabel(date)}
        {currentLabel && ` · ${currentLabel}`}
      </Title>
      <Dishes>
        {!isPending && dishes.length === 0 && <Empty>{MEAL_EMPTY_TEXT}</Empty>}
        {dishes.map(({ name }) => (
          <div key={name}>{name}</div>
        ))}
      </Dishes>
    </Wrapper>
  );
}

const Wrapper = styled.div<{ $isCurrent: boolean }>`
  flex: 1;
  padding: 20px;
  background-color: white;
  border: 1px solid ${({ $isCurrent }) => ($isCurrent ? "#3b82f6" : "#e2e8f0")};
  box-shadow: ${({ $isCurrent }) =>
    $isCurrent ? "0 0 0 1px #3b82f6" : "none"};
  border-radius: 16px;
`;

const Title = styled.div<{ $isCurrent: boolean }>`
  font-size: 18px;
  font-weight: bold;
  color: ${({ $isCurrent }) => ($isCurrent ? "#2563eb" : "#0f172a")};
  margin-bottom: 16px;
`;

const Dishes = styled.div`
  font-size: 16px;
  color: #334155;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Empty = styled.div`
  font-size: 14px;
  color: #94a3b8;
`;
