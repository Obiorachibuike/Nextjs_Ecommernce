"use client"
import React from 'react';
// import { useRouter } from 'next/router';
import { useRouter } from 'next/navigation';

import dbConnect from '../lib/dbConnect';
import BlogPost from '../models/BlogPost';

const BlogPostPage = ({ blogPost }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{blogPost.title}</h1>
      <p>{blogPost.content}</p>
      <p><strong>Author: {blogPost.author}</strong></p>
    </div>
  );
};

export async function getServerSideProps({ params }) {
  await dbConnect();
  const { slug } = params;
  const blogPost = await BlogPost.findOne({ slug }).lean();

  if (!blogPost) {
    return { notFound: true };
  }

  return {
    props: {
      blogPost: JSON.parse(JSON.stringify(blogPost)),
    },
  };
}

export default BlogPostPage;
