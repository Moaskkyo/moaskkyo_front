export const weekdays = ["일", "월", "화", "수", "목", "금", "토"];
export function dateKey(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}
export function dateLabel(date: Date): string {
  return `${dateKey(date).replaceAll("-", ".")} (${weekdays[date.getDay()]})`;
}
export function monthDays(month: Date): Date[] {
  const first = new Date(month.getFullYear(), month.getMonth(), 1);
  const count = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
  return Array.from({ length: Math.ceil((first.getDay() + count) / 7) * 7 }, (_, index) =>
    new Date(month.getFullYear(), month.getMonth(), 1 - first.getDay() + index));
}
