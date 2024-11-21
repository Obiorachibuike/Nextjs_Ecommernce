import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema(
  {
    // Define your fields here
    title: { type: String, required: true },         // The title of the product
    price: { type: Number, required: true },         // The price of the product
    category: { type: String, required: true },      // The category of the product
    description: { type: String, required: true },   // A description of the product
    image: { type: String, required: true },         // The image URL for the product
  },
  { timestamps: true }                               // Add timestamps for createdAt and updatedAt
);

const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);

export default Product;
