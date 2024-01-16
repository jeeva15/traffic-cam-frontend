import React, { FC, ReactNode } from "react";
import cx from "classnames";
import styles from "./style.module.scss";

interface StateProps {
  children: ReactNode;
  width?: Number;
  className?: string;
}

const GridColumn: FC<StateProps> = ({ children, width, className }) => {
  const cls = cx("", {
    [`gridColumnsWidth-${width}`]: width,
  });

  return (
    <div className={cx(styles.gridColumn, cls, className)}>{children}</div>
  );
};

export default GridColumn;
