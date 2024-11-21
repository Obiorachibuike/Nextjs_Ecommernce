'use client'; // Ensure this file is treated as a client component

import { useContext } from 'react';
import { CartContext } from '../context/CartContext';

export default function Cart() {
  const { cart, removeFromCart } = useContext(CartContext);

  const getTotalPrice = () =>
    cart.reduce((total, product) => total + product.price * product.quantity, 0);

  if (cart.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl font-semibold">Your cart is empty</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>
      <ul className="space-y-6">
        {cart.map((product) => (
          <li key={product._id} className="flex justify-between items-center bg-white p-4 rounded-lg shadow-md">
            <div className="flex items-center space-x-4">
              <img src={product.imageUrl} alt={product.name} width={50} className="rounded-md" />
              <div>
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <p className="text-sm text-gray-600">Quantity: {product.quantity}</p>
                <p className="text-sm text-gray-600">Price: ${product.price.toFixed(2)}</p>
                <p className="text-sm text-gray-900 font-semibold">
                  Total: ${(product.price * product.quantity).toFixed(2)}
                </p>
              </div>
            </div>
            <button
              onClick={() => removeFromCart(product._id)}
              className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-300"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>

      <div className="mt-8 flex justify-between items-center">
        <h2 className="text-xl font-semibold">Total Price:</h2>
        <p className="text-xl font-bold">${getTotalPrice().toFixed(2)}</p>
      </div>

      <div className="mt-6 flex justify-end">
        <button className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition duration-300">
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}
