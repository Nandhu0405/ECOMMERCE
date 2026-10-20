import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Building2, 
  User, 
  Mail, 
  Phone, 
  FileText, 
  PackageCheck, 
  Clock, 
  LogOut, 
  ChevronRight, 
  Download, 
  Sparkles, 
  ShieldAlert,
  Send,
  ShoppingBag,
  ExternalLink
} from 'lucide-react';
import { useToast } from '../context/ToastContext';
import Breadcrumb from '../components/Breadcrumb';

const Account = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [user, setUser] = useState(null);
  const [enquiries, setEnquiries] = useState([]);
  const [orders, setOrders] = useState([]);
  const { addToast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // Load simulated user or provide high-tier demo client
    const savedUser = localStorage.getItem('skff_demo_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        console.error(e);
      }
    } else {
      const defaultUser = {
        name: 'Dr. Vikram Malhotra',
        email: 'v.malhotra@cadbury-kraft.demo',
        company: 'Cadbury Kraft Confectionery Division',
        role: 'Director of Flavour Innovation',
        industry: 'Bakery and Confectionery',
        accountTier: 'Enterprise Strategic Partner (Tier 1)',
        clientCode: 'SKFF-CL-4890',
        memberSince: '2019',
        assignedManager: 'Sunil Mehta (VP Business Development, Mumbai)'
      };
      setUser(defaultUser);
      localStorage.setItem('skff_demo_user', JSON.stringify(defaultUser));
    }

    // Load user enquiries
    const savedEnquiries = localStorage.getItem('skff_demo_enquiries');
    if (savedEnquiries) {
      try {
        setEnquiries(JSON.parse(savedEnquiries));
      } catch (e) {
        console.error(e);
      }
    }

    // Load user orders
    const savedOrders = localStorage.getItem('skff_demo_orders');
    if (savedOrders) {
      try {
        setOrders(JSON.parse(savedOrders));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('skff_demo_user');
    addToast('Logged out of simulated B2B portal', 'info');
    navigate('/login');
  };

  if (!user) return null;

  return (
    <div className="account-page">
      <div className="container" style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
        <Breadcrumb items={[{ label: 'Home', path: '/' }, { label: 'B2B Client Dashboard' }]} />

        {/* Demo Warning Notice */}
        <div className="demo-notice-banner" style={{ marginBottom: '2rem' }}>
          <ShieldAlert size={18} />
          <span>
            <strong>Simulated B2B Client Portal:</strong> This interface displays demo enterprise profile data and queries stored in your local browser.
          </span>
        </div>

        {/* Account Header */}
        <div className="account-header-card">
          <div className="account-header-left">
            <div className="avatar-circle">
              {user.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
            </div>
            <div>
              <div className="tier-badge">
                <Sparkles size={14} /> {user.accountTier}
              </div>
              <h1>{user.name}</h1>
              <p className="account-subtext">
                <Building2 size={16} /> <strong>{user.company}</strong> &bull; {user.role}
              </p>
            </div>
          </div>
          <div className="account-header-right">
            <div className="client-id-box">
              <span className="client-id-label">Client Account Code</span>
              <span className="client-id-value">{user.clientCode}</span>
            </div>
            <button onClick={handleLogout} className="btn btn-outline btn-sm logout-btn">
              <LogOut size={16} /> Logout
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="account-tabs">
          <button
            className={`account-tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            Dashboard Overview
          </button>
          <button
            className={`account-tab-btn ${activeTab === 'enquiries' ? 'active' : ''}`}
            onClick={() => setActiveTab('enquiries')}
          >
            My RFQs & Samples ({enquiries.length})
          </button>
          <button
            className={`account-tab-btn ${activeTab === 'orders' ? 'active' : ''}`}
            onClick={() => setActiveTab('orders')}
          >
            Demo Orders ({orders.length})
          </button>
          <button
            className={`account-tab-btn ${activeTab === 'downloads' ? 'active' : ''}`}
            onClick={() => setActiveTab('downloads')}
          >
            Technical Spec Sheets
          </button>
        </div>

        {/* Tab 1: Overview */}
        {activeTab === 'overview' && (
          <div className="account-content-grid">
            <div className="account-main-col">
              <div className="content-card">
                <h2>Corporate Profile Information</h2>
                <div className="detail-rows">
                  <div className="detail-row">
                    <span className="detail-label">Full Name</span>
                    <span className="detail-value">{user.name}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Designation / Department</span>
                    <span className="detail-value">{user.role}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Corporate Email</span>
                    <span className="detail-value">{user.email}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Registered Enterprise</span>
                    <span className="detail-value">{user.company}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Industry Classification</span>
                    <span className="detail-value">{user.industry || 'Flavour Applications'}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Client Code</span>
                    <span className="detail-value">{user.clientCode}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Dedicated Relationship Manager</span>
                    <span className="detail-value highlight">
                      {user.assignedManager || 'SKFF Corporate B2B Desk, Mumbai'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="content-card" style={{ marginTop: '1.5rem' }}>
                <div className="card-header-flex">
                  <h2>Recent Enquiries & RFQ Activity</h2>
                  <Link to="/enquiry" className="btn btn-outline btn-xs">
                    + New Sample Request
                  </Link>
                </div>

                {enquiries.length === 0 ? (
                  <div className="empty-substate">
                    <FileText size={36} color="var(--color-accent-rose)" />
                    <p>No recent sample quotation requests found in your local session.</p>
                    <Link to="/enquiry" className="btn btn-primary btn-sm">
                      Submit Your First B2B RFQ
                    </Link>
                  </div>
                ) : (
                  <div className="recent-list">
                    {enquiries.slice(0, 3).map((item) => (
                      <div key={item.id} className="recent-list-item">
                        <div className="item-icon-col">
                          <Send size={18} color="var(--color-accent-rose)" />
                        </div>
                        <div className="item-info-col">
                          <div className="item-title">
                            {item.productName || item.category || 'General Formulation Requirement'}
                          </div>
                          <div className="item-meta">
                            Qty: {item.quantity} kg &bull; Ref: {item.refCode || item.id} &bull; Date: {item.date}
                          </div>
                        </div>
                        <span className="status-pill status-review">In Evaluation (Demo)</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar Quick Actions */}
            <div className="account-side-col">
              <div className="content-card quick-links-card">
                <h3>Quick Actions</h3>
                <ul className="quick-action-list">
                  <li>
                    <Link to="/enquiry" className="action-link">
                      <Send size={16} />
                      <span>Request Flavour / Fragrance Quote</span>
                      <ChevronRight size={16} />
                    </Link>
                  </li>
                  <li>
                    <Link to="/flavours" className="action-link">
                      <PackageCheck size={16} />
                      <span>Browse 7 Flavour Categories</span>
                      <ChevronRight size={16} />
                    </Link>
                  </li>
                  <li>
                    <Link to="/fragrances" className="action-link">
                      <PackageCheck size={16} />
                      <span>Browse 4 Fragrance Categories</span>
                      <ChevronRight size={16} />
                    </Link>
                  </li>
                  <li>
                    <Link to="/specifications" className="action-link">
                      <Download size={16} />
                      <span>Regulatory & Technical Spec Sheets</span>
                      <ChevronRight size={16} />
                    </Link>
                  </li>
                  <li>
                    <Link to="/admin" className="action-link admin-highlight">
                      <Building2 size={16} />
                      <span>Open SKFF Admin Console (Demo)</span>
                      <ExternalLink size={16} />
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="content-card support-card" style={{ marginTop: '1.5rem' }}>
                <h3>Corporate Support Desk</h3>
                <p>Contact your dedicated application technologist at SKFF Mumbai HQ:</p>
                <div className="support-contact">
                  <strong>Phone:</strong> <a href="tel:+912242866600">+91-22-4286 6600</a>
                </div>
                <div className="support-contact">
                  <strong>Email:</strong> <a href="mailto:info@skff.co.in">info@skff.co.in</a>
                </div>
                <div className="support-contact">
                  <strong>Address:</strong> Lotus Corporate Park, Goregaon East, Mumbai 400063
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Enquiries */}
        {activeTab === 'enquiries' && (
          <div className="content-card">
            <div className="card-header-flex">
              <div>
                <h2>Submitted B2B RFQs & Sample Enquiries</h2>
                <p>All quotation requests submitted through this device session.</p>
              </div>
              <Link to="/enquiry" className="btn btn-primary btn-sm">
                + Submit New RFQ
              </Link>
            </div>

            {enquiries.length === 0 ? (
              <div className="empty-substate" style={{ padding: '3rem 1rem' }}>
                <FileText size={48} color="var(--color-accent-rose)" />
                <h3>No RFQs Submitted Yet</h3>
                <p>Use the Request a Quote form to submit custom requirement details for flavours or fragrances.</p>
                <Link to="/enquiry" className="btn btn-primary btn-sm">
                  Open Business Enquiry Form
                </Link>
              </div>
            ) : (
              <div className="table-responsive" style={{ marginTop: '1.5rem' }}>
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Ref Number</th>
                      <th>Category / Product</th>
                      <th>Quantity</th>
                      <th>Date</th>
                      <th>Industry</th>
                      <th>Simulated Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {enquiries.map((enq) => (
                      <tr key={enq.id}>
                        <td><strong>{enq.refCode || enq.id}</strong></td>
                        <td>{enq.productName || enq.category || 'Flavour Compound'}</td>
                        <td>{enq.quantity} kg ({enq.packSize || 'Standard B2B Drum'})</td>
                        <td>{enq.date}</td>
                        <td>{enq.industry || 'Food & Beverage'}</td>
                        <td>
                          <span className="status-pill status-review">Lab Review (Demo)</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Orders */}
        {activeTab === 'orders' && (
          <div className="content-card">
            <div className="card-header-flex">
              <div>
                <h2>Demonstration Sample Orders</h2>
                <p>Simulated orders placed through the frontend shopping cart demo.</p>
              </div>
              <Link to="/catalogue" className="btn btn-outline btn-sm">
                Browse Catalogue
              </Link>
            </div>

            {orders.length === 0 ? (
              <div className="empty-substate" style={{ padding: '3rem 1rem' }}>
                <ShoppingBag size={48} color="var(--color-accent-rose)" />
                <h3>No Demo Orders Placed</h3>
                <p>Explore our 11 categories, add items to cart, and try the frontend checkout simulation.</p>
                <Link to="/catalogue" className="btn btn-primary btn-sm">
                  Explore Products
                </Link>
              </div>
            ) : (
              <div className="table-responsive" style={{ marginTop: '1.5rem' }}>
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Date</th>
                      <th>Items Count</th>
                      <th>Demo Total</th>
                      <th>Shipping Tier</th>
                      <th>Demo Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((ord) => (
                      <tr key={ord.id}>
                        <td><strong>{ord.orderNumber || ord.id}</strong></td>
                        <td>{ord.date}</td>
                        <td>{ord.items?.length || 1} product(s)</td>
                        <td>₹{ord.total?.toLocaleString('en-IN')}</td>
                        <td>{ord.shippingMethod || 'Standard Surface'}</td>
                        <td>
                          <span className="status-pill status-success">Demo Confirmed</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Tab 4: Technical Spec Sheets */}
        {activeTab === 'downloads' && (
          <div className="content-card">
            <div className="card-header-flex">
              <div>
                <h2>Corporate Technical & Regulatory Spec Sheets</h2>
                <p>Demonstration specification documentation for standard formulations.</p>
              </div>
              <Link to="/specifications" className="btn btn-outline btn-sm">
                View Full Interactive Specs
              </Link>
            </div>

            <div className="spec-downloads-list" style={{ marginTop: '1.5rem' }}>
              {[
                { title: 'Technical Specification — Madagascar Bourbon Type Vanilla Flavour (SKFF-FL-002)', code: 'TDS-VAN-002', type: 'Flavours / Confectionery' },
                { title: 'Technical Specification — French Lavender Fresh Fragrance (SKFF-FR-071)', code: 'TDS-LAV-071', type: 'Fragrances / Home Care' },
                { title: 'Technical Specification — Alphonso Mango Natural Taste Flavour (SKFF-FL-043)', code: 'TDS-MNG-043', type: 'Flavours / Beverages' },
                { title: 'Technical Specification — Natural Peppermint Masking Extract (SKFF-FL-051)', code: 'TDS-PEP-051', type: 'Flavours / Pharmaceuticals' },
                { title: 'General Allergen Declaration & Heavy Metal Assay Guidelines (Demonstration Template)', code: 'REG-STD-2026', type: 'Corporate Quality' }
              ].map((doc, idx) => (
                <div key={idx} className="spec-download-item">
                  <div className="doc-icon">
                    <FileText size={22} color="var(--color-accent-rose)" />
                  </div>
                  <div className="doc-info">
                    <h4>{doc.title}</h4>
                    <span className="doc-meta">{doc.code} &bull; {doc.type}</span>
                  </div>
                  <button
                    onClick={() => addToast(`Downloaded demonstration spec sheet: ${doc.code}`, 'success')}
                    className="btn btn-outline btn-sm download-btn"
                  >
                    <Download size={16} /> Download TDS
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Account;
