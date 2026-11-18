import styled from "@emotion/styled";
import { colors } from "./styles/colors";

interface PageHeadingProps {
  title: string;
  description: string;
  className?: string;
}

export default function PageHeading({ title, description, className }: PageHeadingProps) {
  return (
    <Heading className={className}>
      <h1>{title}</h1>
      <p>{description}</p>
    </Heading>
  );
}

const Heading = styled.header`
  h1 { font-size: 30px; line-height: 42px; font-weight: 700; }
  p { margin-top: 4px; color: ${colors.textMuted}; font-size: 14px; line-height: 22px; }
`;

