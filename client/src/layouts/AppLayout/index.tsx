import styles from "./styles.module.scss";
import { Outlet } from "react-router";
import LanguagePicker from "../../components/LanguagePicker/index.tsx";
import ThemePicker from "../../components/ThemePicker/index.tsx";
import { css } from "../../utils/css.ts";
import { state } from "../../state/index.ts";
import { Link } from "../../components/Link";

export const AppLayout = () => {
  const translator = state.useTranslator();
  if (!translator.data) return [];
  return (
    <div className={styles.grid}>
      <div className={css(styles.pageHeight)}>
        <div className={css(styles.headerWrapper, "darker")}>
          <header className={css(styles.header)}>
            <div>burger</div>
            <div>header</div>
          </header>
        </div>
        <div className={css(styles.asideWrapper, "darker")}>
          <aside className={css(styles.aside)}>aside</aside>
        </div>
        <div className={css(styles.mainWrapper)}>
          <main className={css(styles.main)}>main</main>
        </div>
      </div>
      <div className={css(styles.footerWrapper, "darker")}>
        <footer className={css(styles.footer)}>footer</footer>
      </div>
    </div>
    // <div className={styles.root}>
    //   <div className={styles.minHeight}>
    //     <div className={[styles.headerWrapper, "darker"].join(" ")}>
    //       <header className={styles.header}>
    //         <div className={styles.headerLeftMenu}>
    //           <Link className={css(styles.logoLink)} to={"/app"}>
    //             <div className={css(styles.logoWrapper)}>
    //               <span className={css(styles.logoLetter)}>A</span>
    //               <svg
    //                 xmlns="http://www.w3.org/2000/svg"
    //                 className={css(styles.logo)}
    //                 viewBox="0 0 512 512"
    //               >
    //                 <path d="M420 192h-68v-80a96 96 0 10-192 0v80H92a12 12 0 00-12 12v280a12 12 0 0012 12h328a12 12 0 0012-12V204a12 12 0 00-12-12zm-106 0H198v-80.75a58 58 0 11116 0z" />
    //               </svg>
    //             </div>
    //           </Link>
    //         </div>
    //         <div className={styles.headerRightMenu}>
    //           <ThemePicker className={css(styles.select)} />
    //           <LanguagePicker className={css(styles.select)} />
    //         </div>
    //       </header>
    //     </div>
    //     <div className={styles.mainWrapper}>
    //       <main>
    //         <Outlet />
    //       </main>
    //     </div>
    //   </div>
    //   <div className={styles.footerWrapper}>
    //     <footer>footer</footer>
    //   </div>
    // </div>
  );
};
export default AppLayout;
