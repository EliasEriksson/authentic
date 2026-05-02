import LoginForm from "../../../features/LoginForm";
import { css } from "../../../../utils";
import styles from "./style.module.scss";

export const Login = () => {
  return (
    <div className={css(styles.loginWrapper)}>
      <div className={css(styles.login)}>
        <LoginForm />
      </div>
    </div>
  );
};
export default Login;
