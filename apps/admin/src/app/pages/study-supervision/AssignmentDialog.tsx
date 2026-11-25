import { useEffect, useId, useRef, useState } from "react";
import styled from "@emotion/styled";
import { type Floor, type Teacher, mockTeachers } from "../../../entities/teacher";
import { TeacherSearch } from "../../../features/search-teacher";
import { FormButton } from "../../../shared/FormControls";
import { colors } from "../../../shared/styles/colors";
import { AssignmentDatePicker, AssignmentPicker } from "./AssignmentPicker";

interface Props {
  initialDate: string;
  initialFloor: Floor;
  floors: Floor[];
  getTeacher: (date: string, floor: Floor) => Teacher | undefined;
  onSave: (date: string, floor: Floor, teacher: Teacher) => void;
  onClose: () => void;
}

export default function AssignmentDialog({ initialDate, initialFloor, floors, getTeacher, onSave, onClose }: Props) {
  const titleId = useId();
  const descriptionId = useId();
  const dialog = useRef<HTMLDialogElement>(null);
  const [date, setDate] = useState(initialDate);
  const [floor, setFloor] = useState(initialFloor);
  const [teacher, setTeacher] = useState(() => getTeacher(initialDate, initialFloor));
  const [query, setQuery] = useState(teacher?.name ?? "");
  const editing = !!getTeacher(date, floor);
  const actionLabel = editing ? "수정" : "배정";
  const results = mockTeachers.filter(({ name }) => name.includes(query.trim()));

  useEffect(() => {
    if (dialog.current && !dialog.current.open) dialog.current.showModal();
  }, []);

  function changeTarget(nextDate: string, nextFloor: Floor) {
    if (date === nextDate && floor === nextFloor) return;
    const currentTeacher = getTeacher(nextDate, nextFloor);
    setDate(nextDate);
    setFloor(nextFloor);
    setTeacher(currentTeacher);
    setQuery(currentTeacher?.name ?? "");
  }

  return (
    <Dialog ref={dialog} aria-labelledby={titleId} aria-describedby={descriptionId} onClose={onClose}>
      <Form onSubmit={(event) => {
        event.preventDefault();
        if (!teacher) return;
        onSave(date, floor, teacher);
        dialog.current?.close();
      }}>
        <header>
          <h2 id={titleId}>자습감독 선생님 {actionLabel}</h2>
          <p id={descriptionId}>선택한 날짜와 층의 감독 선생님을 {actionLabel}하세요.</p>
        </header>
        <Fields>
          <div>
            <FieldName>날짜</FieldName>
            <AssignmentDatePicker value={date} onChange={(nextDate) => changeTarget(nextDate, floor)} />
          </div>
          <div>
            <FieldName>층</FieldName>
            <AssignmentPicker label="층 선택" value={`${floor}층`}>
              {(close) => floors.map((option) => (
                <FloorOption key={option} type="button" aria-pressed={option === floor}
                  onClick={(event) => { changeTarget(date, option); close(event); }}>
                  {option}층{option === floor && <span aria-hidden="true">✓</span>}
                </FloorOption>
              ))}
            </AssignmentPicker>
          </div>
        </Fields>
        <SearchField onKeyDown={(event) => {
          if (event.key === "Escape" && event.target instanceof HTMLInputElement &&
            event.target.getAttribute("aria-expanded") === "true") event.preventDefault();
        }}>
          <FieldName>감독 선생님</FieldName>
          <TeacherSearch value={query} teachers={results}
            onChange={(value) => { setQuery(value); setTeacher(undefined); }}
            onSelect={(selected) => { setQuery(selected.name); setTeacher(selected); }} />
          <p>이름을 입력하면 등록된 선생님 목록이 나타납니다.</p>
        </SearchField>
        <p>배정한 선생님은 해당 날짜의 학생 화면에 표시됩니다.</p>
        <Actions>
          <FormButton type="button" variant="plain" onClick={() => dialog.current?.close()}>취소</FormButton>
          <FormButton type="submit" disabled={!teacher}>{actionLabel}</FormButton>
        </Actions>
      </Form>
    </Dialog>
  );
}

const Dialog = styled.dialog`
  position: fixed;
  inset: 0;
  margin: auto;
  width: min(544px, calc(100% - 32px));
  max-height: calc(100dvh - 32px);
  padding: 0;
  border: 1px solid ${colors.border};
  border-radius: 16px;
  color: ${colors.text};
  background: ${colors.surface};
  &::backdrop { background: rgb(25 36 59 / 40%); }
`;
const Form = styled.form`
  padding: clamp(20px, 3.2vw, 32px) clamp(18px, 3.2vw, 32px) 52px;
  --picker-height: 50px;
  h2 { font-size: 24px; line-height: 1.4; }
  p { font-size: 13px; line-height: 1.5; color: ${colors.textMuted}; }
  header > p { margin-top: 8px; }
  > p { margin-top: 36px; }
`;
const Fields = styled.div`
  margin-top: 24px;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 20px;
`;
const FieldName = styled.div`margin-bottom: 10px; font-size: 14px; font-weight: 700;`;
const FloorOption = styled.button`
  width: 100%;
  min-height: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 12px;
  border-radius: 5px;
  font-size: 14px;
  &[aria-pressed="true"] { background: ${colors.primarySoft}; color: ${colors.primary}; }
`;
const SearchField = styled.div`
  margin-top: 34px;
  > p { margin-top: 12px; }
  [role="combobox"] { height: 50px; }
  [role="option"] { min-height: 48px; padding: 8px; }
  [role="option"] span:last-child { margin-right: 0; }
  [role="combobox"] + div { max-height: 138px; padding: 5px; }
  [role="status"] { padding: 4px 8px; }
`;
const Actions = styled.div`
  display: grid;
  grid-template-columns: 1fr 2.1fr;
  gap: 14px;
  margin-top: 64px;
  button { height: 48px; }
`;
