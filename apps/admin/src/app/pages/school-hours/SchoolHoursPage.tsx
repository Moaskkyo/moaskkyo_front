import styled from "@emotion/styled";
import PageHeading from "../../../shared/PageHeading";
import { useRef, useState } from "react";
import Card from "../../../shared/Card";
import { dateKey, dateLabel, monthDays, weekdays } from "../../../shared/lib/calendar";
import { colors } from "../../../shared/styles/colors";

const storageKey = "moaskkyo.dismissal";
const monthLabel = new Intl.DateTimeFormat("ko-KR", { year: "numeric", month: "long" });
const fullDate = new Intl.DateTimeFormat("ko-KR", { dateStyle: "full" });
const pad = (value: number) => String(value).padStart(2, "0");

function initialSchedule() {
  const fallback = { date: new Date(), time: "16:30" };
  try {
    const stored = JSON.parse(localStorage.getItem(storageKey) ?? "null");
    if (typeof stored?.date !== "string" || typeof stored?.time !== "string") return fallback;
    const date = new Date(`${stored.date}T00:00:00`);
    if (dateKey(date) === stored.date && /^(?:[01]\d|2[0-3]):[0-5]\d$/.test(stored.time)) {
      return { date, time: stored.time as string };
    }
  } catch {
    return fallback;
  }
  return fallback;
}

export default function SchoolHoursPage() {
  const [schedule, setSchedule] = useState(initialSchedule);
  const [month, setMonth] = useState(schedule.date);
  const [picker, setPicker] = useState<"date" | "time" | null>(null);
  const [feedback, setFeedback] = useState("");
  const dateButton = useRef<HTMLButtonElement>(null);
  const timeButton = useRef<HTMLButtonElement>(null);
  const [hour, minute] = schedule.time.split(":").map(Number);

  function chooseTime(unit: "hour" | "minute", value: number) {
    setSchedule((current) => {
      const [currentHour, currentMinute] = current.time.split(":");
      return {
        ...current,
        time: unit === "hour" ? `${pad(value)}:${currentMinute}` : `${currentHour}:${pad(value)}`,
      };
    });
    setFeedback("");
  }

  function changeMonth(offset: number) {
    setMonth(new Date(month.getFullYear(), month.getMonth() + offset, 1));
  }

  return (
    <>
      <Intro title="하교 시간 관리" description="하교 날짜와 시간을 설정하세요." />
      <Panel aria-labelledby="dismissal-heading">
        <h2 id="dismissal-heading">하교 시간</h2>
        <p>일반 하교 기준 날짜와 시간을 설정하세요.</p>
        <Form onSubmit={(event) => {
          event.preventDefault();
          setPicker(null);
          try {
            localStorage.setItem(storageKey, JSON.stringify({ date: dateKey(schedule.date), time: schedule.time }));
            setFeedback("하교 시간을 저장했습니다.");
          } catch {
            setFeedback("하교 시간을 저장하지 못했습니다. 브라우저 저장 공간을 확인해 주세요.");
          }
        }}>
          <Field onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) setPicker(null);
          }} onKeyDown={(event) => {
            if (event.key === "Escape" && picker === "date") {
              setPicker(null);
              dateButton.current?.focus();
            }
          }}>
            <span id="dismissal-date-label">날짜</span>
            <Trigger type="button" ref={dateButton} aria-labelledby="dismissal-date-label dismissal-date-value"
              aria-expanded={picker === "date"} aria-controls={picker === "date" ? "dismissal-calendar" : undefined}
              onClick={() => {
                setMonth(schedule.date);
                setPicker(picker === "date" ? null : "date");
              }}>
              <span id="dismissal-date-value">{dateLabel(schedule.date)}</span>
            </Trigger>
            {picker === "date" && (
              <Popover id="dismissal-calendar" role="group" aria-label="날짜 선택">
                <MonthHeader>
                  <strong aria-live="polite">{monthLabel.format(month)}</strong>
                  <button type="button" aria-label="이전 달" onClick={() => changeMonth(-1)}>‹</button>
                  <button type="button" aria-label="다음 달" onClick={() => changeMonth(1)}>›</button>
                </MonthHeader>
                <Calendar>
                  {weekdays.map((day) => <span key={day} aria-hidden="true">{day}</span>)}
                  {monthDays(month).map((day) => {
                    const key = dateKey(day);
                    if (day.getMonth() !== month.getMonth()) return <span key={key} />;
                    return (
                      <button key={key} type="button" aria-label={fullDate.format(day)}
                        aria-pressed={key === dateKey(schedule.date)} onClick={() => {
                          setSchedule({ ...schedule, date: day });
                          setFeedback("");
                          setPicker(null);
                          dateButton.current?.focus();
                        }}>
                        {day.getDate()}
                      </button>
                    );
                  })}
                </Calendar>
              </Popover>
            )}
          </Field>
          <Field onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) setPicker(null);
          }} onKeyDown={(event) => {
            if (event.key === "Escape" && picker === "time") {
              setPicker(null);
              timeButton.current?.focus();
            }
          }}>
            <span id="dismissal-time-label">시간</span>
            <Trigger type="button" ref={timeButton} aria-labelledby="dismissal-time-label dismissal-time-value"
              aria-expanded={picker === "time"} aria-controls={picker === "time" ? "dismissal-clock" : undefined}
              onClick={() => setPicker(picker === "time" ? null : "time")}>
              <span id="dismissal-time-value">{schedule.time}</span>
            </Trigger>
            {picker === "time" && (
              <Clock id="dismissal-clock" role="group" aria-label="시간 선택">
                <strong>시간 선택</strong>
                <ClockColumns>
                  <TimeColumn label="시" value={hour} count={24} onChange={(value) => chooseTime("hour", value)} />
                  <span aria-hidden="true">:</span>
                  <TimeColumn label="분" value={minute} count={60} onChange={(value) => chooseTime("minute", value)} />
                </ClockColumns>
                <p>스크롤하거나 숫자를 눌러 시간을 선택하세요.</p>
              </Clock>
            )}
          </Field>
          <p role="status">{feedback || "설정은 이 브라우저에 저장됩니다."}</p>
          <Save type="submit">저장</Save>
        </Form>
      </Panel>
    </>
  );
}

function TimeColumn({ label, value, count, onChange }: {
  label: string;
  value: number;
  count: number;
  onChange: (value: number) => void;
}) {
  const adjacentValue = (offset: number) => (value + offset + count) % count;
  return (
    <TimeValues role="group" aria-label={label} onWheel={(event) => {
      if (event.deltaY) onChange(adjacentValue(Math.sign(event.deltaY)));
    }}>
      <span>{label}</span>
      <button type="button" aria-label={`${pad(adjacentValue(-1))}${label} 선택`}
        onClick={() => onChange(adjacentValue(-1))}>{pad(adjacentValue(-1))}</button>
      <output aria-label={`선택한 ${label}`}>{pad(value)}</output>
      <button type="button" aria-label={`${pad(adjacentValue(1))}${label} 선택`}
        onClick={() => onChange(adjacentValue(1))}>{pad(adjacentValue(1))}</button>
    </TimeValues>
  );
}

const Intro = styled(PageHeading)`
  margin-bottom: 24px;
`;

const Panel = styled(Card)`
  padding: clamp(16px, 2.4vw, 28px);
  h2 { font-size: 20px; }
  > p { margin-top: 8px; color: ${colors.textMuted}; font-size: 14px; line-height: 1.5; }
`;

const Form = styled.form`
  display: grid;
  gap: 22px;
  margin-top: 30px;
  > p { min-height: 1.5em; color: ${colors.textMuted}; font-size: 13px; line-height: 1.5; }
`;

const Field = styled.div`
  position: relative;
  display: grid;
  gap: 8px;
  > span { font-size: 14px; font-weight: 700; }
`;

const Trigger = styled.button`
  min-height: 46px;
  padding: 8px 13px;
  text-align: left;
  font-size: 14px;
  border: 1px solid #cdd7e5;
  border-radius: 7px;
  background: ${colors.surface};
  cursor: pointer;
  &[aria-expanded="true"] { border-color: ${colors.primary}; }
`;

const Popover = styled.div`
  position: absolute;
  z-index: 2;
  top: calc(100% + 6px);
  inset-inline-start: 0;
  width: min(100%, 286px);
  padding: 10px;
  background: ${colors.surface};
  border: 1px solid #dbe3ef;
  border-radius: 10px;
  box-shadow: 0 4px 12px #19243b0d;
  font-size: 14px;
  button { border: 0; background: transparent; border-radius: 5px; cursor: pointer; }
  button:hover { background: ${colors.primarySoft}; }
`;

const MonthHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  margin-bottom: 8px;
  strong { margin-right: auto; }
  button { min-width: 30px; min-height: 32px; font-size: 20px; }
`;

const Calendar = styled.div`
  display: grid;
  grid-template-columns: repeat(7, minmax(0, 1fr));
  text-align: center;
  font-size: 13px;
  span, button { min-height: 32px; display: grid; place-items: center; padding: 0; }
  > :nth-child(7n + 1) { color: #b42336; }
  > :nth-child(7n) { color: #2452d2; }
  button[aria-pressed="true"] { background: #bf293f; color: white; font-weight: 700; }
`;

const Clock = styled(Popover)`
  width: min(100%, 248px);
  p { margin-top: 8px; font-size: 12px; }
`;

const ClockColumns = styled.div`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  margin-top: 8px;
  background: linear-gradient(${colors.primarySoft}, ${colors.primarySoft}) 0 65% / 100% 32px no-repeat;
  > span { transform: translateY(12px); color: #2452d2; }
`;

const TimeValues = styled.div`
  display: grid;
  grid-template-rows: 24px repeat(3, 32px);
  text-align: center;
  span, output { align-self: center; }
  span { font-size: 12px; color: ${colors.textMuted}; }
  output { color: #2452d2; font-weight: 700; }
`;

const Save = styled.button`
  width: 100%;
  min-height: 42px;
  border: 0;
  border-radius: 7px;
  background: #315ee0;
  color: white;
  font-weight: 700;
  cursor: pointer;
  &:hover { background: #254bc0; }
`;
