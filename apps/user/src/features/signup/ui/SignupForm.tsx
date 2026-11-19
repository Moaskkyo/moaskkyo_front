import styled from "@emotion/styled";
import { useState } from "react";
import { mockSchool } from "@/entities/school";
import Title from "@/shared/Title";
import InviteCodeStep from "@/features/signup/ui/InviteCodeStep";
import SignupInfoStep from "@/features/signup/ui/SignupInfoStep";
import StepIndicator, { type SignupStep } from "@/features/signup/ui/StepIndicator";

interface SignupFormProps {
  inviteCodeErrorMessage?: string;
  isPhoneDuplicated?: boolean;
}

const DESCRIPTION: Record<SignupStep, string> = {
  code: "선생님이 알려 준 학급 초대 코드를 입력해야 가입할 수 있어요.",
  info: "가입에 필요한 정보를 입력해 주세요.",
};

export default function SignupForm({ inviteCodeErrorMessage, isPhoneDuplicated }: SignupFormProps) {
  const [step, setStep] = useState<SignupStep>("code");

  return (
    <Wrapper>
      <StepIndicator step={step} />
      <Title title="가입하기" description={DESCRIPTION[step]} />
      {step === "code" ? (
        <InviteCodeStep errorMessage={inviteCodeErrorMessage} onVerify={() => setStep("info")} />
      ) : (
        <SignupInfoStep
          schoolName={mockSchool.name}
          isPhoneDuplicated={isPhoneDuplicated}
          onChangeCode={() => setStep("code")}
        />
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
