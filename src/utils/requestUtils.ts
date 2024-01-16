import axios from "axios";

export const handleGetRequest = async (
  url: string,
  headers?: {}
): Promise<Response> => {
  return axios({
    url,
    method: "get",
    headers: headers,
  })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.log(err);
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
      console.log(error);
    });
};
