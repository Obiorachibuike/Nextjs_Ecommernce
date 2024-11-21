"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { toast, ToastContainer } from "react-toastify"; // Import toastify
import "react-toastify/dist/ReactToastify.css"; // Import toastify styles

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch products from the API
  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await axios.get("/api/product");
        setProducts(response.data);
      } catch (error) {
        toast.error("Failed to load products. Please try again later."); // Show error message
        console.error("Error fetching products:", error);
      }
    }

    fetchProducts();
  }, []);

  // Handle adding/updating a product
  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      if (newProduct._id) {
        // Update existing product
        await axios.put(`/api/products/${newProduct._id}`, newProduct);
        toast.success("Product updated successfully!"); // Show success message
      } else {
        // Add new product
        await axios.post("/api/products", newProduct);
        toast.success("Product added successfully!"); // Show success message
      }
      setNewProduct({ name: "", description: "", price: "", image: "" });
      setIsModalOpen(false); // Close modal
      // Refetch the products after adding or updating
      const response = await axios.get("/api/products");
      setProducts(response.data);
    } catch (error) {
      toast.error("Failed to save product. Please try again."); // Show error message
      console.error("Error adding/updating product:", error);
    }
  };

  // Handle product deletion
  const handleDeleteProduct = async (productId) => {
    try {
      await axios.delete(`/api/products/${productId}`);
      const updatedProducts = products.filter((product) => product._id !== productId);
      setProducts(updatedProducts);
      toast.success("Product deleted successfully!"); // Show success message
    } catch (error) {
      toast.error("Failed to delete product. Please try again."); // Show error message
      console.error("Error deleting product:", error);
    }
  };

  // Handle product edit (this can be enhanced by creating an edit modal or form)
  const handleEditProduct = (product) => {
    setNewProduct(product);
    setIsModalOpen(true); // Open modal for editing
  };

  return (
    <div className="p-4 font-sans">
      <h1 className="text-black text-4xl font-semibold mt-10 mb-8">Admin Product Management</h1>

      {/* Add Product Button (Opens Modal) */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Add Product
      </button>

      {/* Products Table */}
      {products.length > 0 ? (
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr>
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Description</th>
              <th className="px-4 py-2 border">Price</th>
              <th className="px-4 py-2 border">Image</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td className="px-4 py-2 border">{product.name}</td>
                <td className="px-4 py-2 border">{product.description}</td>
                <td className="px-4 py-2 border">${product.price}</td>
                <td className="px-4 py-2 border">
                  <img src={product.image} alt={product.name} className="w-12 h-12 object-cover" />
                </td>
                <td className="px-4 py-2 border">
                  <button
                    onClick={() => handleEditProduct(product)}
                    className="mr-2 px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteProduct(product._id)}
                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No products available.</p>
      )}

      {/* Modal to Add/Edit Product */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
          onClick={() => setIsModalOpen(false)} // Close on clicking outside
        >
          <div
            onClick={(e) => e.stopPropagation()} // Prevent modal from closing when clicking inside
            className="bg-white p-6 rounded-lg w-96 flex flex-col gap-4"
          >
            <h3 className="text-xl font-semibold">{newProduct._id ? "Edit Product" : "Add Product"}</h3>
            <form onSubmit={handleAddProduct} className="space-y-4">
              <div>
                <label htmlFor="product-name" className="block">Product Name</label>
                <input
                  id="product-name"
                  type="text"
                  value={newProduct.name}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, name: e.target.value })
                  }
                  placeholder="Product Name"
                  required
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>

              <div>
                <label htmlFor="product-description" className="block">Product Description</label>
                <input
                  id="product-description"
                  type="text"
                  value={newProduct.description}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, description: e.target.value })
                  }
                  placeholder="Product Description"
                  required
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>

              <div>
                <label htmlFor="product-price" className="block">Product Price</label>
                <input
                  id="product-price"
                  type="number"
                  value={newProduct.price}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, price: e.target.value })
                  }
                  placeholder="Product Price"
                  required
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>

              <div>
                <label htmlFor="product-image" className="block">Image URL</label>
                <input
                  id="product-image"
                  type="text"
                  value={newProduct.image}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, image: e.target.value })
                  }
                  placeholder="Image URL"
                  required
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>

              <div className="mt-4">
                <button
                  type="submit"
                  className="w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  {newProduct._id ? "Save Changes" : "Add Product"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Toast Container for displaying notifications */}
      {/* <ToastContainer /> */}
    </div>
  );
}
