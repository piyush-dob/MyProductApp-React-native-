import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "../view/screens/HomeScreen";
import SecondScreen from "../view/screens/SecondScreen";
import DetailsScreen from "../view/screens/DetailsScreen";
import LoginScreen from "../view/screens/LoginScreen";
import RegisterScreen from "../view/screens/RegisterScreen";
import OtpScreen from "../view/screens/OtpScreen";
import CustomToast from "../view/components/CustomToast";
import CartScreen from "../view/screens/CartScreen";
import PaymentFailed from "../view/screens/PaymentFailed";
import PaymentSuccess from "../view/screens/PaymentSuccess";
import PaymentScreen from "../view/screens/PaymentScreen";
// import PaymentScreen from "../view/screens/PaymentScreen";
// import PaymentSuccess from "../view/screens/PaymentSuccess";
// import PaymentFailed from "../view/screens/PaymentFailed";

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Second" component={SecondScreen} />
        <Stack.Screen name="Product Details" component={DetailsScreen} />
        <Stack.Screen
          name="register"
          component={RegisterScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="OtpScreen"
          component={OtpScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="toast"
          component={CustomToast}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Cart"
          component={CartScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Payment"
          component={PaymentScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PaymentSuccess"
          component={PaymentSuccess}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PaymentFailed"
          component={PaymentFailed}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
