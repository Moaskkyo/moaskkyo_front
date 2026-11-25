import styled from "@emotion/styled";
import { useId, useState, type ChangeEvent, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "@/shared/Input";
import { formatPhoneNumber } from "@/shared/lib/phone";
import { colors } from "@/shared/styles/colors";
import SubmitButton from "@/features/signup/ui/SubmitButton";

interface SignupInfoValues {
  name: string;
  grade: string;
  classNumber: string;
  studentNumber: string;
  phoneNumber: string;
  password: string;
  birthMonth: string;
  birthDay: string;
}

interface SignupInfoStepProps {
  schoolName: string;
  isPhoneDuplicated?: boolean;
  onChangeCode: () => void;
}

const INITIAL_VALUES: SignupInfoValues = {
  name: "",
  grade: "",
  classNumber: "",
  studentNumber: "",
  phoneNumber: "",
  password: "",
  birthMonth: "",
  birthDay: "",
};

export default function SignupInfoStep({
  schoolName,
  isPhoneDuplicated = false,
  onChangeCode,
}: SignupInfoStepProps) {
  const [values, setValues] = useState<SignupInfoValues>(INITIAL_VALUES);
  const [agreed, setAgreed] = useState(false);
  const birthLabelId = useId();
  const navigate = useNavigate();

  const handleChange =
    (key: keyof SignupInfoValues, format?: (value: string) => string) =>
    (event: ChangeEvent<HTMLInputElement>) => {
      const value = format ? format(event.target.value) : event.target.value;
      setValues((prev) => ({ ...prev, [key]: value }));
    };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    navigate("/login");
  };

  return (
    <Form onSubmit={handleSubmit}>
      <SchoolBox>
        <SchoolName>{schoolName}</SchoolName>
        <ChangeCodeButton type="button" onClick={onChangeCode}>
          코드 다시 입력
        </ChangeCodeButton>
      </SchoolBox>
      <Input
        label="이름"
        placeholder="이름을 입력해 주세요"
        value={values.name}
        onChange={handleChange("name")}
      />
      <Row $columns={3}>
        <Input
          label="학년"
          inputMode="numeric"
          value={values.grade}
          onChange={handleChange("grade")}
        />
        <Input
          label="반"
          inputMode="numeric"
          value={values.classNumber}
          onChange={handleChange("classNumber")}
        />
        <Input
          label="번호"
          inputMode="numeric"
          value={values.studentNumber}
          onChange={handleChange("studentNumber")}
        />
      </Row>
      <Input
        label="휴대전화 번호"
        type="tel"
        inputMode="tel"
        placeholder="010-0000-0000"
        maxLength={13}
        invalid={isPhoneDuplicated}
        errorMessage={
          isPhoneDuplicated ? (
            <>
              이미 가입된 전화번호예요. 로그인해 주세요.
              <ErrorLink to="/login">로그인하러 가기</ErrorLink>
            </>
          ) : undefined
        }
        value={values.phoneNumber}
        onChange={handleChange("phoneNumber", formatPhoneNumber)}
      />
      <Input
        label="비밀번호"
        type="password"
        placeholder="비밀번호를 입력해 주세요"
        value={values.password}
        onChange={handleChange("password")}
      />
      <Group role="group" aria-labelledby={birthLabelId}>
        <GroupLabel id={birthLabelId}>생일</GroupLabel>
        <Row $columns={2}>
          <Input
            aria-label="월"
            placeholder="월"
            inputMode="numeric"
            maxLength={2}
            value={values.birthMonth}
            onChange={handleChange("birthMonth")}
          />
          <Input
            aria-label="일"
            placeholder="일"
            inputMode="numeric"
            maxLength={2}
            value={values.birthDay}
            onChange={handleChange("birthDay")}
          />
        </Row>
      </Group>
      <TermsRow>
        <TermsLabel>
          <Checkbox
            type="checkbox"
            checked={agreed}
            onChange={(event) => setAgreed(event.target.checked)}
          />
          [필수] 이용약관과 개인정보 처리방침에 동의해요
        </TermsLabel>
        <TermsViewButton type="button">보기</TermsViewButton>
      </TermsRow>
      <Submit type="submit" disabled={isPhoneDuplicated}>
        가입하기
      </Submit>
    </Form>
  );
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const SchoolBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  height: 58px;
  padding: 0 16px;
  border: 1px solid #bfdbfe;
  border-radius: 12px;
  background-color: ${colors.primarySoft};
`;

const SchoolName = styled.span`
  min-width: 0;
  color: ${colors.primaryStrong};
  font-size: 14px;
  font-weight: 700;
`;

const ChangeCodeButton = styled.button`
  flex-shrink: 0;
  padding: 4px 0;
  border: none;
  background: none;
  color: ${colors.primary};
  font-size: 14px;
  font-weight: 700;
  font-family: inherit;
  cursor: pointer;

  &:hover {
    color: ${colors.primaryStrong};
  }
`;

const Row = styled.div<{ $columns: number }>`
  display: grid;
  grid-template-columns: repeat(${({ $columns }) => $columns}, 1fr);
  gap: 8px;
`;

const Group = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const GroupLabel = styled.span`
  color: ${colors.textSecondary};
  font-size: 14px;
  font-weight: 500;
  line-height: 17px;
`;

const ErrorLink = styled(Link)`
  padding: 10px 0;
  color: ${colors.primary};
  font-weight: 700;
  text-decoration: none;
`;

const TermsRow = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-top: 8px;
`;

const TermsLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  color: ${colors.textSecondary};
  font-size: 14px;
  cursor: pointer;
`;

const Checkbox = styled.input`
  appearance: none;
  flex-shrink: 0;
  width: 20px;
  height: 20px;
  margin: 0;
  border: 1.5px solid #cbd5e1;
  border-radius: 6px;
  background-color: ${colors.surface};
  background-position: center;
  background-repeat: no-repeat;
  cursor: pointer;

  &:checked {
    border-color: ${colors.primary};
    background-color: ${colors.primary};
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='none' stroke='white' stroke-width='2.2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M5 10.5l3.2 3.2L15 6.8'/%3E%3C/svg%3E");
  }
`;

const TermsViewButton = styled.button`
  padding: 4px 0;
  border: none;
  background: none;
  color: ${colors.primary};
  font-size: 14px;
  font-weight: 700;
  font-family: inherit;
  cursor: pointer;

  &:hover {
    color: ${colors.primaryStrong};
  }
`;

const Submit = styled(SubmitButton)`
  margin-top: 12px;
`;
