import { FC, ReactNode } from "react";
import styles from "./style.module.scss";
import cx from "classnames";

interface StateProps {
  children: ReactNode;
  title?: string;
  className?: string;
}

const Card: FC<StateProps> = ({ children, title, className }) => {
  return (
    <div className={cx(styles.card, className)}>
      {title && <div className={styles.title}>{title}</div>}
      <div className={styles.childContainer}>{children}</div>
    </div>
  );
};

export default Card;
