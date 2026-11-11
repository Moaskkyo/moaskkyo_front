import styled from "@emotion/styled";

interface DdayBlockLayoutProps {
  title: string;
  width: number;
  height: number;
  DayCountDown?: number;
  time?: string;
  text: string;
}

export default function DdayBlockLayout({
  title,
  width,
  height,
  DayCountDown,
  text,
  time,
}: DdayBlockLayoutProps) {
  return (
    <Wrapper $width={width} $height={height} $dayCountDown={DayCountDown}>
      <Title>{title}까지</Title>
      {DayCountDown ? (
        <Time>D-{DayCountDown}</Time>
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
}>`
  padding: 20px;
  display: flex;
  width: ${({ $width }) => $width}px;
  height: ${({ $height }) => $height}px;
  flex-direction: column;
  border-radius: 16px;
  border: 1px solid #e2e8f0;
  gap: ${({ $dayCountDown }) => ($dayCountDown ? "8px" : "16px")};
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
