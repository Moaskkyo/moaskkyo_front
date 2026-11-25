import { api } from "@/shared/api";
import type { CountdownsResponse } from "../model/types";

const getCountdowns = async () => {
  const response = await api.get<CountdownsResponse>("/api/countdowns");

  return response.data;
};

export default getCountdowns;
