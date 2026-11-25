import TeacherEach from "./TeacherEach";
import styled from "@emotion/styled";
import { useState } from "react";
import { formatDayTitle } from "@/shared/lib/date";

export default function TeacherList() {
  const [today] = useState(() => new Date());

  return (
    <Wrapper>
      <Title>오늘 · {formatDayTitle(today)}</Title>
      <List>
        <TeacherEach floor={2} teacherName="정은진" />
        <TeacherEach floor={3} teacherName="정은진" />
        <TeacherEach floor={4} teacherName="정은진" />
      </List>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  height: 48px;
  font-size: 24px;
  font-weight: bold;
`;

const List = styled.div`
  display: flex;
  gap: 24px;
`;
