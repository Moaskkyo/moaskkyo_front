import { useQuery } from "@tanstack/react-query";
import getMeal from "./getmeal";

export const useMeal = (from: string, to: string = from) =>
  useQuery({
    queryKey: ["meal", from, to],
    queryFn: async () => {
      const response = await getMeal(from, to);
      return (
        response?.data.mealServiceDietInfo?.find((item) => item.row)?.row ?? []
      );
    },
    staleTime: 1000 * 60 * 60, //1시간
  });
