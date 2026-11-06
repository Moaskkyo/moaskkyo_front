import styled from "@emotion/styled";
import { useCallback, useMemo, useState } from "react";
import {
  mockAcademicSchedules,
  mockAssessmentSchedules,
  mockBirthdaySchedules,
  type Schedule,
} from "@/entities/schedule";
import {
  ScheduleCategoryToggles,
  useScheduleCategoryFilter,
} from "@/features/filter-schedule-category";
import {
  CalendarMonthNavigator,
  useCalendarMonth,
} from "@/features/navigate-calendar-month";
import { formatMonthTitle, isSameMonth, startOfDay } from "@/shared/lib/date";
import { colors } from "@/shared/styles/colors";
import { CalendarMonth } from "@/widgets/calendar-month";
import { ScheduleDayDetail } from "@/widgets/schedule-day-detail";

export default function CalendarPage() {
  const [today] = useState(() => startOfDay(new Date()));
  const { viewMonth, goToPreviousMonth, goToNextMonth, goToMonthOf } = useCalendarMonth(today);
  const [selectedDate, setSelectedDate] = useState<Date>(today);
  const { visibleCategories, toggleCategory } = useScheduleCategoryFilter();

  // 명세: 하위 일정 3종은 각각 "조회 대상 월"로 조회하며 on인 것만 조회한다.
  // API 연동 시 viewMonth를 입력으로 하는 카테고리별 query(enabled: visibleCategories[...])로 교체한다.
  const visibleSchedules = useMemo<Schedule[]>(
    () => [
      ...(visibleCategories.ACADEMIC ? mockAcademicSchedules : []),
      ...(visibleCategories.ASSESSMENT ? mockAssessmentSchedules : []),
      ...(visibleCategories.BIRTHDAY ? mockBirthdaySchedules : []),
    ],
    [visibleCategories],
  );

  const goToToday = useCallback(() => {
    goToMonthOf(today);
    setSelectedDate(today);
  }, [goToMonthOf, today]);

  return (
    <Page>
      <Header>
        <HeaderLeft>
          <MonthTitle>{formatMonthTitle(viewMonth)}</MonthTitle>
          <CalendarMonthNavigator
            isTodayMonth={isSameMonth(viewMonth, today)}
            onPrevious={goToPreviousMonth}
            onNext={goToNextMonth}
            onToday={goToToday}
          />
        </HeaderLeft>
        <ScheduleCategoryToggles
          visibleCategories={visibleCategories}
          onToggle={toggleCategory}
        />
      </Header>
      <Body>
        <CalendarMonth
          monthDate={viewMonth}
          today={today}
          selectedDate={selectedDate}
          schedules={visibleSchedules}
          onSelectDate={setSelectedDate}
        />
        <ScheduleDayDetail date={selectedDate} schedules={visibleSchedules} />
      </Body>
    </Page>
  );
}

/** 공통 Layout의 Main 안에서 본문(Body)이 남은 높이를 채우도록 세로 flex로 감싼다. */
const Page = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100%;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 24px;
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const MonthTitle = styled.h1`
  margin: 0;
  color: ${colors.text};
  font-size: 26px;
  font-weight: 700;
  line-height: 36px;
`;

const Body = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) 344px;
  gap: 24px;
  flex: 1;
`;
