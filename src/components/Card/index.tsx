import { FC, ReactNode } from "react";
import styles from "./style.module.scss";
import cx from "classnames";

interface StateProps {
  children: ReactNode;
  onClick?: (data: any) => void;
  title?: string;
  className?: string;
}

const Card: FC<StateProps> = ({ children, onClick, title, className }) => {
  return (
    <div className={cx(styles.card, className)} onClick={onClick}>
      {title && <div className={styles.title}>{title}</div>}
      <div className={styles.childContainer}>{children}</div>
    </div>
  );
};

export default Card;
