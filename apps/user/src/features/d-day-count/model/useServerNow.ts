import { useEffect, useState } from "react";

export const useServerNow = (offset: number) => {
  const [now, setNow] = useState(() => Date.now() + offset);

  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now() + offset), 1000);
    return () => clearInterval(timer);
  }, [offset]);

  return now;
};
