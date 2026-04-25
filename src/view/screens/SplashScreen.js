import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  StatusBar,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SplashScreen = ({ navigation }) => {
  const logoScale = useRef(new Animated.Value(0)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const textOpacity = useRef(new Animated.Value(0)).current;
  const taglineOpacity = useRef(new Animated.Value(0)).current;
  const dotsOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // ✅ Animate logo pop + fade in
    Animated.sequence([
      Animated.parallel([
        Animated.spring(logoScale, {
          toValue: 1,
          tension: 50,
          friction: 5,
          useNativeDriver: true,
        }),
        Animated.timing(logoOpacity, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
      ]),
      // ✅ Then fade in app name
      Animated.timing(textOpacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      // ✅ Then fade in tagline
      Animated.timing(taglineOpacity, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
      // ✅ Then fade in dots
      Animated.timing(dotsOpacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();

    // ✅ Check token after 2.5 seconds
    const timer = setTimeout(async () => {
      try {
        const token = await AsyncStorage.getItem("userToken");
        if (token) {
          navigation.replace("MainTabs");
        } else {
          navigation.replace("login");
        }
      } catch (error) {
        navigation.replace("login");
      }
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#2563eb" barStyle="light-content" />

      {/* Background circles for depth */}
      <View style={styles.circleTop} />
      <View style={styles.circleBottom} />

      {/* Center content */}
      <View style={styles.content}>

        {/* Logo Box */}
        <Animated.View
          style={[
            styles.logoBox,
            {
              opacity: logoOpacity,
              transform: [{ scale: logoScale }],
            },
          ]}
        >
          <Text style={styles.logoIcon}>🛍️</Text>
        </Animated.View>

        {/* App Name */}
        <Animated.Text style={[styles.appName, { opacity: textOpacity }]}>
         ConnectiveApp
        </Animated.Text>

        {/* Tagline */}
        <Animated.Text style={[styles.tagline, { opacity: taglineOpacity }]}>
          Shop Smart. Live Better.
        </Animated.Text>

        {/* Loading dots */}
        <Animated.View style={[styles.dotsRow, { opacity: dotsOpacity }]}>
          <View style={styles.dot} />
          <View style={[styles.dot, styles.dotMiddle]} />
          <View style={styles.dot} />
        </Animated.View>
      </View>

      {/* Bottom branding */}
      <Animated.Text style={[styles.bottomText, { opacity: taglineOpacity }]}>
        Powered by MyProducts Inc.
      </Animated.Text>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2563eb",
    justifyContent: "center",
    alignItems: "center",
  },

  // Background decoration circles
  circleTop: {
    position: "absolute",
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: "rgba(255,255,255,0.07)",
    top: -80,
    right: -80,
  },
  circleBottom: {
    position: "absolute",
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: "rgba(255,255,255,0.07)",
    bottom: -60,
    left: -60,
  },

  content: {
    alignItems: "center",
  },

  // Logo
  logoBox: {
    width: 110,
    height: 110,
    borderRadius: 30,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 15,
  },
  logoIcon: {
    fontSize: 55,
  },

  // App name
  appName: {
    fontSize: 36,
    fontWeight: "800",
    color: "#ffffff",
    letterSpacing: 1,
    marginBottom: 10,
  },

  // Tagline
  tagline: {
    fontSize: 15,
    color: "rgba(255,255,255,0.75)",
    letterSpacing: 0.5,
    marginBottom: 50,
  },

  // Loading dots
  dotsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(255,255,255,0.5)",
  },
  dotMiddle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#ffffff",
  },

  // Bottom text
  bottomText: {
    position: "absolute",
    bottom: 40,
    fontSize: 12,
    color: "rgba(255,255,255,0.5)",
    letterSpacing: 0.5,
  },
});