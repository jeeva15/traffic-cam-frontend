import { FC, useState } from "react";
import Button from "../../components/Button";
import { isNotEmpty } from "../../utils/utils";
import styles from "./style.module.scss";
import Input from "../../components/Input";
import { toast } from "react-toastify";
import Card from "../../components/Card";

interface StateProps {
  onClickSearch: (date: string) => void;
}
const SearchBox: FC<StateProps> = ({ onClickSearch }) => {
  const [dateValue, setDate] = useState("");
  const [timeValue, setTime] = useState("");
  const onChangeDateHandler = (event: any) => {
    console.log("Handling input change:", event.target.value);
    setDate(event.target.value);
  };

  const onChangeTimeHandler = (event: any) => {
    setTime(event.target.value);
  };

  const onClickSearchButton = (date: string) => {
    if (isNotEmpty(date)) {
      onClickSearch(date);
    } else {
      toast.error("Please choose date");
    }
  };

  return (
    <Card>
      <div className={styles.container}>
        <Input
          type="date"
          name="date"
          id="date"
          placeHolder="dd/mm/yyyy"
          onChange={(e: any) => onChangeDateHandler(e)}
          value={dateValue}
        />

        <Input
          type="time"
          name="time"
          id="time"
          placeHolder="hh/mm"
          onChange={onChangeTimeHandler}
          value={timeValue}
        />

        <Button
          onClick={() => onClickSearchButton(`${dateValue} ${timeValue}`)}
        >
          Search
        </Button>
      </div>
    </Card>
  );
};

export default SearchBox;
