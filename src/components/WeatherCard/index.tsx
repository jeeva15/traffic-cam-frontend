import React, { FC, ReactNode } from "react";

import styles from "./style.module.scss";
import cx from "classnames";
import Card from "../Card";

interface StateProps {
  location: String;
  forecast?: string;
  date?: string;
}

const WeatherCard: FC<StateProps> = ({ location, forecast }) => {
  const iconClassName = `wi wi-day-${forecast?.toLowerCase()}`;
  return (
    <Card title="Weather" className={styles.weatherCard}>
      <div className={cx(styles.leftPanel, styles.panel)}>
        <div className="city padt-10 padb-10">{location}</div>
        <div className={styles.forcast}>
          <i className={iconClassName}></i>
          {forecast}
        </div>
      </div>
    </Card>
  );
};

export default WeatherCard;
