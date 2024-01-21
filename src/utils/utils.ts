export const getCurrentDateString = (): string => {
  const date = new Date();
  //YYYY-MM-DD format
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
};

export const encodeBase64 = (data: string) => {
  return btoa(data);
};

export const formatDateDDMMYYYYHHmmss = (dateString: string) => {
  const date = new Date(dateString);

  return `${date.getDate()}/${
    date.getMonth() + 1
  }/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
};

export const isNotEmpty = (data: string) => {
  return data !== "" && data !== null && data.trim() !== "";
};
