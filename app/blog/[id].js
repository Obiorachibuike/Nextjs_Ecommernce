// pages/blog/[id].js
import React from 'react';

const BlogPostDetail = ({ post }) => {
  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </div>
  );
};

export async function getServerSideProps({ params }) {
  // Fetch a single blog post by its ID
  const res = await fetch(`http://localhost:3000/api/blog/${params.id}`);
  const post = await res.json();

  return { props: { post } };
}

export default BlogPostDetail;
