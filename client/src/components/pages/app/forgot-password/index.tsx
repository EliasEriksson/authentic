import { css } from "../../../../utils";
import styles from "./style.module.scss";
import ForgotPasswordForm from "../../../features/ForgotPasswordForm";

export const ForgotPassword = () => {
  return (
    <div className={css(styles.forgotPasswordWrapper)}>
      <div className={css(styles.forgotPassword)}>
        <ForgotPasswordForm />
      </div>
    </div>
  );
};
export default ForgotPassword;
