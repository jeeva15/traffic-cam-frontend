import React, { FC, ReactNode } from "react";

import styles from "./style.module.scss";
import cx from "classnames";

interface StateProps {
  location: String;
  forcast?: string;
  date?: string;
}

const WeatherCard: FC<StateProps> = ({ location, forcast, date }) => {
  const iconClassName = `wi wi-day-${forcast?.toLowerCase()}`;
  return (
    <div className={styles.widget}>
      <div className={cx(styles.leftPanel, styles.panel)}>
        <div className="title">{date}</div>
        <div className="city padt-10 padb-10">{location}</div>
        <div className={styles.forcast}>
          <i className={iconClassName}></i>
          {forcast}
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
