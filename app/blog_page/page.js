// pages/blog.js
import React from 'react';

const BlogPage = ({ blogPosts }) => {
  return (
    <div>
      <h1>Yoga & Wellness Blog</h1>
      <div className="blog-list">
        {blogPosts.map((post) => (
          <div key={post._id} className="blog-card">
            <h3>{post.title}</h3>
            <p>{post.excerpt}</p>
            <a href={`/blog/${post._id}`}>Read More</a>
          </div>
        ))}
      </div>
    </div>
  );
};

export async function getServerSideProps() {
  // Fetch blog posts from the API route or MongoDB
  const res = await fetch('http://localhost:3000/api/blog');
  const blogPosts = await res.json();

  return { props: { blogPosts } };
}

export default BlogPage;
