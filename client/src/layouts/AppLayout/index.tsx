import styles from "./styles.module.scss";

import { Outlet } from "react-router";
import Select from "../../components/Select";
import Option from "../../components/Option";

export const AppLayout = () => {
  return (
    <>
      <div className={styles.root}>
        <div className={styles.minHeight}>
          <div className={[styles.headerWrapper, "darker"].join(" ")}>
            <header className={styles.header}>
              <div className={styles.headerLeftMenu}>
                <div>Logo</div>
              </div>
              <div className={styles.headerRightMenu}>
                <div>Language</div>
                <div>Profile</div>
                <div className={styles.selectWrapper}>
                  <Select name={"selector"} initialValue={"apple"}>
                    <Option value={"apple"} searchTerms={["fruit"]}>
                      Apple
                    </Option>
                    <Option value={"orange"} searchTerms={["fruit", "citrus"]}>
                      Orange
                    </Option>
                    <Option value={"lemon"} searchTerms={["fruit", "citrus"]}>
                      Lemon
                    </Option>
                  </Select>
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
