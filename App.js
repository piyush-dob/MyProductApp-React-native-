import React, { useEffect } from "react";
import { StatusBar, PermissionsAndroid } from "react-native";
import AppNavigator from "./src/navigation/AppNavigator";
import Toast from "react-native-toast-message";
import store from "./src/redux/store";
import { Provider } from "react-redux";

// 🔥 Firebase import
import messaging from "@react-native-firebase/messaging";

const App = () => {

  useEffect(() => {
    requestPermission();
    getToken();
    listenNotification();
  }, []);

  // 🔐 Request notification permission
  const requestPermission = async () => {
    await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
    );
  };

  // 🔥 Get FCM Token
  const getToken = async () => {
    const token = await messaging().getToken();
    console.log("🔥 FCM TOKEN:", token);
  };

  // 🔔 Listen when app is open
  const listenNotification = () => {
    messaging().onMessage(async remoteMessage => {
      console.log("📩 Notification:", remoteMessage);

      Toast.show({
        type: "success",
        text1: remoteMessage.notification?.title,
        text2: remoteMessage.notification?.body,
      });
    });
  };

  return (
    <Provider store={store}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" />
      <AppNavigator />
      <Toast />
    </Provider>
  );
};

export default App;