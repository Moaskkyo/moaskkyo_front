import styled from "@emotion/styled";
import { useEffect, type MouseEvent, type ReactNode } from "react";
import { colors } from "@/shared/styles/colors";

interface ModalProps {
  /** 헤더 한 줄에 닫기 버튼과 함께 표시되는 제목 */
  title: string;
  /** 스크린리더용 대화상자 이름. 생략하면 title을 쓴다. */
  ariaLabel?: string;
  onClose: () => void;
  children: ReactNode;
}

/** 화면 중앙 대화상자. 배경 클릭, ESC, 헤더의 닫기로 닫힌다. */
export default function Modal({ title, ariaLabel, onClose, children }: ModalProps) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const handleOverlayClick = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) onClose();
  };

  return (
    <Overlay onClick={handleOverlayClick}>
      <Dialog role="dialog" aria-modal="true" aria-label={ariaLabel ?? title}>
        <Header>
          <Title>{title}</Title>
          <CloseButton type="button" onClick={onClose}>
            닫기
          </CloseButton>
        </Header>
        {children}
      </Dialog>
    </Overlay>
  );
}

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background-color: ${colors.overlay};
`;

const Dialog = styled.div`
  width: 440px;
  max-width: 100%;
  max-height: 100%;
  overflow-y: auto;
  padding: 20px;
  background-color: ${colors.surface};
  border-radius: 16px;
  box-shadow: 0 20px 48px rgba(15, 23, 42, 0.2);
  box-sizing: border-box;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 16px;
`;

const Title = styled.h2`
  margin: 0;
  min-width: 0;
  overflow: hidden;
  color: ${colors.text};
  font-size: 20px;
  font-weight: 700;
  line-height: 28px;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const CloseButton = styled.button`
  flex-shrink: 0;
  padding: 4px;
  border: none;
  background: none;
  color: ${colors.textSecondary};
  font-size: 14px;
  font-family: inherit;
  cursor: pointer;

  &:hover {
    color: ${colors.text};
  }
`;
