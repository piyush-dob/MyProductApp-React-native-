// src/service/api.js
export const getProductsAPI = async () => {
  try {
    const res = await fetch("https://dummyjson.com/products");
    const data = await res.json();
    return data.products;
  } catch (error) {
    console.log(error);
    return [];
  }
};