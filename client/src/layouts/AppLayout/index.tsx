import styles from "./styles.module.scss";
import { Outlet } from "react-router";
import LanguagePicker from "../../components/LanguagePicker";
import { css } from "../../utils/css.ts";
import { state } from "../../state/index.ts";

export const AppLayout = () => {
  const translator = state.useTranslator();
  if (!translator.data) return [];
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
                <LanguagePicker className={css(styles.select)} />
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
