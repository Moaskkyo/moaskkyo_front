import styled from "@emotion/styled";
import { useState } from "react";

const MENUS = ["홈", "캘린더", "시간표", "정보", "설정"];

export default function SideBar() {
  const [activeMenu, setActiveMenu] = useState(MENUS[0]);

  return (
    <Wrapper>
      <Top>
        <Title>모앗꾜</Title>
        <Menu>
          {MENUS.map((menu) => (
            <List
              key={menu}
              $active={menu === activeMenu}
              onClick={() => setActiveMenu(menu)}
            >
              {menu}
            </List>
          ))}
        </Menu>
      </Top>

      <Bottom>
        <UserInfo>
          <School>대덕소프트웨어마이스터고등학교</School>
          <Grade>2학년 3반 15번</Grade>
        </UserInfo>

        <LogoutButton>로그아웃</LogoutButton>
      </Bottom>
    </Wrapper>
  );
}

const Top = styled.div``;

const Bottom = styled.div``;

const Wrapper = styled.div`
  width: 240px;
  padding: 24px 12px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-right: 1px solid #e2e8f0;
  box-sizing: border-box;
`;

const Title = styled.div`
  color: #2563eb;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 32px;
`;

const Menu = styled.div`
  display: flex;
  gap: 4px;
  flex-direction: column;
`;

const List = styled.div<{ $active: boolean }>`
  color: ${({ $active }) => ($active ? "#1D4ED8" : "#334155")};
  background-color: ${({ $active }) => ($active ? "#EFF6FF" : "transparent")};
  font-weight: ${({ $active }) => ($active ? "bold" : "none")};
  border-left: 4px solid
    ${({ $active }) => ($active ? "#3B82F6" : "transparent")};
  font-size: 16px;
  padding: 12px;
  cursor: pointer;

  &:hover {
    background-color: #f4f8ff;
  }
`;

const UserInfo = styled.div`
  background-color: #f8fafc;
  display: flex;
  gap: 4px;
  flex-direction: column;
  padding: 12px;
  border-radius: 12px;
  width: 100%;
  box-sizing: border-box;
  margin-bottom: 12px;
`;

const School = styled.div`
  font-size: 14px;
`;

const Grade = styled.div`
  font-size: 14px;
  color: #475569;
`;

const LogoutButton = styled.button`
  outline: none;
  font-size: 14px;
  border: 1px solid #e2e8f0;
  padding: 16px;
  background-color: white;
  width: 100%;
  border-radius: 12px;
  box-sizing: border-box;
`;
