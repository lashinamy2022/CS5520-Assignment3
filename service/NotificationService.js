import * as Notifications from "expo-notifications";

export async function verifyPermission() {
  const permissionResponse = await Notifications.getPermissionsAsync();
  if (permissionResponse.granted) {
    return true;
  }
  try {
    const permissonResult = await Notifications.requestPermissionsAsync();
    return permissonResult.granted;
  } catch (err) {
    console.log("notification", err);
  }
}

export async function scheduleNotificationHandler(datetime) {
  console.log(datetime);
  try {
    const hasPermission = await verifyPermission();
    if (!hasPermission) {
      Alert.alert(
        "We're sorry, but we can't send you notifications at this time. Please check your device settings to ensure that notifications are enabled for our app."
      );
    }
    const notificationId = await Notifications.scheduleNotificationAsync({
      content: {
        title: "My Notification",
        body: "Your new journy will start in 3 days, don't forget to pack your bags!",
        //   data: { url: "https://google.com" },
      },
      trigger: {
        type: "date",
        date: new Date(datetime), // Set the date and time
      },
    });
    return notificationId;
  } catch (err) {
    console.log(scheduleNotificationHandler, err);
  }
}

export async function cancelNotification(id) {
  await Notifications.cancelScheduledNotificationAsync(id);
}
