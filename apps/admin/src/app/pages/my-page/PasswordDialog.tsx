import styled from "@emotion/styled";
import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import { FormButton, TextInput } from "../../../shared/FormControls";
import { colors } from "../../../shared/styles/colors";

const fields = [
  { name: "current", label: "현재 비밀번호", placeholder: "현재 비밀번호를 입력해 주세요", autoComplete: "current-password" },
  { name: "next", label: "새 비밀번호", placeholder: "새 비밀번호를 입력해 주세요", autoComplete: "new-password" },
  { name: "confirmation", label: "새 비밀번호 확인", placeholder: "새 비밀번호를 다시 입력해 주세요", autoComplete: "new-password" },
] as const;

type Field = (typeof fields)[number]["name"];
type Errors = Partial<Record<Field, string>>;

export default function PasswordDialog({ onClose }: { onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [visible, setVisible] = useState<Partial<Record<Field, boolean>>>({});
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState("");

  useEffect(() => {
    const element = dialog.current;
    element?.showModal();
    return () => element?.close();
  }, []);

  function validate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const current = String(data.get("current") ?? "");
    const next = String(data.get("next") ?? "");
    const confirmation = String(data.get("confirmation") ?? "");
    const nextErrors: Errors = {};

    if (!current) nextErrors.current = "현재 비밀번호를 입력해 주세요.";
    if (next.length < 8) nextErrors.next = "최소 8자 이상 입력해 주세요.";
    if (!confirmation || confirmation !== next) {
      nextErrors.confirmation = "새 비밀번호와 확인이 일치하지 않습니다.";
    }

    setErrors(nextErrors);
    const invalidField = fields.find(({ name }) => nextErrors[name]);
    if (invalidField) {
      setStatus("");
      const input = form.elements.namedItem(invalidField.name);
      if (input instanceof HTMLInputElement) input.focus();
    } else {
      setStatus("현재 비밀번호 변경을 사용할 수 없습니다.");
    }
  }

  function close() {
    dialog.current?.close();
    onClose();
  }

  return (
    <Dialog ref={dialog} aria-labelledby="password-dialog-title" aria-describedby="password-dialog-description"
      onCancel={(event) => { event.preventDefault(); close(); }}>
      <Form onSubmit={validate} noValidate>
        <header>
          <h2 id="password-dialog-title">비밀번호 재설정</h2>
          <p id="password-dialog-description">현재 비밀번호를 확인하고 새 비밀번호를 설정해 주세요.</p>
        </header>
        <Fields>
          {fields.map(({ name, label, placeholder, autoComplete }) => {
            const error = errors[name];
            const inputId = `my-page-password-${name}`;
            const messageId = `${inputId}-message`;
            return (
              <FieldGroup key={name}>
                <label htmlFor={inputId}>{label}</label>
                <InputRow>
                  <TextInput id={inputId} name={name} type={visible[name] ? "text" : "password"}
                    autoComplete={autoComplete} placeholder={placeholder} required
                    minLength={name === "next" ? 8 : undefined}
                    aria-invalid={error ? true : undefined}
                    aria-describedby={error || name === "next" ? messageId : undefined}
                    onChange={() => {
                      setErrors((previous) => ({
                        ...previous,
                        [name]: undefined,
                        ...(name === "next" && { confirmation: undefined }),
                      }));
                      setStatus("");
                    }} />
                  <VisibilityButton type="button" aria-label={`${label} ${visible[name] ? "숨기기" : "보기"}`}
                    onClick={() => setVisible((previous) => ({ ...previous, [name]: !previous[name] }))}>
                    {visible[name] ? "숨기기" : "보기"}
                  </VisibilityButton>
                </InputRow>
                <Message id={messageId} $error={Boolean(error)} aria-live="polite">
                  {error || (name === "next" ? "최소 8자 이상 입력해 주세요." : "")}
                </Message>
              </FieldGroup>
            );
          })}
        </Fields>
        <Actions>
          <Message role="status">{status}</Message>
          <div>
            <FormButton type="button" variant="plain" onClick={close}>취소</FormButton>
            <FormButton type="submit">비밀번호 변경</FormButton>
          </div>
        </Actions>
      </Form>
    </Dialog>
  );
}

const Dialog = styled.dialog`
  width: min(500px, calc(100% - 32px));
  max-height: calc(100dvh - 32px);
  padding: 0;
  border: 1px solid ${colors.border};
  border-radius: 15px;
  background: ${colors.surface};
  color: ${colors.text};

  &::backdrop { background: rgb(25 36 59 / 40%); }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  min-height: 620px;
  padding: 26px clamp(18px, 4vw, 32px) 40px;

  header h2 { font-size: 22px; }
  header p { margin-top: 8px; color: ${colors.textMuted}; font-size: 13px; line-height: 1.5; }
`;

const Fields = styled.div`
  display: grid;
  gap: 12px;
  margin-top: 26px;
`;

const FieldGroup = styled.div`
  label { display: block; margin-bottom: 8px; font-size: 13px; font-weight: 700; }
`;

const InputRow = styled.div`
  position: relative;

  input { height: 50px; padding-inline-end: 80px; }
  input::placeholder { color: ${colors.textMuted}; }
`;

const VisibilityButton = styled.button`
  position: absolute;
  inset: 4px 5px 4px auto;
  min-width: 60px;
  padding: 0 6px;
  border: 0;
  border-radius: 5px;
  background: transparent;
  color: ${colors.textMuted};
  font-size: 12px;
  cursor: pointer;
`;

const Message = styled.p<{ $error?: boolean }>`
  min-height: 21px;
  margin-top: 8px;
  font-size: 12px;
  line-height: 1.5;
  color: ${({ $error }) => $error ? "#c9182e" : colors.textMuted};
`;

const Actions = styled.div`
  margin-top: auto;
  padding-top: 32px;

  div { display: grid; grid-template-columns: 1fr 2.1fr; gap: 14px; }
  button { height: auto; min-height: 46px; padding: 8px; }
`;
