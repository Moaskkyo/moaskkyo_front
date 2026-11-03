import { Global, css } from "@emotion/react";

export default function GlobalStyle() {
  return (
    <Global
      styles={css`
        *,
        *::before,
        *::after {
          box-sizing: border-box;
        }

        body {
          margin: 0;
        }
      `}
    />
  );
}
