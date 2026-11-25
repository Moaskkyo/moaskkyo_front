import styled from "@emotion/styled";
import type { ReactNode } from "react";

interface DdayBlockLayoutProps {
  title: string;
  width: number;
  height: number;
  DayCountDown?: number;
  time?: ReactNode;
  text: string;
  background?: string;
}

export default function DdayBlockLayout({
  title,
  width,
  height,
  DayCountDown,
  text,
  time,
  background,
}: DdayBlockLayoutProps) {
  return (
    <Wrapper
      $width={width}
      $height={height}
      $dayCountDown={DayCountDown}
      $background={background}
    >
      <Title>{title}까지</Title>
      {DayCountDown !== undefined ? (
        <Time>{DayCountDown > 0 ? `D-${DayCountDown}` : "D-DAY"}</Time>
      ) : (
        <VacationTime>{time}</VacationTime>
      )}
      <Text>{text}</Text>
    </Wrapper>
  );
}

const VacationTime = styled.div`
  font-size: 80px;
  font-weight: bold;
`;

const Wrapper = styled.div<{
  $width: number;
  $height: number;
  $dayCountDown?: number;
  $background?: string;
}>`
  padding: 20px;
  display: flex;
  width: ${({ $width }) => $width}px;
  height: ${({ $height }) => $height}px;
  flex-direction: column;
  border-radius: 16px;
  border: 1px solid #e2e8f0;
  background: ${({ $background }) => $background ?? "transparent"};
  gap: ${({ $dayCountDown }) => ($dayCountDown !== undefined ? "8px" : "16px")};
  justify-content: space-between;
`;

const Title = styled.div`
  font-size: 18px;
  font-weight: bold;
`;

const Time = styled.div`
  color: #2563eb;
  font-size: 64px;
  font-weight: bold;
`;

const Text = styled.div`
  color: #475569;
  font-size: 14px;
`;
