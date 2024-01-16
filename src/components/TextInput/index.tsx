import React, { FC } from "react";

import styles from "./style.module.scss";

interface StateProps {
  name: string;
  id: string;
  placeHolder?: string;
  width?: string;
  height?: string;
  onChange: (data: any) => void;
  value: string;
}

const TextInput: FC<StateProps> = ({
  name,
  id,
  placeHolder,
  width,
  height,
  onChange,
  value,
}) => {
  return (
    <input
      type="text"
      name={name}
      id={id}
      placeholder={placeHolder}
      className={styles.inputBox}
      width={width}
      height={height}
      onChange={onChange}
      value={value}
    />
  );
};

export default TextInput;
