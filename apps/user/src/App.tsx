import { Route, BrowserRouter, Routes } from "react-router-dom";
import HomePage from "./app/pages/home/HomePage";
import InformationPage from "./app/pages/Information/InformationPage";
import SettingPage from "./app/pages/Setting/SettingPage";
import TimeTablePage from "./app/pages/Timetable/TimetablePage";
import { CalendarPage } from "./app/pages/calendar";
import Layout from "./app/Layout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/timetable" element={<TimeTablePage />} />
          <Route path="/information" element={<InformationPage />} />
          <Route path="/setting" element={<SettingPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
