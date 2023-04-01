import { Platform } from "react-native";

export const convertNowDateToStr =  () => {
    const now = new Date();
    return convertDateToStr(now);
};

export const convertDateToStr =  (date) => {
   const year = date.getFullYear();
   const month = parseInt(date.getMonth()) + 1;
   const day = date.getDate();
   return `${year}-${month}-${day}`;
};

export const convertNowTimeToStrWithoutSeconds =  () => {
    const now = new Date();
    if (Platform.OS === "android") {
        const timeArr = now.toLocaleTimeString().split(":");
        return `${timeArr[0]}:${timeArr[1]}`;
    } else if (Platform.OS === "ios") {
        return now.toLocaleTimeString().substring(0, 5);
    }
};

export const convertTimeToStrWithoutSeconds =  (date) => {
    if (Platform.OS === "android") {
        const timeArr = date.toLocaleTimeString().split(":");
        return `${timeArr[0]}:${timeArr[1]}`;
    } else if (Platform.OS === "ios") {
        return date.toLocaleTimeString().substring(0, 5);
    }
};

