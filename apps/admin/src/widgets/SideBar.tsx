import styled from "@emotion/styled";
import { NavLink, useLocation } from "react-router-dom";
import { colors } from "../shared/styles/colors";

import { managementMenus } from "../shared/model/navigation";

export default function SideBar() {
  const { pathname } = useLocation();
  return (
    <Sidebar>
      <Brand to="/">모앗꾜 ADMIN</Brand>
      <Navigation aria-label="관리자 메뉴">
        <MenuLabel>학교 운영</MenuLabel>
        <MenuLink to="/" end $selected={pathname === "/" || pathname === "/admin-main"}>대시보드</MenuLink>
        {managementMenus.map((menu) => (
          <MenuLink key={menu.path} to={menu.path} $selected={pathname === menu.path}>{menu.name}</MenuLink>
        ))}
      </Navigation>
      <Profile to="/mypage" aria-label="정은진 선생님 마이페이지">
        <Avatar aria-hidden="true">정</Avatar>
        <div><Name>정은진 선생님</Name><Role>학교 관리자</Role></div>
      </Profile>
    </Sidebar>
  );
}

const Sidebar = styled.aside`
  width: 232px;
  flex-shrink: 0;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 28px 16px 24px;
  background: ${colors.surface};
  @media (max-width: 1100px) { width: 216px; padding: 20px 12px; }
  @media (max-width: 600px) { width: 200px; padding: 20px 8px; }
`;
const Brand = styled(NavLink)`
  color: ${colors.primary}; font-size: 24px; font-weight: 800; white-space: nowrap;
  margin: 0 10px; flex-shrink: 0;
  @media (max-width: 1100px) { font-size: 20px; margin: 0 8px; }
  @media (max-width: 600px) { font-size: 17px; }
`;
const Navigation = styled.nav`
  margin-top: clamp(24px, 7vh, 72px);
  flex: 1; min-height: 0; overflow-y: auto;
  display: flex; flex-direction: column; gap: 6px;
`;
const MenuLabel = styled.p`font-size: 14px; color: ${colors.textMuted}; padding: 0 12px; margin-bottom: 6px;`;
const MenuLink = styled(NavLink, {
  shouldForwardProp: (prop) => prop !== "$selected",
})<{ $selected: boolean }>`
  display: block; width: 100%; text-align: left; border-radius: 7px;
  flex-shrink: 0; padding: 12px 16px; font-size: 16px; line-height: 1.5;
  color: ${({ $selected }) => $selected ? colors.primary : colors.text};
  background: ${({ $selected }) => $selected ? colors.primarySoft : "transparent"};
  font-weight: ${({ $selected }) => $selected ? 700 : 400};
  transition: background-color 120ms ease;
  &:hover { background: ${({ $selected }) => $selected ? "#DFE8FF" : "#F1F5F9"}; }
  @media (max-height: 760px) { padding: 9px 12px; }
`;
const Profile = styled(NavLink)`
  flex-shrink: 0; display: flex; align-items: center; gap: 12px;
  margin: 16px 0 0; padding: 16px 8px 8px; border-top: 1px solid ${colors.border};
  border-radius: 0 0 7px 7px;

`;
const Avatar = styled.div`
  width: 36px; height: 36px; flex-shrink: 0; border-radius: 50%; display: grid; place-items: center;
  background: ${colors.primarySoft}; color: ${colors.primary}; font-weight: 700;
`;
const Name = styled.p`font-size: 16px; font-weight: 700; white-space: nowrap;`;
const Role = styled.p`font-size: 14px; color: ${colors.textMuted}; margin-top: 5px;`;

