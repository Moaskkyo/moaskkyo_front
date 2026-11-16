import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CalendarPage } from "./app/pages/calendar";
import Layout from "./app/Layout";
import { AdminMainPage } from "./app/pages/admin-main";
import { ManagementPage } from "./app/pages/management";
import { TeachersPage } from "./app/pages/teachers";
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
          {managementMenus.filter((menu) => menu.path !== "/teachers" && menu.path !== "/calendar").map((menu) => <Route key={menu.path} path={menu.path} element={<ManagementPage title={menu.name} />} />)}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
