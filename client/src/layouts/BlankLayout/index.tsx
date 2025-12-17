import styles from "./styles.module.scss";
import { Outlet } from "react-router";
import LanguagePicker from "../../components/organisms/LanguagePicker/index.tsx";
import ThemePicker from "../../components/organisms/ThemePicker/index.tsx";
import { css } from "../../utils/css.ts";
import { state } from "../../state/index.ts";
import { Link } from "../../components/atoms/Link";
import { Logo } from "../../components/atoms/Logo";
import type { ReactNode } from "react";
import SettingsMenu from "../../components/atoms/SettingsMenu";

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
              {/* move button to menu component */}
              <SettingsMenu>
                <ThemePicker {...css(styles.select)} />
                <LanguagePicker {...css(styles.select)} />
                <div>hello world</div>
              </SettingsMenu>
              <button {...css(styles.settingsMenu)}>
                <svg {...css(styles.settingsMenuImage)} viewBox="0 0 512 512">
                  <path d="M256 176a80 80 0 1080 80 80.24 80.24 0 00-80-80zm172.72 80a165.53 165.53 0 01-1.64 22.34l48.69 38.12a11.59 11.59 0 012.63 14.78l-46.06 79.52a11.64 11.64 0 01-14.14 4.93l-57.25-23a176.56 176.56 0 01-38.82 22.67l-8.56 60.78a11.93 11.93 0 01-11.51 9.86h-92.12a12 12 0 01-11.51-9.53l-8.56-60.78A169.3 169.3 0 01151.05 393L93.8 416a11.64 11.64 0 01-14.14-4.92L33.6 331.57a11.59 11.59 0 012.63-14.78l48.69-38.12A174.58 174.58 0 0183.28 256a165.53 165.53 0 011.64-22.34l-48.69-38.12a11.59 11.59 0 01-2.63-14.78l46.06-79.52a11.64 11.64 0 0114.14-4.93l57.25 23a176.56 176.56 0 0138.82-22.67l8.56-60.78A11.93 11.93 0 01209.94 26h92.12a12 12 0 0111.51 9.53l8.56 60.78A169.3 169.3 0 01361 119l57.2-23a11.64 11.64 0 0114.14 4.92l46.06 79.52a11.59 11.59 0 01-2.63 14.78l-48.69 38.12a174.58 174.58 0 011.64 22.66z" />
                </svg>
                <div {...css(styles.settingsDropDown)}>
                  <div {...css(styles.settingsDropDownHider)}>
                    <div>hello</div>
                  </div>
                </div>
              </button>

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
