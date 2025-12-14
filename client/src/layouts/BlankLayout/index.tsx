import styles from "./styles.module.scss";
import { Outlet } from "react-router";
import LanguagePicker from "../../components/organisms/LanguagePicker/index.tsx";
import ThemePicker from "../../components/organisms/ThemePicker/index.tsx";
import { css } from "../../utils/css.ts";
import { state } from "../../state/index.ts";
import { Link } from "../../components/atoms/Link";
import { Logo } from "../../components/atoms/Logo";
import type { ReactNode } from "react";

interface Props {
  header?: {
    start?: ReactNode;
    left?: { start?: ReactNode; end?: ReactNode };
    right?: { start?: ReactNode; end?: ReactNode };
    end?: ReactNode;
  };
  aside?: {
    start?: ReactNode;
    asideContent?: ReactNode;
    end?: ReactNode;
  };
}

export const BlankLayout = (props: Props) => {
  const translator = state.useTranslator();
  const sidebar = state.useSidebar();
  if (!translator.data) return [];
  return (
    <div className={css(styles.grid, "darker")}>
      <div className={css(styles.headerWrapper)}>
        <header className={css(styles.header)}>
          {props.header?.start}
          <div className={css(styles.headerTop)}>
            <div className={css(styles.headerLeft)}>
              {props.header?.left?.start}
              <Link className={css(styles.logoLink)} to={"/app"}>
                <div className={css(styles.logoWrapper)}>
                  <Logo />
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
      <div className={css(styles.window)}>
        <div
          className={css(styles.asideWrapperWrapper, {
            [styles.open]: props.aside && sidebar.data,
            open: props.aside && sidebar.data,
          })}
        >
          {props.aside?.start}
          <div
            className={css(styles.asideWrapper, "darker", {
              [styles.open]: props.aside && sidebar.data,
              open: props.aside && sidebar.data,
            })}
          >
            <aside
              className={css(styles.aside, {
                [styles.open]: props.aside && sidebar.data,
                open: props.aside && sidebar.data,
              })}
            >
              <div>
                <div className={css(styles.asideContent)}>
                  {props.aside?.asideContent}
                </div>
              </div>
            </aside>
          </div>
          {props.aside?.end}
        </div>
        <div className={css(styles.mainFooter)}>
          <div className={css(styles.mainWrapper)}>
            <main className={css(styles.main)}>
              <Outlet />
            </main>
          </div>
          <div className={css(styles.footerWrapper, "darker")}>
            <footer className={css(styles.footer)}>footer</footer>
          </div>
        </div>
      </div>
    </div>
  );
};
export default BlankLayout;
