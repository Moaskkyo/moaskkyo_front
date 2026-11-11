import styled from "@emotion/styled";
import Card from "../../../shared/Card";
import ActionLink from "../../../shared/ActionLink";
import SummaryCard from "../../../shared/SummaryCard";
import { colors } from "../../../shared/styles/colors";

// 디자인 확인용 표시 데이터. API 명세가 제공되면 서버 데이터로 교체합니다.
const summaries = [
  { title: "학사일정", value: "이번 주 일정 04건", description: "학사일정 관리", to: "/calendar" },
  { title: "수행평가", value: "마감 예정 03건", description: "수행평가 관리", to: "/assessments" },
  { title: "시험 시간표", value: "중간고사 D-07", description: "11월 2일 시작 · 등록 완료" },
  { title: "선생님 정보", value: "등록 선생님 32명", description: "교무실 위치 관리", to: "/teachers" },
];
const schedules = [
  { date: "10. 27 화", title: "국어 · 독서 감상문 제출", category: "수행평가" },
  { date: "10. 28 수", title: "진로 특강", category: "학사일정" },
  { date: "11. 02 월", title: "2학기 중간고사", category: "시험" },
];


export default function AdminMainPage() {
  return (
    <Dashboard>
      <Introduction><h1>학교 운영을 한눈에</h1><p>오늘의 학교 일정과 주요 관리 현황을 확인하세요.</p></Introduction>
      <Summaries>{summaries.map((summary) => <SummaryCard key={summary.title} {...summary} />)}</Summaries>
      <Middle>
        <Panel aria-labelledby="schedule-title">
          <PanelHeader><div><h2 id="schedule-title">다가오는 학교 일정</h2><p>학교 일정과 수행평가를 함께 확인하세요.</p></div><ActionLink variant="text" to="/calendar">학사일정 관리</ActionLink></PanelHeader>
          <Table><colgroup><col style={{ width: "20%" }} /><col /><col style={{ width: "24%" }} /></colgroup><thead><tr><th scope="col">일자</th><th scope="col">일정</th><th scope="col">유형</th></tr></thead><tbody>{schedules.map((schedule) => <tr key={schedule.title}><MutedCell>{schedule.date}</MutedCell><td>{schedule.title}</td><CategoryCell>{schedule.category}</CategoryCell></tr>)}</tbody></Table>
        </Panel>
        <Departure aria-labelledby="departure-title">
          <DepartureLabel>학교·귀가 시간</DepartureLabel>
          <h2 id="departure-title">이번 주 귀가 시간</h2>
          <DepartureDate>10월 30일 금요일</DepartureDate>
          <DepartureTime dateTime="16:30">16:30</DepartureTime>
          <DepartureButton to="/school-hours">귀가 시간 설정</DepartureButton>
        </Departure>
      </Middle>
      <Panel aria-labelledby="supervisor-title">
        <PanelHeader><div><h2 id="supervisor-title">자습감독 선생님</h2><p>층별 자습감독 배정 현황을 확인하세요.</p></div><ActionLink to="/study-supervision">자습감독 수정</ActionLink></PanelHeader>
        <Table $compact><colgroup><col style={{ width: "24%" }} /><col /><col style={{ width: "24%" }} /></colgroup><thead><tr><th scope="col">담당 층</th><th scope="col">감독 선생님</th><th scope="col">배정 상태</th></tr></thead><tbody>{[2, 3, 4].map((floor) => <tr key={floor}><td>{floor}층</td><MutedCell>미배정</MutedCell><MutedCell>배정 필요</MutedCell></tr>)}</tbody></Table>
      </Panel>
    </Dashboard>
  );
}

const Dashboard = styled.div`display: grid; gap: 20px; @media (max-height: 760px) { gap: 16px; }`;
const Introduction = styled.div`
  h1 { font-size: 24px; line-height: 1.4; font-weight: 800; }
  p { margin-top: 6px; font-size: 16px; line-height: 1.5; color: ${colors.textMuted}; }
`;
const Summaries = styled.div`
  display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 14px;
  @media (max-width: 850px) { grid-template-columns: repeat(2, minmax(0, 1fr)); }
`;
const Middle = styled.div`
  display: grid; grid-template-columns: minmax(0, 1.76fr) minmax(0, 1fr); gap: 20px;
  @media (max-width: 700px) { grid-template-columns: minmax(0, 1fr); }
`;
const Panel = styled(Card)`padding: 20px; @media (max-height: 760px) { padding: 16px 20px 10px; }`;
const PanelHeader = styled.div`
  display: flex; align-items: flex-start; justify-content: space-between; gap: 12px; margin-bottom: 16px;
  flex-wrap: wrap;
  h2 { font-size: 20px; line-height: 1.5; }
  p { font-size: 14px; color: ${colors.textMuted}; margin-top: 6px; line-height: 1.5; }
  @media (max-height: 760px) { margin-bottom: 12px; }
  @media (max-width: 600px) { flex-wrap: wrap; }
`;
const Table = styled.table<{ $compact?: boolean }>`
  width: 100%; border-collapse: collapse; table-layout: fixed; text-align: left;
  font-size: 16px; line-height: 1.5;
  th { font-size: 14px; color: ${colors.textMuted}; font-weight: 400; }
  th, td { padding: ${({ $compact }) => $compact ? "12px 14px" : "16px 14px"}; overflow-wrap: anywhere; }
  ${({ $compact }) => !$compact && `thead { background: ${colors.background}; } th { padding-top: 9px; padding-bottom: 9px; } th:first-of-type { border-radius: 5px 0 0 5px; } th:last-of-type { border-radius: 0 5px 5px 0; }`}
  @media (max-height: 760px) { td { padding-top: ${({ $compact }) => $compact ? "8px" : "10px"}; padding-bottom: ${({ $compact }) => $compact ? "8px" : "10px"}; } }
`;
const MutedCell = styled.td`color: ${colors.textMuted};`;
const CategoryCell = styled.td`color: ${colors.primary}; font-size: 14px;`;
const Departure = styled.section`
  border-radius: 11px; padding: 20px; background: ${colors.primarySoft}; display: flex; flex-direction: column;
  h2 { font-size: 20px; margin-top: 12px; }
  @media (max-height: 760px) { padding: 18px 20px; }
  @media (max-width: 700px) { min-height: 230px; }
`;
const DepartureLabel = styled.p`font-size: 14px; color: ${colors.primary};`;
const DepartureDate = styled.p`font-size: 16px; font-weight: 700; margin-top: 18px;`;
const DepartureTime = styled.time`font-size: 40px; line-height: 1.3; font-weight: 750; color: ${colors.primary}; margin: 8px 0 24px; @media (max-height: 760px) { font-size: 34px; margin: 8px 0 16px; }`;
const DepartureButton = styled(ActionLink)`margin-top: auto; width: 100%; text-align: left; padding: 6px 10px;`;


