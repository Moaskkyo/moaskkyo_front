import styled from "@emotion/styled";
import { colors } from "@/shared/styles/colors";

const SubmitButton = styled.button`
  width: 100%;
  height: 52px;
  border: none;
  border-radius: 12px;
  background-color: ${colors.primary};
  color: ${colors.surface};
  font-size: 16px;
  font-weight: 700;
  font-family: inherit;
  cursor: pointer;

  &:hover:not(:disabled) {
    background-color: ${colors.primaryStrong};
  }

  &:disabled {
    background-color: #f1f5f9;
    color: #475569;
    cursor: not-allowed;
  }
`;

export default SubmitButton;
