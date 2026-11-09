import styled from "@emotion/styled";
import { colors } from "@/shared/styles/colors";

interface CalendarDayCellProps {
  date: Date;
  isOutsideMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
  /** 주 그리드 안에서의 열 위치(1부터) */
  column: number;
  onSelect: (date: Date) => void;
}

const SUNDAY = 0;
const SATURDAY = 6;

export default function CalendarDayCell({
  date,
  isOutsideMonth,
  isToday,
  isSelected,
  column,
  onSelect,
}: CalendarDayCellProps) {
  const weekday = date.getDay();

  return (
    <Wrapper
      type="button"
      aria-label={`${date.getMonth() + 1}월 ${date.getDate()}일`}
      aria-pressed={isSelected}
      $column={column}
      $isOutsideMonth={isOutsideMonth}
      $isSelected={isSelected}
      onClick={() => onSelect(date)}
    >
      <DayNumber
        $isToday={isToday}
        $isSelected={isSelected}
        $isOutsideMonth={isOutsideMonth}
        $isSunday={weekday === SUNDAY}
        $isSaturday={weekday === SATURDAY}
      >
        {date.getDate()}
      </DayNumber>
    </Wrapper>
  );
}

const Wrapper = styled.button<{
  $column: number;
  $isOutsideMonth: boolean;
  $isSelected: boolean;
}>`
  grid-row: 1 / -1;
  grid-column: ${({ $column }) => $column};
  display: flex;
  align-items: flex-start;
  margin: 0;
  padding: 6px 8px;
  background-color: ${({ $isOutsideMonth }) =>
    $isOutsideMonth ? colors.surfaceMuted : colors.surface};
  border: none;
  border-right: 1px solid ${colors.border};
  border-bottom: 1px solid ${colors.border};
  box-shadow: ${({ $isSelected }) => ($isSelected ? `inset 0 0 0 2px ${colors.primary}` : "none")};
  font: inherit;
  text-align: left;
  cursor: pointer;

  &:hover {
    background-color: ${colors.primarySoft};
  }

  &:focus-visible {
    outline: 2px solid ${colors.primary};
    outline-offset: -2px;
  }
`;

function resolveNumberColor({
  $isToday,
  $isSelected,
  $isOutsideMonth,
  $isSunday,
  $isSaturday,
}: {
  $isToday: boolean;
  $isSelected: boolean;
  $isOutsideMonth: boolean;
  $isSunday: boolean;
  $isSaturday: boolean;
}): string {
  if ($isToday) return colors.surface;
  if ($isSelected) return colors.primary;
  if ($isOutsideMonth) return colors.textDisabled;
  if ($isSunday) return colors.sunday;
  if ($isSaturday) return colors.primary;
  return colors.text;
}

const DayNumber = styled.span<{
  $isToday: boolean;
  $isSelected: boolean;
  $isOutsideMonth: boolean;
  $isSunday: boolean;
  $isSaturday: boolean;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 26px;
  height: 26px;
  padding: 0 4px;
  margin-left: -4px;
  border-radius: 999px;
  background-color: ${({ $isToday }) => ($isToday ? colors.primary : "transparent")};
  color: ${resolveNumberColor};
  font-size: 15px;
  font-weight: ${({ $isToday, $isSelected }) => ($isToday || $isSelected ? 700 : 500)};
  line-height: 1;
`;
