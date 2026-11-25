import styled from "@emotion/styled";
import { colors } from "@/shared/styles/colors";

interface ResultPopupProps {
  message: string;
  onConfirm: () => void;
}

export default function ResultPopup({ message, onConfirm }: ResultPopupProps) {
  return (
    <Overlay>
      <Dialog role="alertdialog" aria-modal="true" aria-label={message}>
        <Message>{message}</Message>
        <ConfirmButton type="button" onClick={onConfirm}>
          확인
        </ConfirmButton>
      </Dialog>
    </Overlay>
  );
}

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background-color: ${colors.overlay};
`;

const Dialog = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 320px;
  max-width: 100%;
  padding: 32px 24px 24px;
  background-color: ${colors.surface};
  border-radius: 16px;
  box-shadow: 0 20px 48px rgba(15, 23, 42, 0.2);
`;

const Message = styled.p`
  margin: 0;
  color: ${colors.text};
  font-size: 18px;
  font-weight: 700;
  line-height: 24px;
  text-align: center;
`;

const ConfirmButton = styled.button`
  width: 100%;
  height: 44px;
  border: none;
  border-radius: 12px;
  background-color: ${colors.primary};
  color: ${colors.surface};
  font-size: 14px;
  font-weight: 700;
  font-family: inherit;
  cursor: pointer;

  &:hover {
    background-color: ${colors.primaryStrong};
  }
`;
