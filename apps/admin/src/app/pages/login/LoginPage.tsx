import styled from "@emotion/styled";
import { AdminLoginForm } from "../../../features/admin-login";
import { colors } from "../../../shared/styles/colors";

export default function LoginPage() {
  return (
    <Page>
      <Header>
        <Logo>모앗꾜 ADMIN</Logo>
      </Header>
      <Main>
        <Card>
          <Heading>
            <h1>관리자 로그인</h1>
            <p>발급받은 관리자 계정으로 로그인해 주세요.</p>
          </Heading>
          <AdminLoginForm />
          <Notice>
            <p>발급된 계정이 있는 관리자만 이용할 수 있어요.</p>
            <p>
              계정 발급이나 비밀번호 재설정은
              <br />
              서비스 운영 담당자에게 문의해 주세요.
            </p>
          </Notice>
        </Card>
        <Footer>모앗꾜 · 학교 정보를 모으는 곳</Footer>
      </Main>
    </Page>
  );
}

const Page = styled.div`
  min-height: 100dvh;
  background: ${colors.background};
`;

const Header = styled.header`
  padding: 36px 48px 0;

  @media (max-width: 600px) {
    padding: 24px 20px 0;
  }
`;

const Logo = styled.span`
  display: block;
  color: ${colors.primary};
  font-size: 26px;
  font-weight: 700;
  letter-spacing: -0.02em;
  line-height: 32px;
`;

const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 112px 24px 48px;

  @media (max-width: 600px) {
    padding: 48px 16px 40px;
  }
`;

const Card = styled.section`
  width: min(560px, 100%);
  padding: 44px 44px 68px;
  border: 1px solid ${colors.border};
  border-radius: 16px;
  background: ${colors.surface};

  @media (max-width: 600px) {
    padding: 32px 20px 44px;
  }
`;

const Heading = styled.div`
  margin-bottom: 40px;

  h1 {
    color: ${colors.text};
    font-size: 28px;
    font-weight: 700;
    letter-spacing: -0.02em;
    line-height: 30px;
  }

  p {
    margin-top: 16px;
    color: ${colors.textMuted};
    font-size: 14px;
    line-height: 20px;
  }
`;

const Notice = styled.div`
  margin-top: 36px;
  padding-top: 26px;
  border-top: 1px solid ${colors.border};
  color: ${colors.textMuted};
  font-size: 13px;

  p:first-of-type {
    line-height: 20px;
  }

  p + p {
    margin-top: 14px;
    line-height: 18px;
  }
`;

const Footer = styled.p`
  margin-top: 32px;
  color: ${colors.textMuted};
  font-size: 12px;
  line-height: 16px;
  text-align: center;
`;
