import { FC, useState } from "react";
import Button from "../../components/Button";
import TextInput from "../../components/TextInput";
import { getCurrentDateString, getCurrentTimeString } from "../../utils/utils";
import styles from "./style.module.scss";
import cx from "classnames";

interface StateProps {
  onClickSearch: (date: string) => void;
}
const SearchBox: FC<StateProps> = ({ onClickSearch }) => {
  const todayDate = getCurrentDateString();
  const timeNow = getCurrentTimeString();

  const [date, setDate] = useState(todayDate);
  const [time, setTime] = useState(timeNow);
  const onChangeDateHandler = (event: any) => {
    setDate(event.target.value);
  };

  const onChangeTimeHandler = (event: any) => {
    setTime(event.target.value);
  };

  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <div className={styles.col25}>
          <label htmlFor="date">Date</label>
        </div>

        <div className={styles.col75}>
          <TextInput
            name="date"
            id="date"
            placeHolder="dd/mm/yyyy"
            value={date}
            onChange={(e: any) => onChangeDateHandler(e)}
          />
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.col25}>
          <label htmlFor="time">Time:</label>
        </div>
        <div className={styles.col75}>
          <TextInput
            name="time"
            id="time"
            placeHolder="hh/mm/ss"
            value={time}
            onChange={onChangeTimeHandler}
          />
        </div>
      </div>
      <div className={styles.row}>
        <br />
        <Button onClick={(date: string) => onClickSearch(date)}>Search</Button>
      </div>
    </div>
  );
};

export default SearchBox;
