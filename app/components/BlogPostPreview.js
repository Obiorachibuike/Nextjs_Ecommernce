import React from 'react';
import Link from 'next/link';

const BlogPostPreview = ({ post }) => {
  return (
    <div>
      <h3>{post.title}</h3>
      <p>{post.content.substring(0, 100)}...</p>
      <Link href={`/blog/${post.slug}`}>
        <a>Read More</a>
      </Link>
    </div>
  );
};

export default BlogPostPreview;
