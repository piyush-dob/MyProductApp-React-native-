// src/view/screens/HomeScreen.js
import React, { useCallback, useEffect, useState } from "react";
import BeautySlider from "../components/BeautySlider";
import { TouchableOpacity, Image } from "react-native";
import { Feather, MaterialIcons, Ionicons } from "@expo/vector-icons";
import Sidebar from "../components/Sidebar";
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  ActivityIndicator,
  TextInput,
} from "react-native";

import ProductCard from "../components/ProductCard";
import { fetchProducts } from "../../controller/productController";
import Icon from "react-native-vector-icons/Feather";
import { SafeAreaView } from "react-native-safe-area-context";
// import { useCart } from "../../context/CartContext";
import { useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { StatusBar } from "react-native";
const HomeScreen = ({ navigation }) => {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const cartItems = useSelector((state) => state.cart.items); // ✅ ADD THIS
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    loadData();
    // loadProfileImage();
  }, []);

  const loadData = async () => {
    try {
      const result = await fetchProducts();
      setProducts(result);
      setFilteredProducts(result);
    } catch (error) {
      console.log("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };
  useFocusEffect(
    useCallback(() => {
      const loadProfileImage = async () => {
        const img = await AsyncStorage.getItem("@profile_image");
        setProfileImage(img); // no need for if check
      };

      loadProfileImage();
    }, []),
  );
  useFocusEffect(
    useCallback(() => {
      StatusBar.setBarStyle("dark-content"); // Home is light screen
    }, []),
  );

  const handleSidebarSelect = (category) => {
    setSidebarVisible(false);
    setSelectedCategory(category);

    if (category === "all") {
      setFilteredProducts(products);
      return;
    }

    const filtered = products.filter((item) => item.category === category);

    setFilteredProducts(filtered);
  };
  //Search bar
  const handleSearch = (text) => {
    setSearch(text);
    setSelectedCategory("search");

    const filtered = products.filter((item) =>
      item.title.toLowerCase().includes(text.toLowerCase()),
    );

    setFilteredProducts(filtered);
  };

  const getTitle = () => {
    switch (selectedCategory) {
      case "beauty":
        return "Makeup";
      case "fragrances":
        return "Fragrances";
      case "groceries":
        return "Groceries";
      case "furniture":
        return "Furniture";
      case "search":
        return "Search Results";
      case "all":
      default:
        return "Beauty Products";
    }
  };

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  console.log("Sidebar:", Sidebar);
  console.log("BeautySlider:", BeautySlider);
  console.log("ProductCard:", ProductCard);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        {/* TOP BAR */}

        <View style={styles.topBar}>
          {/* LEFT ICON */}
          <TouchableOpacity
            onPress={() => setSidebarVisible(true)}
            style={{ paddingleft: 10, paddingTop: 10 }}
          >
            <Feather name="menu" size={26} color="#000" />
          </TouchableOpacity>

          {/* CENTER TEXT */}
          <Text style={styles.topText}>{getTitle()}</Text>

          <TouchableOpacity
            onPress={() =>
              navigation.navigate("MainTabs", { screen: "Profile" })
            }
          >
            {profileImage ? (
              <Image
                source={{ uri: profileImage }}
                style={{ width: 35, height: 35, borderRadius: 20 }}
              />
            ) : (
              <Feather name="user" size={22} color="#000" />
            )}
          </TouchableOpacity>
        </View>

        {/* MAIN CONTAINER */}
        <View style={styles.container}>
          <View style={styles.searchContainer}>
            <TextInput
              placeholder="Search products..."
              value={search}
              onChangeText={handleSearch}
              style={styles.searchBar}
            />

            {search.length > 0 && (
              <Text
                onPress={() => {
                  setSearch("");
                  setFilteredProducts(products);
                  setSelectedCategory("all");
                }}
                style={styles.clearButton}
              >
                ✕
              </Text>
            )}
          </View>

          <FlatList
            data={filteredProducts}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <ProductCard item={item} navigation={navigation} />
            )}
            numColumns={2}
            columnWrapperStyle={{ justifyContent: "space-between" }}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 90 }}
            ListHeaderComponent={
              selectedCategory === "all" && search.length === 0 ? (
                <BeautySlider />
              ) : null
            }
          />
        </View>

        <Sidebar
          visible={sidebarVisible}
          onClose={() => setSidebarVisible(false)}
          onSelect={handleSidebarSelect}
          navigation={navigation}
        />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },

  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  header: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 15,
  },

  searchBar: {
    backgroundColor: "#fff",
    margin: 10,
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    margin: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
  },

  searchBar: {
    flex: 1,
    paddingVertical: 10,
  },

  clearButton: {
    fontSize: 18,
    color: "#999",
    paddingHorizontal: 8,
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between", // important for alignment
    paddingHorizontal: 15,
    marginTop: 10,
  },

  filterIcon: {
    fontSize: 20,
    marginRight: 8,
  },

  topText: {
    fontSize: 23,
    fontWeight: "600",
    textAlign: "center",
    alignContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
});
