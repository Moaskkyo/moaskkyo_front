import { Global, css } from "@emotion/react";
import { colors } from "../shared/styles/colors";

export default function GlobalStyle() {
  return <Global styles={css`
    *, *::before, *::after { box-sizing: border-box; }
    html, body, #root { min-height: 100%; margin: 0; }
    body {
      font-family: "Pretendard", "Noto Sans KR", "Malgun Gothic", sans-serif;
      color: ${colors.text};
      background: ${colors.background};
      -webkit-font-smoothing: antialiased;
    }
    button, a { font: inherit; }
    button { color: inherit; }
    a { color: inherit; text-decoration: none; }
    h1, h2, p { margin: 0; }
    button:focus-visible, a:focus-visible {
      outline: 3px solid ${colors.primary};
      outline-offset: 3px;
    }
  `} />;
}
