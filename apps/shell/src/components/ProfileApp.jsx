import React, { useEffect, useState } from 'react'

const ProfileApp = () => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Load the profile micro-frontend
    const loadProfileApp = async () => {
      try {
        // In a real implementation, this would load the profile app bundle
        console.log('Loading Profile App...')
        
        // Simulate loading user data
        setTimeout(() => {
          setUser({
            id: 1,
            name: 'John Doe',
            email: 'john.doe@example.com',
            avatar: '👤',
            joinDate: '2024-01-15',
            orders: 12,
            totalSpent: 1250.75
          })
          setLoading(false)
        }, 1000)
      } catch (error) {
        console.error('Failed to load Profile App:', error)
        setLoading(false)
      }
    }

    loadProfileApp()
  }, [])

  if (loading) {
    return <div className="loading">Loading profile...</div>
  }

  return (
    <div className="profile-app">
      <div className="profile-header">
        <div className="profile-avatar">{user.avatar}</div>
        <div className="profile-info">
          <h2>{user.name}</h2>
          <p>{user.email}</p>
          <p>Member since {new Date(user.joinDate).toLocaleDateString()}</p>
        </div>
      </div>

      <div className="profile-stats">
        <div className="stat-card">
          <h3>Total Orders</h3>
          <p className="stat-number">{user.orders}</p>
        </div>
        <div className="stat-card">
          <h3>Total Spent</h3>
          <p className="stat-number">${user.totalSpent.toFixed(2)}</p>
        </div>
      </div>

      <div className="profile-sections">
        <div className="profile-section">
          <h3>Personal Information</h3>
          <div className="form-group">
            <label>Full Name</label>
            <input type="text" defaultValue={user.name} />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" defaultValue={user.email} />
          </div>
          <button className="save-btn">Save Changes</button>
        </div>

        <div className="profile-section">
          <h3>Recent Orders</h3>
          <div className="order-list">
            <div className="order-item">
              <span>Order #12345</span>
              <span>Delivered</span>
              <span>$99.99</span>
            </div>
            <div className="order-item">
              <span>Order #12344</span>
              <span>Shipped</span>
              <span>$149.99</span>
            </div>
          </div>
        </div>

        <div className="profile-section">
          <h3>Preferences</h3>
          <div className="preference-item">
            <label>
              <input type="checkbox" defaultChecked /> Email notifications
            </label>
          </div>
          <div className="preference-item">
            <label>
              <input type="checkbox" defaultChecked /> SMS notifications
            </label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileApp



