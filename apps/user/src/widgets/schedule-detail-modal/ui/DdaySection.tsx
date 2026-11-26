import styled from "@emotion/styled";
import Button from "@/shared/Button";
import { colors } from "@/shared/styles/colors";

interface DdaySectionProps {
  isAdded: boolean;
  /** 방금 추가했을 때만 완료 문구를 보여준다. */
  showSuccessMessage: boolean;
  /** 지난 일정을 추가하려고 했을 때 안내 문구를 보여준다. */
  showPastMessage: boolean;
  onAdd: () => void;
}

/** D-day 영역. 추가하면 홈의 내 D-day에 보인다. */
export default function DdaySection({
  isAdded,
  showSuccessMessage,
  showPastMessage,
  onAdd,
}: DdaySectionProps) {
  return (
    <Wrapper>
      <Label>D-day</Label>
      <Description>이 일정을 홈의 내 D-day에서 볼 수 있어요.</Description>
      {isAdded ? (
        <>
          <AddedRow>
            <AddedButton type="button" disabled>
              추가됨
            </AddedButton>
            <AddedHint>홈의 내 D-day에서 삭제할 수 있어요.</AddedHint>
          </AddedRow>
          {showSuccessMessage && (
            <SuccessMessage role="status">D-day에 추가했어요. 홈에서 볼 수 있어요.</SuccessMessage>
          )}
        </>
      ) : (
        <>
          <ButtonRow>
            <Button text="D-day 추가" onClick={onAdd} />
          </ButtonRow>
          {showPastMessage && <ErrorMessage role="alert">지난 D-day는 추가할 수 없어요.</ErrorMessage>}
        </>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const Label = styled.p`
  margin: 0;
  color: ${colors.textSecondary};
  font-size: 13px;
  line-height: 18px;
`;

const Description = styled.p`
  margin: 0 0 8px;
  color: ${colors.text};
  font-size: 15px;
  line-height: 22px;
`;

const ButtonRow = styled.div`
  display: flex;
`;

const AddedRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const AddedButton = styled.button`
  height: 44px;
  padding: 0 20px;
  border: none;
  border-radius: 12px;
  background-color: ${colors.surfaceMuted};
  color: ${colors.textMuted};
  font-size: 14px;
  font-weight: bold;
  font-family: inherit;
  cursor: default;
`;

const AddedHint = styled.span`
  color: ${colors.textMuted};
  font-size: 13px;
`;

const SuccessMessage = styled.p`
  margin: 6px 0 0;
  color: ${colors.success};
  font-size: 13px;
  font-weight: 600;
`;

const ErrorMessage = styled.p`
  margin: 6px 0 0;
  color: ${colors.danger};
  font-size: 13px;
  font-weight: 600;
`;
