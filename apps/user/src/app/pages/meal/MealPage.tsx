import { useState } from "react";
import {
  MealsMonth,
  MealsToday,
  MealsWeek,
  SegmentControl,
  type Period,
} from "../../../features/meal";

export default function MealPage() {
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
