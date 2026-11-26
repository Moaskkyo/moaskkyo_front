import styled from "@emotion/styled";
import { colors } from "@/shared/styles/colors";
import { formatDdayDate, formatDdayLabel, getDaysUntil } from "../model/dday";
import type { MyDday } from "../model/types";

interface MyDdayItemProps {
  dday: MyDday;
  today: Date;
  onDelete: (dday: MyDday) => void;
}

export default function MyDdayItem({ dday, today, onDelete }: MyDdayItemProps) {
  const days = getDaysUntil(dday.date, today);

  return (
    <Wrapper>
      <Info>
        <Name>{dday.title}</Name>
        <DateText>{formatDdayDate(dday.date)}</DateText>
      </Info>
      <Badge>{formatDdayLabel(days)}</Badge>
      <DeleteButton type="button" onClick={() => onDelete(dday)}>
        삭제
      </DeleteButton>
    </Wrapper>
  );
}

const Wrapper = styled.li`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 0;
`;

const Name = styled.span`
  overflow: hidden;
  color: ${colors.text};
  font-size: 15px;
  font-weight: 600;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const DateText = styled.span`
  color: ${colors.textMuted};
  font-size: 13px;
`;

const Badge = styled.span`
  flex-shrink: 0;
  padding: 3px 10px;
  border-radius: 999px;
  background-color: ${colors.primarySoft};
  color: ${colors.primary};
  font-size: 13px;
  font-weight: bold;
`;

const DeleteButton = styled.button`
  flex-shrink: 0;
  padding: 4px;
  border: none;
  background: none;
  color: ${colors.textSecondary};
  font-size: 13px;
  font-family: inherit;
  cursor: pointer;

  &:hover {
    color: ${colors.danger};
  }
`;
