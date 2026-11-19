import styled from "@emotion/styled";
import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import Input from "@/shared/Input";
import { colors } from "@/shared/styles/colors";
import SubmitButton from "@/features/signup/ui/SubmitButton";

interface InviteCodeStepProps {
  errorMessage?: string;
  onVerify: () => void;
}

export default function InviteCodeStep({ errorMessage, onVerify }: InviteCodeStepProps) {
  const [inviteCode, setInviteCode] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onVerify();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        label="초대 코드"
        placeholder="초대 코드를 입력해 주세요"
        maxLength={6}
        invalid={Boolean(errorMessage)}
        value={inviteCode}
        onChange={(event) => setInviteCode(event.target.value)}
      />
      {errorMessage && <ErrorBox role="alert">{errorMessage}</ErrorBox>}
      <SubmitButton type="submit">코드 확인</SubmitButton>
      <Footer>
        이미 계정이 있나요? <FooterLink to="/login">로그인</FooterLink>
      </Footer>
    </Form>
  );
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const ErrorBox = styled.div`
  padding: 16px;
  border: 1px solid #ec8c93;
  border-radius: 12px;
  background-color: #ffebec;
  color: #b91c1c;
  font-size: 14px;
  font-weight: 700;
  line-height: 18px;
`;

const Footer = styled.p`
  margin: 10px 0 0;
  color: #475569;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
`;

const FooterLink = styled(Link)`
  margin-left: 4px;
  color: ${colors.primary};
  font-weight: 700;
  text-decoration: none;
`;
