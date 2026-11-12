import { useId, useRef, useState } from "react";
import styled from "@emotion/styled";
import type { Teacher } from "../../../entities/teacher";
import { TextInput } from "../../../shared/FormControls";
import { colors } from "../../../shared/styles/colors";

interface TeacherSearchProps {
  value: string;
  teachers: Teacher[];
  onChange: (value: string) => void;
  onSelect: (teacher: Teacher) => void;
}

export default function TeacherSearch({ value, teachers, onChange, onSelect }: TeacherSearchProps) {
  const id = useId();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const input = useRef<HTMLInputElement>(null);
  const showResults = open && !!value.trim();
  function choose(teacher: Teacher) { onSelect(teacher); setOpen(false); input.current?.focus(); }

  return <Root onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false); }}>
    <SearchInput ref={input} role="combobox" aria-label="선생님 이름 검색" aria-autocomplete="list" aria-expanded={showResults}
      aria-controls={`${id}-results`} aria-activedescendant={showResults && teachers[active] ? `${id}-${teachers[active].id}` : undefined}
      placeholder="선생님 이름 검색" value={value} onFocus={() => setOpen(true)}
      onChange={(event) => { onChange(event.target.value); setOpen(true); setActive(0); }}
      onKeyDown={(event) => {
        if (event.key === "Escape") { setOpen(false); return; }
        if (event.key === "ArrowDown" || event.key === "ArrowUp") {
          event.preventDefault(); setOpen(true);
          setActive((index) => teachers.length ? (index + (event.key === "ArrowDown" ? 1 : -1) + teachers.length) % teachers.length : 0);
        } else if (event.key === "Enter" && showResults && teachers[active]) {
          event.preventDefault(); choose(teachers[active]);
        }
      }} />
    {showResults && <Results><Count role="status">검색 결과 {teachers.length}명</Count><div id={`${id}-results`} role="listbox" aria-label="선생님 검색 결과">
      {teachers.map((teacher, index) => <Result id={`${id}-${teacher.id}`} role="option" aria-selected={index === active} key={teacher.id}
        type="button" tabIndex={-1} $active={index === active} onMouseEnter={() => setActive(index)} onClick={() => choose(teacher)}>
        <span>{teacher.name} 선생님</span><Office>{teacher.office}</Office>
      </Result>)}
    </div></Results>}
  </Root>;
}

const Root = styled.div`position: relative; min-width: 0;`;
const SearchInput = styled(TextInput)`height: 48px;`;
const Results = styled.div`position: absolute; z-index: 4; top: calc(100% + 8px); width: 100%; background: white; border: 1px solid #D6E0F2; border-radius: 8px; padding: 8px 7px 14px; max-height: 320px; overflow-y: auto;`;
const Count = styled.p`font-size: 12px; color: #7F8DA7; padding: 8px 12px 16px;`;
const Result = styled.button<{ $active: boolean }>`
  width: 100%; min-height: 64px; display: flex; align-items: center; justify-content: space-between; gap: 16px;
  padding: 12px; border: 0; cursor: pointer; text-align: left; font: inherit; font-size: 14px;
  background: ${({ $active }) => $active ? colors.primarySoft : "white"};
  color: ${({ $active }) => $active ? colors.primary : colors.text};
  font-weight: ${({ $active }) => $active ? 700 : 400};
`;
const Office = styled.span`font-size: 13px; color: #7F8DA7; font-weight: 400; margin-right: 36px;`;
