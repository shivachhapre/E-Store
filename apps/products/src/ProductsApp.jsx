import React, { useState, useEffect } from 'react'
import './ProductsApp.css'

const ProductsApp = () => {
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 })
  const [sortBy, setSortBy] = useState('name')
  const [cart, setCart] = useState([])
  const [showCart, setShowCart] = useState(false)

  const categories = ['Electronics', 'Fashion', 'Home & Garden', 'Sports', 'Books', 'Toys', 'Health', 'Automotive']

  useEffect(() => {
    // Simulate loading products
    setTimeout(() => {
      const mockProducts = [
        { id: 1, name: 'Wireless Bluetooth Headphones', price: 99.99, category: 'Electronics', image: '🎧', rating: 4.8, reviews: 124, inStock: true, description: 'High-quality wireless headphones with noise cancellation' },
        { id: 2, name: 'Smart Watch Pro', price: 199.99, category: 'Electronics', image: '⌚', rating: 4.9, reviews: 89, inStock: true, description: 'Advanced smartwatch with health monitoring features' },
        { id: 3, name: 'Running Shoes', price: 79.99, category: 'Sports', image: '👟', rating: 4.7, reviews: 156, inStock: true, description: 'Comfortable running shoes for all terrains' },
        { id: 4, name: 'Coffee Maker', price: 49.99, category: 'Home & Garden', image: '☕', rating: 4.6, reviews: 203, inStock: true, description: 'Automatic coffee maker with timer' },
        { id: 5, name: 'Laptop Backpack', price: 39.99, category: 'Fashion', image: '🎒', rating: 4.5, reviews: 78, inStock: false, description: 'Durable laptop backpack with multiple compartments' },
        { id: 6, name: 'Yoga Mat', price: 29.99, category: 'Sports', image: '🧘', rating: 4.4, reviews: 92, inStock: true, description: 'Non-slip yoga mat for home workouts' },
        { id: 7, name: 'Gaming Mouse', price: 59.99, category: 'Electronics', image: '🖱️', rating: 4.7, reviews: 67, inStock: true, description: 'High-precision gaming mouse with RGB lighting' },
        { id: 8, name: 'Plant Pot Set', price: 34.99, category: 'Home & Garden', image: '🪴', rating: 4.3, reviews: 45, inStock: true, description: 'Beautiful ceramic plant pots for indoor plants' },
        { id: 9, name: 'Fitness Tracker', price: 89.99, category: 'Sports', image: '📱', rating: 4.6, reviews: 134, inStock: true, description: 'Waterproof fitness tracker with heart rate monitor' },
        { id: 10, name: 'Denim Jacket', price: 69.99, category: 'Fashion', image: '🧥', rating: 4.4, reviews: 89, inStock: true, description: 'Classic denim jacket for casual wear' },
        { id: 11, name: 'Bluetooth Speaker', price: 79.99, category: 'Electronics', image: '🔊', rating: 4.5, reviews: 112, inStock: true, description: 'Portable Bluetooth speaker with deep bass' },
        { id: 12, name: 'Kitchen Knife Set', price: 89.99, category: 'Home & Garden', image: '🔪', rating: 4.8, reviews: 67, inStock: true, description: 'Professional kitchen knife set with block' }
      ]
      setProducts(mockProducts)
      setFilteredProducts(mockProducts)
      setLoading(false)
    }, 1000)
  }, [])

  useEffect(() => {
    // Filter products based on search, category, and price
    let filtered = products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === '' || product.category === selectedCategory
      const matchesPrice = product.price >= priceRange.min && product.price <= priceRange.max
      
      return matchesSearch && matchesCategory && matchesPrice
    })

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price
        case 'price-high':
          return b.price - a.price
        case 'rating':
          return b.rating - a.rating
        case 'name':
        default:
          return a.name.localeCompare(b.name)
      }
    })

    setFilteredProducts(filtered)
  }, [products, searchTerm, selectedCategory, priceRange, sortBy])

  const addToCart = (product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id)
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...prevCart, { ...product, quantity: 1 }]
    })
  }

  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId))
  }

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId)
      return
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    )
  }

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0)
  }

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading products...</p>
      </div>
    )
  }

  return (
    <div className="products-app">
      {/* Header */}
      <div className="products-header">
        <h1>Our Products</h1>
        <div className="cart-icon" onClick={() => setShowCart(!showCart)}>
          🛒 <span className="cart-count">{cart.reduce((total, item) => total + item.quantity, 0)}</span>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="filters-section">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="filters-row">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="category-filter"
          >
            <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>

          <div className="price-filter">
            <label>Price Range:</label>
            <input
              type="range"
              min="0"
              max="1000"
              value={priceRange.max}
              onChange={(e) => setPriceRange(prev => ({ ...prev, max: parseInt(e.target.value) }))}
              className="price-slider"
            />
            <span>${priceRange.max}</span>
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="sort-filter"
          >
            <option value="name">Sort by Name</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Sort by Rating</option>
          </select>
        </div>
      </div>

      {/* Products Grid */}
      <div className="products-container">
        <div className="products-grid">
          {filteredProducts.map(product => (
            <div key={product.id} className="product-card">
              <div className="product-image">{product.image}</div>
              <div className="product-info">
                <h3>{product.name}</h3>
                <p className="product-description">{product.description}</p>
                <div className="product-meta">
                  <div className="product-rating">
                    {'⭐'.repeat(Math.floor(product.rating))}
                    <span className="rating-text">{product.rating}</span>
                    <span className="reviews-count">({product.reviews})</span>
                  </div>
                  <span className={`stock-status ${product.inStock ? 'in-stock' : 'out-of-stock'}`}>
                    {product.inStock ? 'In Stock' : 'Out of Stock'}
                  </span>
                </div>
                <p className="product-price">${product.price}</p>
                <button
                  className={`add-to-cart-btn ${!product.inStock ? 'disabled' : ''}`}
                  onClick={() => addToCart(product)}
                  disabled={!product.inStock}
                >
                  {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="no-products">
            <h3>No products found</h3>
            <p>Try adjusting your search criteria or filters</p>
          </div>
        )}
      </div>

      {/* Shopping Cart Sidebar */}
      {showCart && (
        <div className="cart-sidebar">
          <div className="cart-header">
            <h3>Shopping Cart</h3>
            <button className="close-cart" onClick={() => setShowCart(false)}>×</button>
          </div>
          
          {cart.length === 0 ? (
            <div className="empty-cart">
              <p>Your cart is empty</p>
            </div>
          ) : (
            <>
              <div className="cart-items">
                {cart.map(item => (
                  <div key={item.id} className="cart-item">
                    <div className="cart-item-image">{item.image}</div>
                    <div className="cart-item-details">
                      <h4>{item.name}</h4>
                      <p>${item.price}</p>
                      <div className="quantity-controls">
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                        <span>{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                      </div>
                    </div>
                    <button className="remove-item" onClick={() => removeFromCart(item.id)}>×</button>
                  </div>
                ))}
              </div>
              
              <div className="cart-footer">
                <div className="cart-total">
                  <strong>Total: ${getTotalPrice().toFixed(2)}</strong>
                </div>
                <button className="checkout-btn">Proceed to Checkout</button>
              </div>
            </>
          )}
        </div>
      )}

      {/* Results Summary */}
      <div className="results-summary">
        <p>Showing {filteredProducts.length} of {products.length} products</p>
      </div>
    </div>
  )
}

export default ProductsApp



