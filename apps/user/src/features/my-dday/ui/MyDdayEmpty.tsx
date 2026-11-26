import styled from "@emotion/styled";
import { colors } from "@/shared/styles/colors";

export default function MyDdayEmpty() {
  return (
    <Wrapper>
      <Title>추가한 D-day가 없어요</Title>
      <Hint>캘린더 페이지에서 학사일정 D-day를 추가할 수 있어요.</Hint>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 4px;
  flex: 1;
`;

const Title = styled.p`
  margin: 0;
  color: ${colors.text};
  font-size: 15px;
  font-weight: bold;
`;

const Hint = styled.p`
  margin: 0;
  color: ${colors.textMuted};
  font-size: 13px;
`;
