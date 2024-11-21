"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AdminBlog() {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({
    title: "",
    content: "",
    image: "",
    category: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;

  // Fetch blog posts from localStorage or API
  useEffect(() => {
    const savedPosts = localStorage.getItem("posts");
    if (savedPosts) {
      setPosts(JSON.parse(savedPosts)); // Load posts from localStorage
    } else {
      async function fetchPosts() {
        try {
          const response = await axios.get("/api/blog");
          toast.success("Blog Posts loaded successfully");
          setPosts(response.data);
          localStorage.setItem("posts", JSON.stringify(response.data)); // Save posts to localStorage
        } catch (error) {
          toast.error("Failed to load blog posts. Please try again later.");
          console.error("Error fetching posts:", error);
        }
      }

      fetchPosts();
    }
  }, []);

  // Save posts to localStorage whenever posts change
  useEffect(() => {
    if (posts.length > 0) {
      localStorage.setItem("posts", JSON.stringify(posts)); // Save posts to localStorage
    }
  }, [posts]);

  // Handle adding/updating a blog post
  const handleAddPost = async (e) => {
    e.preventDefault();
    try {
      if (newPost._id) {
        // Update existing post
        await axios.put(`/api/posts/${newPost._id}`, newPost);
        toast.success("Post updated successfully!");
      } else {
        // Add new post
        await axios.post("/api/posts", newPost);
        toast.success("Post added successfully!");
      }
      setNewPost({ title: "", content: "", image: "", category: "" });
      setIsModalOpen(false); // Close modal
      // Refetch the posts after adding or updating
      const response = await axios.get("/api/posts");
      setPosts(response.data);
    } catch (error) {
      toast.error("Failed to save post. Please try again.");
      console.error("Error adding/updating post:", error);
    }
  };

  // Handle post deletion
  const handleDeletePost = async (postId) => {
    try {
      await axios.delete(`/api/posts/${postId}`);
      const updatedPosts = posts.filter((post) => post._id !== postId);
      setPosts(updatedPosts);
      toast.success("Post deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete post. Please try again.");
      console.error("Error deleting post:", error);
    }
  };

  // Handle post edit
  const handleEditPost = (post) => {
    setNewPost(post);
    setIsModalOpen(true); // Open modal for editing
  };

  // Pagination logic
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(posts.length / postsPerPage);

  return (
    <div className="p-6 font-sans bg-gray-100 min-h-screen">
      <h1 className="text-black text-4xl font-semibold mt-10 mb-8">Admin Blog Management</h1>

      {/* Add Post Button (Opens Modal) */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="mb-4 px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 shadow-md"
      >
        Add Post
      </button>

      {/* Posts Table */}
      {posts.length > 0 ? (
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="min-w-full table-auto border-collapse">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="px-6 py-3 border">Title</th>
                <th className="px-6 py-3 border">Content</th>
                <th className="px-6 py-3 border">Category</th>
                <th className="px-6 py-3 border">Image</th>
                <th className="px-6 py-3 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentPosts.map((post) => (
                <tr key={post._id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-3">{post.title}</td>
                  <td className="px-6 py-3">{post.content.slice(0, 50)}...</td>
                  <td className="px-6 py-3">{post.category}</td>
                  <td className="px-6 py-3">
                    <img src={post.image} alt={post.title} className="w-12 h-12 object-cover" />
                  </td>
                  <td className="px-6 py-3">
                    <button
                      onClick={() => handleEditPost(post)}
                      className="mr-2 px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeletePost(post._id)}
                      className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {/* Pagination Controls */}
          <div className="flex justify-between items-center p-4">
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:bg-gray-300"
            >
              Previous
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:bg-gray-300"
            >
              Next
            </button>
          </div>
        </div>
      ) : (
        <p className="text-center text-lg">No posts available.</p>
      )}

      {/* Modal to Add/Edit Post */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
          onClick={() => setIsModalOpen(false)} // Close on clicking outside
        >
          <div
            onClick={(e) => e.stopPropagation()} // Prevent modal from closing when clicking inside
            className="bg-white p-6 rounded-lg w-96 flex flex-col gap-4 shadow-lg"
          >
            <h3 className="text-xl font-semibold">{newPost._id ? "Edit Post" : "Add Post"}</h3>
            <form onSubmit={handleAddPost} className="space-y-4">
              <div>
                <label htmlFor="post-title" className="block">Post Title</label>
                <input
                  id="post-title"
                  type="text"
                  value={newPost.title}
                  onChange={(e) =>
                    setNewPost({ ...newPost, title: e.target.value })
                  }
                  placeholder="Post Title"
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />
              </div>

              <div>
                <label htmlFor="post-content" className="block">Content</label>
                <textarea
                  id="post-content"
                  value={newPost.content}
                  onChange={(e) =>
                    setNewPost({ ...newPost, content: e.target.value })
                  }
                  placeholder="Post Content"
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />
              </div>

              <div>
                <label htmlFor="post-category" className="block">Category</label>
                <input
                  id="post-category"
                  type="text"
                  value={newPost.category}
                  onChange={(e) =>
                    setNewPost({ ...newPost, category: e.target.value })
                  }
                  placeholder="Category"
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />
              </div>

              <div>
                <label htmlFor="post-image" className="block">Image URL</label>
                <input
                  id="post-image"
                  type="url"
                  value={newPost.image}
                  onChange={(e) =>
                    setNewPost({ ...newPost, image: e.target.value })
                  }
                  placeholder="Image URL"
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />
              </div>

              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-400 text-white rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md"
                >
                  {newPost._id ? "Update" : "Add"} Post
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
}
