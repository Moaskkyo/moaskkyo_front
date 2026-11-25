import styled from "@emotion/styled";
import { Card, CardDescription, CardTitle } from "@/features/setting/ui/SettingCard";
import Toggle from "@/shared/Toggle";
import { colors } from "@/shared/styles/colors";

interface BirthdayPublicCardProps {
  checked: boolean;
  onToggle: () => void;
}

export default function BirthdayPublicCard({ checked, onToggle }: BirthdayPublicCardProps) {
  return (
    <Card>
      <CardTitle>생일 공개</CardTitle>
      <Row>
        <Texts>
          <Label>내 생일 공개하기</Label>
          <CardDescription>켜 두면 다른 학생들의 캘린더에 내 생일이 보여요.</CardDescription>
        </Texts>
        <Toggle checked={checked} onClick={onToggle} />
      </Row>
    </Card>
  );
}

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-top: 8px;
`;

const Texts = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 0;
`;

const Label = styled.span`
  color: ${colors.text};
  font-size: 16px;
  font-weight: 500;
  line-height: 22px;
`;
