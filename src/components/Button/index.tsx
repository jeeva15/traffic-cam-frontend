import { FC, ReactNode } from "react";
import styles from "./style.module.scss";
import cx from "classnames";

interface StateProps {
  children: ReactNode;
  onClick: (data: any) => void;
  className?: string;
}

const Button: FC<StateProps> = ({ children, className, onClick }) => {
  return (
    <button className={cx(styles.btn, className)} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
