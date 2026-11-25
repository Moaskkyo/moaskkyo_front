import { useId, useState, type MouseEvent, type ReactNode } from "react";
import styled from "@emotion/styled";
import { dateKey, dateLabel, monthDays, weekdays } from "../../../shared/lib/calendar";
import { colors } from "../../../shared/styles/colors";

interface PickerProps {
  label: string;
  value: string;
  calendar?: boolean;
  children: (close: (event: MouseEvent<HTMLButtonElement>) => void) => ReactNode;
}

export function AssignmentPicker({ label, value, calendar, children }: PickerProps) {
  const id = useId();
  const [open, setOpen] = useState(false);

  function close(document: Document) {
    setOpen(false);
    document.getElementById(`${id}-trigger`)?.focus();
  }

  return (
    <Root
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
      }}
      onKeyDown={(event) => {
        if (open && event.key === "Escape") {
          event.preventDefault();
          event.stopPropagation();
          close(event.currentTarget.ownerDocument);
        }
      }}
    >
      <Trigger id={`${id}-trigger`} type="button" aria-label={`${label}, ${value}`}
        aria-expanded={open} aria-controls={open ? id : undefined}
        onClick={() => setOpen(!open)}>
        {value}<span aria-hidden="true">{open ? "▴" : "▾"}</span>
      </Trigger>
      {open && <Options id={id} role="group" aria-label={label} $calendar={calendar}>
        {children((event) => close(event.currentTarget.ownerDocument))}
      </Options>}
    </Root>
  );
}

export function AssignmentDatePicker({ value, onChange }: { value: string; onChange: (date: string) => void }) {
  const selected = new Date(`${value}T00:00:00`);
  return (
    <AssignmentPicker calendar label="날짜 선택" value={dateLabel(selected)}>
      {(close) => <Calendar selected={selected} onSelect={(date, event) => { onChange(date); close(event); }} />}
    </AssignmentPicker>
  );
}

function Calendar({ selected, onSelect }: { selected: Date; onSelect: (date: string, event: MouseEvent<HTMLButtonElement>) => void }) {
  const [month, setMonth] = useState(selected);
  const year = month.getFullYear();
  const monthIndex = month.getMonth();
  const selectedKey = dateKey(selected);

  return (
    <>
      <Month>
        <strong aria-live="polite">{year}년 {monthIndex + 1}월</strong>
        <button type="button" aria-label="이전 달" onClick={() => setMonth(new Date(year, monthIndex - 1, 1))}>‹</button>
        <button type="button" aria-label="다음 달" onClick={() => setMonth(new Date(year, monthIndex + 1, 1))}>›</button>
      </Month>
      <Days>
        {weekdays.map((day) => <span key={day} aria-hidden="true">{day}</span>)}
        {monthDays(month).map((date) => {
          const key = dateKey(date);
          return date.getMonth() === monthIndex ? (
            <button key={key} type="button" aria-label={dateLabel(date)} aria-pressed={key === selectedKey}
              onClick={(event) => onSelect(key, event)}>{date.getDate()}</button>
          ) : <span key={key} />;
        })}
      </Days>
    </>
  );
}

const Root = styled.div`position: relative; min-width: 0;`;
const Trigger = styled.button`
  width: 100%;
  height: var(--picker-height, 48px);
  padding: 0 14px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  border: 1px solid #D6E0F2;
  border-radius: 7px;
  background: ${colors.surface};
  color: ${colors.text};
  font-size: 14px;
  cursor: pointer;
  span { color: ${colors.textMuted}; }
  &[aria-expanded="true"] { border-color: ${colors.primary}; }
`;
const Options = styled.div<{ $calendar?: boolean }>`
  position: absolute;
  z-index: 5;
  top: calc(100% + 7px);
  left: 0;
  width: ${({ $calendar }) => $calendar ? "min(320px, calc(100vw - 84px))" : "100%"};
  padding: ${({ $calendar }) => $calendar ? "12px 16px 18px" : "5px"};
  border: 1px solid #D6E0F2;
  border-radius: 9px;
  background: ${colors.surface};
  button { border: 0; background: transparent; color: inherit; cursor: pointer; }
  button:hover { background: ${colors.primarySoft}; }
`;
const Month = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 10px;
  strong { margin-right: auto; }
  button { width: 32px; height: 32px; border-radius: 6px; font-size: 22px; color: ${colors.textMuted}; }
`;
const Days = styled.div`
  display: grid;
  grid-template-columns: repeat(7, minmax(0, 1fr));
  grid-auto-rows: 42px;
  place-items: center;
  font-size: 13px;
  span { color: ${colors.textMuted}; }
  button { width: 30px; height: 30px; padding: 0; border-radius: 50%; }
  :nth-child(7n + 1) { color: #BD3440; }
  :nth-child(7n) { color: ${colors.primary}; }
  button[aria-pressed="true"] { color: white; background: ${colors.primary}; }
`;
