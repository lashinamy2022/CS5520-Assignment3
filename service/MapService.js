import * as Location from 'expo-location';

export const verifyPermission = async (permissionInfo, requestPermission) => {
  if (permissionInfo && permissionInfo.granted) {
    return true;
  }
  const permissionResult = await requestPermission();
  return permissionResult.granted;
};

export const locateUser = async (permissionInfo, requestPermission) => {
  const hasPermission = await verifyPermission(
    permissionInfo,
    requestPermission
  );
  if (!hasPermission) {
    Alert.alert("You need to give access to the location");
    return;
  }
  try {
    const location = await Location.getCurrentPositionAsync();
    const coords = {longitude:location.coords.longitude, latitude: location.coords.latitude};
    console.log(coords);
    return coords;
  } catch (err) {
    console.log("locate user error", err);
  }
};
