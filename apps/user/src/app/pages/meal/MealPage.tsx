import { useState } from "react";
import {
  MealsMonth,
  MealsToday,
  MealsWeek,
  SegmentControl,
  type Period,
} from "../../../features/meal";
import Layout from "../../Layout";

export default function MealPage() {
  const [period, setPeriod] = useState<Period>("일");

  const periodControl = (
    <SegmentControl selected={period} onChange={setPeriod} />
  );

  return (
    <Layout>
      {period === "일" && <MealsToday headerRight={periodControl} />}
      {period === "주" && <MealsWeek headerRight={periodControl} />}
      {period === "월" && <MealsMonth headerRight={periodControl} />}
    </Layout>
  );
}
