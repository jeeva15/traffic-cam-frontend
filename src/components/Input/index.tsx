import React, { FC } from "react";

import styles from "./style.module.scss";

interface StateProps {
  name: string;
  id: string;
  placeHolder?: string;
  width?: string;
  height?: string;
  onChange: (data: any) => void;
  value?: string;
  type: string;
}

const DateInput: FC<StateProps> = ({
  name,
  id,
  placeHolder,
  width,
  height,
  onChange,
  value,
  type,
}) => {
  return (
    <input
      type={type}
      name={name}
      id={id}
      placeholder={placeHolder}
      className={styles.input}
      width={width}
      height={height}
      onChange={onChange}
      value={value}
    />
  );
};

export default DateInput;
