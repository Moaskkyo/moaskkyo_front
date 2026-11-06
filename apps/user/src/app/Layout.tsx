import styled from "@emotion/styled";
import { Outlet } from "react-router-dom";
import SideBar from "../widgets/SideBar";

export default function Layout() {
  return (
    <Wrapper>
      <SideBar />
      <Main>
        <Outlet />
      </Main>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
`;

const Main = styled.main`
  flex: 1;
  padding: 32px;
  overflow-y: auto;
`;
