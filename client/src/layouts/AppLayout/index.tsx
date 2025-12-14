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
        hoverArea: <div className={css(styles.asideHoverArea)}></div>,
        content: (
          <div
            className={css(styles.asideWrapper, {
              [styles.open]: sidebar.data,
            })}
          >
            <div className={css(styles.homeWrapper)}>
              <div className={css(styles.home)}>Resources</div>
              <button
                className={css(styles.asideMenuButton)}
                onClick={() => changeSidebar(!sidebar.data)}
              >
                <svg
                  className={css(styles.asideMenuButtonImage)}
                  viewBox="0 0 24 24"
                  focusable="false"
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
