import styled from "@emotion/styled";

interface ButtonProps {
  text: string;
  width?: string;
  onClick: () => void;
}

export default function Button({ text, width = "auto", onClick }: ButtonProps) {
  return (
    <Wrapper $width={width} onClick={onClick}>
      {text}
    </Wrapper>
  );
}

const Wrapper = styled.div<{ $width: string }>`
  width: ${({ $width }) => $width};
  background-color: #2563eb;
  color: white;
  height: 44px;
  font-size: 14px;
  font-weight: bold;
  padding: 24px 16px;
  border-radius: 12px;
  text-align: center;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
`;
