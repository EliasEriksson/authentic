import styles from "./styles.module.scss";
import { Outlet } from "react-router";
import { css } from "../../utils/css.ts";
import { state } from "../../state/index.ts";
import React, { useEffect, useRef } from "react";
import { Provider } from "./context/provider.tsx";
import { useSidebar } from "./context/hook.ts";
import { Button } from "../../components/atoms/button";

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
    <div ref={layoutElement} className={css(styles.layout, "darker")}>
      <div className={css(styles.headerWrapper)}>
        <header ref={headerElement} className={css(styles.header)}>
          {/* only the div bellow is allowed as child in header */}
          {/* if the size of this element changes it will affect*/}
          {/* the resize observer badly*/}
          <div className={css(styles.headerContent)}>
            <Button onClick={() => sidebar.toggle()}>toggle</Button>
            {props.header}
          </div>
        </header>
      </div>
      <div
        className={css(styles.asideWrapper, { [styles.open]: sidebar.state })}
      >
        <aside className={css(styles.aside)}>
          {props.aside?.header && (
            <header className={css(styles.asideHeader)}>
              {props.aside.header}
            </header>
          )}
          <div className={css(styles.asideContent)}>{props.aside?.content}</div>
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
export function SidebarLayout(props: SidebarLayout.Props) {
  return (
    <Provider>
      <Component {...props} />
    </Provider>
  );
}
export default SidebarLayout;
