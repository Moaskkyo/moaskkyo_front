import styled from "@emotion/styled";
import Input from "@/shared/Input";
import { colors } from "@/shared/styles/colors";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <Wrapper>
      <Input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="선생님 이름을 입력하세요"
        aria-label="선생님 이름"
      />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  padding: 20px;
  border: 1px solid ${colors.border};
  border-radius: 16px;
  background-color: ${colors.surface};
`;
