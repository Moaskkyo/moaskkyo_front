import styled from "@emotion/styled";
import type { MealType } from "../../model/type";

interface WeekCurrentProps {
  week: string;
  type: MealType;
}

export default function WeekCurrent({ week, type }: WeekCurrentProps) {
  return (
    <Text>
      {week} · {type}
    </Text>
  );
}

const Text = styled.div`
  color: #1d4ed8;
  font-size: 14px;
  font-weight: bold;
  padding: 12px 14px;
  background-color: #dbeafe;
  border-radius: 999px;
  width: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
