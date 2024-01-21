const API_PREFIX = "/api";

export const TRAFFIC_IMAGE_API = `${API_PREFIX}/search/traffic-images`;
export const WEATHER_FORECAST_API = `${API_PREFIX}/search/weather-forecast`;
export const USER_RECENT_SEARCH_API = `${API_PREFIX}/user/user-recent-search`;
export const RECENT_SEARCH_API = `${API_PREFIX}/user/recent-search`;

//Error Messages
export const AppErrorMessages = {
  API_VALIDATION_ERROR: "Request param is not valid.",
  API_NOT_FOUND_ERROR: "The request url is not found",
  API_SERVER_ERROR: "Something went wrong! Please try again.",
  UNAUTHORIZED_ERROR: "Inavlid credentials.",
  SERVICE_NOT_AVAILABLE_ERROR:
    "The API is not available right now, Please try again later.",
  //can add more errors
};

export const ApiErrorCodes = {
  NOT_FOUND_ERROR: 404,
  SERVER_ERROR: 500,
  VALIDATION_ERROR: 400,
  UNAUTHORIZED_ERROR: 401,
  SERVICE_NOT_AVAILABLE: 503,
};

export const USER_ID_COOKIE = "user-uniq-id";
