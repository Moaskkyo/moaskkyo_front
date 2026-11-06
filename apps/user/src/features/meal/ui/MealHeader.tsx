import styled from "@emotion/styled";
import type { ReactNode } from "react";
import DayChangeButton from "./DayChangeButton";

interface MealHeaderProps {
  title: string;
  prevText: string;
  nextText: string;
  onPrev: () => void;
  onNext: () => void;
  badge?: ReactNode;
  right: ReactNode;
}

export default function MealHeader({
  title,
  prevText,
  nextText,
  onPrev,
  onNext,
  badge,
  right,
}: MealHeaderProps) {
  return (
    <Top>
      <Nav>
        <DayChangeButton text={prevText} onClick={onPrev} />
        <Title>{title}</Title>
        <DayChangeButton text={nextText} onClick={onNext} />
        {badge}
      </Nav>
      {right}
    </Top>
  );
}

const Top = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Nav = styled.div`
  display: flex;
  gap: 14px;
  align-items: center;
`;

const Title = styled.div`
  font-size: 24px;
  font-weight: bold;
`;
