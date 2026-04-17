import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const PaymentSuccess = ({ route, navigation }) => {
  // ✅ exact name
  const paymentId = route?.params?.paymentId ?? "N/A";

  return (
    <View style={styles.container}>
      <Text style={styles.icon}>✅</Text>
      <Text style={styles.title}>Payment Successful!</Text>
      <Text style={styles.paymentId}>Payment ID: {paymentId}</Text>
      <TouchableOpacity
        style={styles.btn}
        onPress={() =>
          navigation.reset({ index: 0, routes: [{ name: "Home" }] })
        }
      >
        <Text style={styles.btnText}>Back to Home</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PaymentSuccess; // ✅ must exist

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
    color: "#16a34a",
    marginBottom: 10,
  },
  paymentId: { fontSize: 13, color: "#64748b", marginBottom: 30 },
  btn: {
    backgroundColor: "#2563eb",
    padding: 15,
    borderRadius: 12,
    width: "100%",
    alignItems: "center",
  },
  btnText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});
