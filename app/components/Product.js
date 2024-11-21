import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function ProductListing() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch product data from your API
    fetch('/api/products')
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  return (
    <div>
      <h1>Our Smart Yoga Products</h1>
      <div className="product-grid">
        {products.map((product) => (
          <div key={product._id} className="product-card">
            <img src={product.imageUrl} alt={product.name} />
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>${product.price}</p>
            <Link href={`/products/${product._id}`}>
              <a className="details-button">View Details</a>
            </Link>
          </div>
        ))}
      </div>

      <style jsx>{`
        .product-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 20px;
          padding: 20px;
        }

        .product-card {
          border: 1px solid #ddd;
          padding: 20px;
          text-align: center;
        }

        .details-button {
          display: inline-block;
          margin-top: 10px;
          padding: 10px;
          background-color: #ff6600;
          color: white;
          border-radius: 5px;
          text-decoration: none;
        }
      `}</style>
    </div>
  );
}
