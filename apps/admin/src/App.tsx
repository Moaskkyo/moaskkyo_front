import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CalendarPage } from "./app/pages/calendar";
import Layout from "./app/Layout";
import { AdminMainPage } from "./app/pages/admin-main";
import { LoginPage } from "./app/pages/login";
import { ManagementPage } from "./app/pages/management";
import { TeachersPage } from "./app/pages/teachers";
import { SchoolHoursPage } from "./app/pages/school-hours";
import { MyPage } from "./app/pages/my-page";
import { AssessmentsPage } from "./app/pages/assessments";
import { ExamTimetablePage } from "./app/pages/exam-timetable";
import { StudySupervisionPage } from "./app/pages/study-supervision";
import { managementMenus } from "./shared/model/navigation";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route element={<Layout />}>
          <Route path="/" element={<AdminMainPage />} />
          <Route path="/admin-main" element={<AdminMainPage />} />
          <Route path="/teachers" element={<TeachersPage />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/school-hours" element={<SchoolHoursPage />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/assessments" element={<AssessmentsPage />} />
          <Route path="/exam-timetable" element={<ExamTimetablePage />} />
          <Route path="/study-supervision" element={<StudySupervisionPage />} />
          {managementMenus.filter((menu) => !["/teachers", "/calendar", "/school-hours", "/mypage", "/assessments", "/exam-timetable", "/study-supervision"].includes(menu.path)).map((menu) => <Route key={menu.path} path={menu.path} element={<ManagementPage title={menu.name} />} />)}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
