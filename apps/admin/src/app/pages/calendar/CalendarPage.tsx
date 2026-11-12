import { useState } from "react";
import styled from "@emotion/styled";
import { initialSchedules, type AcademicSchedule } from "../../../entities/schedule";
import { ScheduleFormModal } from "../../../features/edit-schedule";
import { CalendarMonth } from "../../../widgets/calendar-month";
import { colors } from "../../../shared/styles/colors";

export default function CalendarPage() {
  const [month, setMonth] = useState(() => {
    const today = new Date();
    return new Date(today.getFullYear(), today.getMonth(), 1);
  });
  const [schedules, setSchedules] = useState(initialSchedules);
  const [selection, setSelection] = useState<{ date: Date; schedule?: AcademicSchedule } | null>(null);
  function moveMonth(offset: number) { setMonth((current) => new Date(current.getFullYear(), current.getMonth() + offset, 1)); }
  function save(schedule: AcademicSchedule) {
    setSchedules((items) => items.some((item) => item.id === schedule.id)
      ? items.map((item) => item.id === schedule.id ? schedule : item) : [...items, schedule]);
    setSelection(null);
  }
  return <div>
    <Introduction><h1>학사일정 관리</h1><p>캘린더에서 학교 일정을 확인하고 날짜를 클릭해 추가하세요.</p></Introduction>
    <Panel aria-label="학사일정 달력">
      <Toolbar>
        <h2 aria-live="polite">{month.getFullYear()}년 {month.getMonth() + 1}월</h2>
        <Arrow type="button" aria-label="이전 달" onClick={() => moveMonth(-1)}>‹</Arrow>
        <Arrow type="button" aria-label="다음 달" onClick={() => moveMonth(1)}>›</Arrow>
        <Today type="button" onClick={() => { const now = new Date(); setMonth(new Date(now.getFullYear(), now.getMonth(), 1)); }}>오늘</Today>
      </Toolbar>
      <Hint>날짜 칸을 클릭해 일정을 추가하고, 등록된 일정을 눌러 내용을 확인하세요.</Hint>
      <CalendarMonth month={month} schedules={schedules} onSelectDate={(date) => setSelection({ date })} onSelectSchedule={(date, schedule) => setSelection({ date, schedule })} />
    </Panel>
    {selection && <ScheduleFormModal date={selection.date} schedule={selection.schedule} onClose={() => setSelection(null)} onSave={save} />}
  </div>;
}
const Introduction = styled.div`
  margin-bottom: 30px;
  h1 { font-size: 30px; line-height: 40px; font-weight: 700; }
  p { margin-top: 6px; color: #7F8DA7; font-size: 14px; line-height: 24px; }
`;
const Panel = styled.section`width: 100%; padding: 23px 27px 52px; border: 1px solid ${colors.border}; border-radius: 12px; background: white;`;
const Toolbar = styled.div`
  display: flex; align-items: center; gap: 4px; flex-wrap: wrap;
  h2 { margin-right: 40px; font-size: 26px; line-height: 40px; }
`;
const Arrow = styled.button`width: 40px; height: 40px; border: 0; background: transparent; color: #7F8DA7; font-size: 28px; cursor: pointer;`;
const Today = styled.button`height: 40px; min-width: 76px; margin-left: 16px; border: 0; border-radius: 8px; background: ${colors.background}; font-size: 14px; cursor: pointer;`;
const Hint = styled.p`margin: 21px 0 24px; font-size: 14px; line-height: 22px; color: #7F8DA7;`;
