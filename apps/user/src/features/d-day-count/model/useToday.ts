import { useEffect, useState } from "react";
import { getMsUntilMidnight } from "../utils/schedule";

const MIDNIGHT_BUFFER_MS = 1000;

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
