import { useEffect, useState } from "react";

const MIDNIGHT_BUFFER_MS = 1000;

const getMsUntilMidnight = () => {
  const now = new Date();
  const nextMidnight = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() + 1,
  );
  return nextMidnight.getTime() - now.getTime();
};

/** 오늘 날짜. 화면을 켜 둔 채 자정이 지나면 새 날짜로 바뀐다. */
export const useToday = () => {
  const [today, setToday] = useState(() => new Date());

  useEffect(() => {
    const timer = setTimeout(
      () => setToday(new Date()),
      getMsUntilMidnight() + MIDNIGHT_BUFFER_MS,
    );
    return () => clearTimeout(timer);
  }, [today]);

  return today;
};
