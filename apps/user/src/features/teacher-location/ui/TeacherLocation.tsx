import styled from "@emotion/styled";
import { useState } from "react";
import { colors } from "@/shared/styles/colors";
import { MOCK_TEACHER_LOCATIONS } from "../model/mockItems";
import SearchBar from "./SearchBar";
import TeacherLocationItem from "./TeacherLocationItem";

export default function TeacherLocation() {
  const [keyword, setKeyword] = useState("");

  const trimmed = keyword.trim();
  const results = MOCK_TEACHER_LOCATIONS.filter((teacher) =>
    teacher.teacherName.includes(trimmed),
  );

  return (
    <Wrapper>
      <SearchBar value={keyword} onChange={setKeyword} />
      {results.length > 0 ? (
        <List>
          {results.map((teacher) => (
            <TeacherLocationItem key={teacher.teacherId} teacher={teacher} />
          ))}
        </List>
      ) : (
        <Empty>검색 결과가 없습니다</Empty>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  flex: 1;
  min-height: 0;
  width: 100%;
  max-width: 720px;
  margin: 0 auto;
`;

const List = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-height: 0;
  margin: 0;
  padding: 0;
  overflow-y: auto;
  list-style: none;
`;

const Empty = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 120px;
  border: 1px solid ${colors.border};
  border-radius: 16px;
  background-color: ${colors.surface};
  color: ${colors.text};
  font-size: 16px;
  font-weight: bold;
`;
