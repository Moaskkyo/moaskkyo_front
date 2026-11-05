import { API } from "./base";
import type { MealResponse } from "../model/type";
const key = import.meta.env.VITE_NEIS_KEY;

const getMeal = async (from: string, to: string = from) => {
  const atpt_code = localStorage.getItem("atptCode") ?? null;
  const school_code = localStorage.getItem("schoolCode") ?? null;

  if (!school_code || !atpt_code) return null;

  return await API.get<MealResponse>("/mealServiceDietInfo", {
    params: {
      KEY: key,
      Type: "json",
      pIndex: 1,
      pSize: 100,
      ATPT_OFCDC_SC_CODE: atpt_code,
      SD_SCHUL_CODE: school_code,
      MLSV_FROM_YMD: from,
      MLSV_TO_YMD: to,
    },
  });
};

export default getMeal;
