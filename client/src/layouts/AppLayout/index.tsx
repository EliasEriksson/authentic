import styles from "./styles.module.scss";
import { css } from "../../utils/css.ts";
import { state } from "../../state/index.ts";
import BlankLayout from "../BlankLayout";
import { Link } from "../../components/atoms/Link";

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
              <Link to={"/app"} className={css(styles.asideMenuHomeLink)}>
                <svg className={css(styles.homeImage)} viewBox="0 0 512 512">
                  <path d="M416 174.74V48h-80v58.45L256 32 0 272h64v208h144V320h96v160h144V272h64l-96-97.26z" />
                </svg>
                <div className={css(styles.home)}>Home</div>
              </Link>
            </div>

            <ul className={css(styles.aside)}>
              <li>Applications</li>
              <li>Organizations</li>
              <li>Users</li>
            </ul>
          </div>
        ),
      }}
    />
  );
};
export default AppLayout;
