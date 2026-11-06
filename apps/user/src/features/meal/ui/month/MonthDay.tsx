import styled from "@emotion/styled";
import type { CurrentLabel, Dish, OtherMonth } from "../../model/type";
import { MEAL_EMPTY_TEXT } from "../../model/message";

interface MonthDayProps {
  date: Date;
  dishes: Dish[];
  otherMonth?: OtherMonth;
  currentLabel?: CurrentLabel;
  isPending: boolean;
}

export default function MonthDay({
  date,
  dishes,
  otherMonth,
  currentLabel,
  isPending,
}: MonthDayProps) {
  const summary = dishes
    .slice(0, 2)
    .map(({ name }) => name)
    .join(" · ");

  const isOtherMonth = otherMonth !== undefined;
  const isCurrent = currentLabel !== undefined;

  return (
    <Cell $isOtherMonth={isOtherMonth} $isCurrent={isCurrent}>
      <DayNumber $isOtherMonth={isOtherMonth} $isCurrent={isCurrent}>
        {date.getDate()}
        {currentLabel && ` · ${currentLabel}`}
      </DayNumber>
      {otherMonth && <Muted>{otherMonth}</Muted>}
      {!otherMonth && summary && <Summary>{summary}</Summary>}
      {!otherMonth && !summary && !isPending && (
        <Muted>{MEAL_EMPTY_TEXT}</Muted>
      )}
    </Cell>
  );
}

const Cell = styled.div<{ $isOtherMonth: boolean; $isCurrent: boolean }>`
  height: 112px;
  padding: 12px;
  overflow: hidden;
  background-color: ${({ $isOtherMonth, $isCurrent }) =>
    $isCurrent ? "#eff6ff" : $isOtherMonth ? "#f8fafc" : "white"};
  outline: ${({ $isCurrent }) => ($isCurrent ? "2px solid #3b82f6" : "none")};
  outline-offset: -2px;
  box-sizing: border-box;
`;

const DayNumber = styled.div<{ $isOtherMonth: boolean; $isCurrent: boolean }>`
  font-size: 14px;
  font-weight: bold;
  color: ${({ $isOtherMonth, $isCurrent }) =>
    $isCurrent ? "#2563eb" : $isOtherMonth ? "#64748b" : "#0f172a"};
  margin-bottom: 8px;
`;

const Summary = styled.div`
  font-size: 14px;
  color: #334155;
`;

const Muted = styled.div`
  font-size: 14px;
  color: #94a3b8;
`;
