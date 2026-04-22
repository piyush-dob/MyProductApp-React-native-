import React from "react";
import { StatusBar } from "react-native";
import AppNavigator from "./src/navigation/AppNavigator";
import Toast from "react-native-toast-message";
import store from "./src/redux/store";
import { Provider } from "react-redux";

const App = () => {
  return (
    <Provider store={store}>
      {/* ✅ FIX 4 — Default StatusBar for all screens */}
      <StatusBar barStyle="dark-content" backgroundColor="transparent" />
      <AppNavigator />
      <Toast />
    </Provider>
  );
};

export default App;