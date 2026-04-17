import React from "react";
import AppNavigator from "./src/navigation/AppNavigator";
import Toast from "react-native-toast-message";
import store from "./src/redux/store";
import { Provider } from "react-redux";

const App = () => {
  return (
    <Provider store={store}>
      <AppNavigator />
      <Toast />
    </Provider>
  );
};

export default App;