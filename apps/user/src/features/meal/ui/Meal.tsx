import { useState } from "react";
import type { Period } from "../model/type";
import MealsToday from "./daily/Meals";
import MealsWeek from "./week/Meals";
import MealsMonth from "./month/Meals";
import SegmentControl from "./SegmentControl";

export default function Meal() {
  const [period, setPeriod] = useState<Period>("일");

  const periodControl = (
    <SegmentControl selected={period} onChange={setPeriod} />
  );

  return (
    <>
      {period === "일" && <MealsToday headerRight={periodControl} />}
      {period === "주" && <MealsWeek headerRight={periodControl} />}
      {period === "월" && <MealsMonth headerRight={periodControl} />}
    </>
  );
}
