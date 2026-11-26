import styled from "@emotion/styled";
import { colors } from "@/shared/styles/colors";
import type { TeacherLocationType } from "../model/types";

interface TeacherLocationItemProps {
  teacher: TeacherLocationType;
}

export default function TeacherLocationItem({
  teacher,
}: TeacherLocationItemProps) {
  const { teacherName, place } = teacher;

  return (
    <Wrapper>
      <Name>{teacherName} 선생님</Name>
      <Place>
        {place ? `${place.placeName} · ${place.floor}층` : "위치 정보 없음"}
      </Place>
    </Wrapper>
  );
}

const Wrapper = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  flex-shrink: 0;
  height: 60px;
  padding: 0 24px;
  border: 1px solid ${colors.border};
  border-radius: 16px;
  background-color: ${colors.surface};
`;

const Name = styled.span`
  color: ${colors.text};
  font-size: 16px;
  font-weight: bold;
`;

const Place = styled.span`
  color: ${colors.textSecondary};
  font-size: 16px;
  text-align: right;
`;
