import React, { FC } from "react";

import styles from "./style.module.scss";
import Card from "../Card";

interface StateProps {
  imgURL: string;
  alt: string;
  title: string;
}

const ImageCard: FC<StateProps> = ({ imgURL, alt, title }) => {
  return (
    <div className={styles.imageCard}>
      <Card title={title}>
        {" "}
        <img src={imgURL} alt={alt} className={styles.img} />
      </Card>
    </div>
  );
};

export default ImageCard;
