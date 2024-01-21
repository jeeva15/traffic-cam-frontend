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
import Table from "../../components/Table";
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
    const { image, weatherLocation } = row;
    const data: any = await getWeatherForecastData(dateTime, weatherLocation);

    setWeatherForcast(data);
    setPhoto(image);
    setLocation(weatherLocation);
  };

  const isResultFound = tableData && tableData.length > 0;

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
      label: "Camera - Location",
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
            <Card title="Camera - Location" className="locationCard">
              <Table
                onRowClick={onClickLocation}
                columns={column}
                rows={tableData}
                title="Locations"
                hideHeader={true}
              ></Table>
            </Card>
          </div>
        )}
        {weatherForcast !== "" && (
          <div className={styles.weatherContainer}>
            <WeatherCard location={location} forecast={weatherForcast} />
          </div>
        )}
      </div>

      {isNotEmpty(photo) && (
        <div className="imageContainer">
          <ImageCard imgURL={photo} alt="Screenshot" title="Traffic Camera" />
        </div>
      )}
    </div>
  );
};

export default Home;
