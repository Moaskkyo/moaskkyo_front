import styled from "@emotion/styled";
import { colors } from "@/shared/styles/colors";

export const Card = styled.section`
  padding: 19px 24px;
  background-color: ${colors.surface};
  border: 1px solid ${colors.border};
  border-radius: 16px;
`;

export const CardTitle = styled.h2`
  margin: 0;
  color: ${colors.text};
  font-size: 18px;
  font-weight: 700;
  line-height: 24px;
`;

export const CardDescription = styled.p`
  margin: 0;
  color: #475569;
  font-size: 14px;
  line-height: 20px;
`;
