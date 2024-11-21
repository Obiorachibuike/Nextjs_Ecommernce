import React from 'react';
import { useRouter } from 'next/router';
import dbConnect from '../../lib/dbConnect';
import Product from '../../models/Product';

const ProductPage = ({ product }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

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
  await dbConnect();
  const { id } = params;
  const product = await Product.findById(id).lean();

  if (!product) {
    return { notFound: true };
  }

  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
    },
  };
}

export default ProductPage;
