import styled from "@emotion/styled";
import { formatShortDate, parseDateKey } from "@/shared/lib/date";
import { colors } from "@/shared/styles/colors";
import { SCHEDULE_CATEGORY_CONFIG } from "@/entities/schedule/model/category";
import {
  getScheduleTitle,
  isMultiDaySchedule,
} from "@/entities/schedule/model/lib";
import type { Schedule } from "@/entities/schedule/model/types";
import ScheduleCategoryBadge from "@/entities/schedule/ui/ScheduleCategoryBadge";

interface ScheduleCardProps {
  schedule: Schedule;
}

export default function ScheduleCard({ schedule }: ScheduleCardProps) {
  const accent = SCHEDULE_CATEGORY_CONFIG[schedule.category].accent;
  const period = isMultiDaySchedule(schedule)
    ? `${formatShortDate(parseDateKey(schedule.startDate))} ~ ${formatShortDate(parseDateKey(schedule.endDate))}`
    : null;

  return (
    <Wrapper $accent={accent}>
      <ScheduleCategoryBadge category={schedule.category} />
      <TitleRow>
        <Title>{getScheduleTitle(schedule)}</Title>
        {period && <Period>{period}</Period>}
      </TitleRow>
    </Wrapper>
  );
}

const Wrapper = styled.article<{ $accent: string }>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 6px;
  padding: 14px 16px;
  background-color: ${colors.surface};
  border: 1px solid ${colors.border};
  border-left: 3px solid ${({ $accent }) => $accent};
  border-radius: 10px;
`;

const TitleRow = styled.div`
  display: flex;
  align-items: baseline;
  gap: 8px;
  min-width: 0;
`;

const Title = styled.span`
  color: ${colors.text};
  font-size: 16px;
  font-weight: 600;
  line-height: 22px;
`;

const Period = styled.span`
  color: ${colors.textMuted};
  font-size: 13px;
  line-height: 18px;
  white-space: nowrap;
`;
