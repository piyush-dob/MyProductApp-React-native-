import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Alert,
} from "react-native";
import Toast from "react-native-toast-message";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [toast, setToast] = useState({
  visible: false,
  message: "",
  type: "success",
});

const showToast = (message, type = "success") => {
  setToast({ visible: true, message, type });
};
  

  const handleSendOTP = async () => {
    if (!email) {
      Alert.alert("Error", "Enter email");
      return;
    }

    const otp = Math.floor(100000 + Math.random() * 900000);

    // ✅ MUST match your EmailJS template variables
    const templateParams = {
      email: email.toLowerCase(), // {{email}}
      passcode: otp, // {{passcode}}
      time: "15 minutes",
      company_name: "PiyushDemoApp", // {{time}} (optional if used in template)
    };

    try {
      const response = await fetch(
        "https://api.emailjs.com/api/v1.0/email/send",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            service_id: "service_idn9ahr",
            template_id: "template_kq6393p",
            user_id: "y8Nn6_2rPOCKGLc3O",
            accessToken: "twhMm1uI9pl9ZDJnI98ja", // your private key
            template_params: templateParams,
          }),
        },
      );

      if (response.ok) {
        Toast.show({
          type: "success",
          text1: "OTP Sent Succesfully",
          text2: "Check your email!",
        });

        navigation.navigate("OtpScreen", {
          email,
          otp,
        });
      } else {
        const errorText = await response.text();
        console.log("EmailJS Error:", errorText);
        Alert.alert("Error", "Failed to send OTP ❌");
      }
    } catch (error) {
      console.log(error);
      Toast.show({
        type: "error",
        text1: "Invalid OTP",
        text2: "Please try again",
      });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>Login with OTP</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Email</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          placeholderTextColor="#aaa"
          value={email}
          onChangeText={setEmail}
        />

        <TouchableOpacity style={styles.button} onPress={handleSendOTP}>
          <Text style={styles.buttonText}>Send OTP</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Don't have an account? </Text>

        <TouchableOpacity onPress={() => navigation.replace("register")}>
          <Text style={styles.signup}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  header: {
    marginBottom: 30,
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#0f172a",
  },
  subtitle: {
    fontSize: 16,
    color: "#64748b",
    marginTop: 5,
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  label: {
    color: "#334155",
    marginBottom: 5,
    marginTop: 10,
    fontWeight: "500",
  },
  input: {
    backgroundColor: "#f1f5f9",
    borderRadius: 12,
    padding: 12,
    color: "#0f172a",
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  button: {
    backgroundColor: "#2563eb",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  footerText: {
    color: "#64748b",
  },
  signup: {
    color: "#2563eb",
    fontWeight: "bold",
  },
});
