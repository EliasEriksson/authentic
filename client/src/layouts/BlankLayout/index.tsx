import styles from "./styles.module.scss";
import { Outlet } from "react-router";
import LanguagePicker from "../../components/organisms/LanguagePicker/index.tsx";
import ThemePicker from "../../components/organisms/ThemePicker/index.tsx";
import { css } from "../../utils/css.ts";
import { state } from "../../state/index.ts";
import { Link } from "../../components/atoms/Link";
import type { ReactNode } from "react";

interface Props {
  header?: {
    start?: ReactNode;
    left?: { start?: ReactNode; end?: ReactNode };
    right?: { start?: ReactNode; end?: ReactNode };
    end?: ReactNode;
  };
  aside?: ReactNode;
}

export const BlankLayout = (props: Props) => {
  const translator = state.useTranslator();
  const sidebar = state.useSidebar();
  if (!translator.data) return [];
  return (
    <div className={css(styles.grid, "darker")}>
      <div className={css(styles.pageHeight)}>
        <div className={css(styles.headerWrapper)}>
          <header className={css(styles.header)}>
            {props.header?.start}
            <div className={css(styles.headerTop)}>
              <div className={css(styles.headerLeft)}>
                {props.header?.left?.start}
                <Link className={css(styles.logoLink)} to={"/app"}>
                  <div className={css(styles.logoWrapper)}>
                    <span className={css(styles.logoLetter)}>A</span>
                    <svg className={css(styles.logo)} viewBox="0 0 512 512">
                      <path d="M420 192h-68v-80a96 96 0 10-192 0v80H92a12 12 0 00-12 12v280a12 12 0 0012 12h328a12 12 0 0012-12V204a12 12 0 00-12-12zm-106 0H198v-80.75a58 58 0 11116 0z" />
                    </svg>
                  </div>
                </Link>
                {props.header?.left?.end}
              </div>
              <div className={css(styles.headerRight)}>
                {props.header?.right?.start}
                <ThemePicker className={css(styles.select)} />
                <LanguagePicker className={css(styles.select)} />
                {props.header?.right?.end}
              </div>
            </div>
            {props.header?.end}
          </header>
        </div>
        <div className={css(styles.asideWrapper, "darker")}>
          <aside className={css(styles.aside, { [styles.open]: sidebar.data })}>
            <div>
              <div className={css(styles.asideContent)}>{props.aside}</div>
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
export default BlankLayout;
