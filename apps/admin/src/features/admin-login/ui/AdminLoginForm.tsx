import styled from "@emotion/styled";
import { useId, useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { TextInput } from "../../../shared/FormControls";
import { formatPhoneNumber } from "../../../shared/lib/phone";
import { colors } from "../../../shared/styles/colors";

interface AdminLoginFormProps {
  isLoading?: boolean;
  errorMessage?: string;
}

export default function AdminLoginForm({ isLoading = false, errorMessage }: AdminLoginFormProps) {
  const phoneId = useId();
  const passwordId = useId();
  const messageId = useId();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();
  const isInvalid = Boolean(errorMessage);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    navigate("/admin-main");
  };

  return (
    <Form onSubmit={handleSubmit} noValidate>
      <Group>
        <Label htmlFor={phoneId}>전화번호</Label>
        <Input
          id={phoneId}
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder="010-0000-0000"
          maxLength={13}
          value={phoneNumber}
          aria-invalid={isInvalid || undefined}
          onChange={(event) => setPhoneNumber(formatPhoneNumber(event.target.value))}
        />
      </Group>
      <Group>
        <Label htmlFor={passwordId}>비밀번호</Label>
        <Field>
          <PasswordInput
            id={passwordId}
            type={passwordVisible ? "text" : "password"}
            autoComplete="current-password"
            placeholder="비밀번호를 입력해 주세요"
            value={password}
            aria-invalid={isInvalid || undefined}
            aria-describedby={isInvalid ? messageId : undefined}
            onChange={(event) => setPassword(event.target.value)}
          />
          <ToggleButton type="button" onClick={() => setPasswordVisible((previous) => !previous)}>
            {passwordVisible ? "숨기기" : "보기"}
          </ToggleButton>
        </Field>
      </Group>
      <Message id={messageId} role="alert">{errorMessage}</Message>
      <SubmitButton type="submit" disabled={isLoading}>
        {isLoading ? "로그인 중..." : "로그인"}
      </SubmitButton>
    </Form>
  );
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Group = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
  min-width: 0;

  & + & {
    margin-top: 28px;
  }
`;

const Label = styled.label`
  color: ${colors.text};
  font-size: 14px;
  font-weight: 700;
  line-height: 17px;
`;

const Input = styled(TextInput)`
  height: 60px;
  padding: 0 20px;
  border-radius: 10px;
  font-size: 16px;
`;

const Field = styled.div`
  position: relative;
`;

const PasswordInput = styled(Input)`
  padding-right: 76px;
`;

const ToggleButton = styled.button`
  position: absolute;
  top: 50%;
  right: 20px;
  transform: translateY(-50%);
  padding: 4px;
  border: 0;
  background: transparent;
  color: ${colors.text};
  font-size: 13px;
  line-height: 16px;
  cursor: pointer;
`;

const Message = styled.p`
  min-height: 36px;
  padding-top: 12px;
  color: #e0243e;
  font-size: 13px;
  line-height: 16px;
`;

const SubmitButton = styled.button`
  width: 100%;
  height: 60px;
  border: 0;
  border-radius: 10px;
  background: ${colors.primary};
  color: ${colors.surface};
  font: inherit;
  font-size: 18px;
  font-weight: 700;
  cursor: pointer;

  &:hover:not(:disabled) {
    background: #2a52dd;
  }

  &:disabled {
    background: #f1f4f7;
    color: #9ba8be;
    cursor: not-allowed;
  }
`;
