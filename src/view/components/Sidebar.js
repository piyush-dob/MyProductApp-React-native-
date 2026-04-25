import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, ScrollView } from "react-native";
import { Feather, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';

const SCREEN_HEIGHT = Dimensions.get("screen").height;

const Sidebar = ({ visible, onClose, onSelect, navigation }) => {
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    if (visible) {
      getUserFromToken();
    }
  }, [visible]);

  const getUserFromToken = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      if (token) {
        const payloadBase64 = token.split(".")[1];
        const decoded = JSON.parse(atob(payloadBase64));
        setUserEmail(decoded.email);
      }
    } catch (error) {
      console.log("Token read error:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("userToken");
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
    <View style={[styles.overlay, { height: SCREEN_HEIGHT }]}>

      {/* SIDEBAR */}
      <View style={styles.sidebar}>

        {/* ✅ Categories in ScrollView so they never push logout out */}
        <ScrollView
          style={styles.menuContainer}
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          <Text style={styles.categoryTitle}>Categories</Text>

          <TouchableOpacity style={styles.itemBox} onPress={() => onSelect("all")}>
            <Feather name="grid" size={20} color="#2563eb" />
            <Text style={styles.item}>All Products</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.itemBox} onPress={() => onSelect("beauty")}>
            <MaterialIcons name="face-retouching-natural" size={20} color="#e91e8c" />
            <Text style={styles.item}>Makeup</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.itemBox} onPress={() => onSelect("fragrances")}>
            <MaterialCommunityIcons name="spray" size={20} color="#9c27b0" />
            <Text style={styles.item}>Fragrances</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.itemBox} onPress={() => onSelect("groceries")}>
            <MaterialCommunityIcons name="basket" size={20} color="#4caf50" />
            <Text style={styles.item}>Groceries</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.itemBox} onPress={() => onSelect("furniture")}>
            <MaterialCommunityIcons name="sofa" size={20} color="#795548" />
            <Text style={styles.item}>Furniture</Text>
          </TouchableOpacity>
        </ScrollView>

        {/* ✅ Logout always pinned at bottom */}
        <TouchableOpacity style={styles.closeBtn} onPress={handleLogout}>
          <Text style={styles.closeText}>Logout</Text>
        </TouchableOpacity>

      </View>

      {/* BACKDROP */}
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
    flexDirection: "row",
    zIndex: 999,
    elevation: 999,
  },
  sidebar: {
    width: 270,
    height: "100%",
    backgroundColor: "#fff",
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 130,        // ✅ space above tab bar
    flexDirection: "column",  // ✅ stack menu and logout vertically
  },
  menuContainer: {
    flex: 1,                  // ✅ takes all space EXCEPT logout button
  },
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  itemBox: {
    backgroundColor: "#f5f5f5",
    padding: 10,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 12,
  },
  item: {
    fontSize: 16,
    color: "#333",
  },
  closeBtn: {
    backgroundColor: "#333",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 20,    
    marginBottom:20        // ✅ small gap above logout
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