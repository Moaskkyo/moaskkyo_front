import styled from "@emotion/styled";
import Modal from "@/shared/Modal";
import { colors } from "@/shared/styles/colors";
import type { MyDday } from "../model/types";

interface DeleteDdayModalProps {
  dday: MyDday;
  onCancel: () => void;
  onConfirm: () => void;
}

export default function DeleteDdayModal({
  dday,
  onCancel,
  onConfirm,
}: DeleteDdayModalProps) {
  return (
    <Modal
      title="D-day 삭제"
      ariaLabel={`${dday.title} D-day 삭제`}
      onClose={onCancel}
    >
      <Message>‘{dday.title}’ D-day를 삭제할까요?</Message>
      <Hint>캘린더 학사일정에서 다시 추가할 수 있어요.</Hint>
      <ButtonRow>
        <CancelButton type="button" onClick={onCancel}>
          취소
        </CancelButton>
        <DeleteButton type="button" onClick={onConfirm}>
          삭제
        </DeleteButton>
      </ButtonRow>
    </Modal>
  );
}

const Message = styled.p`
  margin: 0;
  color: ${colors.text};
  font-size: 15px;
  line-height: 22px;
`;

const Hint = styled.p`
  margin: 4px 0 0;
  color: ${colors.textMuted};
  font-size: 13px;
`;

const ButtonRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-top: 20px;
`;

const CancelButton = styled.button`
  height: 44px;
  border: 1px solid ${colors.border};
  border-radius: 12px;
  background-color: ${colors.surface};
  color: ${colors.textSecondary};
  font-size: 14px;
  font-weight: bold;
  font-family: inherit;
  cursor: pointer;

  &:hover {
    background-color: ${colors.surfaceMuted};
  }
`;

const DeleteButton = styled.button`
  height: 44px;
  border: none;
  border-radius: 12px;
  background-color: ${colors.danger};
  color: white;
  font-size: 14px;
  font-weight: bold;
  font-family: inherit;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`;
