import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const PaymentFailed = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.icon}>❌</Text>
      <Text style={styles.title}>Payment Failed!</Text>
      <Text style={styles.subtitle}>Something went wrong. Please try again.</Text>

      {/* ✅ Try Again — go back to Cart */}
      <TouchableOpacity
        style={styles.btn}
        onPress={() => navigation.navigate("Cart")}
      >
        <Text style={styles.btnText}>Try Again</Text>
      </TouchableOpacity>

      {/* ✅ Go Home */}
      <TouchableOpacity
        style={styles.homeBtn}
        onPress={() => navigation.reset({ index: 0, routes: [{ name: "Home" }] })}
      >
        <Text style={styles.homeBtnText}>Back to Home</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PaymentFailed;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f1f5f9",
    padding: 20,
  },
  icon: { fontSize: 80, marginBottom: 20 },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#dc2626",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: "#64748b",
    marginBottom: 30,
  },
  btn: {
    backgroundColor: "#dc2626",
    padding: 15,
    borderRadius: 12,
    width: "100%",
    alignItems: "center",
    marginBottom: 12,
  },
  btnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  homeBtn: {
    backgroundColor: "#2563eb",
    padding: 15,
    borderRadius: 12,
    width: "100%",
    alignItems: "center",
  },
  homeBtnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});