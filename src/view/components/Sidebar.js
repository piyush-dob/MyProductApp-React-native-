import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Feather, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';

const Sidebar = ({ visible, onClose, onSelect, navigation }) => {
  const [userEmail, setUserEmail] = useState("");

  // ✅ Read token and decode email when sidebar opens
  useEffect(() => {
    if (visible) {
      getUserFromToken();
    }
  }, [visible]);

  const getUserFromToken = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      if (token) {
        const payloadBase64 = token.split(".")[1]; // middle part of JWT
        const decoded = JSON.parse(atob(payloadBase64));
        setUserEmail(decoded.email);
      }
    } catch (error) {
      console.log("Token read error:", error);
    }
  };

  const handleLogout = async () => {
    try {
      // ✅ Remove JWT token
      await AsyncStorage.removeItem("userToken");

      // ✅ Navigate to Login
      navigation.reset({
        index: 0,
        routes: [{ name: "login" }],
      });
    } catch (error) {
      console.log(error);
    }
  };

  if (!visible) return null;

  return (
    <View style={styles.overlay}>
      <View style={styles.sidebar}>
        {/* <Text style={styles.title}>Filters</Text> */}

        {/* ✅ Show logged-in user email from token */}
        {/* {userEmail ? (
          <Text style={styles.userEmail}>👤 {userEmail}</Text>
        ) : null} */}

        <View style={styles.menuContainer}>
          <Text style={styles.categoryTitle}>Categories</Text>

          <TouchableOpacity
            style={styles.itemBox}
            onPress={() => onSelect("all")}
          >
            <Feather name="grid" size={20} color="#2563eb" /> 
            <Text style={styles.item}>All Products</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.itemBox}
            onPress={() => onSelect("beauty")}
          >
            <MaterialIcons name="face-retouching-natural" size={20} color="#e91e8c" /> 
            <Text style={styles.item}>Makeup</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.itemBox}
            onPress={() => onSelect("fragrances")}
          >
            <MaterialCommunityIcons name="spray" size={20} color="#9c27b0" />  
            <Text style={styles.item}>Fragrances</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.itemBox}
            onPress={() => onSelect("groceries")}
          >
            <MaterialCommunityIcons name="basket" size={20} color="#4caf50" />   
            <Text style={styles.item}>Groceries</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.itemBox}
            onPress={() => onSelect("furniture")}
          >
            <MaterialCommunityIcons name="sofa" size={20} color="#795548" /> 
            <Text style={styles.item}>Furniture</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.closeBtn} onPress={handleLogout}>
          <Text style={styles.closeText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.backdrop} onPress={onClose} />
    </View>
  );
};

export default Sidebar;

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: "row",
  },
  sidebar: {
    width: 270,
    backgroundColor: "#fff",
    padding: 20,
    justifyContent: "space-between",
  },
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333",
  },
  userEmail: {
    fontSize: 13,
    color: "#2563eb",
    marginBottom: 15,
    fontWeight: "500",
  },
  menuContainer: {
    flex: 2,
  },
  itemBox: {
    backgroundColor: "#f5f5f5",
    padding: 10,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    gap:12,
    marginBottom: 12,
  },
  item: {
    fontSize: 16,
    color: "#333",
  },
  closeBtn: {
    backgroundColor: "#333",
    padding: 10,
    borderRadius: 12,
    alignItems: "center",
  },
  closeText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "red",
    marginBottom: 15,
    textAlign: "center",
  },
});