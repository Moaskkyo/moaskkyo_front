import styled from "@emotion/styled";

interface DayChangeButtonProps {
  text: string;
  onClick: () => void;
}

export default function DayChangeButton({
  text,
  onClick,
}: DayChangeButtonProps) {
  return <Text onClick={onClick}>{text}</Text>;
}

const Text = styled.div`
  color: #334155;
  font-size: 14px;
  background-color: white;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 14px 16px;
  font-weight: bold;
  width: 76px;
  cursor: pointer;
`;
