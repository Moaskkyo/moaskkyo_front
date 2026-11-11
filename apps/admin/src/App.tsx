import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./app/Layout";
import { AdminMainPage } from "./app/pages/admin-main";
import { ManagementPage } from "./app/pages/management";
import { managementMenus } from "./shared/model/navigation";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<AdminMainPage />} />
          <Route path="/admin-main" element={<AdminMainPage />} />
          {managementMenus.map((menu) => <Route key={menu.path} path={menu.path} element={<ManagementPage title={menu.name} />} />)}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
