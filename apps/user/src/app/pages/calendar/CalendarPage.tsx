import styled from "@emotion/styled";
import { useCallback, useMemo, useState } from "react";
import {
  hasDetailView,
  mockAcademicSchedules,
  mockAssessmentSchedules,
  mockBirthdaySchedules,
  type Schedule,
} from "@/entities/schedule";
import { useAcademicScheduleDetails } from "@/features/edit-schedule-detail";
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
import { ScheduleDetailModal } from "@/widgets/schedule-detail-modal";

export default function CalendarPage() {
  const [today] = useState(() => startOfDay(new Date()));
  const { viewMonth, goToPreviousMonth, goToNextMonth, goToMonthOf } = useCalendarMonth(today);
  const [selectedDate, setSelectedDate] = useState<Date>(today);
  const { visibleCategories, toggleCategory } = useScheduleCategoryFilter();
  const { academicSchedules, saveDetail, deleteDetail } =
    useAcademicScheduleDetails(mockAcademicSchedules);
  const [activeScheduleId, setActiveScheduleId] = useState<string | null>(null);

  // 명세: 하위 일정 3종은 각각 "조회 대상 월"로 조회하며 on인 것만 조회한다.
  // API 연동 시 viewMonth를 입력으로 하는 카테고리별 query(enabled: visibleCategories[...])로 교체한다.
  const visibleSchedules = useMemo<Schedule[]>(
    () => [
      ...(visibleCategories.ACADEMIC ? academicSchedules : []),
      ...(visibleCategories.ASSESSMENT ? mockAssessmentSchedules : []),
      ...(visibleCategories.BIRTHDAY ? mockBirthdaySchedules : []),
    ],
    [visibleCategories, academicSchedules],
  );

  // 모달은 현재 보이는 일정 목록에서 찾는다. 토글로 숨겨지거나 상세가 바뀌면 그대로 반영된다.
  const activeSchedule = useMemo(() => {
    const found = visibleSchedules.find((schedule) => schedule.id === activeScheduleId);
    return found && hasDetailView(found) ? found : null;
  }, [visibleSchedules, activeScheduleId]);

  const openScheduleDetail = useCallback((schedule: Schedule) => {
    setActiveScheduleId(schedule.id);
  }, []);

  const closeScheduleDetail = useCallback(() => {
    setActiveScheduleId(null);
  }, []);

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
          onSelectSchedule={openScheduleDetail}
        />
        <ScheduleDayDetail
          date={selectedDate}
          schedules={visibleSchedules}
          onSelectSchedule={openScheduleDetail}
        />
      </Body>
      {activeSchedule && (
        <ScheduleDetailModal
          schedule={activeSchedule}
          onClose={closeScheduleDetail}
          onSaveDetail={saveDetail}
          onDeleteDetail={deleteDetail}
        />
      )}
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
