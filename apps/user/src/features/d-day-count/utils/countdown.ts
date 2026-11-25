const KST_FORMAT = new Intl.DateTimeFormat("ko-KR", {
  timeZone: "Asia/Seoul",
  month: "numeric",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23",
});

const KST_DATE_FORMAT = new Intl.DateTimeFormat("en-CA", {
  timeZone: "Asia/Seoul",
});

export const toKstParts = (ms: number) => {
  const parts = KST_FORMAT.formatToParts(ms);
  const get = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((part) => part.type === type)?.value ?? "";

  return {
    month: get("month"),
    day: get("day"),
    hour: get("hour"),
    minute: get("minute"),
  };
};

export const isSameKstDay = (a: number, b: number) =>
  KST_DATE_FORMAT.format(a) === KST_DATE_FORMAT.format(b);

export const formatRemaining = (ms: number) => {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return [hours, minutes, seconds]
    .map((value) => String(value).padStart(2, "0"))
    .join(":");
};

// 서버 시각 기준으로 targetAt까지 남은 시간(ms)
export const getRemainingMs = (targetAt: string, offset: number) =>
  Date.parse(targetAt) - (Date.now() + offset);

const DAY_MS = 24 * 60 * 60 * 1000;
const KST_OFFSET_MS = 9 * 60 * 60 * 1000;

// 서버 시각 기준으로 다음 KST 자정까지 남은 시간(ms)
export const getMsUntilKstMidnight = (offset: number) => {
  const serverNow = Date.now() + offset;
  const kstDay = Math.floor((serverNow + KST_OFFSET_MS) / DAY_MS);
  const nextMidnight = (kstDay + 1) * DAY_MS - KST_OFFSET_MS;
  return nextMidnight - serverNow;
};
