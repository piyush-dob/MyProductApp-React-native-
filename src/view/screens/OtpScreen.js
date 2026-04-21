import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from "react-native";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";

const OtpScreen = ({ route, navigation }) => {
  const { email, otp } = route.params;
  const [enteredOtp, setEnteredOtp] = useState("");

  // ✅ Create fake JWT token (no backend needed)
  const generateFakeJWT = (email) => {
    const header = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" }));
    const payload = btoa(
      JSON.stringify({
        email: email,
        loginTime: new Date().toISOString(),
        exp: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days expiry
      })
    );
    const signature = "fakesignature123"; // dummy signature
    return `${header}.${payload}.${signature}`;
  };

  const verifyOTP = async () => {
    if (enteredOtp == otp) {
      try {
        // ✅ Generate token
        const token = generateFakeJWT(email);
        console.log("Here is my Token",token);

        // ✅ Save token to AsyncStorage
        await AsyncStorage.setItem("userToken", token);
        await AsyncStorage.setItem("userEmail", email); // optional, for easy access


        Toast.show({
          type: "success",
          text1: "Login Successfully",
          text2: "Welcome back 🎉",
        });

        navigation.reset({
          index: 0,
          routes: [{ name: "Home" }],
        });
      } catch (error) {
        console.log("Token save error:", error);
        Alert.alert("Error", "Something went wrong. Try again.");
      }
    } else {
      Alert.alert("Error", "Invalid OTP ❌");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Verify OTP</Text>
        <Text style={styles.subtitle}>
          Enter OTP sent to{"\n"}
          <Text style={styles.email}>{email}</Text>
        </Text>

        <TextInput
          placeholder="Enter 6-digit OTP"
          value={enteredOtp}
          onChangeText={setEnteredOtp}
          style={styles.input}
          keyboardType="numeric"
          maxLength={6}
        />

        <TouchableOpacity style={styles.button} onPress={verifyOTP}>
          <Text style={styles.buttonText}>Verify</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OtpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f1f5f9",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  card: {
    width: "100%",
    backgroundColor: "#fff",
    padding: 25,
    borderRadius: 20,
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    color: "#0f172a",
    marginBottom: 10,
  },
  subtitle: {
    textAlign: "center",
    color: "#64748b",
    marginBottom: 20,
    fontSize: 14,
  },
  email: {
    fontWeight: "bold",
    color: "#2563eb",
  },
  input: {
    borderWidth: 1,
    borderColor: "#e2e8f0",
    backgroundColor: "#f8fafc",
    borderRadius: 12,
    padding: 15,
    fontSize: 18,
    textAlign: "center",
    letterSpacing: 5,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#2563eb",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});