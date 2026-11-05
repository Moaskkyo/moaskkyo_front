import styled from "@emotion/styled";
import { useMemo } from "react";
import { getSchedulesOnDate, ScheduleCard, type Schedule } from "../../../entities/schedule";
import { formatDayTitle } from "../../../shared/lib/date";
import { colors } from "../../../shared/styles/colors";

interface ScheduleDayDetailProps {
  date: Date;
  schedules: Schedule[];
}

export default function ScheduleDayDetail({ date, schedules }: ScheduleDayDetailProps) {
  const daySchedules = useMemo(() => getSchedulesOnDate(schedules, date), [schedules, date]);

  return (
    <Wrapper aria-live="polite">
      <Title>{formatDayTitle(date)}</Title>
      <Count>일정 {daySchedules.length}개</Count>
      {daySchedules.length === 0 ? (
        <Empty>등록된 일정이 없습니다.</Empty>
      ) : (
        <List>
          {daySchedules.map((schedule) => (
            <li key={schedule.id}>
              <ScheduleCard schedule={schedule} />
            </li>
          ))}
        </List>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.aside`
  display: flex;
  flex-direction: column;
  padding: 20px;
  background-color: ${colors.surface};
  border: 1px solid ${colors.border};
  border-radius: 16px;
  overflow-y: auto;
`;

const Title = styled.h2`
  margin: 0;
  color: ${colors.text};
  font-size: 20px;
  font-weight: 700;
  line-height: 28px;
`;

const Count = styled.p`
  margin: 4px 0 16px;
  color: ${colors.textMuted};
  font-size: 14px;
  line-height: 20px;
`;

const List = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin: 0;
  padding: 0;
  list-style: none;
`;

const Empty = styled.p`
  margin: 0;
  color: ${colors.textMuted};
  font-size: 14px;
`;
