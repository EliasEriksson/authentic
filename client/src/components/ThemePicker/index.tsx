import Select from "../../components/Select/index.tsx";
import Option from "../../components/Option/index.tsx";
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
      {Array.from(state.theme.supported, (theme) => (
        <Option key={theme} value={theme}>
          {translator.data("themes", theme)}
        </Option>
      ))}
    </Select>
  );
};
export default ThemePicker;
