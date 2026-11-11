import styled from "@emotion/styled";
import { Outlet } from "react-router-dom";
import SideBar from "../widgets/SideBar";
import { colors } from "../shared/styles/colors";

export default function Layout() {
  return (
    <Wrapper>
      <SkipLink href="#main-content">본문 바로가기</SkipLink>
      <SideBar />
      <Content>
        <Header>대덕소프트웨어마이스터고등학교</Header>
        <Main id="main-content" tabIndex={-1}><Outlet /></Main>
      </Content>
    </Wrapper>
  );
}

const Wrapper = styled.div`display: flex; height: 100dvh; overflow: hidden;`;
const Content = styled.div`flex: 1; min-width: 0; display: flex; flex-direction: column;`;
const Header = styled.header`
  flex-shrink: 0;
  min-height: 64px;
  display: flex;
  align-items: center;
  padding: 0 28px;
  background: ${colors.surface};
  font-size: 16px;
  font-weight: 700;
  @media (max-height: 760px) { min-height: 49px; }
`;
const Main = styled.main`
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  padding: clamp(20px, 3vh, 32px) clamp(20px, 2.8vw, 36px);
  @media (max-width: 700px) { padding: 16px; }
`;
const SkipLink = styled.a`
  position: fixed;
  top: 8px;
  left: 8px;
  z-index: 10;
  padding: 12px;
  background: ${colors.surface};
  transform: translateY(-150%);
  &:focus { transform: translateY(0); }
`;

