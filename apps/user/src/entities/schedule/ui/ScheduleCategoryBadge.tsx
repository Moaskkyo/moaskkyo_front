import styled from "@emotion/styled";
import { SCHEDULE_CATEGORY_CONFIG } from "../model/category";
import type { ScheduleCategory } from "../model/types";

interface ScheduleCategoryBadgeProps {
  category: ScheduleCategory;
}

export default function ScheduleCategoryBadge({ category }: ScheduleCategoryBadgeProps) {
  const config = SCHEDULE_CATEGORY_CONFIG[category];

  return (
    <Wrapper $text={config.text} $background={config.background}>
      {config.label}
    </Wrapper>
  );
}

const Wrapper = styled.span<{ $text: string; $background: string }>`
  display: inline-block;
  padding: 2px 8px;
  color: ${({ $text }) => $text};
  background-color: ${({ $background }) => $background};
  border-radius: 999px;
  font-size: 12px;
  font-weight: 500;
  line-height: 16px;
`;
