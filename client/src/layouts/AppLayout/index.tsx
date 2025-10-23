import styles from "./styles.module.scss";
import { Outlet } from "react-router";
import LanguagePicker from "../../components/LanguagePicker/index.tsx";
import ThemePicker from "../../components/ThemePicker/index.tsx";
import { css } from "../../utils/css.ts";
import { state } from "../../state/index.ts";
import { Link } from "../../components/Link";

export const AppLayout = () => {
  const translator = state.useTranslator();
  const sidebar = state.useSidebar();
  const changeSidebar = state.useChangeSidebar();
  if (!translator.data) return [];
  return (
    <div className={css(styles.grid, "darker")}>
      <div className={css(styles.pageHeight)}>
        <div className={css(styles.headerWrapper)}>
          <header className={css(styles.header)}>
            <button onClick={() => changeSidebar(!sidebar.data)}>
              <svg
                className={css(styles.menuImage)}
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M11.6663 12.6686L11.801 12.6823C12.1038 12.7445 12.3313 13.0125 12.3313 13.3337C12.3311 13.6547 12.1038 13.9229 11.801 13.985L11.6663 13.9987H3.33325C2.96609 13.9987 2.66839 13.7008 2.66821 13.3337C2.66821 12.9664 2.96598 12.6686 3.33325 12.6686H11.6663ZM16.6663 6.00163L16.801 6.0153C17.1038 6.07747 17.3313 6.34546 17.3313 6.66667C17.3313 6.98788 17.1038 7.25586 16.801 7.31803L16.6663 7.33171H3.33325C2.96598 7.33171 2.66821 7.03394 2.66821 6.66667C2.66821 6.2994 2.96598 6.00163 3.33325 6.00163H16.6663Z"></path>
              </svg>
            </button>
            <div className={css(styles.headerTop)}>
              <div className={css(styles.headerLeft)}>
                <Link className={css(styles.logoLink)} to={"/app"}>
                  <div className={css(styles.logoWrapper)}>
                    <span className={css(styles.logoLetter)}>A</span>
                    <svg className={css(styles.logo)} viewBox="0 0 512 512">
                      <path d="M420 192h-68v-80a96 96 0 10-192 0v80H92a12 12 0 00-12 12v280a12 12 0 0012 12h328a12 12 0 0012-12V204a12 12 0 00-12-12zm-106 0H198v-80.75a58 58 0 11116 0z" />
                    </svg>
                  </div>
                </Link>
              </div>
              <div className={css(styles.headerRight)}>
                <ThemePicker className={css(styles.select)} />
                <LanguagePicker className={css(styles.select)} />
              </div>
            </div>
          </header>
        </div>
        <div className={css(styles.asideWrapper, "darker")}>
          <aside className={css(styles.aside)}>
            <div className={css(styles.asideEntry)}>
              <div className={css(styles.asideImage)}>image</div>
              <div className={css(styles.asideContent)}>
                This is my long long long long content
              </div>
            </div>
          </aside>
        </div>
        <div className={css(styles.mainWrapper)}>
          <main className={css(styles.main)}>
            <Outlet />
          </main>
        </div>
      </div>
      <div className={css(styles.footerWrapper, "darker")}>
        <footer className={css(styles.footer)}>footer</footer>
      </div>
    </div>
  );
};
export default AppLayout;
