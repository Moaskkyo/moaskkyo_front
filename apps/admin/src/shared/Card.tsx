import styled from "@emotion/styled";
import { colors } from "./styles/colors";

const Card = styled.section`
  min-width: 0;
  background: ${colors.surface};
  border: 1px solid ${colors.border};
  border-radius: 11px;
`;

export default Card;
