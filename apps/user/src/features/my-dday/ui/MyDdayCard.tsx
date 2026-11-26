import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { toDateKey, useToday } from "@/shared/lib/date";
import { colors } from "@/shared/styles/colors";
import type { MyDday } from "../model/types";
import { useMyDdays } from "../model/useMyDdays";
import DeleteDdayModal from "./DeleteDdayModal";
import MyDdayEmpty from "./MyDdayEmpty";
import MyDdayItem from "./MyDdayItem";

export default function MyDdayCard() {
  const { ddays, removeDday, removePastDdays } = useMyDdays();
  const today = useToday();
  const todayKey = toDateKey(today);
  const upcomingDdays = ddays
    .filter((dday) => dday.date >= todayKey)
    .sort((a, b) => a.date.localeCompare(b.date));
  const [pendingDelete, setPendingDelete] = useState<MyDday | null>(null);

  useEffect(() => {
    removePastDdays(todayKey);
  }, [todayKey, removePastDdays]);

  const handleConfirmDelete = () => {
    if (!pendingDelete) return;
    removeDday(pendingDelete.scheduleId);
    setPendingDelete(null);
  };

  return (
    <Wrapper>
      <Header>
        <Title>내 D-day</Title>
        <Count>{upcomingDdays.length}개</Count>
      </Header>
      {upcomingDdays.length > 0 ? (
        <List>
          {upcomingDdays.map((dday) => (
            <MyDdayItem
              key={dday.scheduleId}
              dday={dday}
              today={today}
              onDelete={setPendingDelete}
            />
          ))}
        </List>
      ) : (
        <MyDdayEmpty />
      )}
      {pendingDelete && (
        <DeleteDdayModal
          dday={pendingDelete}
          onCancel={() => setPendingDelete(null)}
          onConfirm={handleConfirmDelete}
        />
      )}
    </Wrapper>
  );
}

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 362px;
  height: 200px;
  padding: 20px;
  border: 1px solid ${colors.border};
  border-radius: 16px;
  background-color: ${colors.surface};
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h2`
  margin: 0;
  color: ${colors.text};
  font-size: 18px;
  font-weight: bold;
`;

const Count = styled.span`
  color: ${colors.textMuted};
  font-size: 13px;
`;

const List = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-height: 0;
  margin: 0;
  padding: 0;
  overflow-y: auto;
  list-style: none;
`;
