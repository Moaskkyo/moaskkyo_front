import styled from "@emotion/styled";
import { FEEDBACK_EMAIL } from "@/features/setting/model/feedback";
import { Card, CardDescription, CardTitle } from "@/features/setting/ui/SettingCard";
import { colors } from "@/shared/styles/colors";

export default function FeedbackEmailCard() {
  return (
    <Card>
      <CardTitle>피드백 보내기</CardTitle>
      <Description>불편한 점이나 바라는 점은 아래 이메일로 보내 주세요.</Description>
      <Email>{FEEDBACK_EMAIL}</Email>
    </Card>
  );
}

const Description = styled(CardDescription)`
  margin-top: 8px;
`;

const Email = styled.p`
  margin: 12px 0 0;
  color: ${colors.text};
  font-size: 16px;
  font-weight: 700;
  line-height: 22px;
  word-break: break-all;
`;
