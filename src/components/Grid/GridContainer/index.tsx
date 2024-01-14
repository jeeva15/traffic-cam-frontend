import React, { FC, ReactNode } from "react";
import styles from "./style.module.scss";

interface StateProps {
    children: ReactNode;
}

const GridContainer: FC<StateProps> = ({ children }) => (
    <div className={styles.grid}>
      {children}
    </div>
  );

export default GridContainer;