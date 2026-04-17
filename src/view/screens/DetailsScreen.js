import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const DetailsScreen = ({ route }) => {
  const { product } = route.params;

  return (
   <SafeAreaView
  style={styles.safeArea}
  edges={["left", "right", "bottom"]} // 👈 KEY FIX
>
      <ScrollView
        style={styles.container}
         contentContainerStyle={{ paddingBottom: 30 }}
        showsVerticalScrollIndicator={false}
      >
        <Image source={{ uri: product.image }} style={styles.image} />

        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.price}>₹ {product.price}</Text>
        <Text style={styles.desc}>{product.description}</Text>

        {/* REVIEWS */}
        <Text style={styles.reviewTitle}>Reviews</Text>

        {product.reviews?.length > 0 ? (
          product.reviews.map((rev, index) => (
            <View key={index} style={styles.reviewBox}>
              <Text style={styles.rating}>⭐ {rev.rating}</Text>
              <Text>{rev.comment}</Text>
              <Text style={styles.reviewer}>
                - {rev.reviewerName}
              </Text>
            </View>
          ))
        ) : (
          <Text style={{ color: "#777", marginTop: 10 }}>
            No reviews available
          </Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default DetailsScreen;
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },

  container: {
    flex: 1,
    padding: 15,
  },

  image: {
    width: "100%",
    height: 200,
    // borderRadius: 10,
    resizeMode:"contain"
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
  },

  price: {
    fontSize: 18,
    color: "green",
    marginVertical: 5,
  },

  desc: {
    fontSize: 14,
    color: "#555",
    marginVertical: 10,
  },

  reviewTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
  },

  reviewBox: {
    backgroundColor: "#f5f5f5",
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
  },

  rating: {
    fontWeight: "bold",
  },

  reviewer: {
    fontSize: 12,
    color: "#777",
    marginTop: 5,
  },
});