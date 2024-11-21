// pages/product/[id].js
import React from 'react';

const ProductDetailPage = ({ product }) => {
  return (
    <div>
      <h1>{product.name}</h1>
      <img src={product.image} alt={product.name} />
      <p>{product.description}</p>
      <p>${product.price}</p>
      <button>Add to Cart</button>
    </div>
  );
};

export async function getServerSideProps({ params }) {
  // Fetch a single product by its ID from the API or database
  const res = await fetch(`http://localhost:3000/api/products/${params.id}`);
  const product = await res.json();

  return { props: { product } };
}

export default ProductDetailPage;
