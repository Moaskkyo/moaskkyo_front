import styled from "@emotion/styled";
import { Meal } from "@/features/meal";
import InformationHeader, {
  type InformationMenu,
} from "@/shared/InformationHeader";
import { useState } from "react";
import { TeacherList } from "@/features/night-teacher";
import { TeacherLocation } from "@/features/teacher-location";

export default function InformationPage() {
  const [menu, setMenu] = useState<InformationMenu>("급식");

  return (
    <Wrapper>
      <InformationHeader active={menu} onChange={setMenu} />
      {menu === "급식" && <Meal />}
      {menu === "자습 감독" && <TeacherList />}
      {menu === "선생님 위치" && <TeacherLocation />}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;
