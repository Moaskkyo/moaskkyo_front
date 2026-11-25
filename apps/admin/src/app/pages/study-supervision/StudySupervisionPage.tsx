import { useState } from "react";
import styled from "@emotion/styled";
import { type Floor, type Teacher, mockTeachers } from "../../../entities/teacher";
import Card from "../../../shared/Card";
import PageHeading from "../../../shared/PageHeading";
import { colors } from "../../../shared/styles/colors";
import { AssignmentDatePicker } from "./AssignmentPicker";
import AssignmentDialog from "./AssignmentDialog";

type FloorAssignments = Partial<Record<Floor, string>>;
const floors: Floor[] = ["2", "3", "4"];
const previewDate = "2026-10-27";

export default function StudySupervisionPage() {
  const [date, setDate] = useState(previewDate);
  const [assignments, setAssignments] = useState<Partial<Record<string, FloorAssignments>>>({
    [previewDate]: { "2": "1", "3": "2" },
  });
  const [editingFloor, setEditingFloor] = useState<Floor | null>(null);
  const rows = floors.map((floor) => ({
    floor,
    teacher: mockTeachers.find((teacher) => teacher.id === assignments[date]?.[floor]),
  }));

  function save(targetDate: string, floor: Floor, teacher: Teacher) {
    setAssignments((current) => ({
      ...current,
      [targetDate]: { ...current[targetDate], [floor]: teacher.id },
    }));
    setDate(targetDate);
  }

  return (
    <Page>
      <PageHeading title="자습감독 선생님" description="날짜별로 층별 자습감독 선생님을 확인하고 배정하세요." />
      <Panel aria-labelledby="assignment-title">
        <h2 id="assignment-title">층별 감독 배정</h2>
        <p>날짜를 선택하면 해당 날짜의 감독 선생님을 확인할 수 있어요.</p>
        <Toolbar>
          <DateControl><AssignmentDatePicker value={date} onChange={setDate} /></DateControl>
          <span role="status">배정 완료 {rows.filter(({ teacher }) => teacher).length} / {floors.length}층</span>
        </Toolbar>
        <Table>
          <colgroup><col width="20%" /><col width="45%" /><col width="23%" /><col /></colgroup>
          <thead><tr>
            <th scope="col">층</th><th scope="col">감독 선생님</th><th scope="col">배정 상태</th><th scope="col">관리</th>
          </tr></thead>
          <tbody>
            {rows.map(({ floor, teacher }) => (
              <tr key={floor}>
                <th scope="row">{floor}층</th>
                <td>{teacher ? `${teacher.name} 선생님` : <Muted>미배정</Muted>}</td>
                <td><Status $assigned={!!teacher}>{teacher ? "배정 완료" : "배정 필요"}</Status></td>
                <td><Action type="button" aria-label={`${floor}층 감독 선생님 ${teacher ? "수정" : "배정"}`}
                  onClick={() => setEditingFloor(floor)}>{teacher ? "수정" : "배정"}</Action></td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Note>배정된 선생님은 해당 날짜의 학생 화면에 표시됩니다.</Note>
      </Panel>
      {editingFloor && <AssignmentDialog initialDate={date} initialFloor={editingFloor} floors={floors}
        getTeacher={(day, floor) => mockTeachers.find((teacher) => teacher.id === assignments[day]?.[floor])}
        onSave={save} onClose={() => setEditingFloor(null)} />}
    </Page>
  );
}

const Page = styled.div`display: grid; gap: 24px;`;
const Panel = styled(Card)`
  padding: clamp(14px, 2vw, 26px);
  h2 { font-size: 20px; line-height: 1.4; }
  > p { margin-top: 6px; color: ${colors.textMuted}; font-size: 14px; }
`;
const Toolbar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 12px;
  margin: 20px 0 28px;
  font-size: 13px;
  color: ${colors.textMuted};
  > span { margin-right: clamp(0px, 3vw, 44px); }
`;
const DateControl = styled.div`width: min(100%, 320px); --picker-height: 44px;`;
const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  th, td { padding: 0 clamp(5px, 1.4vw, 18px); }
  thead { background: #F2F5FA; color: ${colors.textMuted}; }
  thead th { height: 42px; font-size: 13px; font-weight: 500; }
  tbody tr { height: 80px; border-bottom: 1px solid ${colors.border}; }
  @media (max-width: 600px) {
    table-layout: fixed;
    th, td { font-size: 12px; overflow-wrap: anywhere; }
  }
`;
const Muted = styled.span`color: ${colors.textMuted};`;
const Status = styled.span<{ $assigned: boolean }>`
  color: ${({ $assigned }) => $assigned ? colors.textMuted : "#A65700"};
  font-size: 13px;
`;
const Action = styled.button`
  padding: 6px 0;
  border: 0;
  background: transparent;
  color: ${colors.primary};
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  &:hover { text-decoration: underline; }
`;
const Note = styled.p`
  && { margin-top: 60px; font-size: 13px; }
`;
