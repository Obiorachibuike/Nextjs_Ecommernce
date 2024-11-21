import React from 'react';
import ProductCard from '../components/ProductCard';
import BlogPostPreview from '../components/BlogPostPreview';
import dbConnect from '../lib/dbConnect';
import Product from '../models/Product';
import BlogPost from '../models/BlogPost';

const HomePage = ({ products, blogPosts }) => {
  return (
    <div>
      <h1>Smart Yoga Products</h1>
      <h2>Shop Now</h2>
      <div>
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
      <h2>Latest Blog Posts</h2>
      <div>
        {blogPosts.map((post) => (
          <BlogPostPreview key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
};

export async function getServerSideProps() {
  await dbConnect();
  const products = await Product.find().lean();
  const blogPosts = await BlogPost.find().lean();

  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
      blogPosts: JSON.parse(JSON.stringify(blogPosts)),
    },
  };
}

export default HomePage;
