import { Platform } from "react-native";

//covert now date to date string
export const convertNowDateToStr = () => {
  const now = new Date();
  return convertDateToStr(now);
};

//covert passed date to date string
export const convertDateToStr = (date) => {
  const year = date.getFullYear();
  const month = format(parseInt(date.getMonth()) + 1);
  const day = format(date.getDate());
  return `${year}-${month}-${day}`;
};

//convert now date to time string hh:mm
export const convertNowTimeToStrWithoutSeconds = () => {
  const now = new Date();
  return convertTimeToStrWithoutSeconds(now);
};

//convert passed date to time string hh:mm
export const convertTimeToStrWithoutSeconds = (date) => {
  const hour = format(date.getHours());
  const minute = format(date.getMinutes());
  return `${hour}:${minute}`;
};

//if month/date/minute/second is within [0,9]
function format(number) {
  if (number >= 0 && number <= 9) {
    return `0${number}`;
  } else return `${number}`;
}
