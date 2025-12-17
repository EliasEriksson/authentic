import { css } from "../../../utils/index.ts";
import styles from "./style.module.scss";
import ForgotPasswordForm from "../../../components/organisms/ForgotPasswordForm";

export const ForgotPassword = () => {
  return (
    <div {...css(styles.forgotPasswordWrapper)}>
      <div {...css(styles.forgotPassword)}>
        <ForgotPasswordForm />
      </div>
    </div>
  );
};
export default ForgotPassword;
