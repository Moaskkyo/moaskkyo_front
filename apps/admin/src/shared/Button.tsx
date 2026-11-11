import styled from "@emotion/styled";
import type { ButtonHTMLAttributes } from "react";
import { colors } from "./styles/colors";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "text";
}

export default function Button({ variant = "primary", children, ...props }: ButtonProps) {
  return <Control type="button" $variant={variant} {...props}>{children}<span aria-hidden="true"> →</span></Control>;
}

const Control = styled.button<{ $variant: "primary" | "text" }>`
  border: 0;
  border-radius: 6px;
  background: ${({ $variant }) => $variant === "primary" ? colors.primary : "transparent"};
  color: ${({ $variant }) => $variant === "primary" ? colors.surface : colors.primary};
  padding: ${({ $variant }) => $variant === "primary" ? "12px 24px" : "4px 0"};
  font-size: 11px;
  font-weight: 700;
  white-space: nowrap;
  &:disabled { cursor: not-allowed; }
`;
