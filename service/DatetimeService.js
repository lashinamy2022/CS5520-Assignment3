import { Platform } from "react-native";

//covert now date to date string
export const convertNowDateToStr = () => {
  const now = new Date();
  return convertDateToStr(now);
};

//covert passed date to date string
export const convertDateToStr = (date) => {
  const year = date.getFullYear();
  const month = parseInt(date.getMonth()) + 1;
  const day = date.getDate();
  return `${year}-${month}-${day}`;
};

//convert now date to time string hh:mm
export const convertNowTimeToStrWithoutSeconds = () => {
  const now = new Date();
  return convertTimeToStrWithoutSeconds(now);
};

//convert passed date to time string hh:mm
export const convertTimeToStrWithoutSeconds = (date) => {
  const hour = date.getHours();
  const minute = date.getMinutes();
  return `${hour}:${minute}`;
};
