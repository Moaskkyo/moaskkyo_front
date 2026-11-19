import styled from "@emotion/styled";
import { colors } from "@/shared/styles/colors";

export type SignupStep = "code" | "info";

interface StepIndicatorProps {
  step: SignupStep;
}

const STEPS: { id: SignupStep; label: string }[] = [
  { id: "code", label: "1/2 초대 코드" },
  { id: "info", label: "2/2 가입 정보" },
];

export default function StepIndicator({ step }: StepIndicatorProps) {
  const currentIndex = STEPS.findIndex((item) => item.id === step);

  return (
    <Wrapper>
      {STEPS.map((item, index) => {
        const isDone = index < currentIndex;
        const isActive = index === currentIndex;

        return (
          <Item key={item.id}>
            <Bar $filled={isDone || isActive} />
            <Label $active={isActive}>
              {isDone ? `${item.label} · 완료` : item.label}
            </Label>
          </Item>
        );
      })}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
`;

const Item = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Bar = styled.div<{ $filled: boolean }>`
  height: 4px;
  border-radius: 999px;
  background-color: ${({ $filled }) => ($filled ? "#3b82f6" : colors.border)};
`;

const Label = styled.span<{ $active: boolean }>`
  color: ${({ $active }) => ($active ? colors.primary : "#475569")};
  font-size: 14px;
  font-weight: ${({ $active }) => ($active ? 700 : 400)};
  line-height: 18px;
`;
