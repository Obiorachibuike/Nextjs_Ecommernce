"use client";

import React, { useContext } from "react";
import Link from "next/link";
import { CartContext } from "../context/CartContext";

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);

  return (
    <div className="p-4 border rounded-lg shadow-md bg-white flex flex-col items-center space-y-4 max-w-sm mx-auto sm:max-w-xs md:max-w-sm lg:max-w-md">
      <img
        src={product.image}
        alt={product.title}
        className="w-32 h-32 object-cover rounded-md"
      />
      <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
      <p className="text-xl font-bold text-gray-900">${product.price}</p>
      <Link
        href={`/product/${product._id}`}
        className="text-blue-500 hover:text-blue-700 transition"
      >
        View Product
      </Link>
      <button
        onClick={() => addToCart(product)}
        className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-lg transition"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
