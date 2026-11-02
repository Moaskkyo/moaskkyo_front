import styled from "@emotion/styled";

interface ToggleProps {
  checked: boolean;
  onClick: () => void;
}

export default function Toggle({ checked, onClick }: ToggleProps) {
  return (
    <Wrapper
      type="button"
      role="switch"
      aria-checked={checked}
      $checked={checked}
      onClick={onClick}
    >
      <Knob $checked={checked} />
    </Wrapper>
  );
}

const Wrapper = styled.button<{ $checked: boolean }>`
  width: 40px;
  height: 24px;
  padding: 2px;
  border: none;
  border-radius: 999px;
  background-color: ${({ $checked }) => ($checked ? "#2563EB" : "#cbd5e1")};
  box-sizing: border-box;
  cursor: pointer;
  transition: background-color 0.2s;
`;

const Knob = styled.span<{ $checked: boolean }>`
  display: block;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: white;
  transform: translateX(${({ $checked }) => ($checked ? "16px" : "0")});
  transition: transform 0.2s;
`;
