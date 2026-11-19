import styled from "@emotion/styled";

interface TitleProps {
  title: string;
  description: string;
}

export default function Title({ title, description }: TitleProps) {
  return (
    <Wrapper>
      <Heading>{title}</Heading>
      <Description>{description}</Description>
    </Wrapper>
  );
}

const Wrapper = styled.div``;

const Heading = styled.h1`
  margin: 0;
  color: #1e293b;
  font-size: 32px;
  font-weight: 700;
  line-height: 40px;
`;

const Description = styled.p`
  margin: 8px 0 0;
  color: #475569;
  font-size: 14px;
  line-height: 20px;
`;
