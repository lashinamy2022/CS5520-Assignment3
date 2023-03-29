import { Platform } from "react-native";

export const convertNowDateToStr =  () => {
    const now = new Date();
    if (Platform.OS === "android") {
        const dateArr = now.toLocaleDateString().split("/");
        return `${now.getFullYear()}-${dateArr[0]}-${dateArr[1]}`;
    } else if (Platform.OS === "ios") {
        return now.toLocaleDateString().replaceAll("/", "-");
    }
};

export const convertDateToStr =  (date) => {
    if (Platform.OS === "android") {
        const dateArr = date.toLocaleDateString().split("/");
        return `${date.getFullYear()}-${dateArr[0]}-${dateArr[1]}`;
    } else if (Platform.OS === "ios") {
        return date.toLocaleDateString().replaceAll("/", "-");
    }
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