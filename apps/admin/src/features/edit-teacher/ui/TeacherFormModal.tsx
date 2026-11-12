import { useEffect, useRef, useState, type FormEvent } from "react";
import styled from "@emotion/styled";
import type { Floor, Teacher } from "../../../entities/teacher";
import FloorSelect from "../../../shared/FloorSelect";
import { FormButton, TextInput } from "../../../shared/FormControls";
import { colors } from "../../../shared/styles/colors";

interface TeacherFormModalProps {
  teacher?: Teacher;
  teachers: Teacher[];
  onClose: () => void;
  onSave: (teacher: Teacher) => void;
}

export default function TeacherFormModal({ teacher, teachers, onClose, onSave }: TeacherFormModalProps) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [name, setName] = useState(teacher?.name ?? "");
  const [floor, setFloor] = useState(teacher?.floor ?? "");
  const [office, setOffice] = useState(teacher?.office ?? "");
  const [checkedName, setCheckedName] = useState(teacher?.name ?? "");
  const [message, setMessage] = useState("");
  const [duplicate, setDuplicate] = useState(false);
  const action = teacher ? "수정" : "등록";

  useEffect(() => {
    const previousFocus = document.activeElement;
    const modal = dialog.current;
    modal?.showModal();
    return () => { modal?.close(); if (previousFocus instanceof HTMLElement) previousFocus.focus(); };
  }, []);

  function checkName() {
    const exists = teachers.some((item) => item.id !== teacher?.id && item.name === name.trim());
    setDuplicate(exists);
    setCheckedName(exists ? "" : name.trim());
    setMessage(exists ? "이미 등록된 선생님입니다." : "사용 가능한 이름입니다.");
    return !exists;
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!name.trim() || !office.trim() || !floor) return;
    if (checkedName !== name.trim() && !checkName()) return;
    onSave({ id: teacher?.id ?? crypto.randomUUID(), name: name.trim(), floor: floor as Floor, office: office.trim() });
  }

  return <Dialog ref={dialog} aria-labelledby="teacher-modal-title" aria-describedby="teacher-modal-description" onCancel={onClose}>
    <form onSubmit={submit}>
      <h2 id="teacher-modal-title">선생님 {action}</h2>
      <Description id="teacher-modal-description">선생님 이름과 교무실 위치를 입력해 주세요.</Description>
      <Fields>
        <Field>
          <LabelRow><label htmlFor="teacher-name">선생님 이름</label><Message id="teacher-name-message" $error={duplicate} role="status">{message}</Message></LabelRow>
          <NameRow><TextInput id="teacher-name" autoFocus required autoComplete="off" maxLength={30} placeholder="이름을 입력해 주세요"
            value={name} aria-invalid={duplicate} aria-describedby={message ? "teacher-name-message" : undefined}
            onChange={(event) => { setName(event.target.value); setCheckedName(""); setDuplicate(false); setMessage(""); }} />
            <DuplicateButton type="button" variant="outline" disabled={!name.trim()} onClick={checkName}>중복 확인</DuplicateButton>
          </NameRow>
        </Field>
        <Field><label htmlFor="teacher-floor">층</label><FloorSelect id="teacher-floor" label="선생님 교무실 층" value={floor} onChange={setFloor} /></Field>
        <Field><label htmlFor="teacher-office">교무실</label><TextInput id="teacher-office" required maxLength={60} placeholder="교무실 이름을 입력해 주세요" value={office} onChange={(event) => setOffice(event.target.value)} /></Field>
      </Fields>
      <Actions><FormButton type="button" variant="plain" onClick={onClose}>취소</FormButton><FormButton type="submit" onClick={() => {
        if (!floor) dialog.current?.querySelector<HTMLButtonElement>("#teacher-floor")?.focus();
      }}>{action}</FormButton></Actions>
    </form>
  </Dialog>;
}

const Dialog = styled.dialog`
  width: 560px; max-width: calc(100vw - 32px); max-height: calc(100dvh - 32px);
  margin: auto; border: 0; border-radius: 16px; padding: 30px 36px 60px;
  background: white; color: ${colors.text}; overflow: auto;
  &::backdrop { background: rgba(25, 36, 59, 0.4); }
  h2 { font-size: 26px; line-height: 36px; font-weight: 700; }
  @media (max-height: 700px) { padding-bottom: 30px; }
`;
const Description = styled.p`margin-top: 8px; color: #7F8DA7; font-size: 14px; line-height: 22px;`;
const Fields = styled.div`display: grid; gap: 24px; margin-top: 30px;`;
const Field = styled.div`display: grid; gap: 14px; label { font-size: 14px; line-height: 18px; font-weight: 700; }`;
const LabelRow = styled.div`display: flex; align-items: center; gap: 24px; min-height: 18px; flex-wrap: wrap;`;
const Message = styled.span<{ $error: boolean }>`font-size: 12px; color: ${({ $error }) => $error ? "#FF304D" : colors.primary};`;
const NameRow = styled.div`display: grid; grid-template-columns: minmax(0, 1fr) 120px; gap: 12px;`;
const DuplicateButton = styled(FormButton)`height: 56px; padding: 0 10px;`;
const Actions = styled.div`display: grid; grid-template-columns: 152px minmax(0, 1fr); gap: 16px; margin-top: 72px;
  @media (max-width: 480px) { grid-template-columns: 1fr 2fr; }
  @media (max-height: 700px) { margin-top: 32px; }
`;
