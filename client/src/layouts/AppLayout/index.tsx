import styles from "./styles.module.scss";

import { Outlet } from "react-router";

export const AppLayout = () => {
  return (
    <>
      <div className={styles.root}>
        <div className={styles.minHeight}>
          <div className={styles.headerWrapper}>
            <header className={styles.header}>
              <div className={styles.headerLeftMenu}>
                <div>Logo</div>
              </div>
              <div className={styles.headerRightMenu}>
                <div>Language</div>
                <div>Profile</div>
                <div className={styles.selectWrapper}>
                  <select>
                    <option>Apple</option>
                    <option>Orrange</option>
                  </select>
                </div>
              </div>
            </header>
          </div>
          <div className={styles.mainWrapper}>
            <main>
              <Outlet />
            </main>
          </div>
        </div>
        <div className={styles.footerWrapper}>
          <footer>footer</footer>
        </div>
      </div>
    </>
  );
};
export default AppLayout;
