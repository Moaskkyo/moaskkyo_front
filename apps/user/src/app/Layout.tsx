import styled from "@emotion/styled";
import type { ReactNode } from "react";
import SideBar from "../widgets/SideBar";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <Wrapper>
      <SideBar />
      <Main>{children}</Main>
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
