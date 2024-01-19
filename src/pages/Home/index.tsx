import { useEffect, useState } from "react";
import SearchBox from "../../containers/SearchBox";
import {
  getRecentUsersSearch,
  getTrafficImagesData,
  getWeatherForecastData,
} from "../../utils/apiHandler";
import { GridColumn, GridContainer, GridRow } from "../../components/Grid";
import Card from "../../components/Card";
import WeatherCard from "../../components/WeatherCard";
import {
  encodeBase64,
  formatDateDDMMYYYYHHmmss,
  getCurrentDateString,
  isNotEmpty,
} from "../../utils/utils";
import ImageCard from "../../components/ImageCard";
import { useCookies } from "react-cookie";
import { USER_ID_COOKIE } from "../../common/constants";
import RecentSearches from "../../containers/RecentSearches";

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

  const onClickLocation = async (dateTime: string, row: any) => {
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

  return (
    <>
      <div>&nbsp;</div>
      <div className="main">
        <GridContainer>
          <GridRow columns={2}>
            <GridColumn>
              <SearchBox onClickSearch={onClickSearch} />
            </GridColumn>
          </GridRow>
        </GridContainer>
      </div>

      <RecentSearches />

      <GridContainer>
        <GridRow columns={2}>
          {isResultFound && (
            <div className="locationContainer">
              <div className="locationChild">
                <GridColumn>
                  {tableData.map((row: any) => (
                    <div>
                      <Card onClick={() => onClickLocation(dateTime, row)}>
                        {row.location}
                      </Card>
                      <br />
                    </div>
                  ))}
                </GridColumn>
              </div>
            </div>
          )}
          <GridColumn>
            {weatherForcast !== "" && (
              <>
                <WeatherCard
                  location={location}
                  forcast={weatherForcast}
                  date={date}
                />
              </>
            )}
          </GridColumn>
        </GridRow>
      </GridContainer>
      <br />
      <br />

      {photo !== "" && (
        <GridContainer>
          <GridRow columns={1}>
            <GridColumn>
              <ImageCard
                imgURL={photo}
                alt="Screenshot"
                title="Traffic Camera"
                location={location}
              />
            </GridColumn>
          </GridRow>
        </GridContainer>
      )}
      <br />
      <br />
    </>
  );
};

export default Home;
