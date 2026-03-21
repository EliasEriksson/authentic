import styles from "./styles.module.scss";
import { Outlet } from "react-router";
import { css } from "../../utils/css.ts";
import { state } from "../../state/index.ts";
import React, { useEffect, useRef } from "react";

export namespace SidebarLayout {
  export interface Props {
    header?: React.ReactNode;
    aside?: {
      header?: React.ReactNode;
      content: React.ReactNode;
      footer: React.ReactNode;
    };
    main?: { start?: React.ReactNode; end?: React.ReactNode };
    footer?: React.ReactNode;
  }
}

export function SidebarLayout(props: SidebarLayout.Props) {
  const translator = state.useTranslator();
  const layoutElement = useRef<HTMLDivElement | null>(null);
  const headerWrapperElement = useRef<HTMLDivElement | null>(null);
  const headerElement = useRef<HTMLElement | null>(null);
  useEffect(() => {
    if (!headerElement.current) return;
    const observer = new ResizeObserver(() => {
      layoutElement.current?.style.setProperty(
        "--page-header-required-height",
        `${headerElement.current?.scrollHeight ?? 0}px`,
      );
    });
    observer.observe(headerElement.current);
    return () => observer.disconnect();
  }, []);
  if (!translator.data) return [];
  return (
    <div ref={layoutElement} className={css(styles.layout, "darker")}>
      <div ref={headerWrapperElement} className={css(styles.headerWrapper)}>
        <header ref={headerElement} className={css(styles.header)}>
          <div className={css(styles.headerContent)}>{props.header}</div>
        </header>
      </div>
      <div className={css(styles.asideWrapper)}>
        <aside className={css(styles.aside)}>
          {props.aside?.header && (
            <header className={css(styles.asideHeader)}>
              {props.aside.header}
            </header>
          )}
          <div className={css(styles.asideContent)}>
            {props.aside?.content}
            <p>aside content</p>
            <p>aside content</p>
            <p>aside content</p>
            <p>aside content</p>
            <p>aside content</p>
            <p>aside content</p>
          </div>
          {props.aside?.footer && (
            <footer className={css(styles.asideFooter)}>
              {props.aside.footer}
            </footer>
          )}
        </aside>
      </div>
      <div className={css(styles.workspaceWrapper)}>
        <div className={css(styles.workspace)}>
          <div className={css(styles.workspaceContent)}>
            <div className={css(styles.mainWrapper)}>
              <main className={css(styles.main)}>
                <div className={css(styles.mainContent)}>
                  {props.main?.start}
                  <Outlet />
                  {props.main?.end}
                </div>
              </main>
            </div>
            <div className={css(styles.footerWrapper)}>
              <footer className={css(styles.footer)}>
                <div className={css(styles.footerContent)}>{props.footer}</div>
              </footer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default SidebarLayout;
