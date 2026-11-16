import { useEffect, useRef, useState, type FormEvent } from "react";
import styled from "@emotion/styled";
import type { AcademicSchedule } from "../../../entities/schedule";
import { dateKey, dateLabel } from "../../../shared/lib/calendar";
import { FormButton, TextInput } from "../../../shared/FormControls";
import { colors } from "../../../shared/styles/colors";

interface Props {
  date: Date;
  schedule?: AcademicSchedule;
  onClose: () => void;
  onSave: (schedule: AcademicSchedule) => void;
}
export default function ScheduleFormModal({ date, schedule, onClose, onSave }: Props) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [title, setTitle] = useState(schedule?.title ?? "");
  const [memo, setMemo] = useState(schedule?.memo ?? "");
  useEffect(() => {
    const previous = document.activeElement;
    const element = dialog.current;
    element?.showModal();
    return () => { element?.close(); if (previous instanceof HTMLElement) previous.focus(); };
  }, []);
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!title.trim()) { dialog.current?.querySelector<HTMLInputElement>("#schedule-title")?.focus(); return; }
    onSave({ id: schedule?.id ?? crypto.randomUUID(), date: dateKey(date), title: title.trim(), memo: memo.trim() });
  }
  return <Dialog ref={dialog} aria-labelledby="schedule-modal-title" aria-describedby="schedule-modal-description" onCancel={onClose}>
    <form onSubmit={submit}>
      <h2 id="schedule-modal-title">학사일정 추가</h2>
      <Description id="schedule-modal-description">선택한 날짜에 새로운 학교 일정을 등록하세요.</Description>
      <Fields>
        <Field><label htmlFor="schedule-title">일정명</label><Input id="schedule-title" autoFocus required value={title} onChange={(event) => setTitle(event.target.value)} placeholder="일정명을 입력해 주세요" /></Field>
        <Field><label htmlFor="schedule-date">날짜</label><Input id="schedule-date" readOnly value={dateLabel(date)} /></Field>
        <Field><label htmlFor="schedule-memo">메모 (선택)</label><Memo id="schedule-memo" value={memo} onChange={(event) => setMemo(event.target.value)} placeholder="일정에 대한 안내를 입력해 주세요" /></Field>
      </Fields>
      <Actions><FormButton type="button" variant="plain" onClick={onClose}>취소</FormButton><FormButton type="submit">저장</FormButton></Actions>
    </form>
  </Dialog>;
}
const Dialog = styled.dialog`
  width: 600px; max-width: calc(100vw - 32px); max-height: calc(100dvh - 32px);
  margin: auto; padding: 28px 36px 48px; border: 0; border-radius: 16px;
  color: ${colors.text}; background: white; overflow: auto;
  &::backdrop { background: rgba(25, 36, 59, .4); }
  h2 { font-size: 26px; line-height: 38px; }
`;
const Description = styled.p`margin-top: 8px; color: #7F8DA7; font-size: 14px; line-height: 22px;`;
const Fields = styled.div`display: grid; gap: 24px; margin-top: 28px;`;
const Field = styled.div`display: grid; gap: 12px; label { font-size: 14px; font-weight: 700; line-height: 20px; }`;
const Input = styled(TextInput)`height: 52px;`;
const Memo = styled.textarea`
  width: 100%; height: 104px; padding: 16px 15px; resize: vertical;
  border: 1px solid #D6E0F2; border-radius: 8px; color: ${colors.text}; font: inherit; font-size: 14px;
  &::placeholder { color: #8999B5; opacity: 1; }
  &:focus { outline: none; border-color: #718DFF; box-shadow: 0 0 0 1px #718DFF; background: #F8FAFF; }
`;
const Actions = styled.div`display: grid; grid-template-columns: 164px 1fr; gap: 16px; margin-top: 62px;
  @media(max-width: 480px) { grid-template-columns: 1fr 2fr; }
`;
