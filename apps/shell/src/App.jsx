import React, { Suspense, lazy, useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import './App.css'

// Dynamic imports for micro-frontend components using Module Federation
const HomeApp = lazy(() => import('home/HomeApp'))
const ProductsApp = lazy(() => import('products/ProductsApp'))
const ProfileApp = lazy(() => import('profile/ProfileApp'))

function App() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading time for Module Federation
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <div className="app">
        <div className="loading-container">
          <div className="loading">Loading Micro-Frontend Application...</div>
        </div>
      </div>
    )
  }

  return (
    <Router>
      <div className="app">
        <header className="app-header">
          <nav className="nav">
            <div className="nav-brand">
              <h1>🛍️ E-commerce</h1>
            </div>
            <ul className="nav-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/products">Products</Link></li>
              <li><Link to="/profile">Profile</Link></li>
            </ul>
          </nav>
        </header>

        <main className="app-main">
          <Suspense fallback={<div className="loading">Loading...</div>}>
            <Routes>
              <Route path="/" element={<HomeApp />} />
              <Route path="/products" element={<ProductsApp />} />
              <Route path="/profile" element={<ProfileApp />} />
            </Routes>
          </Suspense>
        </main>

        <footer className="app-footer">
          <p>&copy; 2024 E-commerce Micro Frontend. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  )
}

export default App
