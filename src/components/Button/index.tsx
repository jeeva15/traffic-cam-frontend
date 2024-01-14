import React, { FC, ReactNode } from "react";

import styles from "./style.module.scss";

interface StateProps {
    children: ReactNode;
    width?:string;
    height?: string;
    onClick:()=> void
}

const Button: FC<StateProps>= ({ children, width, height, onClick }) => {
  return (
     <button 
      className={styles.butt}
      onClick={onClick}
      >
        {children}
      </button>
  );
};

export default Button;