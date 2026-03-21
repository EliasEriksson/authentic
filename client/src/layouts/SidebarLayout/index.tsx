import styles from "./styles.module.scss";
import { Outlet } from "react-router";
import { css } from "../../utils/css.ts";
import { state } from "../../state/index.ts";
import React from "react";
import { ButtonStyles } from "../../components/atoms/button";
import { Link } from "../../components/atoms/Link";

export namespace SidebarLayout {
  export interface Props {
    header?: React.ReactNode;
    aside?: React.ReactNode;
    main?: { start?: React.ReactNode; end?: React.ReactNode };
    footer?: React.ReactNode;
  }
}

export function SidebarLayout(props: SidebarLayout.Props) {
  const translator = state.useTranslator();
  if (!translator.data) return [];
  return (
    <div className={css(styles.layout, "darker")}>
      <div className={css(styles.headerWrapper)}>
        {/* add resize observer on the header tag */}
        <header className={css(styles.header)}>
          <div className={css(styles.headerContent)}>
            <ButtonStyles component={"button"} props={{ type: "submit" }}>
              hello world
            </ButtonStyles>

            <ButtonStyles component={Link} props={{ to: "/testing" }}>
              to testing
            </ButtonStyles>
            <ButtonStyles component={Link} props={{ to: "/testing" }}>
              to testing
            </ButtonStyles>
            {props.header}
          </div>
        </header>
      </div>
      <div className={css(styles.asideWrapper)}>
        <aside className={css(styles.aside)}>
          <div className={css(styles.asideContent)}>
            {props.aside}
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
