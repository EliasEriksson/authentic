import styles from "./styles.module.scss";
import { css } from "../../utils/css.ts";
import { state } from "../../state/index.ts";
import BlankLayout from "../BlankLayout";

export const AppLayout = () => {
  const translator = state.useTranslator();
  const sidebar = state.useSidebar();
  const changeSidebar = state.useChangeSidebar();
  if (!translator.data) return [];
  return (
    <BlankLayout
      aside={{
        start: <div className={css(styles.hoverOpen)}></div>,
        asideContent: (
          <div className={css(styles.asideWrapper)}>
            <div className={css(styles.asideHeadingWrapper)}>
              <div>Resources</div>
              <div className={css(styles.button)}>
                <button
                  className={css(styles.menuButton, styles.close)}
                  onClick={() => changeSidebar(!sidebar.data)}
                >
                  <svg
                    className={css(styles.menuImage)}
                    viewBox="0 0 24 24"
                    focusable="false"
                    aria-hidden="true"
                    role="presentation"
                  >
                    <path d="M21.414 5h-2v14h2V5Z"></path>
                    <path
                      fill-rule="evenodd"
                      d="M8.707 5.293 2 12l6.707 6.707 1.414-1.414L5.828 13h11.586v-2H5.828l4.293-4.293-1.414-1.414Z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </button>
                <button
                  className={css(styles.menuButton, styles.open)}
                  onClick={() => changeSidebar(!sidebar.data)}
                >
                  <svg
                    className={css(styles.menuImage)}
                    viewBox="0 0 24 24"
                    focusable="false"
                    aria-hidden="true"
                    role="presentation"
                  >
                    <path d="M21.414 5h-2v14h2V5Z"></path>
                    <path
                      fill-rule="evenodd"
                      d="M8.707 5.293 2 12l6.707 6.707 1.414-1.414L5.828 13h11.586v-2H5.828l4.293-4.293-1.414-1.414Z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>

            <ul className={css(styles.aside)}>
              <li>Applications</li>
              <li>Organizations</li>
              <li>Users</li>
              <li>spam</li>
              <li>spam</li>
              <li>spam</li>
              <li>spam</li>
              <li>spam</li>
              <li>spam</li>
              <li>spam</li>
              <li>spam</li>
              <li>spam</li>
              <li>spam</li>
              <li>spam</li>
              <li>spam</li>
              <li>spam</li>
              <li>spam</li>
              <li>spam</li>
              <li>spam</li>
              <li>spam</li>
              <li>spam</li>
              <li>spam</li>
              <li>spam</li>
              <li>spam</li>
              <li>spam</li>
              <li>spam</li>
              <li>spam</li>
              <li>spam</li>
              <li>spam</li>
              <li>spam</li>
              <li>spam</li>
              <li>spam</li>
              <li>spam</li>
              <li>spam</li>
              <li>spam</li>
              <li>spam</li>
              <li>spam</li>
              <li>spam</li>
              <li>spam</li>
              <li>spam</li>
              <li>spam</li>
              <li>spam</li>
              <li>spam</li>
              <li>spam</li>
              <li>spam</li>
              <li>spam</li>
              <li>spam</li>
              <li>spam</li>
            </ul>
          </div>
        ),
      }}
    />
  );
};
export default AppLayout;
