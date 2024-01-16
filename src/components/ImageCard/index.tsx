import React, { FC, ReactNode } from "react";

import styles from "./style.module.scss";

interface StateProps {
  imgURL: string;
  location: string;
  alt: string;
  title: string;
}

const ImageCard: FC<StateProps> = ({ imgURL, location, alt, title }) => {
  return (
    <div className={styles.imageCard}>
      <div className={styles.container}>
        <h4>
          <b className="title">{title}</b>
        </h4>
        <p className="city">{location}</p>
      </div>
      <hr />
      <img src={imgURL} alt={alt} className={styles.img} />
    </div>
  );
};

export default ImageCard;
