import axios from "axios";
import { ToastOptions, toast } from "react-toastify";
import {
  ApiErrorCodes,
  AppErrorMessages,
  RECENT_SEARCH_API,
  TRAFFIC_IMAGE_API,
  USER_RECENT_SEARCH_API,
  WEATHER_FORECAST_API,
} from "../common/constants";
import { encodeBase64 } from "./utils";

export const getTrafficImagesData = async (
  dateTime: string
): Promise<Response> => {
  return handleGetRequest(
    `${TRAFFIC_IMAGE_API}?date_time=${encodeBase64(dateTime)}`
  ).then((dataArr: any) => {
    const resultArr: any = [];
    dataArr.map((data: any) => {
      resultArr.push({
        ...data,
        displayLocation: `${data.cameraId} - ${data.location}`,
      });
    });
    return resultArr;
  });
};

export const getRecentUsersSearch = async (): Promise<Response> => {
  return handleGetRequest(USER_RECENT_SEARCH_API);
};
export const getRecentSearch = async (): Promise<Response> => {
  return handleGetRequest(RECENT_SEARCH_API);
};

export const getWeatherForecastData = async (
  dateTime: string,
  location: string
): Promise<Response> => {
  return handleGetRequest(
    `${WEATHER_FORECAST_API}?date_time=${encodeBase64(
      dateTime
    )}&location=${encodeBase64(location)}`
  );
};

export const handleGetRequest = async (url: string, headers?: {}) => {
  return axios
    .get(url, {
      withCredentials: true,
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      errorHandler(error);
    });
};

export const handlePostRequest = async (
  url: string,
  body: any,
  headers?: {}
): Promise<Response> => {
  return axios
    .post(url, body, {
      headers: headers,
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      errorHandler(error);
    });
};

const toastConfig: ToastOptions = {
  type: "error",
};

export const errorHandler = (error: any) => {
  const errorCode = error?.response?.status;

  switch (errorCode) {
    case ApiErrorCodes.VALIDATION_ERROR:
      toast(AppErrorMessages.API_VALIDATION_ERROR, toastConfig);

      return error;

    case ApiErrorCodes.SERVER_ERROR:
      toast(AppErrorMessages.API_SERVER_ERROR, toastConfig);

      return error;

    case ApiErrorCodes.NOT_FOUND_ERROR:
      toast(AppErrorMessages.API_NOT_FOUND_ERROR, toastConfig);
      return error;

    case ApiErrorCodes.SERVICE_NOT_AVAILABLE:
      toast(AppErrorMessages.SERVICE_NOT_AVAILABLE_ERROR, toastConfig);
      return error;

    default:
      toast(AppErrorMessages.API_SERVER_ERROR, toastConfig);
  }

  return error;
};
