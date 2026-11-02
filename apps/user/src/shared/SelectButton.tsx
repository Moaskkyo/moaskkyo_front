import styled from "@emotion/styled";

interface ButtonProps {
  text: string;
  width?: string;
  selected?: boolean;
  onClick: () => void;
}

export default function SelectButton({
  text,
  width = "auto",
  selected = true,
  onClick,
}: ButtonProps) {
  return (
    <Wrapper $width={width} $selected={selected} onClick={onClick}>
      {text}
    </Wrapper>
  );
}

const Wrapper = styled.div<{ $width: string; $selected: boolean }>`
  width: ${({ $width }) => $width};
  color: ${({ $selected }) => ($selected ? "#1D4ED8" : "#334155")};
  background-color: ${({ $selected }) => ($selected ? "#EFF6FF" : "white")};
  border: 1px solid ${({ $selected }) => ($selected ? "#BFDBFE" : "#e2e8f0")};
  height: 44px;
  font-size: ${({ $selected }) => ($selected ? "16px" : "14px")};
  font-weight: bold;
  padding: 0px 16px;
  border-radius: 12px;
  text-align: center;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
`;
