import styled from "@emotion/styled";
import { colors } from "./styles/colors";

export const TextInput = styled.input`
  width: 100%; min-width: 0; height: 56px; padding: 0 15px;
  border: 1px solid #D6E0F2; border-radius: 8px;
  color: ${colors.text}; background: white; font: inherit; font-size: 14px;
  &::placeholder { color: #8999B5; opacity: 1; }
  &:focus { outline: none; border-color: #718DFF; box-shadow: 0 0 0 1px #718DFF; background: #F8FAFF; }
  &[aria-invalid="true"] { border-color: #FF304D; box-shadow: 0 0 0 1px #FF304D; background: #FFF9FA; }
`;

export const FormButton = styled.button<{ variant?: "primary" | "outline" | "plain" }>`
  height: 52px; padding: 0 20px; border-radius: 8px; cursor: pointer;
  border: 1px solid ${({ variant }) => variant === "outline" ? colors.primary : variant === "plain" ? "#D6E0F2" : "transparent"};
  background: ${({ variant = "primary" }) => variant === "primary" ? colors.primary : "white"};
  color: ${({ variant = "primary" }) => variant === "primary" ? "white" : variant === "outline" ? colors.primary : colors.text};
  font: inherit; font-size: 14px; font-weight: 700;
  &:disabled { cursor: not-allowed; color: #9BA8BE; background: #F1F4F7; border-color: ${colors.border}; }
`;
