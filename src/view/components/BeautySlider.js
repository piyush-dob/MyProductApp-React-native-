import React, { useEffect, useRef } from "react";
import { View, Text, Image, StyleSheet, Animated, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

const products = [
  {
    id: 1,
    // title: "Face Serum",
    image:
      "https://cdn.dummyjson.com/product-images/fragrances/chanel-coco-noir-eau-de/1.webp",
  },
  {
    id: 2,
    // title: "Glow Cream",
    image:
      "https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/1.webp",
  },
 
  {
    id: 3,
    // title: "Lip Balm",
    image:
    "https://cdn.dummyjson.com/product-images/beauty/red-lipstick/1.webp",
  },
];

const BeautySlider = () => {
  const scrollX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    let index = 0;

    const interval = setInterval(() => {
      index = (index + 1) % products.length;

      Animated.spring(scrollX, {
        toValue: index * -width,
        useNativeDriver: true,
      }).start();
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.slider,
          {
            transform: [{ translateX: scrollX }],
          },
        ]}
      >
        {products.map((item) => (
          <View key={item.id} style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.image} />
          
          </View>
        ))}
      </Animated.View>
    </View>
  );
};

export default BeautySlider;

const styles = StyleSheet.create({
  container: {
    width: width,
    height: 180,
    overflow: "hidden",
    marginTop: 10,
  },

  slider: {
    flexDirection: "row",
  },

  card: {
    width: width,
    justifyContent: "center",
    alignItems: "center",
  },

  image: {
    width: "90%",
    height: 170,
     resizeMode: "contain",
  },

 
});