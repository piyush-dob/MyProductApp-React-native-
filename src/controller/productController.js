// src/controller/productController.js

import { getProductsAPI } from "../service/api";
import { ProductModel } from "../model/ProductModel";

export const fetchProducts = async () => {
  const data = await getProductsAPI();
  return data.map((item) => ProductModel(item));
};