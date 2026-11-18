import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CalendarPage } from "./app/pages/calendar";
import Layout from "./app/Layout";
import { AdminMainPage } from "./app/pages/admin-main";
import { ManagementPage } from "./app/pages/management";
import { TeachersPage } from "./app/pages/teachers";
import { SchoolHoursPage } from "./app/pages/school-hours";
import { MyPage } from "./app/pages/my-page";
import { AssessmentsPage } from "./app/pages/assessments";
import { managementMenus } from "./shared/model/navigation";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<AdminMainPage />} />
          <Route path="/admin-main" element={<AdminMainPage />} />
          <Route path="/teachers" element={<TeachersPage />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/school-hours" element={<SchoolHoursPage />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/assessments" element={<AssessmentsPage />} />
          {managementMenus.filter((menu) => !["/teachers", "/calendar", "/school-hours", "/mypage", "/assessments"].includes(menu.path)).map((menu) => <Route key={menu.path} path={menu.path} element={<ManagementPage title={menu.name} />} />)}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
