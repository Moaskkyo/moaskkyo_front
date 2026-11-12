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
  /** 주어지면 버튼으로 렌더해 "특정 일정 클릭"을 받는다. */
  onClick?: (schedule: Schedule) => void;
}

export default function ScheduleCard({ schedule, onClick }: ScheduleCardProps) {
  const accent = SCHEDULE_CATEGORY_CONFIG[schedule.category].accent;
  const period = isMultiDaySchedule(schedule)
    ? `${formatShortDate(parseDateKey(schedule.startDate))} ~ ${formatShortDate(parseDateKey(schedule.endDate))}`
    : null;

  const content = (
    <>
      <ScheduleCategoryBadge category={schedule.category} />
      <TitleRow>
        <Title>{getScheduleTitle(schedule)}</Title>
        {period && <Period>{period}</Period>}
      </TitleRow>
    </>
  );

  if (onClick) {
    return (
      <CardButton
        type="button"
        aria-label={`${getScheduleTitle(schedule)} 상세 보기`}
        $accent={accent}
        onClick={() => onClick(schedule)}
      >
        {content}
      </CardButton>
    );
  }

  return <Wrapper $accent={accent}>{content}</Wrapper>;
}

const Wrapper = styled.article<{ $accent: string }>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 6px;
  width: 100%;
  padding: 14px 16px;
  background-color: ${colors.surface};
  border: 1px solid ${colors.border};
  border-left: 3px solid ${({ $accent }) => $accent};
  border-radius: 10px;
`;

const CardButton = styled(Wrapper.withComponent("button"))`
  margin: 0;
  font-family: inherit;
  text-align: left;
  cursor: pointer;

  &:hover {
    background-color: ${colors.surfaceMuted};
  }

  &:focus-visible {
    outline: 2px solid ${colors.primary};
    outline-offset: 2px;
  }
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
