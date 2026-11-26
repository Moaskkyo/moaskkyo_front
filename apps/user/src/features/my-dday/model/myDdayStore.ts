import type { MyDday } from "./types";

// 내 D-day 저장 API가 명세에 없어 우선 localStorage에 저장 (확인 필요)
const STORAGE_KEY = "moaskkyo:my-ddays";

const isMyDday = (value: unknown): value is MyDday => {
  if (typeof value !== "object" || value === null) return false;
  const record = value as Record<string, unknown>;
  return (
    typeof record.scheduleId === "string" &&
    typeof record.title === "string" &&
    typeof record.date === "string"
  );
};

const load = (): MyDday[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw === null) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed) || !parsed.every(isMyDday)) {
      console.warn("[my-dday] 저장된 D-day 형식이 올바르지 않아 비웁니다.");
      return [];
    }
    return parsed;
  } catch (error) {
    console.warn("[my-dday] D-day를 불러오지 못했습니다.", error);
    return [];
  }
};

let ddays: MyDday[] = load();
const listeners = new Set<() => void>();

const save = (next: MyDday[]) => {
  ddays = next;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch (error) {
    console.warn("[my-dday] D-day를 저장하지 못했습니다.", error);
  }
  listeners.forEach((listener) => listener());
};

export const myDdayStore = {
  subscribe: (listener: () => void) => {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  },
  getSnapshot: () => ddays,
  add: (dday: MyDday) => {
    if (ddays.some((item) => item.scheduleId === dday.scheduleId)) return;
    save([...ddays, dday]);
  },
  remove: (scheduleId: string) => {
    save(ddays.filter((item) => item.scheduleId !== scheduleId));
  },
  removePast: (todayKey: string) => {
    const upcoming = ddays.filter((item) => item.date >= todayKey);
    if (upcoming.length !== ddays.length) save(upcoming);
  },
};
