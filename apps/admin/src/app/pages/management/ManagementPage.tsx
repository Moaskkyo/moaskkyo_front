import styled from "@emotion/styled";
import ActionLink from "../../../shared/ActionLink";
import { colors } from "../../../shared/styles/colors";

interface ManagementPageProps { title: string; }

export default function ManagementPage({ title }: ManagementPageProps) {
  return <Content><h1>{title}</h1><p>아직 구현되지 않은 관리 페이지입니다.</p><ActionLink to="/">대시보드로 돌아가기</ActionLink></Content>;
}

const Content = styled.div`
  h1 { font-size: 24px; }
  p { margin: 16px 0 24px; color: ${colors.textMuted}; }
`;
