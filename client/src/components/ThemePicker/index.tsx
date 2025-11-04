import Select from "../../components/Select/index.tsx";
import SelectOption from "../SelectOption/index.tsx";
import { css } from "../../utils/css.ts";
import styles from "./styles.module.scss";
import { state } from "../../state/index.ts";

export interface Props {
  className?: string;
}

export const ThemePicker = (props: Props) => {
  const translator = state.useTranslator();
  const theme = state.useTheme();
  const changeTheme = state.useChangeTheme();
  if (!translator.data || !theme.data) return [];
  return (
    <Select
      className={css(styles.select, props.className)}
      name={"theme"}
      initialValue={theme.data ?? state.theme.fallback}
      unsearchable
      onInput={async (value) => {
        if (typeof value !== "string") return;
        changeTheme(value);
      }}
    >
      <SelectOption value={"auto"}>
        <div className={css(styles.optionContentWrapper)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={css(styles.themeIcon)}
            viewBox="0 0 512 512"
          >
            <path d="m 77.802,108.92 31.113,-31.113 65.054,65.054 -31.113,31.112 z" />
            <path d="m 338.029,369.14 31.112,-31.113 65.054,65.054 -31.112,31.112 z" />
            <path d="m 26,234 h 92 v 44 H 26 Z" />
            <path d="m 394,234 h 92 v 44 h -92 z" />
            <path d="m 77.815,403.074 65.054,-65.054 31.113,31.113 -65.054,65.054 z" />
            <path d="m 338.025,142.857 65.054,-65.054 31.113,31.113 -65.054,65.054 z" />
            <path d="m 234,394 h 44 v 92 h -44 z" />
            <path d="m 234,26 h 44 v 92 h -44 z" />
            <path d="m 208.92518,197.1542 c 0,-15.0268 2.20848,-30.21295 7.84579,-43.1542 C 179.29052,170.31544 154,208.59277 154,252.07483 154,310.57456 201.42544,358 259.92517,358 303.40723,358 341.68455,332.70947 358,295.22903 c -12.94124,5.63732 -28.14106,7.84581 -43.1542,7.84581 -58.49973,0 -105.92062,-47.4209 -105.92062,-105.92064 z" />
          </svg>
          <span className={css(styles.optionContentText)}>
            {translator.data("themes", "auto")}
          </span>
        </div>
      </SelectOption>
      <SelectOption value={"dark"}>
        <div className={css(styles.optionContentWrapper)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={css(styles.themeIcon)}
            viewBox="0 0 512 512"
          >
            <path d="M152.62 126.77c0-33 4.85-66.35 17.23-94.77C87.54 67.83 32 151.89 32 247.38 32 375.85 136.15 480 264.62 480c95.49 0 179.55-55.54 215.38-137.85-28.42 12.38-61.8 17.23-94.77 17.23-128.47 0-232.61-104.14-232.61-232.61z" />
          </svg>
          <span className={css(styles.optionContentText)}>
            {translator.data("themes", "dark")}
          </span>
        </div>
      </SelectOption>
      <SelectOption value={"light"}>
        <div className={css(styles.optionContentWrapper)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={css(styles.themeIcon)}
            viewBox="0 0 512 512"
          >
            <path d="M234 26h44v92h-44zM234 394h44v92h-44zM338.025 142.857l65.054-65.054 31.113 31.113-65.054 65.054zM77.815 403.074l65.054-65.054 31.113 31.113-65.054 65.054zM394 234h92v44h-92zM26 234h92v44H26zM338.029 369.14l31.112-31.113 65.054 65.054-31.112 31.112zM77.802 108.92l31.113-31.113 65.054 65.054-31.113 31.112zM256 358a102 102 0 11102-102 102.12 102.12 0 01-102 102z" />
          </svg>
          <span className={css(styles.optionContentText)}>
            {translator.data("themes", "light")}
          </span>
        </div>
      </SelectOption>
    </Select>
  );
};
export default ThemePicker;
