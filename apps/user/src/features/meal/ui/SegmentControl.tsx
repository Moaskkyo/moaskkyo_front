import styled from "@emotion/styled";
import type { Period } from "../model/type";

interface SegmentControlProps {
  selected: Period;
  onChange: (period: Period) => void;
}

const PERIODS: Period[] = ["일", "주", "월"];

export default function SegmentControl({
  selected,
  onChange,
}: SegmentControlProps) {
  const selectedIndex = PERIODS.indexOf(selected);

  return (
    <Wrapper>
      <Indicator $index={selectedIndex} />
      {PERIODS.map((period) => (
        <Segment
          key={period}
          type="button"
          $selected={period === selected}
          onClick={() => onChange(period)}
        >
          {period}
        </Segment>
      ))}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative;
  display: inline-flex;
  gap: 4px;
  padding: 4px;
  height: 48px;
  background-color: #f1f5f9;
  border-radius: 14px;
  box-sizing: border-box;
`;

const Indicator = styled.div<{ $index: number }>`
  position: absolute;
  top: 4px;
  left: 4px;
  width: 64px;
  height: calc(100% - 8px);
  background-color: white;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  box-sizing: border-box;
  transform: translateX(${({ $index }) => $index * 68}px);
  transition: transform 0.25s ease;
`;

const Segment = styled.button<{ $selected: boolean }>`
  position: relative;
  width: 64px;
  height: 100%;
  font-size: 16px;
  font-weight: bold;
  color: ${({ $selected }) => ($selected ? "#2563eb" : "#475569")};
  background-color: transparent;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: color 0.25s ease;
`;
