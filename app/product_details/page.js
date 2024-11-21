import { useRouter } from 'next/router';
import { useEffect, useState, useContext } from 'react';
import { CartContext } from '../../context/CartContext';

export default function ProductDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState(null);
  const { addToCart } = useContext(CartContext);  // Access the cart context

  useEffect(() => {
    if (id) {
      fetch(`/api/products/${id}`)
        .then((res) => res.json())
        .then((data) => setProduct(data));
    }
  }, [id]);

  if (!product) return <p>Loading...</p>;

  return (
    <div>
      <h1>{product.name}</h1>
      <img src={product.imageUrl} alt={product.name} />
      <p>{product.description}</p>
      <p>${product.price}</p>
      <button className="add-to-cart" onClick={() => addToCart(product)}>
        Add to Cart
      </button>

      <style jsx>{`
        div {
          text-align: center;
          padding: 20px;
        }

        img {
          max-width: 400px;
          margin: 20px 0;
        }

        .add-to-cart {
          background-color: #ff6600;
          color: white;
          padding: 10px 20px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}
