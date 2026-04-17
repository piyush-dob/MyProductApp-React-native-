// REGISTER SCREEN (Same UI as Login + Name Field)

import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
  if (!name || !email || !password) {
    alert("Please fill all fields");
    return;
  }

  const user = {
    name,
    email,
    password,
  };

  try {
    await AsyncStorage.setItem("user", JSON.stringify(user));
    alert("Registered Successfully");

    navigation.replace("Home");
  } catch (error) {
    console.log(error);
  }
};

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Register Now</Text>
        <Text style={styles.subtitle}>Create your account</Text>
      </View>

      {/* Card */}
      <View style={styles.card}>
        {/* Name */}
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your name"
          placeholderTextColor="#aaa"
          value={name}
          onChangeText={setName}
        />

        {/* Email */}
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          placeholderTextColor="#aaa"
          value={email}
          onChangeText={setEmail}
        />

        {/* Password */}
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          placeholderTextColor="#aaa"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        {/* Button */}
        <TouchableOpacity
          style={styles.button}
          onPress={handleRegister}
        >
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.replace("login")}>
          <Text style={styles.signup}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RegisterScreen;

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