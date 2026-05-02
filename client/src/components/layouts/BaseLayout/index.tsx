import styles from "./styles.module.scss";
import { Outlet } from "react-router";
import { css } from "../../../utils/css.ts";
import { state } from "../../../state";
import React, { useRef, useState } from "react";
import { SidebarContext } from "./context";
import { Button } from "../../common/Button";
import { Collapse } from "../../common/Collapse";
import { BurgerIcon } from "../../common/icons/burger";
import { LogoIcon } from "../../common/icons/logo";
import { Link } from "../../common/Link";
import ThemePicker from "../../features/ThemePicker";
import LanguagePicker from "../../features/LanguagePicker";
import SettingsMenu from "../../common/SettingsMenu";
import { SelectGroupProvider } from "../../common/Select/Group";

export namespace BaseLayout {
  export interface Props {
    header?: React.ReactNode;
    aside?: {
      header?: React.ReactNode;
      content?: React.ReactNode;
      footer?: React.ReactNode;
    };
    main?: { start?: React.ReactNode; end?: React.ReactNode };
    footer?: React.ReactNode;
  }
}

export function BaseLayout(props: BaseLayout.Props) {
  const translator = state.useTranslator();
  const layoutElement = useRef<HTMLDivElement | null>(null);
  const headerElement = useRef<HTMLElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const sidebar = {
    isOpen: isOpen,
    open: () => setIsOpen(() => true),
    close: () => setIsOpen(() => false),
    toggle: () => setIsOpen((isOpen) => !isOpen),
  } satisfies SidebarContext;
  if (!translator.data) return null;
  return (
    <SidebarContext value={sidebar}>
      <div ref={layoutElement} className={styles.layout}>
        <div className={css(styles.headerWrapper, "darker")}>
          <header ref={headerElement} className={styles.header}>
            <div className={styles.headerContent}>
              <div className={styles.headerLeft}>
                {props.aside && (
                  <Button
                    className={styles.burgerButton}
                    onClick={() => sidebar.toggle()}
                  >
                    <BurgerIcon />
                  </Button>
                )}
                <Link className={styles.logoButton} to={"/testing"}>
                  <LogoIcon />
                </Link>
              </div>
              <div className={styles.headerRight}>
                <SettingsMenu className={css(styles.settingsMenu)}>
                  <SelectGroupProvider>
                    <ThemePicker className={css(styles.select)} />
                    <LanguagePicker className={css(styles.select)} />
                  </SelectGroupProvider>
                </SettingsMenu>
              </div>
            </div>
          </header>
        </div>
        {props.aside && (
          <div className={css(styles.asideWrapper, "darker")}>
            <Collapse
              className={styles.sidebarCollapse}
              open={sidebar.isOpen}
              direction={"left-to-right"}
            >
              <aside className={styles.aside}>
                {props.aside?.header && (
                  <header className={styles.asideHeader}>
                    {props.aside.header}
                  </header>
                )}
                <div className={styles.asideContent}>
                  {props.aside?.content}
                </div>
                {props.aside?.footer && (
                  <footer className={styles.asideFooter}>
                    {props.aside.footer}
                  </footer>
                )}
              </aside>
            </Collapse>
          </div>
        )}
        <div className={styles.workspaceWrapper}>
          <div className={styles.workspace}>
            <div className={styles.workspaceContent}>
              <div className={styles.mainWrapper}>
                <main className={styles.main}>
                  <div className={styles.mainContent}>
                    {props.main?.start}
                    <Outlet />
                    {props.main?.end}
                  </div>
                </main>
              </div>
              <div className={css(styles.footerWrapper, "darker")}>
                <footer className={styles.footer}>
                  <div className={styles.footerContent}>{props.footer}</div>
                </footer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SidebarContext>
  );
}
