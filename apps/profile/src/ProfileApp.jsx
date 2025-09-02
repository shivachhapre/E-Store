import React, { useState, useEffect } from 'react'
import './ProfileApp.css'

const ProfileApp = () => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('overview')
  const [editMode, setEditMode] = useState(false)
  const [formData, setFormData] = useState({})
  const [orders, setOrders] = useState([])
  const [wishlist, setWishlist] = useState([])
  const [notifications, setNotifications] = useState([])

  useEffect(() => {
    // Simulate loading user data
    setTimeout(() => {
      const mockUser = {
        id: 1,
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '+1 (555) 123-4567',
        avatar: '👤',
        joinDate: '2024-01-15',
        orders: 12,
        totalSpent: 1250.75,
        loyaltyPoints: 1250,
        tier: 'Gold',
        address: {
          street: '123 Main Street',
          city: 'New York',
          state: 'NY',
          zipCode: '10001',
          country: 'USA'
        },
        preferences: {
          emailNotifications: true,
          smsNotifications: false,
          marketingEmails: true,
          orderUpdates: true,
          newsletter: false
        }
      }

      const mockOrders = [
        { id: 'ORD-001', date: '2024-01-20', status: 'Delivered', total: 99.99, items: 2 },
        { id: 'ORD-002', date: '2024-01-18', status: 'Shipped', total: 149.99, items: 3 },
        { id: 'ORD-003', date: '2024-01-15', status: 'Processing', total: 79.99, items: 1 },
        { id: 'ORD-004', date: '2024-01-10', status: 'Delivered', total: 299.99, items: 4 }
      ]

      const mockWishlist = [
        { id: 1, name: 'Wireless Headphones', price: 99.99, image: '🎧', inStock: true },
        { id: 2, name: 'Smart Watch', price: 199.99, image: '⌚', inStock: true },
        { id: 3, name: 'Gaming Laptop', price: 1299.99, image: '💻', inStock: false }
      ]

      const mockNotifications = [
        { id: 1, type: 'order', message: 'Your order ORD-002 has been shipped!', read: false, date: '2024-01-19' },
        { id: 2, type: 'promo', message: '20% off on all electronics this weekend!', read: true, date: '2024-01-18' },
        { id: 3, type: 'delivery', message: 'Your order ORD-001 has been delivered!', read: false, date: '2024-01-20' }
      ]

      setUser(mockUser)
      setFormData(mockUser)
      setOrders(mockOrders)
      setWishlist(mockWishlist)
      setNotifications(mockNotifications)
      setLoading(false)
    }, 1000)
  }, [])

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleAddressChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      address: {
        ...prev.address,
        [field]: value
      }
    }))
  }

  const handlePreferencesChange = (preference, value) => {
    setFormData(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [preference]: value
      }
    }))
  }

  const saveChanges = () => {
    setUser(formData)
    setEditMode(false)
    // In a real app, this would make an API call
    console.log('Saving changes:', formData)
  }

  const cancelEdit = () => {
    setFormData(user)
    setEditMode(false)
  }

  const markNotificationAsRead = (notificationId) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === notificationId ? { ...notif, read: true } : notif
      )
    )
  }

  const removeFromWishlist = (itemId) => {
    setWishlist(prev => prev.filter(item => item.id !== itemId))
  }

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading profile...</p>
      </div>
    )
  }

  return (
    <div className="profile-app">
      {/* Profile Header */}
      <div className="profile-header">
        <div className="profile-avatar-section">
          <div className="profile-avatar">{user.avatar}</div>
          <div className="profile-info">
            <h1>{user.name}</h1>
            <p className="profile-email">{user.email}</p>
            <p className="profile-member-since">Member since {new Date(user.joinDate).toLocaleDateString()}</p>
            <div className="profile-tier">
              <span className={`tier-badge ${user.tier.toLowerCase()}`}>{user.tier} Member</span>
            </div>
          </div>
        </div>
        
        {!editMode && (
          <button className="edit-profile-btn" onClick={() => setEditMode(true)}>
            Edit Profile
          </button>
        )}
      </div>

      {/* Stats Cards */}
      <div className="stats-section">
        <div className="stat-card">
          <div className="stat-icon">📦</div>
          <div className="stat-content">
            <h3>Total Orders</h3>
            <p className="stat-number">{user.orders}</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">💰</div>
          <div className="stat-content">
            <h3>Total Spent</h3>
            <p className="stat-number">${user.totalSpent.toFixed(2)}</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">⭐</div>
          <div className="stat-content">
            <h3>Loyalty Points</h3>
            <p className="stat-number">{user.loyaltyPoints}</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🏆</div>
          <div className="stat-content">
            <h3>Member Tier</h3>
            <p className="stat-number">{user.tier}</p>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="profile-tabs">
        <button
          className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button
          className={`tab-btn ${activeTab === 'orders' ? 'active' : ''}`}
          onClick={() => setActiveTab('orders')}
        >
          Orders
        </button>
        <button
          className={`tab-btn ${activeTab === 'wishlist' ? 'active' : ''}`}
          onClick={() => setActiveTab('wishlist')}
        >
          Wishlist
        </button>
        <button
          className={`tab-btn ${activeTab === 'notifications' ? 'active' : ''}`}
          onClick={() => setActiveTab('notifications')}
        >
          Notifications
        </button>
        <button
          className={`tab-btn ${activeTab === 'settings' ? 'active' : ''}`}
          onClick={() => setActiveTab('settings')}
        >
          Settings
        </button>
      </div>

      {/* Tab Content */}
      <div className="tab-content">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="overview-tab">
            <div className="recent-activity">
              <h3>Recent Activity</h3>
              <div className="activity-list">
                <div className="activity-item">
                  <span className="activity-icon">📦</span>
                  <div className="activity-content">
                    <p>Order ORD-002 shipped</p>
                    <span className="activity-date">2 days ago</span>
                  </div>
                </div>
                <div className="activity-item">
                  <span className="activity-icon">⭐</span>
                  <div className="activity-content">
                    <p>Earned 50 loyalty points</p>
                    <span className="activity-date">3 days ago</span>
                  </div>
                </div>
                <div className="activity-item">
                  <span className="activity-icon">🎁</span>
                  <div className="activity-content">
                    <p>Unlocked Gold tier benefits</p>
                    <span className="activity-date">1 week ago</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div className="orders-tab">
            <h3>Order History</h3>
            <div className="orders-list">
              {orders.map(order => (
                <div key={order.id} className="order-item">
                  <div className="order-header">
                    <h4>{order.id}</h4>
                    <span className={`order-status ${order.status.toLowerCase()}`}>
                      {order.status}
                    </span>
                  </div>
                  <div className="order-details">
                    <p>Date: {new Date(order.date).toLocaleDateString()}</p>
                    <p>Items: {order.items}</p>
                    <p className="order-total">Total: ${order.total}</p>
                  </div>
                  <button className="view-order-btn">View Details</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Wishlist Tab */}
        {activeTab === 'wishlist' && (
          <div className="wishlist-tab">
            <h3>My Wishlist</h3>
            <div className="wishlist-grid">
              {wishlist.map(item => (
                <div key={item.id} className="wishlist-item">
                  <div className="wishlist-image">{item.image}</div>
                  <div className="wishlist-content">
                    <h4>{item.name}</h4>
                    <p className="wishlist-price">${item.price}</p>
                    <div className="wishlist-actions">
                      <button className="add-to-cart-btn">Add to Cart</button>
                      <button 
                        className="remove-wishlist-btn"
                        onClick={() => removeFromWishlist(item.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Notifications Tab */}
        {activeTab === 'notifications' && (
          <div className="notifications-tab">
            <h3>Notifications</h3>
            <div className="notifications-list">
              {notifications.map(notification => (
                <div 
                  key={notification.id} 
                  className={`notification-item ${!notification.read ? 'unread' : ''}`}
                  onClick={() => markNotificationAsRead(notification.id)}
                >
                  <div className="notification-icon">
                    {notification.type === 'order' && '📦'}
                    {notification.type === 'promo' && '🎉'}
                    {notification.type === 'delivery' && '🚚'}
                  </div>
                  <div className="notification-content">
                    <p>{notification.message}</p>
                    <span className="notification-date">
                      {new Date(notification.date).toLocaleDateString()}
                    </span>
                  </div>
                  {!notification.read && <div className="unread-indicator"></div>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="settings-tab">
            <h3>Profile Settings</h3>
            
            {editMode ? (
              <div className="edit-form">
                <div className="form-section">
                  <h4>Personal Information</h4>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Full Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="form-group">
                      <label>Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="form-section">
                  <h4>Address</h4>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Street</label>
                      <input
                        type="text"
                        value={formData.address.street}
                        onChange={(e) => handleAddressChange('street', e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label>City</label>
                      <input
                        type="text"
                        value={formData.address.city}
                        onChange={(e) => handleAddressChange('city', e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>State</label>
                      <input
                        type="text"
                        value={formData.address.state}
                        onChange={(e) => handleAddressChange('state', e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label>ZIP Code</label>
                      <input
                        type="text"
                        value={formData.address.zipCode}
                        onChange={(e) => handleAddressChange('zipCode', e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="form-section">
                  <h4>Preferences</h4>
                  <div className="preferences-grid">
                    <label className="preference-item">
                      <input
                        type="checkbox"
                        checked={formData.preferences.emailNotifications}
                        onChange={(e) => handlePreferencesChange('emailNotifications', e.target.checked)}
                      />
                      Email Notifications
                    </label>
                    <label className="preference-item">
                      <input
                        type="checkbox"
                        checked={formData.preferences.smsNotifications}
                        onChange={(e) => handlePreferencesChange('smsNotifications', e.target.checked)}
                      />
                      SMS Notifications
                    </label>
                    <label className="preference-item">
                      <input
                        type="checkbox"
                        checked={formData.preferences.marketingEmails}
                        onChange={(e) => handlePreferencesChange('marketingEmails', e.target.checked)}
                      />
                      Marketing Emails
                    </label>
                    <label className="preference-item">
                      <input
                        type="checkbox"
                        checked={formData.preferences.orderUpdates}
                        onChange={(e) => handlePreferencesChange('orderUpdates', e.target.checked)}
                      />
                      Order Updates
                    </label>
                  </div>
                </div>

                <div className="form-actions">
                  <button className="save-btn" onClick={saveChanges}>
                    Save Changes
                  </button>
                  <button className="cancel-btn" onClick={cancelEdit}>
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="view-settings">
                <div className="settings-section">
                  <h4>Personal Information</h4>
                  <p><strong>Name:</strong> {user.name}</p>
                  <p><strong>Email:</strong> {user.email}</p>
                  <p><strong>Phone:</strong> {user.phone}</p>
                </div>

                <div className="settings-section">
                  <h4>Address</h4>
                  <p>{user.address.street}</p>
                  <p>{user.address.city}, {user.address.state} {user.address.zipCode}</p>
                  <p>{user.address.country}</p>
                </div>

                <div className="settings-section">
                  <h4>Preferences</h4>
                  <div className="preferences-list">
                    <p><strong>Email Notifications:</strong> {user.preferences.emailNotifications ? 'Enabled' : 'Disabled'}</p>
                    <p><strong>SMS Notifications:</strong> {user.preferences.smsNotifications ? 'Enabled' : 'Disabled'}</p>
                    <p><strong>Marketing Emails:</strong> {user.preferences.marketingEmails ? 'Enabled' : 'Disabled'}</p>
                    <p><strong>Order Updates:</strong> {user.preferences.orderUpdates ? 'Enabled' : 'Disabled'}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default ProfileApp



