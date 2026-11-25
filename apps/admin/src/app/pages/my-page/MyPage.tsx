import styled from "@emotion/styled";
import { useEffect, useRef, useState } from "react";
import type { MouseEvent } from "react";
import Card from "../../../shared/Card";
import PageHeading from "../../../shared/PageHeading";
import { FormButton } from "../../../shared/FormControls";
import { colors } from "../../../shared/styles/colors";
import PasswordDialog from "./PasswordDialog";

const subjects = ["국어", "수학", "영어", "사회", "과학", "정보"];
const schoolCode = "ABCD12";
const subjectStorageKey = "moaskkyo.admin.subject";

function readSavedSubject() {
  try {
    const saved = localStorage.getItem(subjectStorageKey);
    return saved && subjects.includes(saved) ? saved : "";
  } catch {
    return "";
  }
}

export default function MyPage() {
  const [passwordDialogOpen, setPasswordDialogOpen] = useState(false);
  const [subject, setSubject] = useState(readSavedSubject);
  const [subjectStatus, setSubjectStatus] = useState("");
  const [copyStatus, setCopyStatus] = useState("");
  const subjectList = useRef<HTMLDivElement>(null);
  const subjectTrigger = useRef<HTMLButtonElement>(null);
  const copyMenu = useRef<HTMLDivElement>(null);
  const codeTrigger = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!copyStatus) return;

    const timeout = window.setTimeout(() => setCopyStatus(""), 3000);
    return () => window.clearTimeout(timeout);
  }, [copyStatus]);

  function saveSubject() {
    if (!subject) {
      setSubjectStatus("담당 과목을 선택해 주세요.");
      subjectTrigger.current?.focus();
      return;
    }

    try {
      localStorage.setItem(subjectStorageKey, subject);
      setSubjectStatus(`담당 과목을 ${subject}(으)로 저장했습니다.`);
    } catch {
      setSubjectStatus("담당 과목을 저장하지 못했습니다.");
    }
  }

  function positionCopyMenu(event: MouseEvent<HTMLButtonElement>) {
    setCopyStatus("");

    const trigger = event.currentTarget.getBoundingClientRect();
    const activatedWithPointer = event.detail > 0;
    const x = activatedWithPointer ? event.clientX : trigger.left + trigger.width / 2;
    const y = activatedWithPointer ? event.clientY : trigger.bottom;

    copyMenu.current?.style.setProperty("--copy-menu-x", `${x}px`);
    copyMenu.current?.style.setProperty("--copy-menu-y", `${y}px`);
  }

  async function copySchoolCode() {
    copyMenu.current?.hidePopover();
    codeTrigger.current?.focus();
    try {
      await navigator.clipboard.writeText(schoolCode);
      setCopyStatus("복사 되었습니다");
    } catch {
      setCopyStatus("학교 코드를 복사하지 못했습니다.");
    }
  }

  return (
    <Page>
      <PageHeading title="마이페이지" description="내 계정과 담당 과목을 관리하고 학교 코드를 확인하세요." />

      <Panel aria-labelledby="my-info-title">
        <h2 id="my-info-title">내 정보</h2>
        <ReadOnlyValue>
          <span>정은진 선생님</span>
          <span>변경 불가</span>
        </ReadOnlyValue>
      </Panel>

      <Panel aria-labelledby="password-title">
        <ActionRow>
          <div>
            <h2 id="password-title">비밀번호 재설정</h2>
            <Description>새로운 비밀번호로 변경할 수 있어요.</Description>
          </div>
          <ActionButton type="button" onClick={() => setPasswordDialogOpen(true)}>
            비밀번호 재설정
          </ActionButton>
        </ActionRow>
      </Panel>

      <Panel aria-labelledby="subject-title">
        <h2 id="subject-title">과목 설정</h2>
        <Description>담당하는 과목을 선택하고 저장해 주세요.</Description>
        <SubjectRow>
          <SubjectControl>
            <SubjectTrigger ref={subjectTrigger} type="button" popoverTarget="my-page-subjects"
              aria-label={subject ? `담당 과목: ${subject}` : "담당 과목을 선택해 주세요"}>
              {subject || "과목을 선택해 주세요"}
              <span aria-hidden="true" />
            </SubjectTrigger>
            <SubjectList ref={subjectList} id="my-page-subjects" popover="auto" aria-label="담당 과목 목록" role="group">
              {subjects.map((option) => (
                <PopoverButton key={option} type="button" aria-pressed={subject === option} onClick={() => {
                  setSubject(option);
                  setSubjectStatus("");
                  subjectList.current?.hidePopover();
                  subjectTrigger.current?.focus();
                }}>
                  {option}
                </PopoverButton>
              ))}
            </SubjectList>
          </SubjectControl>
          <ActionButton type="button" onClick={saveSubject}>저장</ActionButton>
        </SubjectRow>
        <SubjectStatus role="status">{subjectStatus}</SubjectStatus>
      </Panel>

      <Panel aria-labelledby="school-code-title">
        <h2 id="school-code-title">학교 코드</h2>
        <Description>소속 학교의 코드를 확인하세요.</Description>
        <div>
          <CodeButton ref={codeTrigger} type="button" popoverTarget="my-page-copy"
            aria-label={`학교 코드 ${schoolCode}, 복사 메뉴`} onClick={positionCopyMenu}>
            <strong>{schoolCode}</strong>
          </CodeButton>
          <CopyMenu ref={copyMenu} id="my-page-copy" popover="auto">
            <PopoverButton type="button" onClick={copySchoolCode}>복사하기</PopoverButton>
          </CopyMenu>
        </div>
      </Panel>

      <Footer>
        <LogoutButton type="button" aria-disabled="true">로그아웃</LogoutButton>
      </Footer>

      <CopyStatus role="status">{copyStatus}</CopyStatus>
      {passwordDialogOpen && <PasswordDialog onClose={() => setPasswordDialogOpen(false)} />}
    </Page>
  );
}

const Page = styled.div`
  display: grid;
  gap: 22px;
  padding-bottom: 24px;

  h2 { font-size: 17px; line-height: 1.4; }

  @media (max-width: 700px) { gap: 16px; }
`;

const Panel = styled(Card)`
  padding: 18px 24px;
  @media (max-width: 700px) { padding: 16px; }
`;

const Description = styled.p`
  margin-top: 6px;
  color: ${colors.textMuted};
  font-size: 13px;
  line-height: 1.55;
`;

const SubjectStatus = styled(Description)`
  &:empty { margin: 0; }
`;

const ReadOnlyValue = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 4px 12px;
  min-height: 40px;
  margin-top: 12px;
  padding: 7px 14px;
  background: ${colors.background};
  border: 1px solid #d6e0f2;
  border-radius: 7px;
  color: ${colors.textMuted};
  font-size: 14px;

  span + span { font-size: 12px; }
  strong { color: ${colors.text}; font-size: 17px; }
`;

const ActionRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  min-height: 70px;
`;

const SubjectRow = styled(ActionRow)`
  min-height: 0;
  margin-top: 12px;
`;

const SubjectControl = styled.div`
  width: min(100%, 450px);
  anchor-name: --my-page-subject;

  &:has(:popover-open) > button {
    border-color: ${colors.primary};
    span { transform: rotate(225deg); }
  }
`;

const SubjectTrigger = styled.button`
  width: 100%;
  min-height: 40px;
  padding: 0 14px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  border: 1px solid #d6e0f2;
  border-radius: 7px;
  background: ${colors.surface};
  color: ${colors.textMuted};
  font-size: 13px;
  text-align: left;
  cursor: pointer;

  span {
    width: 6px;
    height: 6px;
    border: solid currentColor;
    border-width: 0 1px 1px 0;
    transform: rotate(45deg);
  }
`;

const Popover = styled.div`
  margin: 0;
  inset: auto;
  padding: 6px;
  border: 1px solid #d6e0f2;
  border-radius: 7px;
  background: ${colors.surface};
  color: ${colors.text};
`;

const SubjectList = styled(Popover)`
  position-anchor: --my-page-subject;
  top: calc(anchor(bottom) + 6px);
  left: anchor(left);
  width: anchor-size(width);
  max-height: min(280px, 40dvh);
  overflow-y: auto;
  position-try-fallbacks: flip-block;
`;

const PopoverButton = styled.button`
  width: 100%;
  min-height: 42px;
  padding: 8px 12px;
  border: 0;
  border-radius: 4px;
  background: transparent;
  text-align: left;
  font-size: 13px;
  cursor: pointer;

  &:hover, &:focus-visible, &[aria-pressed="true"] {
    background: ${colors.primarySoft};
    color: ${colors.primary};
  }
  &:focus-visible { outline-offset: -3px; }
`;

const CodeButton = styled(ReadOnlyValue.withComponent("button"))`
  width: 100%;
  text-align: left;
  cursor: pointer;
`;

const CopyMenu = styled(Popover)`
  --copy-menu-width: min(166px, calc(100% - 16px));
  position: fixed;
  top: clamp(8px, calc(var(--copy-menu-y) + 8px), calc(100dvh - 64px));
  left: clamp(8px, calc(var(--copy-menu-x) - var(--copy-menu-width) / 2), calc(100% - var(--copy-menu-width) - 8px));
  width: var(--copy-menu-width);
  background: ${colors.background};
`;

const CopyStatus = styled.p`
  position: fixed;
  left: 50%;
  bottom: calc(52px + env(safe-area-inset-bottom, 0px));
  z-index: 5;
  transform: translateX(-50%);
  width: fit-content;
  max-width: calc(100% - 32px);
  padding: 5.51px 13.23px;
  border-radius: 999px;
  background: rgb(173 204 255 / 42%);
  box-shadow: inset 0 0 0 1px rgb(53 99 243 / 30%);
  color: #163772;
  font-size: 14.33px;
  line-height: 1.5;
  text-align: center;
  pointer-events: none;

  &:empty { padding: 0; }
`;

const ActionButton = styled(FormButton)`
  width: min(100%, 162px);
  height: auto;
  min-height: 40px;
  padding: 7px 10px;
  font-size: 13px;
  &[aria-disabled="true"] { cursor: not-allowed; }
`;

const Footer = styled.footer`
  display: flex;
  justify-content: flex-end;
  margin-top: 14px;
  padding-top: 20px;
  border-top: 1px solid ${colors.border};
`;

const LogoutButton = styled(ActionButton)`
  min-height: 44px;
  border-color: #d92339;
  background: ${colors.surface};
  color: #c9182e;
  &:hover { background: #ffedef; }
`;
