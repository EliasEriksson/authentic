import styles from "./styles.module.scss";
import { Outlet } from "react-router";
import { css } from "../../utils/css.ts";
import { state } from "../../state/index.ts";
import React, { useEffect, useRef, useState } from "react";
import { SidebarContext } from "./context";
import { Button } from "../../components/atoms/Button";
import { Collapse } from "../../components/molecules/Collapse";
import { BurgerIcon } from "../../components/atoms/icons/burger";
import { LogoIcon } from "../../components/atoms/icons/logo";
import { Link } from "../../components/atoms/Link";
import ThemePicker from "../../components/organisms/ThemePicker";
import LanguagePicker from "../../components/organisms/LanguagePicker";
import SettingsMenu from "../../components/molecules/SettingsMenu";
import { SelectGroupProvider } from "../../components/molecules/Select/Group";

export namespace SidebarLayout {
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

function onHeaderResize(
  layoutElement: React.RefObject<HTMLElement | null>,
  headerElement: React.RefObject<HTMLElement | null>,
) {
  layoutElement.current?.style.setProperty(
    styles.pageHeaderRequiredHeightVariable,
    `${headerElement.current?.scrollHeight ?? 0}px`,
  );
}

function SidebarLayout(props: SidebarLayout.Props) {
  const translator = state.useTranslator();
  const layoutElement = useRef<HTMLDivElement | null>(null);
  const headerElement = useRef<HTMLElement | null>(null);
  useEffect(() => {
    if (!headerElement.current) return;
    const observer = new ResizeObserver(() => {
      onHeaderResize(layoutElement, headerElement);
    });
    observer.observe(headerElement.current);
    onHeaderResize(layoutElement, headerElement);
    return () => observer.disconnect();
  }, []);
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
            {/* only the div bellow is allowed as child in header */}
            {/* if the size of this element changes it will affect*/}
            {/* the resize observer badly*/}
            <div className={styles.headerContent}>
              <div className={styles.headerLeft}>
                <Button
                  className={styles.burgerButton}
                  onClick={() => sidebar.toggle()}
                >
                  <BurgerIcon />
                </Button>
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
                <p>content</p>
                <p>content</p>
                <p>content</p>
                <p>content</p>
                <p>content</p>
                <p>content</p>
                <p>content</p>
                <p>content</p>
                <p>content</p>
                <p>content</p>
                <p>content</p>
                <p>content</p>
                <p>content</p>
                <p>content</p>
                <p>content</p>
                <p>content</p>
                <p>content</p>
                <p>content</p>
                <p>content</p>
                <p>content</p>
                <p>content</p>
                <p>content</p>
                <p>content</p>
                <p>content</p>
                <p>content</p>
                <p>content</p>
                <p>content</p>
                <p>content</p>
                <p>content</p>
                <p>content</p>
              </div>
              {props.aside?.footer && (
                <footer className={styles.asideFooter}>
                  {props.aside.footer}
                </footer>
              )}
            </aside>
          </Collapse>
        </div>
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
export default SidebarLayout;
