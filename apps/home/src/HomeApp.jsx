import React, { useState, useEffect } from 'react'
import './HomeApp.css'

const HomeApp = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [featuredProducts, setFeaturedProducts] = useState([])

  const slides = [
    {
      title: "New Collection Arrived",
      subtitle: "Discover the latest trends in fashion",
      image: "👗",
      cta: "Shop Now"
    },
    {
      title: "Electronics Sale",
      subtitle: "Up to 50% off on selected items",
      image: "📱",
      cta: "View Deals"
    },
    {
      title: "Free Shipping",
      subtitle: "On all orders over $50",
      image: "🚚",
      cta: "Learn More"
    }
  ]

  useEffect(() => {
    // Simulate loading featured products
    setFeaturedProducts([
      { id: 1, name: 'Premium Headphones', price: 129.99, image: '🎧', rating: 4.8 },
      { id: 2, name: 'Smart Watch Pro', price: 299.99, image: '⌚', rating: 4.9 },
      { id: 3, name: 'Wireless Speaker', price: 89.99, image: '🔊', rating: 4.7 }
    ])

    // Auto-advance slides
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [slides.length])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  return (
    <div className="home-app">
      {/* Hero Carousel */}
      <section className="hero-carousel">
        <div className="carousel-container">
          <div className="carousel-slide active">
            <div className="slide-content">
              <div className="slide-image">{slides[currentSlide].image}</div>
              <h1>{slides[currentSlide].title}</h1>
              <p>{slides[currentSlide].subtitle}</p>
              <button className="hero-cta">{slides[currentSlide].cta}</button>
            </div>
          </div>
        </div>
        
        <button className="carousel-btn prev" onClick={prevSlide}>‹</button>
        <button className="carousel-btn next" onClick={nextSlide}>›</button>
        
        <div className="carousel-indicators">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`indicator ${index === currentSlide ? 'active' : ''}`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2>Why Choose Us</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🚚</div>
            <h3>Fast Delivery</h3>
            <p>Free shipping on orders over $50 with next-day delivery available</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💳</div>
            <h3>Secure Payment</h3>
            <p>Multiple payment options with bank-level security protection</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🔄</div>
            <h3>Easy Returns</h3>
            <p>30-day return policy with hassle-free exchanges</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🛡️</div>
            <h3>Quality Guarantee</h3>
            <p>All products come with our quality assurance guarantee</p>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="featured-section">
        <h2>Featured Products</h2>
        <div className="products-grid">
          {featuredProducts.map(product => (
            <div key={product.id} className="product-card">
              <div className="product-image">{product.image}</div>
              <div className="product-info">
                <h3>{product.name}</h3>
                <div className="product-rating">
                  {'⭐'.repeat(Math.floor(product.rating))}
                  <span className="rating-text">{product.rating}</span>
                </div>
                <p className="product-price">${product.price}</p>
                <button className="add-to-cart">Add to Cart</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="categories-section">
        <h2>Shop by Category</h2>
        <div className="categories-grid">
          <div className="category-card electronics">
            <h3>Electronics</h3>
            <p>Latest gadgets and tech</p>
            <span className="category-icon">📱</span>
          </div>
          <div className="category-card fashion">
            <h3>Fashion</h3>
            <p>Trendy clothing & accessories</p>
            <span className="category-icon">👕</span>
          </div>
          <div className="category-card home">
            <h3>Home & Garden</h3>
            <p>Everything for your home</p>
            <span className="category-icon">🏠</span>
          </div>
          <div className="category-card sports">
            <h3>Sports & Fitness</h3>
            <p>Stay active and healthy</p>
            <span className="category-icon">⚽</span>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="newsletter-section">
        <div className="newsletter-content">
          <h2>Stay Updated</h2>
          <p>Subscribe to our newsletter for exclusive offers and updates</p>
          <div className="newsletter-form">
            <input type="email" placeholder="Enter your email" />
            <button type="submit">Subscribe</button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomeApp



