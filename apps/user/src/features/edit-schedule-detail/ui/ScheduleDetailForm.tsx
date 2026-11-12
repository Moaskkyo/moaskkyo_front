import styled from "@emotion/styled";
import { useId, useState } from "react";
import SelectButton from "@/shared/SelectButton";
import { colors } from "@/shared/styles/colors";
import {
  SCHEDULE_DETAIL_MAX_LENGTH,
  validateScheduleDetail,
} from "@/features/edit-schedule-detail/model/validateScheduleDetail";

export type ScheduleDetailFormMode = "create" | "update";

interface ScheduleDetailFormProps {
  mode: ScheduleDetailFormMode;
  /** 수정일 때 기존 상세 내용 */
  initialValue?: string;
  onCancel: () => void;
  onSubmit: (detail: string) => void;
}

const MODE_LABEL: Record<ScheduleDetailFormMode, { heading: string; submit: string }> = {
  create: { heading: "상세 내용 등록", submit: "등록" },
  update: { heading: "상세 내용 수정", submit: "수정" },
};

export default function ScheduleDetailForm({
  mode,
  initialValue = "",
  onCancel,
  onSubmit,
}: ScheduleDetailFormProps) {
  const [value, setValue] = useState(initialValue);
  const validation = validateScheduleDetail(value);
  const errorId = useId();
  const label = MODE_LABEL[mode];

  const handleSubmit = () => {
    if (!validation.isValid) return;
    onSubmit(value.trim());
  };

  return (
    <Wrapper>
      <Heading>{label.heading}</Heading>
      <Field $isInvalid={validation.isOverLimit}>
        <Textarea
          value={value}
          placeholder="상세 내용을 입력해 주세요."
          aria-label="상세 내용"
          aria-invalid={validation.isOverLimit}
          aria-describedby={validation.errorMessage ? errorId : undefined}
          onChange={(event) => setValue(event.target.value)}
        />
        <Counter $isInvalid={validation.isOverLimit}>
          {validation.length} / {SCHEDULE_DETAIL_MAX_LENGTH}자
        </Counter>
      </Field>
      {validation.errorMessage && <ErrorMessage id={errorId}>{validation.errorMessage}</ErrorMessage>}
      <Actions>
        <SelectButton text="취소" width="100%" selected onClick={onCancel} />
        <SubmitButton type="button" disabled={!validation.isValid} onClick={handleSubmit}>
          {label.submit}
        </SubmitButton>
      </Actions>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Heading = styled.p`
  margin: 0;
  color: ${colors.textSecondary};
  font-size: 14px;
  line-height: 20px;
`;

const Field = styled.div<{ $isInvalid: boolean }>`
  position: relative;
  border: 1.5px solid ${({ $isInvalid }) => ($isInvalid ? colors.danger : colors.border)};
  border-radius: 12px;
  background-color: ${colors.surface};

  &:focus-within {
    border-color: ${({ $isInvalid }) => ($isInvalid ? colors.danger : colors.primary)};
  }
`;

const Textarea = styled.textarea`
  display: block;
  width: 100%;
  height: 156px;
  padding: 16px 16px 36px;
  border: none;
  background: none;
  color: ${colors.text};
  font-size: 15px;
  font-family: inherit;
  line-height: 22px;
  resize: none;
  box-sizing: border-box;

  &::placeholder {
    color: ${colors.textDisabled};
  }

  &:focus {
    outline: none;
  }
`;

const Counter = styled.span<{ $isInvalid: boolean }>`
  position: absolute;
  right: 16px;
  bottom: 12px;
  color: ${({ $isInvalid }) => ($isInvalid ? colors.danger : colors.textMuted)};
  font-size: 13px;
`;

const ErrorMessage = styled.p`
  margin: -4px 0 0;
  color: ${colors.danger};
  font-size: 13px;
  font-weight: 600;
`;

const Actions = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-top: 4px;
`;

const SubmitButton = styled.button`
  height: 44px;
  border: none;
  border-radius: 12px;
  background-color: ${colors.primary};
  color: ${colors.surface};
  font-size: 14px;
  font-weight: bold;
  font-family: inherit;
  cursor: pointer;

  &:disabled {
    background-color: ${colors.border};
    color: ${colors.textDisabled};
    cursor: not-allowed;
  }
`;
