import styled from "@emotion/styled";
import {
  SCHEDULE_CATEGORIES,
  SCHEDULE_CATEGORY_CONFIG,
  type ScheduleCategory,
} from "@/entities/schedule";
import Toggle from "@/shared/Toggle";
import { colors } from "@/shared/styles/colors";
import type { VisibleCategories } from "@/features/filter-schedule-category/model/useScheduleCategoryFilter";

interface ScheduleCategoryTogglesProps {
  visibleCategories: VisibleCategories;
  onToggle: (category: ScheduleCategory) => void;
}

export default function ScheduleCategoryToggles({
  visibleCategories,
  onToggle,
}: ScheduleCategoryTogglesProps) {
  return (
    <Wrapper>
      {SCHEDULE_CATEGORIES.map((category) => (
        <Item key={category}>
          <Label>{SCHEDULE_CATEGORY_CONFIG[category].label}</Label>
          <Toggle checked={visibleCategories[category]} onClick={() => onToggle(category)} />
        </Item>
      ))}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
`;

const Item = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Label = styled.span`
  color: ${colors.textSecondary};
  font-size: 14px;
`;
