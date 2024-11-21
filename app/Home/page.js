import Link from 'next/link';

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Enhance Your Yoga Practice with Smart Yoga Products</h1>
          <p>Track your progress, improve flexibility, and stay healthy with our smart yoga solutions.</p>
          <Link href="/products">
            <a className="cta-button">Shop Now</a>
          </Link>
        </div>
      </section>

      {/* Product Overview Section */}
      <section className="product-overview">
        <h2>Featured Products</h2>
        <div className="product-grid">
          {/* Add some featured products */}
          <div className="product-card">
            <img src="/images/yoga-mat.jpg" alt="Smart Yoga Mat" />
            <h3>Smart Yoga Mat</h3>
            <p>Price: $99</p>
          </div>
          <div className="product-card">
            <img src="/images/yoga-tracker.jpg" alt="Yoga Tracker" />
            <h3>Yoga Fitness Tracker</h3>
            <p>Price: $129</p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="benefits">
        <h2>Why Choose Our Smart Yoga Products?</h2>
        <p>Our smart yoga products are designed to help you perfect your form, track your fitness progress, and maintain overall wellness.</p>
        <ul>
          <li>Real-time tracking of your yoga poses</li>
          <li>Instant feedback to improve flexibility</li>
          <li>Integrates with fitness apps</li>
        </ul>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials">
        <h2>What Our Customers Say</h2>
        <blockquote>
          <p>"The Smart Yoga Mat completely transformed my practice. I can track every session and see how much I've improved!"</p>
          <footer>- Alex, Yoga Enthusiast</footer>
        </blockquote>
      </section>

      {/* Blog Section Teaser */}
      <section className="blog-teaser">
        <h2>From Our Blog</h2>
        <div className="blog-post">
          <h3>5 Yoga Poses to Start Your Day</h3>
          <p>Discover the best yoga poses to energize your morning and improve flexibility...</p>
          <Link href="/blog">
            <a>Read More</a>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2024 Smart Yoga Store. All Rights Reserved.</p>
        <div className="social-links">
          <a href="https://instagram.com" target="_blank">Instagram</a>
          <a href="https://facebook.com" target="_blank">Facebook</a>
          <a href="https://twitter.com" target="_blank">Twitter</a>
        </div>
      </footer>
    </div>
  );
}
