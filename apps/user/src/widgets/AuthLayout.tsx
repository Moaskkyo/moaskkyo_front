import styled from "@emotion/styled";
import type { ReactNode } from "react";
import { colors } from "@/shared/styles/colors";

interface AuthLayoutProps {
  description: string;
  children: ReactNode;
}

export default function AuthLayout({ description, children }: AuthLayoutProps) {
  return (
    <Wrapper>
      <Brand>
        <BrandName>모앗꾜</BrandName>
        <BrandDescription>{description}</BrandDescription>
      </Brand>
      <Content>
        <Panel>{children}</Panel>
      </Content>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: 100vh;
`;

const Brand = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background-color: ${colors.primary};
  color: ${colors.surface};
  text-align: center;
`;

const BrandName = styled.p`
  margin: 0;
  font-size: 64px;
  font-weight: 800;
  line-height: 76px;
`;

const BrandDescription = styled.p`
  margin: 18px 0 0;
  font-size: 16px;
  line-height: 24px;
`;

const Content = styled.main`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
`;

const Panel = styled.div`
  width: 400px;
  max-width: 100%;
`;
