import { BrowserRouter, Route, Routes } from "react-router-dom";
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
          {managementMenus.filter((menu) => menu.path !== "/teachers").map((menu) => <Route key={menu.path} path={menu.path} element={<ManagementPage title={menu.name} />} />)}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
