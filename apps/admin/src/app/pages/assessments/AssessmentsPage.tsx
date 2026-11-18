import { useState } from "react";
import styled from "@emotion/styled";
import { assessmentTarget, classes, grades, mockAssessments, subjects, type Assessment } from "../../../entities/assessment";
import { AssessmentFormModal } from "../../../features/edit-assessment";
import Card from "../../../shared/Card";
import { FormButton, TextInput } from "../../../shared/FormControls";
import PageHeading from "../../../shared/PageHeading";
import { colors } from "../../../shared/styles/colors";

const pageSize = 6;

export function AssessmentsPage() {
  const [assessments, setAssessments] = useState(mockAssessments);
  const [query, setQuery] = useState("");
  const [search, setSearch] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [subject, setSubject] = useState("");
  const [grade, setGrade] = useState("");
  const [classNumber, setClassNumber] = useState("");
  const [page, setPage] = useState(1);
  const [modal, setModal] = useState<{ assessment?: Assessment } | null>(null);
  const [status, setStatus] = useState("");

  const filtered = assessments.filter((item) =>
    (!subject || subject === item.subject) &&
    (!grade || grade === item.grade) &&
    (!classNumber || classNumber === item.classNumber)
  ).sort((a, b) => a.dueDate.localeCompare(b.dueDate));
  const matches = (item: Assessment, term: string) => item.title.toLocaleLowerCase().includes(term.trim().toLocaleLowerCase());
  const suggestions = query.trim() ? filtered.filter((item) => matches(item, query)) : [];
  const results = filtered.filter((item) => matches(item, search));
  const pageCount = Math.max(1, Math.ceil(results.length / pageSize));
  const currentPage = Math.min(page, pageCount);
  const start = (currentPage - 1) * pageSize;

  function searchFor(term: string) {
    setQuery(term);
    setSearch(term);
    setShowSuggestions(false);
    setPage(1);
  }

  function save(draft: Omit<Assessment, "id">) {
    const existing = modal?.assessment;
    const item = { ...draft, id: existing?.id ?? crypto.randomUUID() };
    setAssessments((current) => existing ? current.map((entry) => entry.id === item.id ? item : entry) : [...current, item]);
    setStatus(`${item.title} 수행평가가 ${existing ? "수정" : "등록"}되었습니다.`);
    setModal(null);
  }

  return (
    <>
      <PageHeading title="수행평가 관리" description="과목별 수행평가와 제출 마감일을 확인하고 관리하세요." />
      <ListCard aria-labelledby="assessment-list-title">
        <h2 id="assessment-list-title">수행평가 목록</h2>
        <p>수행평가명을 검색하거나 과목·학년·반별로 등록된 평가를 확인하세요.</p>
        <Toolbar>
          <Search role="search" aria-label="수행평가 검색"
            onSubmit={(event) => { event.preventDefault(); searchFor(query); }}
            onBlur={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget)) setShowSuggestions(false);
            }}
            onKeyDown={(event) => {
              if (event.key === "Escape" && showSuggestions) {
                event.currentTarget.querySelector("input")?.focus();
                setShowSuggestions(false);
              }
            }}>
            <TextInput type="search" aria-label="수행평가명 검색" placeholder="수행평가명 검색" value={query}
              onFocus={() => setShowSuggestions(true)}
              onChange={(event) => {
                setQuery(event.target.value);
                setShowSuggestions(true);
                if (!event.target.value.trim()) {
                  setSearch("");
                  setPage(1);
                }
              }} />
            {showSuggestions && query.trim() && (
              <Suggestions>
                <p role="status">연관 검색 {suggestions.length}건</p>
                <ul aria-label="연관 검색 결과">
                  {suggestions.map((item) => (
                    <li key={item.id}>
                      <button type="button" onClick={(event) => {
                        event.currentTarget.closest("form")?.querySelector("input")?.focus();
                        searchFor(item.title);
                      }}>
                        <strong>{item.title}</strong>
                        <span>{item.subject} · {assessmentTarget(item)} · {item.dueDate.slice(5).replace("-", ".")} 마감</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </Suggestions>
            )}
          </Search>
          <select aria-label="과목 필터" value={subject} onChange={(event) => { setSubject(event.target.value); setPage(1); }}>
            <option value="">전체 과목</option>
            {subjects.map((item) => <option key={item}>{item}</option>)}
          </select>
          <select aria-label="학년 필터" value={grade} onChange={(event) => { setGrade(event.target.value); setPage(1); }}>
            <option value="">전체 학년</option>
            {grades.map((item) => <option key={item} value={item}>{item}학년</option>)}
          </select>
          <select aria-label="반 필터" value={classNumber} onChange={(event) => { setClassNumber(event.target.value); setPage(1); }}>
            <option value="">전체 반</option>
            {classes.map((item) => <option key={item} value={item}>{item}반</option>)}
          </select>
          <FormButton type="button" onClick={() => { setStatus(""); setModal({}); }}>+ 수행평가 등록</FormButton>
        </Toolbar>
        <TableRegion role="region" aria-label="수행평가 표" tabIndex={0}>
          <table aria-labelledby="assessment-list-title">
            <thead><tr>
              <th scope="col">마감일</th><th scope="col">과목</th><th scope="col">수행평가명</th>
              <th scope="col">대상</th><th scope="col">관리</th>
            </tr></thead>
            <tbody>
              {results.slice(start, start + pageSize).map((item) => (
                <tr key={item.id}>
                  <td><time dateTime={item.dueDate}>{item.dueDate.replaceAll("-", ".")}</time></td>
                  <td className="subject">{item.subject}</td>
                  <th scope="row">{item.title}</th>
                  <td>{assessmentTarget(item)}</td>
                  <td><EditButton type="button" aria-label={`${item.title} 수정`} onClick={() => {
                    setStatus("");
                    setModal({ assessment: item });
                  }}>수정</EditButton></td>
                </tr>
              ))}
              {!results.length && <tr><td colSpan={5} className="empty">조건에 맞는 수행평가가 없습니다.</td></tr>}
            </tbody>
          </table>
        </TableRegion>
        <Footer>
          <p role="status">
            총 {results.length}건{results.length > 0 && ` · ${start + 1}–${Math.min(start + pageSize, results.length)}건 표시`}
          </p>
          {pageCount > 1 && (
            <Pagination aria-label="수행평가 목록 페이지">
              <button type="button" aria-label="이전 페이지" disabled={currentPage === 1} onClick={() => setPage(currentPage - 1)}>‹</button>
              {Array.from({ length: pageCount }, (_, index) => index + 1).map((number) => (
                <button key={number} type="button" aria-label={`${number}페이지`}
                  aria-current={currentPage === number ? "page" : undefined} onClick={() => setPage(number)}>{number}</button>
              ))}
              <button type="button" aria-label="다음 페이지" disabled={currentPage === pageCount} onClick={() => setPage(currentPage + 1)}>›</button>
            </Pagination>
          )}
        </Footer>
        <Status role="status">{status}</Status>
      </ListCard>
      {modal && <AssessmentFormModal assessment={modal.assessment} onClose={() => setModal(null)} onSave={save} />}
    </>
  );
}

const ListCard = styled(Card)`
  margin-top: 28px;
  padding: clamp(16px, 2vw, 28px);
  container-type: inline-size;
  h2 { font-size: 20px; line-height: 1.5; }
  p { color: ${colors.textMuted}; font-size: 14px; }
  > p { margin-top: 8px; }
`;
const Toolbar = styled.div`
  display: grid;
  grid-template-columns: minmax(145px, 2.4fr) repeat(3, minmax(90px, 1fr)) minmax(136px, 1.5fr);
  gap: 12px;
  margin: 22px 0 30px;
  input, select, > button { height: 48px; }
  input::placeholder { color: ${colors.textMuted}; }
  select {
    min-width: 0;
    width: 100%;
    padding: 0 12px;
    border: 1px solid #D6E0F2;
    border-radius: 8px;
    color: ${colors.text};
    background: ${colors.surface};
    font: inherit;
    font-size: 14px;
  }
  select:focus-visible { outline: 2px solid #718DFF; }
  @container (width < 599px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    form, > button { grid-column: 1 / -1; }
  }
  @container (width < 320px) { grid-template-columns: minmax(0, 1fr); }
`;
const Search = styled.form`position: relative; min-width: 0;`;
const Suggestions = styled.div`
  position: absolute;
  inset: calc(100% + 6px) 0 auto;
  z-index: 1;
  padding: 6px;
  border: 1px solid #D6E0F2;
  border-radius: 8px;
  background: ${colors.surface};
  p { padding: 8px 10px; }
  ul { list-style: none; margin: 0; padding: 0; max-height: 224px; overflow-y: auto; }
  button {
    display: grid;
    gap: 6px;
    width: 100%;
    padding: 12px 10px;
    border: 0;
    background: transparent;
    text-align: left;
    font-size: 14px;
    cursor: pointer;
  }
  button:hover, button:focus-visible { background: ${colors.primarySoft}; }
  button:focus-visible { outline-offset: -3px; }
  span { font-size: 12px; color: ${colors.textMuted}; }
`;
const TableRegion = styled.div`
  overflow-x: auto;
  &:focus-visible { outline: 2px solid ${colors.primary}; }
  table { width: 100%; min-width: 530px; border-collapse: collapse; text-align: left; font-size: 14px; }
  thead { color: ${colors.textMuted}; background: ${colors.background}; }
  thead th { font-weight: 500; }
  th, td { padding: 12px clamp(10px, 1.4vw, 20px); }
  tbody th { width: 40%; font-weight: 500; overflow-wrap: anywhere; }
  td { white-space: nowrap; }
  tbody tr { height: 75px; border-bottom: 1px solid ${colors.border}; }
  .subject { color: ${colors.primary}; }
  .empty { text-align: center; color: ${colors.textMuted}; white-space: normal; }
`;
const EditButton = styled.button`
  min-width: 32px;
  min-height: 32px;
  padding: 0;
  border: 0;
  color: ${colors.primary};
  background: transparent;
  cursor: pointer;
  &:hover { text-decoration: underline; }
`;
const Footer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  margin-top: 28px;
`;
const Pagination = styled.nav`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  button { min-width: 34px; height: 34px; border: 0; border-radius: 6px; background: transparent; font-size: 14px; cursor: pointer; }
  button:disabled { color: #8999B5; cursor: default; }
  button[aria-current], button:hover:not(:disabled) { color: ${colors.primary}; background: ${colors.primarySoft}; }
`;
const Status = styled.p`&:empty { display: none; }`;
