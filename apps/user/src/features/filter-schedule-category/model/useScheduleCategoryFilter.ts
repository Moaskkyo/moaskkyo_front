import { useCallback, useState } from "react";
import { SCHEDULE_CATEGORIES, type ScheduleCategory } from "@/entities/schedule";

export type VisibleCategories = Record<ScheduleCategory, boolean>;

const ALL_VISIBLE: VisibleCategories = {
  ACADEMIC: true,
  ASSESSMENT: true,
  BIRTHDAY: true,
};

/**
 * 명세(on_off): 기본값은 모두 on, 사용자가 바꾸면 영구 저장.
 * 저장 위치는 명세에 없어 우선 localStorage를 쓴다. 서버 설정으로 옮기면 이 파일만 바꾸면 된다 (확인 필요).
 */
const STORAGE_KEY = "moaskkyo:calendar:visible-categories";

function isVisibleCategories(value: unknown): value is VisibleCategories {
  if (typeof value !== "object" || value === null) return false;
  const record = value as Record<string, unknown>;
  return SCHEDULE_CATEGORIES.every((category) => typeof record[category] === "boolean");
}

function loadVisibleCategories(): VisibleCategories {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw === null) return ALL_VISIBLE;
    const parsed: unknown = JSON.parse(raw);
    if (!isVisibleCategories(parsed)) {
      console.warn("[filter-schedule-category] 저장된 토글 상태 형식이 올바르지 않아 기본값을 사용합니다.");
      return ALL_VISIBLE;
    }
    return parsed;
  } catch (error) {
    console.warn("[filter-schedule-category] 토글 상태를 불러오지 못해 기본값을 사용합니다.", error);
    return ALL_VISIBLE;
  }
}

function saveVisibleCategories(value: VisibleCategories): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
  } catch (error) {
    console.warn("[filter-schedule-category] 토글 상태를 저장하지 못했습니다.", error);
  }
}

/** 카테고리 토글 상태. on인 카테고리만 조회 대상에 포함한다. */
export function useScheduleCategoryFilter() {
  const [visibleCategories, setVisibleCategories] = useState<VisibleCategories>(loadVisibleCategories);

  const toggleCategory = useCallback((category: ScheduleCategory) => {
    setVisibleCategories((current) => {
      const next = { ...current, [category]: !current[category] };
      saveVisibleCategories(next);
      return next;
    });
  }, []);

  return { visibleCategories, toggleCategory };
}
