import { useState } from "react";
import styled from "@emotion/styled";
import { useSchoolSchedule } from "../api/useSchoolSchedule";
import { getGrade } from "../model/grade";
import { useToday } from "../model/useToday";
import type { ScheduleKind } from "../model/types";
import {
  findNextEvent,
  formatFullDate,
  formatMonthDay,
  getDaysUntil,
} from "../utils/schedule";
import DdayBlockLayout from "./DdayBlockLayout";

interface ScheduleCountdownProps {
  kind: ScheduleKind;
}

const LABELS: Record<ScheduleKind, { title: string; empty: string }> = {
  EXAM: { title: "시험", empty: "예정된 시험이 없어요" },
  VACATION: { title: "방학", empty: "예정된 방학이 없어요" },
};

const BLOCK_SIZE = { width: 362, height: 200 };

export default function ScheduleCountdown({ kind }: ScheduleCountdownProps) {
  const today = useToday();
  const [grade] = useState(getGrade);
  const { data, isError } = useSchoolSchedule(today);
  const { title, empty } = LABELS[kind];

  if (!data) {
    const status = isError ? "불러오지 못했습니다" : "불러오는 중입니다...";
    return (
      <DdayBlockLayout
        title={title}
        {...BLOCK_SIZE}
        text={status}
        time={<Status>{status}</Status>}
      />
    );
  }

  const event = findNextEvent(data, kind, today, grade);
  if (!event) {
    return (
      <DdayBlockLayout
        title={title}
        {...BLOCK_SIZE}
        text={empty}
        time={<Status>{empty}</Status>}
      />
    );
  }

  const days = getDaysUntil(event.date, today);
  const text =
    kind === "EXAM"
      ? `${event.name} · ${formatMonthDay(event.date)}`
      : `${event.name} 시작일 ${formatFullDate(event.date)}`;

  return (
    <DdayBlockLayout
      title={title}
      {...BLOCK_SIZE}
      text={text}
      DayCountDown={days}
    />
  );
}

const Status = styled.span`
  display: block;
  font-size: 28px;
`;
