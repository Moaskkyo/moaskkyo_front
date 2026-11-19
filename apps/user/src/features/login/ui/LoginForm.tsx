import styled from "@emotion/styled";
import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import Input from "@/shared/Input";
import { formatPhoneNumber } from "@/shared/lib/phone";
import Title from "@/shared/Title";
import { colors } from "@/shared/styles/colors";

interface LoginFormProps {
  isLoading?: boolean;
  errorMessage?: string;
}

export default function LoginForm({ isLoading = false, errorMessage }: LoginFormProps) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const isInvalid = Boolean(errorMessage);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <Wrapper>
      <Title title="로그인" description="다시 만나서 반가워요! 전화번호와 비밀번호를 입력해 주세요." />
      <Form onSubmit={handleSubmit}>
        <Input
          label="전화번호"
          type="tel"
          inputMode="tel"
          placeholder="010-0000-0000"
          maxLength={13}
          invalid={isInvalid}
          value={phoneNumber}
          onChange={(event) => setPhoneNumber(formatPhoneNumber(event.target.value))}
        />
        <Input
          label="비밀번호"
          type="password"
          placeholder="비밀번호를 입력해 주세요"
          invalid={isInvalid}
          errorMessage={errorMessage}
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <SubmitButton type="submit" disabled={isLoading}>
          {isLoading ? "로그인 중..." : "로그인"}
        </SubmitButton>
      </Form>
      <Footer>
        계정이 없나요? <FooterLink to="/signup">회원가입</FooterLink>
      </Footer>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 22px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

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

  &:disabled {
    background-color: #f1f5f9;
    color: #475569;
    cursor: not-allowed;
  }
`;

const Footer = styled.p`
  margin: 12px 0 0;
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
