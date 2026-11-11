import styled from "@emotion/styled";
import Card from "./Card";
import { colors } from "./styles/colors";
import ActionLink from "./ActionLink";

interface SummaryCardProps {
  title: string;
  value: string;
  description: string;
  to?: string;
}

export default function SummaryCard({ title, value, description, to }: SummaryCardProps) {
  return <Wrapper aria-label={title}><Title>{title}</Title><Value>{value}</Value><Description>{to ? <ActionLink variant="text" to={to}>{description}</ActionLink> : description}</Description></Wrapper>;
}

const Wrapper = styled(Card)`
  padding: 16px; display: flex; flex-direction: column; gap: 10px;
  @media (max-height: 760px) { padding: 12px 16px; gap: 8px; }
`;
const Title = styled.h2`font-size: 14px; font-weight: 400; color: ${colors.textMuted};`;
const Value = styled.p`font-size: 22px; line-height: 1.4; font-weight: 700; color: ${colors.primary};`;
const Description = styled.p`font-size: 14px; line-height: 1.5; color: ${colors.textMuted}; margin-top: 6px; a { font: inherit; color: inherit; padding: 0; }`;

