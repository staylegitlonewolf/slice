import React, { useState } from 'react'

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview')

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <h1>Slice Weston Admin Dashboard</h1>
        <p>Welcome back, Patty! Manage your venue and website content.</p>
      </div>

      <div className="admin-tabs">
        <button 
          className={`tab ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button 
          className={`tab ${activeTab === 'content' ? 'active' : ''}`}
          onClick={() => setActiveTab('content')}
        >
          Content Management
        </button>
        <button 
          className={`tab ${activeTab === 'events' ? 'active' : ''}`}
          onClick={() => setActiveTab('events')}
        >
          Event Management
        </button>
        <button 
          className={`tab ${activeTab === 'catering' ? 'active' : ''}`}
          onClick={() => setActiveTab('catering')}
        >
          Catering Menus
        </button>
        <button 
          className={`tab ${activeTab === 'invoices' ? 'active' : ''}`}
          onClick={() => setActiveTab('invoices')}
        >
          Invoices & Payments
        </button>
        <button 
          className={`tab ${activeTab === 'members' ? 'active' : ''}`}
          onClick={() => setActiveTab('members')}
        >
          Member Subscriptions
        </button>
      </div>

      <div className="admin-content">
        {activeTab === 'overview' && (
          <div className="overview-tab">
            <div className="stats-grid">
              <div className="stat-card">
                <h3>Upcoming Events</h3>
                <div className="stat-number">12</div>
                <p>Next 30 days</p>
              </div>
              <div className="stat-card">
                <h3>Quote Requests</h3>
                <div className="stat-number">8</div>
                <p>Pending responses</p>
              </div>
              <div className="stat-card">
                <h3>Active Members</h3>
                <div className="stat-number">45</div>
                <p>Subscription holders</p>
              </div>
              <div className="stat-card">
                <h3>Revenue This Month</h3>
                <div className="stat-number">$24,500</div>
                <p>+12% from last month</p>
              </div>
            </div>
            
            <div className="quick-actions">
              <h3>Quick Actions</h3>
              <div className="action-buttons">
                <button className="action-btn">Create New Event</button>
                <button className="action-btn">Upload Video</button>
                <button className="action-btn">Send Invoice</button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'content' && (
          <div className="content-tab">
            <h3>Website Content Management</h3>
            <div className="content-sections">
              <div className="content-section">
                <h4>Homepage</h4>
                <button className="edit-btn">Edit Hero Section</button>
                <button className="edit-btn">Update Features</button>
                <button className="edit-btn">Modify CTA</button>
              </div>
              <div className="content-section">
                <h4>About Us</h4>
                <button className="edit-btn">Edit Company Info</button>
                <button className="edit-btn">Update Team Photos</button>
                <button className="edit-btn">Modify Contact Details</button>
              </div>
              <div className="content-section">
                <h4>Gallery</h4>
                <button className="edit-btn">Upload New Photos</button>
                <button className="edit-btn">Organize Albums</button>
                <button className="edit-btn">Manage Categories</button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'events' && (
          <div className="events-tab">
            <h3>Event Management</h3>
            <div className="events-controls">
              <button className="add-event-btn">+ Add New Event</button>
              <div className="event-filters">
                <select defaultValue="all">
                  <option value="all">All Events</option>
                  <option value="weddings">Weddings</option>
                  <option value="bar-mitzvah">Bar/Bat Mitzvahs</option>
                  <option value="quinces">Quinces</option>
                  <option value="corporate">Corporate Events</option>
                </select>
              </div>
            </div>
            <div className="events-list">
              <div className="event-item">
                <div className="event-date">Dec 15, 2024</div>
                <div className="event-details">
                  <h4>Johnson Wedding</h4>
                  <p>150 guests • Full catering • 6:00 PM</p>
                </div>
                <div className="event-actions">
                  <button className="edit-event-btn">Edit</button>
                  <button className="view-event-btn">View</button>
                </div>
              </div>
              <div className="event-item">
                <div className="event-date">Dec 20, 2024</div>
                <div className="event-details">
                  <h4>Smith Corporate Holiday Party</h4>
                  <p>80 guests • Appetizers • 7:00 PM</p>
                </div>
                <div className="event-actions">
                  <button className="edit-event-btn">Edit</button>
                  <button className="view-event-btn">View</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'catering' && (
          <div className="catering-tab">
            <h3>Catering Menu Management</h3>
            <div className="menu-categories">
              <div className="menu-category">
                <h4>Wedding Packages</h4>
                <button className="edit-menu-btn">Edit Package</button>
                <button className="add-item-btn">Add Item</button>
              </div>
              <div className="menu-category">
                <h4>Corporate Events</h4>
                <button className="edit-menu-btn">Edit Package</button>
                <button className="add-item-btn">Add Item</button>
              </div>
              <div className="menu-category">
                <h4>Special Occasions</h4>
                <button className="edit-menu-btn">Edit Package</button>
                <button className="add-item-btn">Add Item</button>
              </div>
            </div>
          </div>
        )}


        {activeTab === 'invoices' && (
          <div className="invoices-tab">
            <h3>Invoice & Payment Management</h3>
            <div className="invoice-controls">
              <button className="create-invoice-btn">+ Create Invoice</button>
              <button className="payment-report-btn">Payment Report</button>
            </div>
            <div className="invoices-list">
              <div className="invoice-item">
                <div className="invoice-number">INV-2024-001</div>
                <div className="invoice-details">
                  <h4>Johnson Wedding Deposit</h4>
                  <p>Due: Dec 10, 2024 • Amount: $2,500</p>
                </div>
                <div className="invoice-status paid">Paid</div>
                <div className="invoice-actions">
                  <button className="view-invoice-btn">View</button>
                  <button className="download-invoice-btn">Download</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'members' && (
          <div className="members-tab">
            <h3>Member Subscription Management</h3>
            <div className="member-controls">
              <button className="add-member-btn">+ Add Member</button>
              <button className="subscription-report-btn">Subscription Report</button>
            </div>
            <div className="members-list">
              <div className="member-item">
                <div className="member-info">
                  <h4>Sarah Johnson</h4>
                  <p>Premium Plan • Expires: Jan 15, 2025</p>
                </div>
                <div className="member-status active">Active</div>
                <div className="member-actions">
                  <button className="edit-member-btn">Edit</button>
                  <button className="renew-member-btn">Renew</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminDashboard
