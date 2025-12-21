import styles from "./styles.module.scss";
import { Outlet } from "react-router";
import LanguagePicker from "../../components/organisms/LanguagePicker/index.tsx";
import ThemePicker from "../../components/organisms/ThemePicker/index.tsx";
import { css } from "../../utils/css.ts";
import { state } from "../../state/index.ts";
import { Link } from "../../components/atoms/Link";
import { Logo } from "../../components/atoms/Logo";
import type { ReactNode } from "react";
import SettingsMenu from "../../components/molecules/SettingsMenu";

export namespace BlankLayout {
  export interface Props {
    header?: {
      start?: ReactNode;
      left?: { start?: ReactNode; end?: ReactNode };
      right?: { start?: ReactNode; end?: ReactNode };
      end?: ReactNode;
    };
    aside?: {
      hoverArea?: ReactNode;
      content?: ReactNode;
    };
  }
}

export const BlankLayout = (props: BlankLayout.Props) => {
  const translator = state.useTranslator();
  const sidebar = state.useSidebar();
  if (!translator.data) return [];
  return (
    <div {...css(styles.grid, "darker")}>
      <div {...css(styles.headerWrapper)}>
        <header {...css(styles.header)}>
          {props.header?.start}
          <div {...css(styles.headerAreas)}>
            <div {...css(styles.headerLeft)}>
              {props.header?.left?.start}
              <Link {...css(styles.logoLink)} to={"/app"}>
                <div {...css(styles.logoWrapper)}>
                  <Logo />
                </div>
              </Link>
              {props.header?.left?.end}
            </div>
            <div {...css(styles.headerRight)}>
              {props.header?.right?.start}
              <SettingsMenu {...css(styles.settingsMenu)}>
                <ThemePicker {...css(styles.select)} />
                <LanguagePicker {...css(styles.select)} />
              </SettingsMenu>
              {props.header?.right?.end}
            </div>
          </div>
          {props.header?.end}
        </header>
      </div>
      <div {...css(styles.window)}>
        <div
          {...css(styles.asideWrapper, "darker", {
            [styles.open]: props.aside && sidebar.data,
          })}
        >
          <div {...css(styles.hoverArea)}>{props.aside?.hoverArea}</div>
          <div {...css(styles.asideScrollArea)}>
            <aside {...css(styles.aside)}>
              <div {...css(styles.asideContentHider)}>
                <div {...css(styles.asideContent)}>{props.aside?.content}</div>
              </div>
            </aside>
          </div>
        </div>
        <div {...css(styles.contentArea)}>
          <div {...css(styles.mainWrapper)}>
            <main {...css(styles.main)}>
              <Outlet />
            </main>
          </div>
          <div {...css(styles.footerWrapper, "darker")}>
            <footer {...css(styles.footer)}>footer</footer>
          </div>
        </div>
      </div>
    </div>
  );
};
export default BlankLayout;
