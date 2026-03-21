import LoginForm from "../../../components/organisms/LoginForm/index.tsx";
import { css } from "../../../utils/index.ts";
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
