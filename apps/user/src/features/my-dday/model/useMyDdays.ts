import { useSyncExternalStore } from "react";
import { myDdayStore } from "./myDdayStore";

export const useMyDdays = () => {
  const ddays = useSyncExternalStore(
    myDdayStore.subscribe,
    myDdayStore.getSnapshot,
  );

  return {
    ddays,
    hasDday: (scheduleId: string) =>
      ddays.some((item) => item.scheduleId === scheduleId),
    addDday: myDdayStore.add,
    removeDday: myDdayStore.remove,
    removePastDdays: myDdayStore.removePast,
  };
};
