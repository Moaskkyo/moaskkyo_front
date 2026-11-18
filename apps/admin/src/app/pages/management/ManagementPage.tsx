import styled from "@emotion/styled";
import ActionLink from "../../../shared/ActionLink";
import PageHeading from "../../../shared/PageHeading";

interface ManagementPageProps { title: string; }

export default function ManagementPage({ title }: ManagementPageProps) {
  return <Content><PageHeading title={title} description="아직 구현되지 않은 관리 페이지입니다." /><ActionLink to="/">대시보드로 돌아가기</ActionLink></Content>;
}

const Content = styled.div`
  > header { margin-bottom: 24px; }
`;
