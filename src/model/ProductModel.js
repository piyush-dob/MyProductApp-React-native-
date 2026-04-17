export const ProductModel = (item) => ({
  id: item.id,
  title: item.title,
  description: item.description,
  image: item.images?.[0],
  price: item.price,
  category: item.category,   // ✅ ADD THIS
  reviews: item.reviews ?? []
});