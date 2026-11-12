import { useState } from "react";
import styled from "@emotion/styled";
import type { AcademicSchedule } from "../../../entities/schedule";
import { dateKey, dateLabel, monthDays, weekdays } from "../../../shared/lib/calendar";
import { colors } from "../../../shared/styles/colors";

interface Props {
  month: Date;
  schedules: AcademicSchedule[];
  onSelectDate: (date: Date) => void;
  onSelectSchedule: (date: Date, schedule: AcademicSchedule) => void;
}
export default function CalendarMonth({ month, schedules, onSelectDate, onSelectSchedule }: Props) {
  const [today] = useState(() => dateKey(new Date()));
  const days = monthDays(month);
  return <Scroll><Table aria-label={`${month.getFullYear()}년 ${month.getMonth() + 1}월 학사일정`}>
    <thead><tr>{weekdays.map((day) => <th scope="col" key={day}>{day}</th>)}</tr></thead>
    <tbody>{Array.from({ length: days.length / 7 }, (_, week) => <tr key={week}>
      {days.slice(week * 7, week * 7 + 7).map((date) => {
        const key = dateKey(date);
        return <Cell key={key} $outside={date.getMonth() !== month.getMonth()}>
          <DateButton type="button" aria-label={`${dateLabel(date)} 일정 추가`} onClick={() => onSelectDate(date)}>
            <Day $today={key === today} aria-current={key === today ? "date" : undefined}>{date.getDate()}</Day>
          </DateButton>
          <Events>{schedules.filter((item) => item.date === key).map((schedule) =>
            <EventButton type="button" key={schedule.id} onClick={() => onSelectSchedule(date, schedule)} aria-label={`${schedule.title} 내용 확인`}>{schedule.title}</EventButton>)}</Events>
        </Cell>;
      })}
    </tr>)}</tbody>
  </Table></Scroll>;
}
const Scroll = styled.div`overflow-x: auto;`;
const Table = styled.table`
  width: 100%; min-width: 640px; border-collapse: collapse; table-layout: fixed; font-size: 14px;
  th, td { border: 1px solid ${colors.border}; }
  th { height: 40px; background: ${colors.background}; color: #7F8DA7; font-weight: 500; }
  th:first-of-type { color: #F02F46; } th:last-of-type { color: ${colors.primary}; }
`;
const Cell = styled.td<{ $outside: boolean }>`
  position: relative; height: 110px; padding: 0; vertical-align: top;
  color: ${({ $outside }) => $outside ? "#ABB8CE" : colors.text};
  &:first-of-type { color: ${({ $outside }) => $outside ? "#ABB8CE" : "#FF243B"}; }
  &:last-of-type { color: ${({ $outside }) => $outside ? "#ABB8CE" : colors.primary}; }
`;
const DateButton = styled.button`
  position: absolute; inset: 0; display: block; width: 100%; height: 100%; padding: 6px;
  text-align: left; border: 0; background: transparent; color: inherit; cursor: pointer;
  &:hover { background: #F8FAFF; }
`;
const Day = styled.span<{ $today: boolean }>`
  position: absolute; top: 5px; left: 5px; width: 28px; height: 28px; display: grid; place-items: center;
  border-radius: 50%; background: ${({ $today }) => $today ? "#EB3E4C" : "transparent"};
  color: ${({ $today }) => $today ? "white" : "inherit"};
`;
const Events = styled.div`position: relative; display: grid; gap: 4px; margin: 39px 7px 8px; pointer-events: none;`;
const EventButton = styled.button`
  position: relative; pointer-events: auto; width: 100%; border: 0; border-radius: 4px;
  padding: 5px 8px; background: ${colors.primarySoft}; color: ${colors.primary}; cursor: pointer;
  font-size: 12px; line-height: 16px; text-align: left; overflow-wrap: anywhere;
  &:hover { background: #DFE8FF; }
`;
