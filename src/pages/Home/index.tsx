import { useState } from "react";
import SearchBox from "../../containers/SearchBox";
import { handleGetRequest } from "../../utils/requestUtils";
import { GridColumn, GridContainer, GridRow } from "../../components/Grid";
import Card from "../../components/Card";
import WeatherCard from "../../components/WeatherCard";
import { getCurrentDateString } from "../../utils/utils";
import ImageCard from "../../components/ImageCard";

const Home = () => {
  const [tableData, setTableData] = useState([]);
  const [weatherForcast, setWeatherForcast] = useState("");
  const [photo, setPhoto] = useState("");
  const [location, setLocation] = useState("");
  const onClickSearch = async (date: string) => {
    const data: any = await handleGetRequest(
      `/api/search/traffic-cameras?date_time=${date}`
    );

    setTableData(data);
    // showWeatherAndPhoto(data[0]);
  };

  const showWeatherAndPhoto = async (row: any) => {
    setWeatherForcast(row.weather);
    setPhoto(row.image);
    setLocation(row.location);
  };
  const isResultFound = tableData.length > 0;
  const date = getCurrentDateString();
  return (
    <>
      <div>&nbsp;</div>
      <div className="main">
        <GridContainer>
          <GridRow columns={2}>
            <GridColumn>
              <SearchBox onClickSearch={() => onClickSearch(date)} />
            </GridColumn>
          </GridRow>
        </GridContainer>
      </div>

      <GridContainer>
        <GridRow columns={2}>
          {isResultFound && (
            <div className="locationContainer">
              <div className="locationChild">
                <GridColumn>
                  {tableData.map((row: any) => (
                    <div>
                      <Card onClick={() => showWeatherAndPhoto(row)}>
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
