import styled from "@emotion/styled";
import { useLayoutEffect, useRef, useState } from "react";
import {
  classNumbers, exams, getClassTimetables, grades, periods, saveTimetable,
} from "../../../entities/exam-timetable";
import type { ClassNumber, ExamId, Grade, Timetable } from "../../../entities/exam-timetable";
import Card from "../../../shared/Card";
import { FormButton, TextInput } from "../../../shared/FormControls";
import PageHeading from "../../../shared/PageHeading";
import { colors } from "../../../shared/styles/colors";

export default function ExamTimetablePage() {
  const [examId, setExamId] = useState<ExamId>(exams[0].id);
  const [grade, setGrade] = useState<Grade>("1");
  const [classNumber, setClassNumber] = useState<ClassNumber | "all">("1");
  const [draft, setDraft] = useState<Timetable | null>(null);
  const [feedback, setFeedback] = useState("");
  const editButton = useRef<HTMLButtonElement>(null);
  const firstInput = useRef<HTMLInputElement>(null);
  const restoreFocus = useRef(false);
  const editing = draft !== null;
  const exam = exams.find(({ id }) => id === examId) ?? exams[0];
  const classTimetables = getClassTimetables(examId, grade, classNumber);
  const timetable = draft ?? classTimetables[0];

  useLayoutEffect(() => {
    if (editing) firstInput.current?.focus();
    else if (restoreFocus.current) {
      editButton.current?.focus();
      restoreFocus.current = false;
    }
  }, [editing]);

  function startEditing() {
    setFeedback("");
    setDraft(timetable.map((row) => [...row]));
  }

  function finishEditing() {
    restoreFocus.current = true;
    setDraft(null);
  }

  function updateSubject(rowIndex: number, dateIndex: number, subject: string) {
    setDraft((current) => current?.map((row, index) =>
      index === rowIndex ? row.map((value, column) => column === dateIndex ? subject : value) : row,
    ) ?? null);
  }

  function save() {
    if (!draft || classNumber === "all") return;
    try {
      saveTimetable(examId, grade, classNumber, draft.map((row) => row.map((subject) => subject.trim())));
      setFeedback("시험 시간표를 저장했습니다.");
      finishEditing();
    } catch {
      setFeedback("시험 시간표를 저장하지 못했습니다. 브라우저 저장 공간을 확인해 주세요.");
    }
  }

  return (
    <>
      <Intro title="시험 시간표" description="시험별·학년별·반별 시간표를 확인하고 관리하세요." />
      <Panel aria-labelledby="exam-timetable-heading">
        <h2 id="exam-timetable-heading">{editing ? "시험 시간표 수정" : "학급별 시험 시간표"}</h2>
        <p>{editing ? "각 칸에 과목명을 직접 입력한 뒤 저장해 주세요." : "시험과 학급을 선택해 날짜·교시별 과목을 확인하세요."}</p>
        <form onSubmit={(event) => { event.preventDefault(); save(); }}>
          <Toolbar>
            <Select aria-label="시험" value={examId} disabled={editing} onChange={(event) => {
              const selectedExam = exams.find(({ id }) => id === event.currentTarget.value);
              if (selectedExam) setExamId(selectedExam.id);
              setFeedback("");
            }}>
              {exams.map(({ id, name }) => <option key={id} value={id}>{name}</option>)}
            </Select>
            <Select aria-label="학년" value={grade} disabled={editing} onChange={(event) => {
              const selectedGrade = grades.find((value) => value === event.currentTarget.value);
              if (selectedGrade) setGrade(selectedGrade);
              setFeedback("");
            }}>
              {grades.map((value) => <option key={value} value={value}>{value}학년</option>)}
            </Select>
            <Select aria-label="반" value={classNumber} disabled={editing} onChange={(event) => {
              const value = event.currentTarget.value;
              const selectedClass = classNumbers.find((number) => number === value);
              setClassNumber(selectedClass ?? "all");
              setFeedback("");
            }}>
              <option value="all">전체</option>
              {classNumbers.map((value) => <option key={value} value={value}>{value}반</option>)}
            </Select>
            <Actions>
              {editing ? (
                <>
                  <Action type="button" variant="plain" onClick={() => { setFeedback(""); finishEditing(); }}>취소</Action>
                  <Action type="submit">저장</Action>
                </>
              ) : (
                <Action type="button" ref={editButton} disabled={classNumber === "all"} onClick={startEditing}>
                  시간표 수정
                </Action>
              )}
            </Actions>
          </Toolbar>
          <TableScroll role="region" aria-label="날짜·교시별 시험 시간표" tabIndex={0}>
            <Table aria-label={`${exam.name} ${grade}학년 ${classNumber === "all" ? "전체 반" : `${classNumber}반`}`}>
              <thead>
                <tr>
                  <th scope="col">교시</th>
                  {exam.dates.map((date) => <th key={date} scope="col">{date}</th>)}
                </tr>
              </thead>
              <tbody>
                {periods.map((period, rowIndex) => (
                  <tr key={period}>
                    <th scope="row">{period}교시</th>
                    {exam.dates.map((date, dateIndex) => {
                      const subject = timetable[rowIndex][dateIndex];
                      const differsByClass = classTimetables.some((rows) => rows[rowIndex][dateIndex] !== subject);
                      return (
                        <td key={date}>
                          {editing ? (
                            <SubjectInput
                              ref={rowIndex === 0 && dateIndex === 0 ? firstInput : undefined}
                              aria-label={`${date} ${period}교시 과목명`}
                              value={subject}
                              onChange={(event) => updateSubject(rowIndex, dateIndex, event.currentTarget.value)}
                            />
                          ) : differsByClass ? (
                            <ClassSubjects>
                              {classNumbers.map((number, index) => (
                                <li key={number}>{number}반 {classTimetables[index][rowIndex][dateIndex] || "미지정"}</li>
                              ))}
                            </ClassSubjects>
                          ) : (
                            <Subject $muted={!subject || subject === "자습"}>{subject || "미지정"}</Subject>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </Table>
          </TableScroll>
          <Note role="status">
            {feedback || (classNumber === "all"
              ? "시간표를 수정하려면 반을 선택해 주세요."
              : editing ? "저장하면 이 브라우저에서 선택한 학급의 시험 시간표에 반영됩니다."
                : "선택한 학년·반의 시험 시간표를 확인할 수 있습니다.")}
          </Note>
        </form>
      </Panel>
    </>
  );
}

const Intro = styled(PageHeading)`
  margin-bottom: 28px;
`;

const Panel = styled(Card)`
  padding: clamp(16px, 2vw, 28px);
  h2 { font-size: 20px; line-height: 1.4; }
  > p { margin-top: 8px; color: ${colors.textMuted}; font-size: 14px; line-height: 1.5; }
`;

const Toolbar = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(76px, 14%) minmax(76px, 14%) minmax(160px, 21%);
  gap: 12px;
  margin: 20px 0 clamp(24px, 3.3vw, 48px);

  @media (max-width: 850px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    > :first-child, > :last-child { grid-column: 1 / -1; }
  }
`;

const Select = styled.select`
  width: 100%;
  min-width: 0;
  min-height: 46px;
  padding: 0 12px;
  border: 1px solid #D6E0F2;
  border-radius: 8px;
  background: ${colors.surface};
  color: ${colors.text};
  font: inherit;
  font-size: 14px;
  &:focus-visible { outline: 2px solid ${colors.primary}; outline-offset: 2px; }
  &:disabled { color: ${colors.text}; opacity: 1; }
`;

const Actions = styled.div`
  display: flex;
  gap: 12px;
  > button { flex: 1; }
`;

const Action = styled(FormButton)`
  height: 46px;
  padding-inline: 10px;
  &:focus-visible { outline: 2px solid ${colors.primary}; outline-offset: 2px; }
`;

const TableScroll = styled.div`
  overflow-x: auto;
  &:focus-visible { outline: 2px solid ${colors.primary}; outline-offset: 2px; }
`;

const Table = styled.table`
  width: 100%;
  min-width: 440px;
  table-layout: fixed;
  border-collapse: collapse;
  text-align: center;
  font-size: 16px;
  th, td { border: 1px solid ${colors.border}; padding: 12px 14px; }
  th:first-child { width: 13%; }
  thead th { height: 56px; background: #F2F5FA; color: ${colors.textMuted}; font-size: 14px; }
  tbody th { background: #F7F9FC; }
  tbody td, tbody th { height: clamp(72px, 7vw, 100px); }
  td { overflow-wrap: anywhere; }
`;

const Subject = styled.span<{ $muted: boolean }>`
  color: ${({ $muted }) => $muted ? colors.textMuted : colors.text};
  font-weight: 600;
`;

const ClassSubjects = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  font-size: 14px;
  line-height: 1.5;
`;

const SubjectInput = styled(TextInput)`
  height: 50px;
  border-radius: 0;
`;

const Note = styled.p`
  margin: clamp(24px, 3vw, 36px) 0 8px;
  color: ${colors.textMuted};
  font-size: 13px;
  line-height: 1.5;
`;
