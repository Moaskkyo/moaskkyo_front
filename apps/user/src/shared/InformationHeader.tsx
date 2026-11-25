import styled from "@emotion/styled";

const MenuItems = ["급식", "자습 감독", "선생님 위치"] as const;

export type InformationMenu = (typeof MenuItems)[number];

interface InformationHeaderProps {
  active: InformationMenu;
  onChange: (menu: InformationMenu) => void;
}

export default function Information({
  active,
  onChange,
}: InformationHeaderProps) {
  return (
    <Wrapper>
      {MenuItems.map((item) => (
        <Menu
          key={item}
          onClick={() => onChange(item)}
          $active={active === item}
        >
          {item}
        </Menu>
      ))}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  justify-content: start;
  display: flex;
  margin-bottom: 24px;
  border-bottom: 1px solid #e2e8f0;
`;

const Menu = styled.div<{ $active: boolean }>`
  font-size: 16px;
  cursor: pointer;
  border-bottom: ${({ $active }) => ($active ? "4px solid #3B82F6" : "none")};
  color: ${({ $active }) => ($active ? "#2563EB" : "#475569")};
  font-weight: ${({ $active }) => ($active ? "bold" : "medium")};
  margin-bottom: ${({ $active }) => ($active ? "-3px" : "0")};
  width: 120px;
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
