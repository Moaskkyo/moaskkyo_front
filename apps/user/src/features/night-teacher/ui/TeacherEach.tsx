import styled from "@emotion/styled";

interface TeacherEachProps {
  floor: number;
  teacherName: string;
}

export default function TeacherEach({ floor, teacherName }: TeacherEachProps) {
  return (
    <Wrapper>
      <Floor>{floor}층</Floor>

      <Teacher>
        <Text>야자 감독</Text>
        <TeacherName>{teacherName} 선생님</TeacherName>
      </Teacher>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  border-radius: 16px;
  border: 1px solid #e2e8f0;
  padding: 20px;
  gap: 12px;
  width: 362px;
  height: 142px;
`;

const Floor = styled.div`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 12px;
`;

const Teacher = styled.div`
  background-color: #f8fafc;
  border-radius: 12px;
  gap: 4px;
  padding: 16px 12px;
`;

const Text = styled.div`
  font-size: 14px;
  color: #475569;
`;

const TeacherName = styled.div`
  font-size: 16px;
  font-weight: bold;
`;
