/**
 * 명세(detail_create/update): "상세 내용은 ~길이를 넘을 수 없습니다." — 수치가 비어 있어 디자인의 200자를 따른다 (확인 필요).
 * 길이는 코드 포인트 기준으로 센다(이모지 등 서로게이트 쌍을 1자로).
 */
export const SCHEDULE_DETAIL_MAX_LENGTH = 200;

export interface ScheduleDetailValidation {
  length: number;
  isOverLimit: boolean;
  /** 비어 있지 않고 길이 제한 안이면 true */
  isValid: boolean;
  errorMessage: string | null;
}

export function getScheduleDetailLength(value: string): number {
  return Array.from(value).length;
}

export function validateScheduleDetail(value: string): ScheduleDetailValidation {
  const length = getScheduleDetailLength(value);
  const isOverLimit = length > SCHEDULE_DETAIL_MAX_LENGTH;
  const isEmpty = value.trim().length === 0;

  return {
    length,
    isOverLimit,
    isValid: !isOverLimit && !isEmpty,
    errorMessage: isOverLimit
      ? `상세 내용은 ${SCHEDULE_DETAIL_MAX_LENGTH}자를 넘을 수 없어요.`
      : null,
  };
}
