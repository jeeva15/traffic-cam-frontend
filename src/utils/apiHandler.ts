import axios from "axios";
import { ToastOptions, toast } from "react-toastify";
import {
  ApiErrorCodes,
  AppErrorMessages,
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
  );
};

export const getRecentUsersSearch = async (): Promise<Response> => {
  return handleGetRequest(USER_RECENT_SEARCH_API);
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
  return axios({
    url,
    method: "get",
    withCredentials: true,
    headers,
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
  position: "top-center",
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

    default:
      toast(AppErrorMessages.API_SERVER_ERROR, toastConfig);
  }

  return error;
};
