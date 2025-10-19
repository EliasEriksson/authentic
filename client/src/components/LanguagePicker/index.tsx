import Select from "../../components/Select/index.tsx";
import Option from "../../components/Option/index.tsx";
import { css } from "../../utils/css.ts";
import styles from "./styles.module.scss";
import { state } from "../../state/index.ts";

export interface Props {
  className?: string;
}

export const LanguagePicker = (props: Props) => {
  const translator = state.useTranslator();
  const language = state.translator.useLanguage();
  const changeLanguage = state.translator.useChangeLanguage();
  if (!translator.data || !language.data) return [];
  return (
    <Select
      className={css(styles.select, props.className)}
      name={"language"}
      unsearchable
      initialValue={language.data ?? state.translator.languages.fallback}
      onInput={async (value) => {
        if (typeof value !== "string") return;
        changeLanguage(value);
      }}
    >
      <Option value={"en"}>
        <div className={css(styles.optionContentWrapper)}>
          <img
            className={css(styles.optionContentImage)}
            src={`/assets/icons/flags/4x3/en.svg`}
            alt={"English"}
          />
          <span className={css(styles.optionContentText)}>English</span>
        </div>
      </Option>
      <Option value={"sv"}>
        <div className={css(styles.optionContentWrapper)}>
          <img
            className={css(styles.optionContentImage)}
            src={`/assets/icons/flags/4x3/sv.svg`}
            alt={"Svenska"}
          />
          <span className={css(styles.optionContentText)}>Svenska</span>
        </div>
      </Option>
    </Select>
  );
};
export default LanguagePicker;
