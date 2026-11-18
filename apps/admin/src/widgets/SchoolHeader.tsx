import styled from "@emotion/styled";
import { colors } from "../shared/styles/colors";

const SchoolHeader = styled.header`
  display: flex;
  flex-shrink: 0;
  align-items: center;
  min-height: 76px;
  padding: 12px 32px;
  background: ${colors.surface};
  font-size: 16px;
  font-weight: 700;
  line-height: 1.5;
  overflow-wrap: anywhere;

  @media (max-width: 700px) { padding-inline: 16px; }
`;

export default SchoolHeader;
