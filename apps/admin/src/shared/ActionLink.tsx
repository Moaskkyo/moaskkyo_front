import styled from "@emotion/styled";
import { Link, type LinkProps } from "react-router-dom";
import { colors } from "./styles/colors";

interface ActionLinkProps extends LinkProps {
  variant?: "primary" | "text";
}

export default function ActionLink({ variant = "primary", children, ...props }: ActionLinkProps) {
  return <Control $variant={variant} {...props}>{children}<span aria-hidden="true"> →</span></Control>;
}

const Control = styled(Link, {
  shouldForwardProp: (prop) => prop !== "$variant",
})<{ $variant: "primary" | "text" }>`
  display: inline-block;
  border-radius: 6px;
  background: ${({ $variant }) => $variant === "primary" ? colors.primary : "transparent"};
  color: ${({ $variant }) => $variant === "primary" ? colors.surface : colors.primary};
  padding: ${({ $variant }) => $variant === "primary" ? "12px 24px" : "4px 0"};
  font-size: 16px;
  line-height: 1.5;
  font-weight: 700;
  white-space: nowrap;
  &:hover { text-decoration: underline; text-underline-offset: 3px; }
`;

