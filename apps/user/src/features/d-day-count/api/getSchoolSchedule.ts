import { neisApi } from "@/shared/api";
import type { SchoolScheduleResponse } from "../model/types";

const key = import.meta.env.VITE_NEIS_KEY;

const getSchoolSchedule = async (from: string, to: string) => {
  const atptCode = localStorage.getItem("atptCode");
  const schoolCode = localStorage.getItem("schoolCode");

  if (!atptCode || !schoolCode) {
    throw new Error("학교 정보가 없습니다.");
  }

  const response = await neisApi.get<SchoolScheduleResponse>(
    "/SchoolSchedule",
    {
      params: {
        KEY: key,
        Type: "json",
        pIndex: 1,
        pSize: 1000,
        ATPT_OFCDC_SC_CODE: atptCode,
        SD_SCHUL_CODE: schoolCode,
        AA_FROM_YMD: from,
        AA_TO_YMD: to,
      },
    },
  );

  return response.data.SchoolSchedule?.find((item) => item.row)?.row ?? [];
};

export default getSchoolSchedule;
