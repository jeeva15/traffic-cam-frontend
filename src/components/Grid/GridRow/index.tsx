import React, { FC, ReactNode } from "react";
import cx from "classnames";
import styles from "./style.module.scss"


interface StateProps {
    children: ReactNode;
    columns: Number;
}

const GridRow: FC<StateProps>= ({ children, columns = 4 }) => {
    const cls = cx('', {
      [`gridRowCol${columns}`]: columns,
    });
  
    return (
      <div className={cx(styles.gridRow, cls)}>
        {children}
      </div>
    );
  };

  export default GridRow;