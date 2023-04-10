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

export const convertNowTimeToStrWithSeconds = () => {
  const now = new Date();
  return convertTimeToStrWithSeconds(now);
};

//convert passed date to time string hh:mm
export const convertTimeToStrWithoutSeconds = (date) => {
  const hour = format(date.getHours());
  const minute = format(date.getMinutes());
  return `${hour}:${minute}`;
};

export const convertTimeToStrWithSeconds = (date) => {
  const hour = format(date.getHours());
  const minute = format(date.getMinutes());
  const second = format(date.getSeconds());
  return `${hour}:${minute}:${second}`;
};

//if month/date/minute/second is within [0,9]
function format(number) {
  if (number >= 0 && number <= 9) {
    return `0${number}`;
  } else return `${number}`;
}

export const getDiffDays = (datestr) => {
  const date = new Date(datestr);
  const now = new Date();
  return (date - now) / 1000 / 60 / 60 / 24;
};

export const formatDatestr = (datestr) => {
  datestr = datestr.replace(" ", "T");
  datestr = datestr + ":00";
  return datestr;
};

export const notificationDatetimeHandler = (datestr) => {
  const days = getDiffDays(datestr);
  if (days <= 1) {
    const newDate = new Date(new Date().getTime() + 5 * 60 * 1000);
    return (
      convertDateToStr(newDate) + " " + convertTimeToStrWithSeconds(newDate)
    );
  } else {
    var preDate = new Date(new Date(datestr).getTime() - 24 * 60 * 60 * 1000);
    return (
      convertDateToStr(preDate) + " " + convertTimeToStrWithSeconds(preDate)
    );
  }
};
