import React from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, increment, decrement } from "../../redux/cartSlice";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
// import { Icon } from "react-native-vector-icons/MaterialIcons";

const CartScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  // ✅ Calculate total price
  const totalPrice = cartItems.reduce((total, item) => {
    return total + item.price * item.count;
  }, 0);

  if (cartItems.length === 0) {
    return (
      <SafeAreaView style={styles.emptyContainer}>
        <Text style={styles.emptyText}>🛒 Your cart is empty</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f5f5f5" }}>
      <Text style={styles.heading}>My Cart ({cartItems.length})</Text>

      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.info}>
              <Text style={styles.title} numberOfLines={2}>
                {item.title}
              </Text>

              {/* ✅ Show single price */}
              <Text style={styles.price}>Rs. {item.price} / each</Text>

              {/* ✅ Show price x count */}
              <Text style={styles.itemTotal}>
                Total: Rs. {(item.price * item.count).toFixed(2)}
              </Text>

              {/* Counter buttons */}
              <View style={styles.counterRow}>
                {/* LEFT BUTTON (− OR DELETE) */}
                {item.count === 1 ? (
                  // <TouchableOpacity
                  //   style={styles.counterBtn}
                  //   onPress={() => dispatch(removeFromCart(item.id))}
                  // >
                  //   <MaterialIcons name="delete" size={22} color="#dc2626" />
                  // </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.deleteIconBtn}
                    onPress={() => dispatch(removeFromCart(item.id))}
                  >
                    <MaterialIcons name="delete" size={21} color="#dc2626" />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    style={styles.counterBtn}
                    onPress={() => dispatch(decrement(item.id))}
                  >
                    <Text style={styles.counterText}>−</Text>
                  </TouchableOpacity>
                )}

                {/* COUNT */}
                <Text style={styles.countNum}>{item.count}</Text>

                {/* PLUS BUTTON */}
                <TouchableOpacity
                  style={styles.counterBtn}
                  onPress={() => dispatch(increment(item.id))}
                >
                  <Text style={styles.counterText}>+</Text>
                </TouchableOpacity>

                {/* DELETE ICON ONLY WHEN count > 1 */}
                {item.count > 1 && (
                  <TouchableOpacity
                    style={{ marginLeft: 90 }}
                    onPress={() => dispatch(removeFromCart(item.id))}
                  >
                    <MaterialIcons name="delete" size={22} color="#dc2626" />
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </View>
        )}
        // ✅ Total price + Order Now button at bottom
        ListFooterComponent={
          <View style={styles.footer}>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Total Amount:</Text>
              <Text style={styles.totalPrice}>Rs. {totalPrice.toFixed(2)}</Text>
            </View>
            <TouchableOpacity
              style={styles.orderBtn}
              onPress={() =>
                navigation.navigate("Payment", {
                  totalPrice: totalPrice.toFixed(2),
                })
              }
            >
              <Text style={styles.orderBtnText}>Order Now</Text>
            </TouchableOpacity>
          </View>
        }
      />
    </SafeAreaView>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  emptyContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  emptyText: { fontSize: 20, color: "#888" },
  heading: { fontSize: 22, fontWeight: "bold", padding: 15, color: "#0f172a" },
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    margin: 10,
    borderRadius: 12,
    padding: 10,
    elevation: 3,
  },
  image: { width: 90, height: 90, borderRadius: 10 },
  info: { flex: 1, paddingLeft: 10 },
  title: { fontSize: 14, fontWeight: "bold", color: "#0f172a" },

  price: { fontSize: 13, color: "#64748b", marginTop: 4 },

  // ✅ NEW
  itemTotal: {
    fontSize: 13,
    color: "#2563eb",
    fontWeight: "600",
    marginTop: 2,
  },

  counterRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginVertical: 6,
  },
  counterBtn: {
    backgroundColor: "#2563eb",
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 6,
  },
  counterText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  countNum: { fontSize: 16, fontWeight: "bold", color: "#0f172a" },
  removeBtn: {
    backgroundColor: "#fee2e2",
    padding: 6,
    borderRadius: 8,
    alignSelf: "flex-start",
  },
  removeText: { color: "#dc2626", fontWeight: "600", fontSize: 13 },

  // ✅ NEW footer styles
  footer: {
    backgroundColor: "#fff",
    margin: 10,
    borderRadius: 12,
    padding: 15,
    elevation: 3,
    marginBottom: 30,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#0f172a",
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#16a34a",
  },
  deleteIconBtn: {
    padding: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  orderBtn: {
    backgroundColor: "#2563eb",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
  },
  orderBtnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
