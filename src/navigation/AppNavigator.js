import React from "react";
import { NavigationContainer } from "@react-navigation/native";

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
import ProfileScreen from "../view/screens/ProfileScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
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
          options={{ headerShown: false, animation: "slide_from_right" }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false, animation: "slide_from_right" }}
        />
        <Stack.Screen
          name="Second"
          component={SecondScreen}
          options={{ headerShown: false, animation: "slide_from_right" }}
        />
        <Stack.Screen
          name="Product Details"
          component={DetailsScreen}
          options={{  animation: "slide_from_right" }}
        />
        <Stack.Screen
          name="register"
          component={RegisterScreen}
          options={{ headerShown: false, animation: "slide_from_right" }}
        />
        <Stack.Screen
          name="OtpScreen"
          component={OtpScreen}
          options={{ headerShown: false, animation: "slide_from_right" }}
        />
        <Stack.Screen
          name="toast"
          component={CustomToast}
          options={{ headerShown: false, animation: "slide_from_right" }}
        />
        <Stack.Screen
          name="Cart"
          component={CartScreen}
          options={{ headerShown: false, animation: "slide_from_right" }}
        />
        <Stack.Screen
          name="Payment"
          component={PaymentScreen}
          options={{ headerShown: false, animation: "slide_from_right" }}
        />
        <Stack.Screen
          name="PaymentSuccess"
          component={PaymentSuccess}
          options={{ headerShown: false, animation: "slide_from_right" }}
        />
        <Stack.Screen
          name="PaymentFailed"
          component={PaymentFailed}
          options={{ headerShown: false, animation: "slide_from_right" }}
        />
        <Stack.Screen
          name="profile"
          component={ProfileScreen}
          options={{ headerShown: false, animation: "slide_from_right" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
