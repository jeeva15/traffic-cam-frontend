import { FC, ReactNode } from "react";
import styles from "./style.module.scss";

interface StateProps {
  children: ReactNode;
  onClick: (data: any) => void;
}

const Card: FC<StateProps> = ({ children, onClick }) => {
  return (
    <div className={styles.card} onClick={onClick}>
      <div className="city">
        <h3>{children}</h3>
      </div>
    </div>
  );
};

export default Card;
