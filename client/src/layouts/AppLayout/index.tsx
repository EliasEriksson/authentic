import styles from "./styles.module.scss";

import { Outlet } from "react-router";
import Select from "../../components/Select";
import Option from "../../components/Option";
import { css } from "../../utils/css.ts";
import { state } from "../../state/index.ts";
import { translations } from "../../translations/index.ts";
import i18next from "i18next";

export const AppLayout = () => {
  const { language } = state.useLanguage();
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
                  initialValue={language ?? translations.language.fallback}
                  onInput={async (value) => {
                    if (typeof value !== "string") return;
                    if (i18next.language !== value)
                      await i18next.changeLanguage(value);
                  }}
                >
                  {Array.from(translations.language.supported, (language) => (
                    <Option key={language} value={language}>
                      {i18next.t(`languages.${language}`)}
                    </Option>
                  ))}
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
