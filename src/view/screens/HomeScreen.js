// src/view/screens/HomeScreen.js
import React, { useEffect, useState } from "react";
import BeautySlider from "../components/BeautySlider";
import { TouchableOpacity } from "react-native";
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
const HomeScreen = ({ navigation }) => {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const cartItems = useSelector((state) => state.cart.items); // ✅ ADD THIS

  useEffect(() => {
    loadData();
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
            <Text style={{ fontSize: 27 }}>☰</Text>
          </TouchableOpacity>

          {/* CENTER TEXT */}
          <Text style={styles.topText}>{getTitle()}</Text>

          {/* RIGHT EMPTY VIEW (for proper centering) */}
          {/* CART ICON — replace <View style={{ width: 10 }} /> with this */}
          <TouchableOpacity
            onPress={() => navigation.navigate("Cart")}
            style={{ paddingRight: 10, paddingTop: 10 }}
          >
            <Text style={{ fontSize: 24 }}>🛒</Text>
            {cartItems.length > 0 && (
              <View style={styles.cartBadge}>
                <Text style={styles.cartBadgeText}>{cartItems.length}</Text>
              </View>
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
            // renderItem={({ item }) => <ProductCard item={item} />}
            renderItem={({ item }) => (
              <ProductCard item={item} navigation={navigation} />
            )}
            numColumns={2}
            columnWrapperStyle={{ justifyContent: "space-between" }}
            showsVerticalScrollIndicator={false}
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
          navigation={navigation} // ✅ ADD THIS
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

  cartBadge: {
    position: "absolute",
    top: 5,
    right: 5,
    backgroundColor: "red",
    borderRadius: 10,
    width: 18,
    height: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  cartBadgeText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "bold",
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
