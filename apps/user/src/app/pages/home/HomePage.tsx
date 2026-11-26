import { HomeCountdown, ScheduleCountdown } from "@/features/d-day-count";
import { MyDdayCard } from "@/features/my-dday";

export default function HomePage() {
  return (
    <div>
      <ScheduleCountdown kind="EXAM" />
      <ScheduleCountdown kind="VACATION" />
      <MyDdayCard />
      <HomeCountdown />
    </div>
  );
}
