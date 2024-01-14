import React, { FC, ReactNode } from "react";
import cx from "classnames";
import styles from "./style.module.scss";

interface StateProps {
    children: ReactNode;
    width?: Number;
}

const GridColumn: FC<StateProps>= ({ children, width }) => {
  const cls = cx('', {
    [`gridColumnsWidth-${width}`]: width,
  });

  return (
    <div className={cx(styles.gridColumn, cls)}>
      {children}
    </div>
  );
};

export default GridColumn;