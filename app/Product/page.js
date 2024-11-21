"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from "../components/ProductCard.js"; // Import the ProductCard component

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Check local storage for products
        const storedProducts = localStorage.getItem("products");
        if (storedProducts) {
          setProducts(JSON.parse(storedProducts)); // Parse and use the stored data
          setLoading(false); // Skip API call if data is found in localStorage
        } else {
          // Fetch from API if not in localStorage
          const res = await axios.get("http://localhost:3000/api/product");
          setProducts(res.data); // Update state
          localStorage.setItem("products", JSON.stringify(res.data)); // Save data to localStorage
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []); // Empty dependency array ensures this runs only once on mount


  if (loading) {
    return <div className="text-center py-4">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-6">Smart Yoga Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
