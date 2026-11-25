import { HomeCountdown, ScheduleCountdown } from "@/features/d-day-count";

export default function HomePage() {
  return (
    <div>
      <ScheduleCountdown kind="EXAM" />
      <ScheduleCountdown kind="VACATION" />
      <HomeCountdown />
    </div>
  );
}
