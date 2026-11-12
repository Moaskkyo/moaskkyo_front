import { useEffect, useId, useRef, useState } from "react";
import styled from "@emotion/styled";
import { colors } from "./styles/colors";

interface FloorSelectProps {
  id?: string;
  value: string;
  onChange: (value: string) => void;
  includeAll?: boolean;
  label: string;
  compact?: boolean;
}

export default function FloorSelect({ id, value, onChange, includeAll = false, label, compact = false }: FloorSelectProps) {
  const generatedId = useId();
  const listId = `${generatedId}-options`;
  const options = includeAll ? ["", "2", "3", "4"] : ["2", "3", "4"];
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const optionRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const text = (option: string) => option ? `${option}층` : "전체 층";

  useEffect(() => {
    if (!open) return;
    const close = (event: PointerEvent) => {
      if (!root.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", close);
    return () => document.removeEventListener("pointerdown", close);
  }, [open]);

  useEffect(() => {
    if (open) optionRefs.current[active]?.focus();
  }, [open, active]);

  function choose(option: string) {
    onChange(option);
    setOpen(false);
    trigger.current?.focus();
  }

  return <Root ref={root} onBlur={(event) => {
    if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
  }}>
    <Trigger id={id} ref={trigger} type="button" $compact={compact} $placeholder={!value && !includeAll}
      aria-label={label} aria-haspopup="listbox" aria-expanded={open} aria-controls={listId}
      onClick={() => { setActive(Math.max(0, options.indexOf(value))); setOpen(!open); }}
      onKeyDown={(event) => {
        if (event.key === "ArrowDown" || event.key === "ArrowUp") {
          event.preventDefault(); setActive(Math.max(0, options.indexOf(value))); setOpen(true);
        }
      }}>
      {value || includeAll ? text(value) : "층을 선택해 주세요"}<Chevron $open={open} aria-hidden="true" />
    </Trigger>
    {open && <Options id={listId} role="listbox" aria-label={label} onKeyDown={(event) => {
      if (["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) {
        event.preventDefault();
        setActive(event.key === "Home" ? 0 : event.key === "End" ? options.length - 1 : (active + (event.key === "ArrowDown" ? 1 : -1) + options.length) % options.length);
      } else if (event.key === "Escape") {
        event.preventDefault(); event.stopPropagation(); setOpen(false); trigger.current?.focus();
      }
    }}>
      {options.map((option, index) => <Option key={option} ref={(node) => { optionRefs.current[index] = node; }} type="button"
        role="option" aria-selected={value === option} tabIndex={active === index ? 0 : -1}
        $active={active === index} onFocus={() => setActive(index)} onClick={() => choose(option)}>{text(option)}</Option>)}
    </Options>}
  </Root>;
}

const Root = styled.div`position: relative; min-width: 0;`;
const Trigger = styled.button<{ $compact: boolean; $placeholder: boolean }>`
  display: flex; justify-content: space-between; align-items: center; gap: 12px;
  width: 100%; height: ${({ $compact }) => $compact ? "48px" : "56px"}; padding: 0 15px;
  border: 1px solid #D6E0F2; border-radius: 8px; background: white;
  color: ${({ $placeholder }) => $placeholder ? "#8999B5" : colors.text};
  font: inherit; font-size: 14px; cursor: pointer; text-align: left;
  &[aria-expanded="true"] { outline: none; border-color: #718DFF; box-shadow: 0 0 0 1px #718DFF; }
`;
const Chevron = styled.span<{ $open: boolean }>`
  width: 6px; height: 6px; border-right: 1px solid currentColor; border-bottom: 1px solid currentColor;
  transform: ${({ $open }) => $open ? "rotate(225deg)" : "rotate(45deg)"}; margin-right: 10px;
`;
const Options = styled.div`
  position: absolute; top: calc(100% + 8px); left: 0; width: 100%; z-index: 5;
  padding: 7px 5px; border: 1px solid #D6E0F2; border-radius: 8px; background: white;
`;
const Option = styled.button<{ $active: boolean }>`
  display: block; width: 100%; height: 48px; border: 0; text-align: left; padding: 0 10px;
  background: ${({ $active }) => $active ? colors.primarySoft : "white"};
  color: ${({ $active }) => $active ? colors.primary : colors.text};
  font: inherit; font-size: 14px; cursor: pointer;
  font-weight: ${({ $active }) => $active ? 700 : 400};
  &:focus { outline: none; background: ${colors.primarySoft}; color: ${colors.primary}; }
  &:hover { background: ${colors.primarySoft}; }
`;
