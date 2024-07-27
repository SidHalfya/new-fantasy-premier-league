import dayjs from "dayjs";

export const convertTimeStampToSE = (utcTimestamp: any) => {
  return dayjs(utcTimestamp).format("ddd D MMM HH:mm");
};
