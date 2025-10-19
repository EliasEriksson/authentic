import Select from "../../components/Select";
import Option from "../../components/Option";
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
      {Array.from(state.translator.languages.supported, (language) => (
        <Option key={language} value={language}>
          <div className={css(styles.optionContentWrapper)}>
            <img
              className={css(styles.optionContentImage)}
              src={`/assets/icons/flags/4x3/${language}.svg`}
              alt={translator.data("languages", language)}
            />
            <span className={css(styles.optionContentText)}>
              {translator.data("languages", language)}
            </span>
          </div>
        </Option>
      ))}
    </Select>
  );
};
export default LanguagePicker;
