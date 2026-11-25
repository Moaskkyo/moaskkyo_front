import styled from "@emotion/styled";
import { useState } from "react";
import {
  BirthdayPublicCard,
  FeedbackEmailCard,
  MainImageCard,
  RESULT_MESSAGE,
  ResultPopup,
} from "@/features/setting";
import { colors } from "@/shared/styles/colors";

export default function SettingPage() {
  const [birthdayPublic, setBirthdayPublic] = useState(true);
  const [popupMessage, setPopupMessage] = useState<string | null>(null);

  const handleToggleBirthday = () => {
    setBirthdayPublic((prev) => !prev);
    setPopupMessage(RESULT_MESSAGE.changed);
  };

  return (
    <Page>
      <Title>설정</Title>
      <Cards>
        <MainImageCard />
        <BirthdayPublicCard checked={birthdayPublic} onToggle={handleToggleBirthday} />
        <FeedbackEmailCard />
      </Cards>
      {popupMessage && (
        <ResultPopup message={popupMessage} onConfirm={() => setPopupMessage(null)} />
      )}
    </Page>
  );
}

const Page = styled.div`
  width: 720px;
  max-width: 100%;
  margin: 0 auto;
`;

const Title = styled.h1`
  margin: 0 0 18px;
  color: ${colors.text};
  font-size: 24px;
  font-weight: 700;
  line-height: 28px;
`;

const Cards = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
