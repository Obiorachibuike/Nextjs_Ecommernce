"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import toastify styles
import SideNav from "../components/SideNav";

export default function AdminPage() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
  });

  // Fetch products, blog posts, and social links from API
  useEffect(() => {
    async function fetchData() {
      try {
        const productsRes = await fetch("/api/products");
        const postsRes = await fetch("/api/blogposts");
        const socialRes = await fetch("/api/social");

        setProducts(await productsRes.json());
        // Assuming similar structure for blog posts and social links
      } catch (error) {
        toast.error("Error fetching data. Please try again later.");
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProduct),
      });
      setNewProduct({ name: "", description: "", price: "", image: "" });

      // Refetch data to update the UI
      const productsRes = await fetch("/api/products");
      setProducts(await productsRes.json());

      // Show success notification
      toast.success("Product added successfully!");
    } catch (error) {
      toast.error("Failed to add product. Please try again.");
      console.error("Error adding product:", error);
    }
  };

  const handleAddBlogPost = async (e) => {
    e.preventDefault();
    // Similar logic for adding blog posts
    toast.success("Blog post added successfully!");
  };

  const handleAddSocialLink = async (e) => {
    e.preventDefault();
    // Logic for adding social media link
    toast.success("Social media link updated successfully!");
  };

  return (
    <div>
      {/* <SideNav /> */}
      <div className="admin_main">
        <h1>Admin Panel</h1>

        {/* Add Product Form */}
        <h2>Add New Product</h2>
        <form onSubmit={handleAddProduct}>
          <input
            type="text"
            value={newProduct.name}
            onChange={(e) =>
              setNewProduct({ ...newProduct, name: e.target.value })
            }
            placeholder="Product Name"
          />
          <input
            type="text"
            value={newProduct.description}
            onChange={(e) =>
              setNewProduct({ ...newProduct, description: e.target.value })
            }
            placeholder="Product Description"
          />
          <input
            type="number"
            value={newProduct.price}
            onChange={(e) =>
              setNewProduct({ ...newProduct, price: e.target.value })
            }
            placeholder="Price"
          />
          <input
            type="text"
            value={newProduct.image}
            onChange={(e) =>
              setNewProduct({ ...newProduct, image: e.target.value })
            }
            placeholder="Image URL"
          />
          <button type="submit">Add Product</button>
        </form>

        {/* Display Products */}
        <h3>Products</h3>
        <ul>
          {products.map((product) => (
            <li key={product._id}>
              <p>
                {product.name} - ${product.price}
              </p>
              <p>{product.description}</p>
              <img src={product.image} alt={product.name} width="100" />
            </li>
          ))}
        </ul>

        {/* Add Blog Post Form */}
        <h2>Add New Blog Post</h2>
        {/* Similar form for adding blog posts */}

        {/* Social Media Links */}
        <h2>Update Social Media Links</h2>
        {/* Form to add/update social media links */}
      </div>
      <div>
        <h1>Admin Panel</h1>
        <nav>
          <Link href="/admin/analytics">Analytics Overview</Link>
          {/* Other admin links */}
        </nav>
      </div>

      {/* ToastContainer component to display toast notifications */}
      <ToastContainer />
    </div>
  );
}
