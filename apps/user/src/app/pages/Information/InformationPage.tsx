import { Meal } from "@/features/meal";
import InformationHeader, {
  type InformationMenu,
} from "@/shared/InformationHeader";
import { useState } from "react";
import TeacherList from "@/features/night-teacher/ui/TeacherList";

export default function InformationPage() {
  const [menu, setMenu] = useState<InformationMenu>("급식");

  return (
    <div>
      <InformationHeader active={menu} onChange={setMenu} />
      {menu === "급식" && <Meal />}
      {menu === "자습 감독" && <TeacherList />}
    </div>
  );
}
