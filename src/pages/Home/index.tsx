import { useState } from "react";
import SearchBox from "../../containers/SearchBox";
import {
  getTrafficImagesData,
  getWeatherForecastData,
} from "../../utils/apiHandler";
import WeatherCard from "../../components/WeatherCard";
import {
  encodeBase64,
  getCurrentDateString,
  isNotEmpty,
} from "../../utils/utils";
import ImageCard from "../../components/ImageCard";
import { useCookies } from "react-cookie";
import { USER_ID_COOKIE } from "../../common/constants";
import RecentSearches from "../../containers/RecentSearches";
import Table from "../../components/table";
import Card from "../../components/Card";
import styles from "./style.module.scss";

const Home = () => {
  const [tableData, setTableData] = useState([]);
  const [cookies, setCookie] = useCookies([USER_ID_COOKIE]);
  const [weatherForcast, setWeatherForcast] = useState("");
  const [photo, setPhoto] = useState("");
  const [location, setLocation] = useState("");
  const [dateTime, setDateTime] = useState("");

  const onClickSearch = async (dateTime: string) => {
    const data: any = await getTrafficImagesData(dateTime);

    setDateTime(dateTime);
    setTableData(data);
  };

  const onClickLocation = async (row: any) => {
    const { location } = row;
    const data: any = await getWeatherForecastData(dateTime, location);

    setWeatherForcast(data);
    setPhoto(row.image);
    setLocation(row.location);
  };

  const isResultFound = tableData && tableData.length > 0;
  const date = getCurrentDateString();

  //to be revisited - move code to utils
  if (cookies[USER_ID_COOKIE] === undefined) {
    const oneYearFromNow = new Date(
      new Date().setFullYear(new Date().getFullYear() + 1)
    );
    setCookie(USER_ID_COOKIE, encodeBase64(Date.now().toString()), {
      expires: oneYearFromNow,
    });
  }

  var column = [
    {
      label: "Location",
      field: "location",
    },
    {
      label: "",
      field: "",
      showButton: true,
    },
  ];

  return (
    <div className={styles.main}>
      <div className={styles.header}>
        <h1>Traffic Cam Website</h1>
      </div>
      <div>&nbsp;</div>
      <div>
        <SearchBox onClickSearch={onClickSearch} />
      </div>
      <div>
        <RecentSearches />
      </div>

      <div className={styles.result}>
        {isResultFound && (
          <div>
            <Card title="Location" className="locationCard">
              <Table
                onRowClick={onClickLocation}
                columns={column}
                rows={tableData}
                title="Locations"
              ></Table>
            </Card>
          </div>
        )}
        {weatherForcast !== "" && (
          <div className={styles.weatherContainer}>
            <WeatherCard
              location={location}
              forcast={weatherForcast}
              date={date}
            />
          </div>
        )}
      </div>

      {isNotEmpty(photo) && (
        <div className="imageContainer">
          <ImageCard
            imgURL={photo}
            alt="Screenshot"
            title="Traffic Camera"
            location={location}
          />
        </div>
      )}
    </div>
  );
};

export default Home;
