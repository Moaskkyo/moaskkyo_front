/**
 * 캘린더 디자인에서 추출한 팔레트.
 * 공통 테마가 생기면 이 파일을 그쪽으로 흡수한다.
 * 기존 공통 컴포넌트(SideBar, SelectButton)가 쓰는 slate 계열 값과 맞춘다.
 */
export const colors = {
  primary: "#2563EB",
  primaryStrong: "#1D4ED8",
  primarySoft: "#EFF6FF",
  sunday: "#DC2626",
  text: "#0F172A",
  textSecondary: "#334155",
  textMuted: "#64748B",
  textDisabled: "#94A3B8",
  border: "#E2E8F0",
  background: "#F8FAFC",
  surface: "#FFFFFF",
  surfaceMuted: "#F8FAFC",
  danger: "#DC2626",
  dangerSoft: "#FEF2F2",
  success: "#15803D",
  overlay: "rgba(15, 23, 42, 0.45)",
} as const;
