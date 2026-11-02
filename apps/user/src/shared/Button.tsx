import styled from "@emotion/styled";

interface ButtonProps {
  text: string;
  width?: string;
}

export default function Button({ text, width = "auto" }: ButtonProps) {
  return <Wrapper $width={width}>{text}</Wrapper>;
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
