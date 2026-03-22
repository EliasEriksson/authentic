import styles from "./styles.module.scss";
import { Outlet } from "react-router";
import { css } from "../../utils/css.ts";
import { state } from "../../state/index.ts";
import React, { useEffect, useRef } from "react";
import { Provider } from "./context/provider.tsx";
import { useSidebar } from "./context/hook.ts";
import { Button } from "../../components/atoms/button";
import { Collapse } from "../../components/molecules/Collapse";
import { BurgerIcon } from "../../components/atoms/icons/burger";
import { LogoIcon } from "../../components/atoms/icons/logo";
import { Link } from "../../components/atoms/Link";

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

function Component(props: SidebarLayout.Props) {
  const translator = state.useTranslator();
  const layoutElement = useRef<HTMLDivElement | null>(null);
  const headerElement = useRef<HTMLElement | null>(null);
  const sidebar = useSidebar();
  useEffect(() => {
    if (!headerElement.current) return;
    const observer = new ResizeObserver(() => {
      onHeaderResize(layoutElement, headerElement);
    });
    observer.observe(headerElement.current);
    onHeaderResize(layoutElement, headerElement);
    return () => observer.disconnect();
  }, []);
  if (!translator.data) return null;
  return (
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
            <div className={styles.headerRight}></div>
          </div>
        </header>
      </div>
      <div className={css(styles.asideWrapper, "darker")}>
        <Collapse
          className={styles.sidebarCollapse}
          open={sidebar.state}
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
  );
}
export function SidebarLayout(props: SidebarLayout.Props) {
  return (
    <Provider>
      <Component {...props} />
    </Provider>
  );
}
export default SidebarLayout;
