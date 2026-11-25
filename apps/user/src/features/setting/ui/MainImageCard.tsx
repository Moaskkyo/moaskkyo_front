import styled from "@emotion/styled";
import { useEffect, useRef, useState, type ChangeEvent } from "react";
import {
  MAIN_IMAGE_MAX_BYTES,
  MAIN_IMAGE_TYPE,
  NOT_PNG_ERROR,
  TOO_LARGE_ERROR,
  type MainImageError,
} from "@/features/setting/model/mainImage";
import { Card, CardDescription, CardTitle } from "@/features/setting/ui/SettingCard";
import { colors } from "@/shared/styles/colors";

export default function MainImageCard() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [error, setError] = useState<MainImageError | null>(null);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    if (file.type !== MAIN_IMAGE_TYPE) {
      setError(NOT_PNG_ERROR);
      return;
    }
    if (file.size > MAIN_IMAGE_MAX_BYTES) {
      setError(TOO_LARGE_ERROR);
      return;
    }
    setError(null);
    setPreviewUrl(URL.createObjectURL(file));
  };

  return (
    <Card>
      <Row>
        <Preview>
          {previewUrl ? (
            <PreviewImage src={previewUrl} alt="메인 이미지 미리보기" />
          ) : (
            <>
              <PreviewLogo>모앗꾜</PreviewLogo>
              <PreviewCaption>현재 이미지</PreviewCaption>
            </>
          )}
        </Preview>
        <Info>
          <CardTitle>메인 이미지</CardTitle>
          <Description>PNG 파일만 올릴 수 있어요</Description>
          <ChangeButton type="button" onClick={() => inputRef.current?.click()}>
            이미지 변경
          </ChangeButton>
          {error && (
            <ErrorBox role="alert">
              <ErrorTitle>{error.title}</ErrorTitle>
              <ErrorHint>{error.hint}</ErrorHint>
            </ErrorBox>
          )}
        </Info>
      </Row>
      <HiddenInput
        ref={inputRef}
        type="file"
        accept={MAIN_IMAGE_TYPE}
        onChange={handleFileChange}
      />
    </Card>
  );
}

const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
`;

const Preview = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  flex-shrink: 0;
  width: 280px;
  height: 160px;
  overflow: hidden;
  background-color: #dbeafe;
  border: 1px solid #bfdbfe;
  border-radius: 12px;
`;

const PreviewLogo = styled.span`
  color: ${colors.primary};
  font-size: 20px;
  font-weight: 700;
  line-height: 24px;
`;

const PreviewCaption = styled.span`
  color: ${colors.primaryStrong};
  font-size: 12px;
  line-height: 16px;
`;

const PreviewImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  min-width: 0;
`;

const Description = styled(CardDescription)`
  margin-top: 2px;
`;

const ChangeButton = styled.button`
  height: 44px;
  margin-top: 16px;
  padding: 0 16px;
  border: none;
  border-radius: 12px;
  background-color: ${colors.primary};
  color: ${colors.surface};
  font-size: 14px;
  font-weight: 700;
  font-family: inherit;
  cursor: pointer;

  &:hover {
    background-color: ${colors.primaryStrong};
  }
`;

const ErrorBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 12px;
`;

const ErrorTitle = styled.span`
  color: ${colors.danger};
  font-size: 14px;
  font-weight: 700;
  line-height: 20px;
`;

const ErrorHint = styled.span`
  color: #475569;
  font-size: 14px;
  line-height: 20px;
`;

const HiddenInput = styled.input`
  display: none;
`;
