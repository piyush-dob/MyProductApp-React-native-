import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Text, StyleSheet, Platform } from "react-native";  // ✅ add Platform
import { Feather } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { useSafeAreaInsets } from "react-native-safe-area-context";  // ✅ add this

import HomeScreen from "../view/screens/HomeScreen";
import CartScreen from "../view/screens/CartScreen";
import ProfileScreen from "../view/screens/ProfileScreen";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const insets = useSafeAreaInsets();  // ✅ get safe area insets

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 45 + insets.bottom,   // ✅ add bottom inset to height
          paddingBottom: insets.bottom || 8,  // ✅ respect system nav bar
          paddingTop: 4,
          backgroundColor: "#ffffff",
          borderTopWidth: 1,
          borderTopColor: "#e0e0e0",
          position: "absolute",
        },
        tabBarIcon: ({ focused }) => {
          const color = focused ? "#e91e8c" : "#000";

          if (route.name === "Home") {
            return <Feather name="home" size={24} color={color} />;
          }

          if (route.name === "Cart") {
            return (
              <View>
                <Feather name="shopping-cart" size={24} color={color} />
                {cartItems.length > 0 && (
                  <View style={styles.cartBadge}>
                    <Text style={styles.cartBadgeText}>{cartItems.length}</Text>
                  </View>
                )}
              </View>
            );
          }

          if (route.name === "Profile") {
            return <Feather name="user" size={24} color={color} />;
          }
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Cart" component={CartScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;

const styles = StyleSheet.create({
  cartBadge: {
    position: "absolute",
    top: -4,
    right: -6,
    backgroundColor: "red",
    borderRadius: 10,
    width: 16,
    height: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  cartBadgeText: {
    color: "#fff",
    fontSize: 9,
    fontWeight: "bold",
  },
});