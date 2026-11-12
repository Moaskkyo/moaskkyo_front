import { useState } from "react";
import styled from "@emotion/styled";
import { mockTeachers, type Teacher } from "../../../entities/teacher";
import { TeacherFormModal } from "../../../features/edit-teacher";
import { TeacherSearch } from "../../../features/search-teacher";
import Card from "../../../shared/Card";
import FloorSelect from "../../../shared/FloorSelect";
import { FormButton } from "../../../shared/FormControls";
import { colors } from "../../../shared/styles/colors";

const PAGE_SIZE = 6;

export default function TeachersPage() {
  const [teachers, setTeachers] = useState(mockTeachers);
  const [query, setQuery] = useState("");
  const [floor, setFloor] = useState("");
  const [page, setPage] = useState(1);
  const [modal, setModal] = useState<{ teacher?: Teacher } | null>(null);
  const searchResults = teachers.filter((teacher) => teacher.name.includes(query.trim()));
  const filtered = searchResults.filter((teacher) => !floor || teacher.floor === floor);
  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, pageCount);
  const start = (currentPage - 1) * PAGE_SIZE;
  const visibleTeachers = filtered.slice(start, start + PAGE_SIZE);

  function saveTeacher(teacher: Teacher) {
    setTeachers((items) => items.some((item) => item.id === teacher.id)
      ? items.map((item) => item.id === teacher.id ? teacher : item) : [...items, teacher]);
    setModal(null);
  }

  return <Page>
    <Introduction><h1>선생님 위치 관리</h1><p>선생님의 교무실 위치를 확인하고 관리하세요.</p></Introduction>
    <Panel aria-labelledby="teachers-title">
      <PanelHeader><h2 id="teachers-title">선생님 목록</h2><p>이름으로 검색하거나 층별로 교무실 위치를 확인할 수 있어요.</p></PanelHeader>
      <Toolbar>
        <TeacherSearch value={query} teachers={searchResults} onChange={(value) => { setQuery(value); setPage(1); }}
          onSelect={(teacher) => { setQuery(teacher.name); setPage(1); }} />
        <FloorSelect compact includeAll label="층별 필터" value={floor} onChange={(value) => { setFloor(value); setPage(1); }} />
        <RegisterButton type="button" onClick={() => setModal({})}><span aria-hidden="true">＋</span> 선생님 등록</RegisterButton>
      </Toolbar>
      <TableWrapper><Table>
        <colgroup><col style={{ width: "34%" }} /><col style={{ width: "17%" }} /><col style={{ width: "36.5%" }} /><col style={{ width: "12.5%" }} /></colgroup>
        <thead><tr><th scope="col">선생님 이름</th><th scope="col">층</th><th scope="col">교무실</th><th scope="col">관리</th></tr></thead>
        <tbody>{visibleTeachers.map((teacher) => <tr key={teacher.id}>
          <td>{teacher.name} 선생님</td><td>{teacher.floor}층</td><td>{teacher.office}</td>
          <td><EditButton type="button" aria-label={`${teacher.name} 선생님 위치 수정`} onClick={() => setModal({ teacher })}>수정</EditButton></td>
        </tr>)}</tbody>
      </Table></TableWrapper>
      <Footer>
        <Total role="status">총 {filtered.length}명 · {filtered.length ? start + 1 : 0}–{Math.min(start + PAGE_SIZE, filtered.length)}명 표시</Total>
        <Pagination aria-label="선생님 목록 페이지">
          <PageButton type="button" aria-label="이전 페이지" disabled={currentPage === 1} onClick={() => setPage(currentPage - 1)}>‹</PageButton>
          {Array.from({ length: pageCount }, (_, index) => index + 1).map((number) => <PageButton type="button" key={number} aria-label={`${number}페이지`} aria-current={number === currentPage ? "page" : undefined} onClick={() => setPage(number)}>{number}</PageButton>)}
          <PageButton type="button" aria-label="다음 페이지" disabled={currentPage === pageCount} onClick={() => setPage(currentPage + 1)}>›</PageButton>
        </Pagination>
      </Footer>
    </Panel>
    {modal && <TeacherFormModal teacher={modal.teacher} teachers={teachers} onClose={() => setModal(null)} onSave={saveTeacher} />}
  </Page>;
}

const Page = styled.div`font-size: 14px; line-height: 1.5;`;
const Introduction = styled.div`
  h1 { font-size: 30px; line-height: 42px; font-weight: 700; }
  p { margin-top: 4px; color: #7F8DA7; font-size: 14px; line-height: 22px; }
`;
const Panel = styled(Card)`margin-top: 28px; padding: 24px 27px 16px; border-radius: 12px;`;
const PanelHeader = styled.div`
  h2 { font-size: 20px; line-height: 30px; }
  p { color: #7F8DA7; font-size: 14px; margin-top: 8px; line-height: 22px; }
`;
const Toolbar = styled.div`
  display: grid; grid-template-columns: minmax(0, 1fr) 192px 220px; gap: 16px; margin-top: 20px; margin-bottom: 32px;
  @media (max-width: 1100px) { grid-template-columns: minmax(0, 1fr) 140px 170px; }
`;
const RegisterButton = styled(FormButton)`height: 48px; span { margin-right: 4px; }`;
const TableWrapper = styled.div`min-height: 500px; overflow-x: auto;`;
const Table = styled.table`
  width: 100%; min-width: 580px; border-collapse: collapse; table-layout: fixed; text-align: left;
  th { height: 44px; padding: 0 20px; background: #F5F7FB; color: #7F8DA7; font-weight: 400; font-size: 13px; }
  td { height: 76px; padding: 0 20px; border-bottom: 1px solid ${colors.border}; overflow-wrap: anywhere; }
`;
const EditButton = styled.button`border: 0; padding: 8px 0; background: transparent; color: ${colors.primary}; font: inherit; font-weight: 700; cursor: pointer;`;
const Footer = styled.div`display: flex; align-items: center; justify-content: space-between; gap: 16px; margin-top: 32px; min-height: 44px;`;
const Total = styled.p`font-size: 12px; color: #7F8DA7;`;
const Pagination = styled.nav`display: flex; gap: 2px; flex-wrap: wrap;`;
const PageButton = styled.button`
  width: 40px; height: 40px; border: 0; background: transparent; font: inherit; cursor: pointer;
  &[aria-current="page"] { color: ${colors.primary}; font-weight: 700; }
  &:disabled { color: #98A7C0; cursor: default; }
`;
