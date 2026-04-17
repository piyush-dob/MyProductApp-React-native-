import React, { useEffect, useRef } from "react";
import { View, Text, StyleSheet, Animated } from "react-native";

const CustomToast = ({ message, type, visible, onHide }) => {
  const translateY = useRef(new Animated.Value(-120)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      // 🔥 Show instantly (slide + fade)
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: 60,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();

      // 🔥 Stay visible properly
      const timer = setTimeout(() => {
        // 🔥 Hide smoothly
        Animated.parallel([
          Animated.timing(translateY, {
            toValue: -120,
            duration: 200,
            useNativeDriver: true,
          }),
          Animated.timing(opacity, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
          }),
        ]).start(() => onHide());
      }, 1500); // 👈 perfect timing

      return () => clearTimeout(timer);
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [{ translateY }],
          opacity,
          backgroundColor: type === "success" ? "#16a34a" : "#dc2626",
        },
      ]}
    >
      <Text style={styles.text}>{message}</Text>
    </Animated.View>
  );
};

export default CustomToast;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 20,
    right: 20,
    padding: 15,
    borderRadius: 14,
    elevation: 8,
    zIndex: 9999,
  },
  text: {
    color: "#fff",
    fontWeight: "600",
    textAlign: "center",
    fontSize: 15,
  },
});