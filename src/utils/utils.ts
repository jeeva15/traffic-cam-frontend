export const getCurrentDateString = (): string => {
  const date = new Date();
  //YYYY-MM-DD format
  return `${date.getFullYear()}/${date.getMonth()}/${date.getDate()}`;
};

export const getCurrentTimeString = (): string => {
  const date = new Date();
  //HH:mm:ss format
  return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
};
