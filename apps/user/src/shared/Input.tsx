import styled from "@emotion/styled";
import { useId, useState, type InputHTMLAttributes, type ReactNode } from "react";
import { colors } from "@/shared/styles/colors";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  invalid?: boolean;
  errorMessage?: ReactNode;
}

export default function Input({
  label,
  invalid = false,
  errorMessage,
  type = "text",
  ...rest
}: InputProps) {
  const id = useId();
  const errorId = useId();
  const [visible, setVisible] = useState(false);
  const isPassword = type === "password";

  return (
    <Wrapper>
      {label && <Label htmlFor={id}>{label}</Label>}
      <Field>
        <Control
          {...rest}
          id={id}
          type={isPassword && visible ? "text" : type}
          aria-invalid={invalid}
          aria-describedby={errorMessage ? errorId : undefined}
          $hasToggle={isPassword}
        />
        {isPassword && (
          <ToggleButton type="button" onClick={() => setVisible((prev) => !prev)}>
            {visible ? "숨기기" : "보기"}
          </ToggleButton>
        )}
      </Field>
      {errorMessage && <ErrorMessage id={errorId}>{errorMessage}</ErrorMessage>}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 0;
`;

const Label = styled.label`
  color: ${colors.textSecondary};
  font-size: 14px;
  font-weight: 500;
  line-height: 17px;
`;

const Field = styled.div`
  position: relative;
`;

const Control = styled.input<{ $hasToggle: boolean }>`
  display: block;
  width: 100%;
  height: 52px;
  padding: 0 ${({ $hasToggle }) => ($hasToggle ? "64px" : "16px")} 0 16px;
  border: 1px solid #cbd5e1;
  border-radius: 12px;
  background-color: ${colors.surface};
  color: #1e293b;
  font-size: 16px;
  font-family: inherit;

  &::placeholder {
    color: ${colors.textMuted};
  }

  &:focus {
    outline: none;
    border-color: ${colors.primary};
    box-shadow: 0 0 0 1px ${colors.primary};
  }

  &[aria-invalid="true"] {
    border-color: ${colors.danger};
    box-shadow: 0 0 0.5px 0.5px ${colors.danger};
  }
`;

const ToggleButton = styled.button`
  position: absolute;
  top: 50%;
  right: 16px;
  padding: 4px;
  border: none;
  background: none;
  color: ${colors.primary};
  font-size: 13px;
  font-weight: 700;
  font-family: inherit;
  cursor: pointer;
  transform: translateY(-50%);

  &:hover {
    color: ${colors.primaryStrong};
  }
`;

const ErrorMessage = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  color: ${colors.danger};
  font-size: 14px;
  font-weight: 500;
  line-height: 18px;
`;
