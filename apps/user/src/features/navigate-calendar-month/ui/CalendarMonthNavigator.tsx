import styled from "@emotion/styled";
import SelectButton from "../../../shared/SelectButton";

interface CalendarMonthNavigatorProps {
  /** 보고 있는 월이 오늘이 속한 월이면 '오늘' 버튼을 강조한다. */
  isTodayMonth: boolean;
  onPrevious: () => void;
  onNext: () => void;
  onToday: () => void;
}

export default function CalendarMonthNavigator({
  isTodayMonth,
  onPrevious,
  onNext,
  onToday,
}: CalendarMonthNavigatorProps) {
  return (
    <Wrapper>
      <SelectButton text="이전 달" selected={false} onClick={onPrevious} />
      <SelectButton text="다음 달" selected={false} onClick={onNext} />
      <SelectButton text="오늘" selected={isTodayMonth} onClick={onToday} />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;
