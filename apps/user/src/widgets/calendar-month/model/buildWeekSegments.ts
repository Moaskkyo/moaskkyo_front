import type { Schedule } from "../../../entities/schedule";
import { DAYS_PER_WEEK, toDateKey } from "../../../shared/lib/date";

/** 한 주(7일) 안에서 일정이 차지하는 구간. 열 인덱스는 0(일) ~ 6(토). */
export interface WeekSegment {
  schedule: Schedule;
  startCol: number;
  endCol: number;
  /** 이 구간이 일정의 시작일을 포함하는지 */
  isStart: boolean;
  /** 이 구간이 일정의 종료일을 포함하는지 */
  isEnd: boolean;
  /** 셀 안에서 위에서부터 몇 번째 줄에 그릴지 */
  lane: number;
}

export interface WeekLayout {
  segments: WeekSegment[];
  laneCount: number;
}

interface SegmentCandidate extends Omit<WeekSegment, "lane"> {
  order: number;
}

/**
 * 주 단위로 일정을 잘라 lane을 배정한다.
 * - 시작 열 오름차순 → 길이 내림차순 → 입력 순서로 정렬해 다일 일정이 위 줄을 차지하게 한다.
 * - 각 구간은 해당 열 범위가 비어 있는 가장 낮은 lane에 들어간다.
 */
export function buildWeekSegments(weekDates: Date[], schedules: Schedule[]): WeekLayout {
  if (weekDates.length !== DAYS_PER_WEEK) {
    throw new Error(`한 주는 ${DAYS_PER_WEEK}일이어야 합니다. 받은 길이: ${weekDates.length}`);
  }

  const weekKeys = weekDates.map(toDateKey);
  const weekStartKey = weekKeys[0];
  const weekEndKey = weekKeys[DAYS_PER_WEEK - 1];

  const candidates: SegmentCandidate[] = [];
  schedules.forEach((schedule, order) => {
    if (schedule.endDate < schedule.startDate) {
      console.warn(
        `[calendar-month] 종료일이 시작일보다 빠른 일정은 표시하지 않습니다. id=${schedule.id}`,
      );
      return;
    }
    if (schedule.endDate < weekStartKey || schedule.startDate > weekEndKey) {
      return;
    }

    const startIndex = weekKeys.indexOf(schedule.startDate);
    const endIndex = weekKeys.indexOf(schedule.endDate);
    const isStart = startIndex !== -1;
    const isEnd = endIndex !== -1;

    candidates.push({
      schedule,
      startCol: isStart ? startIndex : 0,
      endCol: isEnd ? endIndex : DAYS_PER_WEEK - 1,
      isStart,
      isEnd,
      order,
    });
  });

  candidates.sort((a, b) => {
    if (a.startCol !== b.startCol) return a.startCol - b.startCol;
    const spanA = a.endCol - a.startCol;
    const spanB = b.endCol - b.startCol;
    if (spanA !== spanB) return spanB - spanA;
    return a.order - b.order;
  });

  const lanes: boolean[][] = [];
  const segments = candidates.map(({ order: _order, ...candidate }) => {
    let lane = lanes.findIndex((occupied) => isRangeFree(occupied, candidate.startCol, candidate.endCol));
    if (lane === -1) {
      lane = lanes.length;
      lanes.push(Array.from({ length: DAYS_PER_WEEK }, () => false));
    }
    for (let col = candidate.startCol; col <= candidate.endCol; col += 1) {
      lanes[lane][col] = true;
    }
    return { ...candidate, lane };
  });

  return { segments, laneCount: lanes.length };
}

function isRangeFree(occupied: boolean[], startCol: number, endCol: number): boolean {
  for (let col = startCol; col <= endCol; col += 1) {
    if (occupied[col]) return false;
  }
  return true;
}
