import { useEffect, useRef, useState, type FormEvent } from "react";
import styled from "@emotion/styled";
import { classes, grades, subjects, type Assessment } from "../../../entities/assessment";
import { FormButton, TextInput } from "../../../shared/FormControls";
import { colors } from "../../../shared/styles/colors";
import AssessmentDatePicker from "./AssessmentDatePicker";

const emptyDraft = { title: "", subject: "", dueDate: "", grade: "", classNumber: "", description: "" };

interface Props {
  assessment?: Assessment;
  onClose: () => void;
  onSave: (assessment: Omit<Assessment, "id">) => void;
}

export default function AssessmentFormModal({ assessment, onClose, onSave }: Props) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [draft, setDraft] = useState(assessment ?? emptyDraft);
  const [error, setError] = useState("");
  const action = assessment ? "수정" : "등록";

  useEffect(() => {
    const element = dialog.current;
    const previous = document.activeElement;
    element?.showModal();
    return () => {
      element?.close();
      if (previous instanceof HTMLElement) previous.focus();
    };
  }, []);

  function update(field: keyof typeof emptyDraft, value: string) {
    setDraft((current) => ({ ...current, [field]: value }));
    setError("");
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!draft.title.trim() || !draft.dueDate) {
      const field = !draft.title.trim() ? "assessment-title" : "assessment-date";
      setError(field === "assessment-title" ? "수행평가명을 입력해 주세요." : "마감일을 선택해 주세요.");
      document.getElementById(field)?.focus();
      return;
    }
    onSave({ ...draft, title: draft.title.trim(), description: draft.description.trim() });
  }

  return (
    <Dialog ref={dialog} aria-labelledby="assessment-modal-title" aria-describedby="assessment-modal-description" onCancel={onClose}>
      <form onSubmit={submit}>
        <h2 id="assessment-modal-title">수행평가 {action}</h2>
        <Description id="assessment-modal-description">대상 학급과 마감일을 설정하고 평가 내용을 입력해 주세요.</Description>
        <Fields>
          <label className="wide">수행평가명
            <TextInput id="assessment-title" required value={draft.title} onChange={(event) => update("title", event.target.value)} placeholder="수행평가명을 입력해 주세요" />
          </label>
          <label>과목
            <select required value={draft.subject} onChange={(event) => update("subject", event.target.value)}>
              <option value="" disabled>과목 선택</option>
              {subjects.map((subject) => <option key={subject}>{subject}</option>)}
            </select>
          </label>
          <div className="field">
            <label htmlFor="assessment-date">마감일</label>
            <AssessmentDatePicker value={draft.dueDate} onChange={(date) => update("dueDate", date)} />
          </div>
          <label>학년
            <select required value={draft.grade} onChange={(event) => update("grade", event.target.value)}>
              <option value="" disabled>학년 선택</option>
              {grades.map((grade) => <option key={grade} value={grade}>{grade}학년</option>)}
            </select>
          </label>
          <label>반
            <select data-placeholder={draft.classNumber === ""} value={draft.classNumber} onChange={(event) => update("classNumber", event.target.value)}>
              <option value="">전체 반</option>
              {classes.map((number) => <option key={number} value={number}>{number}반</option>)}
            </select>
          </label>
          <label className="wide">평가 내용
            <textarea value={draft.description} onChange={(event) => update("description", event.target.value)} placeholder="제출 방법과 평가 내용을 입력해 주세요." />
          </label>
        </Fields>
        <Actions>
          <ErrorMessage role="alert">{error}</ErrorMessage>
          <FormButton type="button" variant="plain" onClick={onClose}>취소</FormButton>
          <FormButton type="submit">{action}</FormButton>
        </Actions>
      </form>
    </Dialog>
  );
}

const Dialog = styled.dialog`
  width: 640px;
  max-width: calc(100vw - 32px);
  max-height: calc(100dvh - 32px);
  margin: auto;
  padding: clamp(20px, 4vw, 36px);
  border: 0;
  border-radius: 16px;
  color: ${colors.text};
  background: ${colors.surface};
  &::backdrop { background: rgba(25, 36, 59, .4); }
  h2 { font-size: 24px; line-height: 1.5; }
`;

const Description = styled.p`margin-top: 8px; color: ${colors.textMuted}; font-size: 14px;`;
const Fields = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 22px 24px;
  margin-top: 28px;
  .wide { grid-column: 1 / -1; }
  > label, .field { display: grid; gap: 10px; font-size: 14px; font-weight: 700; }
  input { height: 52px; }
  select, textarea {
    width: 100%;
    padding: 12px 15px;
    border: 1px solid #D6E0F2;
    border-radius: 8px;
    background: ${colors.surface};
    color: ${colors.text};
    font: inherit;
    font-weight: 400;
  }
  select { height: 52px; }
  select:invalid, select[data-placeholder="true"], textarea::placeholder, input::placeholder { color: ${colors.textMuted}; }
  input::placeholder { font-weight: 400; }
  textarea { min-height: 132px; resize: vertical; }
  select:focus-visible, textarea:focus-visible { outline: 2px solid #718DFF; }
  @media (max-width: 400px) { grid-template-columns: minmax(0, 1fr); }
`;
const Actions = styled.div`
  display: grid;
  grid-template-columns: 1fr 2.15fr;
  gap: 16px;
  margin-top: 32px;
`;
const ErrorMessage = styled.p`
  grid-column: 1 / -1;
  min-height: 20px;
  color: #a22438;
  font-size: 14px;
`;
