import { DdayBlockLayout } from "@/features/d-day-count";

export default function HomePage() {
  return (
    <div>
      <DdayBlockLayout
        title="시험"
        width={362}
        height={200}
        text="중간고사 · 10월 28일(수)"
        DayCountDown={7}
      />
      <DdayBlockLayout
        title="방학"
        width={362}
        height={200}
        text="방학 시작일 2026. 12. 24.(목)"
        DayCountDown={64}
      />
      <DdayBlockLayout
        title="하교"
        width={652}
        height={264}
        text="오늘 하교 시간 16:30"
        time="01:57:36"
      />
    </div>
  );
}
