import styles from "./styles.module.scss";
import { Outlet } from "react-router";
import Select from "../../components/Select";
import Option from "../../components/Option";
import { css } from "../../utils/css.ts";
import { state } from "../../state/index.ts";

export const AppLayout = () => {
  const translator = state.useTranslator();
  const language = state.translator.useLanguage();
  const changeLanguage = state.translator.useChangeLanguage();
  if (!translator.data || !language.data) return [];
  return (
    <>
      <div className={styles.root}>
        <div className={styles.minHeight}>
          <div className={[styles.headerWrapper, "darker"].join(" ")}>
            <header className={styles.header}>
              <div className={styles.headerLeftMenu}>
                <div>Logo</div>
              </div>
              <div className={styles.headerRightMenu}>
                <div>Language</div>
                <Select
                  className={css(styles.select)}
                  name={"language"}
                  initialValue={
                    language.data ?? state.translator.languages.fallback
                  }
                  onInput={async (value) => {
                    if (typeof value !== "string") return;
                    changeLanguage(value);
                  }}
                >
                  {Array.from(
                    state.translator.languages.supported,
                    (language) => (
                      <Option key={language} value={language}>
                        {translator.data("languages", language)}
                      </Option>
                    ),
                  )}
                </Select>
                <div>Profile</div>
              </div>
            </header>
          </div>
          <div className={styles.mainWrapper}>
            <main>
              <Outlet />
            </main>
          </div>
        </div>
        <div className={styles.footerWrapper}>
          <footer>footer</footer>
        </div>
      </div>
    </>
  );
};
export default AppLayout;
