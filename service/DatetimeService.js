import { Platform } from "react-native";

//covert now date to date string
export const convertNowDateToStr = () => {
  const now = new Date();
  return convertDateToStr(now);
};

//covert passed date to date string
export const convertDateToStr = (date) => {
  const year = date.getFullYear();
  let month = parseInt(date.getMonth()) + 1;
  if (month >= 1 && month <= 9) {
    month = `0${month}`;
  }
  // console.log("month", month);
  let day = date.getDate();
  if (day >= 1 && day <= 9) {
    day = `0${day}`;
  }
  // console.log(`${year}-${month}-${day}`);
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
