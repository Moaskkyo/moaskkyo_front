import styled from "@emotion/styled";
import { useState } from "react";
import { canEditDetail, type ScheduleWithDetail } from "@/entities/schedule";
import { ScheduleDetailForm } from "@/features/edit-schedule-detail";
import { useMyDdays } from "@/features/my-dday";
import Button from "@/shared/Button";
import Modal from "@/shared/Modal";
import { toDateKey } from "@/shared/lib/date";
import { colors } from "@/shared/styles/colors";
import DdaySection from "@/widgets/schedule-detail-modal/ui/DdaySection";

interface ScheduleDetailModalProps {
  schedule: ScheduleWithDetail;
  onClose: () => void;
  onSaveDetail: (scheduleId: string, detail: string) => void;
  onDeleteDetail: (scheduleId: string) => void;
}

/**
 * 특정 일정 클릭 → 상세 내용 조회(명세 detail_read).
 * 학사일정만 등록/수정/삭제 버튼과 D-day 영역을 보여준다. 등록·수정 후에는 바로 조회 화면으로 돌아간다.
 */
export default function ScheduleDetailModal({
  schedule,
  onClose,
  onSaveDetail,
  onDeleteDetail,
}: ScheduleDetailModalProps) {
  const [isEditing, setIsEditing] = useState(false);
  const { hasDday, addDday } = useMyDdays();
  // 방금 추가했을 때만 완료 문구를 보여준다.
  const [isDdayJustAdded, setIsDdayJustAdded] = useState(false);

  // 지난 일정을 추가하려고 할 때만 안내 문구를 보여준다.
  const [isPastDdayBlocked, setIsPastDdayBlocked] = useState(false);

  const handleAddDday = () => {
    if (schedule.startDate < toDateKey(new Date())) {
      setIsPastDdayBlocked(true);
      return;
    }
    addDday({
      scheduleId: schedule.id,
      title: schedule.title,
      date: schedule.startDate,
    });
    setIsDdayJustAdded(true);
  };

  const isEditable = canEditDetail(schedule);
  const hasDetail = schedule.detail !== null && schedule.detail.length > 0;

  const handleSubmit = (detail: string) => {
    onSaveDetail(schedule.id, detail);
    setIsEditing(false);
  };

  return (
    <Modal title={schedule.title} ariaLabel={`${schedule.title} 상세 내용`} onClose={onClose}>

      {isEditing ? (
        <ScheduleDetailForm
          mode={hasDetail ? "update" : "create"}
          initialValue={schedule.detail ?? ""}
          onCancel={() => setIsEditing(false)}
          onSubmit={handleSubmit}
        />
      ) : (
        <>
          <DetailBox>
            <DetailLabel>상세 내용</DetailLabel>
            {hasDetail ? (
              <DetailContent>{schedule.detail}</DetailContent>
            ) : (
              <DetailEmpty>상세 내용이 없습니다.</DetailEmpty>
            )}
          </DetailBox>

          {isEditable && hasDetail && (
            <ActionRow>
              <OutlineButton type="button" onClick={() => setIsEditing(true)}>
                상세 내용 수정
              </OutlineButton>
              <OutlineButton type="button" $danger onClick={() => onDeleteDetail(schedule.id)}>
                상세 내용 삭제
              </OutlineButton>
            </ActionRow>
          )}
          {isEditable && !hasDetail && (
            <ActionRow>
              <Button text="상세 내용 등록" width="100%" onClick={() => setIsEditing(true)} />
            </ActionRow>
          )}

          {isEditable && (
            <>
              <Divider />
              <DdaySection
                isAdded={hasDday(schedule.id)}
                showSuccessMessage={isDdayJustAdded}
                showPastMessage={isPastDdayBlocked}
                onAdd={handleAddDday}
              />
            </>
          )}
        </>
      )}
    </Modal>
  );
}

const DetailBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 16px;
  background-color: ${colors.surfaceMuted};
  border-radius: 12px;
`;

const DetailLabel = styled.p`
  margin: 0;
  color: ${colors.textSecondary};
  font-size: 13px;
  line-height: 18px;
`;

const DetailContent = styled.p`
  margin: 0;
  color: ${colors.text};
  font-size: 15px;
  line-height: 22px;
  white-space: pre-wrap;
  word-break: break-word;
`;

const DetailEmpty = styled.p`
  margin: 0;
  color: ${colors.textMuted};
  font-size: 15px;
  line-height: 22px;
`;

const ActionRow = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: 1fr;
  gap: 12px;
  margin-top: 12px;
`;

const OutlineButton = styled.button<{ $danger?: boolean }>`
  height: 44px;
  border: 1px solid ${({ $danger }) => ($danger ? colors.danger : colors.primary)};
  border-radius: 12px;
  background-color: ${colors.surface};
  color: ${({ $danger }) => ($danger ? colors.danger : colors.primaryStrong)};
  font-size: 14px;
  font-weight: bold;
  font-family: inherit;
  cursor: pointer;

  &:hover {
    background-color: ${({ $danger }) => ($danger ? colors.dangerSoft : colors.primarySoft)};
  }
`;

const Divider = styled.hr`
  margin: 16px 0;
  border: none;
  border-top: 1px solid ${colors.border};
`;
