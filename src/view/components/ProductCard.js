import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, increment, decrement } from "../../redux/cartSlice";

const ProductCard = ({ item, navigation }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const cartItem = cartItems.find((c) => c.id === item.id);

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate("Product Details", { product: item })}
    >
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
      <Text numberOfLines={2} style={styles.desc}>{item.description}</Text>
      <Text style={styles.title}>Rs. {item.price}</Text>

      {cartItem ? (
        <View style={styles.counterRow}>
          <TouchableOpacity
            style={styles.counterBtn}
            onPress={() => dispatch(decrement(item.id))}
          >
            <Text style={styles.counterText}>−</Text>
          </TouchableOpacity>

          <Text style={styles.countNum}>{cartItem.count}</Text>

          <TouchableOpacity
            style={styles.counterBtn}
            onPress={() => dispatch(increment(item.id))}
          >
            <Text style={styles.counterText}>+</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity
          style={styles.cartBtn}
          onPress={() => dispatch(addToCart(item))}
        >
          <Text style={styles.cartBtnText}>+ Add to Cart</Text>
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: "#fff",
    margin: 8,
    padding: 10,
    borderRadius: 10,
    elevation: 3,
  },
  image: {
    width: "100%",
    height: 140,
    borderRadius: 10,
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 8,
  },
  desc: {
    fontSize: 12,
    color: "#555",
    marginTop: 5,
  },
  cartBtn: {
    marginTop: 8,
    backgroundColor: "#2563eb",
    padding: 7,
    borderRadius: 8,
    alignItems: "center",
  },
  cartBtnText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
  counterRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 8,
    backgroundColor: "#f1f5f9",
    borderRadius: 8,
    padding: 4,
  },
  counterBtn: {
    backgroundColor: "#2563eb",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 6,
  },
  counterText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  countNum: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#0f172a",
  },
});