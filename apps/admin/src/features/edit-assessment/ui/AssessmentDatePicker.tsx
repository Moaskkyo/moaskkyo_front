import { useRef, useState } from "react";
import styled from "@emotion/styled";
import { dateKey, dateLabel, monthDays, weekdays } from "../../../shared/lib/calendar";
import { colors } from "../../../shared/styles/colors";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function AssessmentDatePicker({ value, onChange }: Props) {
  const selected = value ? new Date(`${value}T00:00:00`) : null;
  const displayDate = selected ? dateLabel(selected) : "날짜를 선택해 주세요";
  const [month, setMonth] = useState(() => selected ?? new Date());
  const [open, setOpen] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);

  function moveMonth(offset: number) {
    setMonth((current) => new Date(current.getFullYear(), current.getMonth() + offset, 1));
  }

  function close() {
    setOpen(false);
    trigger.current?.focus();
  }

  return (
    <Root onBlur={(event) => {
      if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
    }} onKeyDown={(event) => {
      if (open && event.key === "Escape") {
        event.preventDefault();
        event.stopPropagation();
        close();
      }
    }}>
      <Trigger id="assessment-date" ref={trigger} type="button" data-placeholder={!selected} aria-label={`마감일, ${displayDate}`} aria-expanded={open}
        aria-controls={open ? "assessment-date-calendar" : undefined} onClick={() => setOpen(!open)}>
        {displayDate}
      </Trigger>
      {open && (
        <Calendar id="assessment-date-calendar" role="group" aria-label="마감일 달력">
          <Month>
            <strong aria-live="polite">{month.getFullYear()}년 {month.getMonth() + 1}월</strong>
            <button type="button" aria-label="이전 달" onClick={() => moveMonth(-1)}>‹</button>
            <button type="button" aria-label="다음 달" onClick={() => moveMonth(1)}>›</button>
          </Month>
          <Days>
            {weekdays.map((day) => <span key={day} aria-hidden="true">{day}</span>)}
            {monthDays(month).map((date) => {
              const key = dateKey(date);
              return date.getMonth() === month.getMonth() ? (
                <button key={key} type="button" aria-label={dateLabel(date)} aria-pressed={key === value}
                  onClick={() => { onChange(key); close(); }}>{date.getDate()}</button>
              ) : <span key={key} />;
            })}
          </Days>
        </Calendar>
      )}
    </Root>
  );
}

const Root = styled.div`position: relative;`;
const Trigger = styled.button`
  width: 100%;
  min-height: 52px;
  padding: 0 15px;
  text-align: left;
  border: 1px solid #D6E0F2;
  border-radius: 8px;
  background: ${colors.surface};
  font-weight: 400;
  cursor: pointer;
  &[data-placeholder="true"] { color: ${colors.textMuted}; }
  &[aria-expanded="true"] { border-color: #718DFF; }
`;
const Calendar = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  width: max(100%, min(262px, calc(100vw - 76px)));
  z-index: 1;
  background: ${colors.surface};
  border: 1px solid #D6E0F2;
  border-radius: 8px;
  padding: 10px;
  button { border: 0; background: transparent; border-radius: 4px; cursor: pointer; }
  button:hover, button[aria-pressed="true"] { background: ${colors.primarySoft}; }
`;
const Month = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  margin-bottom: 8px;
  strong { margin-right: auto; }
  button { min-width: 30px; min-height: 32px; }
`;
const Days = styled.div`
  display: grid;
  grid-template-columns: repeat(7, minmax(0, 1fr));
  text-align: center;
  font-size: 12px;
  font-weight: 400;
  span, button { min-height: 34px; display: grid; place-items: center; padding: 0; }
  :nth-child(7n + 1) { color: #b52b3b; }
  :nth-child(7n) { color: #2353c6; }
`;
