import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Building2, 
  User, 
  Mail, 
  Phone, 
  FileText, 
  PackageCheck, 
  LogOut, 
  ChevronRight, 
  Sparkles, 
  ShieldAlert,
  Send,
  ShoppingBag,
  MapPin,
  Heart,
  Plus,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';
import { useToast } from '../context/ToastContext';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import Breadcrumb from '../components/Breadcrumb';

const Account = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [user, setUser] = useState(null);
  const [enquiries, setEnquiries] = useState([]);
  const [orders, setOrders] = useState([]);
  const { wishlistItems } = useWishlist();
  const { cartItems } = useCart();
  const { addToast } = useToast();
  const navigate = useNavigate();

  // Saved Addresses demo state
  const [addresses, setAddresses] = useState([
    {
      id: 'addr-1',
      type: 'Billing & Corporate HQ',
      isDefault: true,
      company: 'Kraft Foods Global Formulation Lab',
      attention: 'Dr. Vikram Malhotra',
      street: 'Tower 4, Mindspace SEZ, Airoli',
      city: 'Navi Mumbai',
      state: 'Maharashtra',
      postalCode: '400708',
      country: 'India',
      gstin: '27AABCK8842F1Z9'
    },
    {
      id: 'addr-2',
      type: 'Production Plant / Receiving Warehouse',
      isDefault: false,
      company: 'Kraft Foods Confectionery Facility',
      attention: 'Inward Warehouse Goods Receiving Bay 3',
      street: 'Plot No. C-14, Industrial MIDC Zone',
      city: 'Roha, Raigad',
      state: 'Maharashtra',
      postalCode: '402116',
      country: 'India'
    }
  ]);

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
        company: 'Kraft Foods Global Formulation Lab',
        role: 'Director of Flavour Innovation',
        industry: 'Bakery and Confectionery',
        accountTier: 'Enterprise Strategic Partner (Tier 1)',
        clientCode: 'SKFF-CL-4890',
        memberSince: '2021',
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
    <div className="account-page" style={{ paddingBottom: '6rem' }}>
      <div className="container" style={{ paddingTop: '2rem' }}>
        <Breadcrumb items={[{ label: 'Home', path: '/' }, { label: 'Customer Account Dashboard' }]} />

        {/* Demo Warning Notice */}
        <div className="demo-notice-banner" style={{ marginBottom: '2rem', background: 'var(--color-bg-pastel-pink)', border: '1px solid rgba(232, 93, 117, 0.25)', borderRadius: 'var(--radius-lg)', padding: '0.75rem 1.25rem', display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.85rem' }}>
          <ShieldAlert size={18} color="var(--color-accent-rose)" />
          <span>
            <strong>Simulated B2B Client Portal:</strong> This dashboard demonstrates enterprise customer workflows, quotation tracking, and address profiles stored locally in your browser.
          </span>
        </div>

        {/* Account Header Banner */}
        <div className="account-header-card" style={{ background: '#FFFFFF', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-2xl)', padding: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem', marginBottom: '2rem', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'var(--color-bg-pastel-pink)', color: 'var(--color-accent-rose)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: 700, border: '2px solid rgba(232, 93, 117, 0.3)' }}>
              {user.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
            </div>
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-accent-rose)', background: 'var(--color-bg-pastel-pink)', padding: '0.2rem 0.6rem', borderRadius: 'var(--radius-full)', marginBottom: '0.35rem' }}>
                <Sparkles size={12} /> {user.accountTier}
              </div>
              <h1 style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-primary-dark)', fontSize: '1.75rem', margin: '0 0 0.25rem' }}>
                {user.name}
              </h1>
              <p style={{ margin: 0, color: 'var(--color-text-muted)', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Building2 size={15} /> <strong>{user.company}</strong> &bull; {user.role}
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <div style={{ background: 'var(--color-bg-ivory)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', padding: '0.5rem 1rem', textAlign: 'right' }}>
              <span style={{ display: 'block', fontSize: '0.7rem', color: 'var(--color-text-light)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Client ID</span>
              <span style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--color-primary-dark)', fontFamily: 'monospace' }}>{user.clientCode}</span>
            </div>
            <button onClick={handleLogout} className="btn btn-secondary btn-sm" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: '#D32F2F', borderColor: 'rgba(211, 47, 47, 0.25)' }}>
              <LogOut size={15} />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Dashboard Navigation Tabs */}
        <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.5rem', marginBottom: '2rem', borderBottom: '1px solid var(--color-border)' }}>
          {[
            { id: 'overview', label: 'Dashboard Overview' },
            { id: 'profile', label: 'Profile Information' },
            { id: 'orders', label: `My Orders (${orders.length})` },
            { id: 'quotes', label: `My Quote Requests (${enquiries.length})` },
            { id: 'wishlist', label: `Wishlist (${wishlistItems.length})` },
            { id: 'addresses', label: 'Saved Addresses' },
            { id: 'company', label: 'Company Information' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '0.75rem 1.25rem',
                borderRadius: 'var(--radius-full)',
                border: 'none',
                background: activeTab === tab.id ? 'var(--color-accent-rose)' : 'transparent',
                color: activeTab === tab.id ? '#FFFFFF' : 'var(--color-text-dark)',
                fontWeight: activeTab === tab.id ? 700 : 500,
                fontSize: '0.88rem',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.2s ease'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* 1. Dashboard Overview */}
        {activeTab === 'overview' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
            <div style={{ background: '#FFFFFF', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-2xl)', padding: '2rem', boxShadow: 'var(--shadow-sm)' }}>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.35rem', color: 'var(--color-primary-dark)', marginBottom: '1.25rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '0.75rem' }}>
                Account Quick Stats
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
                <div style={{ background: 'var(--color-bg-ivory)', padding: '1rem', borderRadius: 'var(--radius-lg)', textAlign: 'center' }}>
                  <div style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--color-accent-rose)', fontFamily: 'var(--font-heading)' }}>{orders.length}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>Orders Placed</div>
                </div>
                <div style={{ background: 'var(--color-bg-ivory)', padding: '1rem', borderRadius: 'var(--radius-lg)', textAlign: 'center' }}>
                  <div style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--color-accent-rose)', fontFamily: 'var(--font-heading)' }}>{enquiries.length}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>Quote RFQs</div>
                </div>
                <div style={{ background: 'var(--color-bg-ivory)', padding: '1rem', borderRadius: 'var(--radius-lg)', textAlign: 'center' }}>
                  <div style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--color-accent-rose)', fontFamily: 'var(--font-heading)' }}>{wishlistItems.length}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>Saved Formulations</div>
                </div>
                <div style={{ background: 'var(--color-bg-ivory)', padding: '1rem', borderRadius: 'var(--radius-lg)', textAlign: 'center' }}>
                  <div style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--color-accent-rose)', fontFamily: 'var(--font-heading)' }}>{cartItems.length}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>Cart Items</div>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <Link to="/products" className="btn btn-rose btn-sm" style={{ justifyContent: 'center' }}>
                  <span>Browse All 112 Products</span>
                  <ChevronRight size={14} />
                </Link>
                <Link to="/request-quote" className="btn btn-secondary btn-sm" style={{ justifyContent: 'center' }}>
                  <FileText size={14} />
                  <span>Request Custom Formulation Quote</span>
                </Link>
              </div>
            </div>

            <div style={{ background: '#FFFFFF', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-2xl)', padding: '2rem', boxShadow: 'var(--shadow-sm)' }}>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.35rem', color: 'var(--color-primary-dark)', marginBottom: '1.25rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '0.75rem' }}>
                Dedicated Technical Desk
              </h2>
              <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                As an enterprise B2B partner, your account is managed directly by our senior flavourists and technical application specialists:
              </p>
              <div style={{ background: 'var(--color-bg-ivory)', padding: '1.25rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', fontSize: '0.85rem' }}>
                <div style={{ fontWeight: 700, color: 'var(--color-primary-dark)', marginBottom: '0.25rem' }}>
                  {user.assignedManager || 'Sunil Mehta (VP Business Development)'}
                </div>
                <div style={{ color: 'var(--color-text-muted)', marginBottom: '0.5rem' }}>
                  SKFF Corporate Technology Centre, Mumbai
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', color: 'var(--color-text-dark)' }}>
                  <div><strong>Phone:</strong> +91-22-4286 6600</div>
                  <div><strong>Direct Desk:</strong> rfq.commercial@skff.in</div>
                  <div><strong>Operating Hours:</strong> Mon - Sat (9:00 AM - 6:00 PM IST)</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 2. Profile Information */}
        {activeTab === 'profile' && (
          <div style={{ background: '#FFFFFF', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-2xl)', padding: '2.5rem', maxWidth: '800px', boxShadow: 'var(--shadow-sm)' }}>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', color: 'var(--color-primary-dark)', marginBottom: '1.5rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '0.75rem' }}>
              Personal &amp; Executive Profile
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--color-text-light)', marginBottom: '0.25rem' }}>Full Representative Name</label>
                <div style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--color-text-dark)' }}>{user.name}</div>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--color-text-light)', marginBottom: '0.25rem' }}>Corporate Email</label>
                <div style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--color-text-dark)' }}>{user.email}</div>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--color-text-light)', marginBottom: '0.25rem' }}>Designation / Role</label>
                <div style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--color-text-dark)' }}>{user.role}</div>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--color-text-light)', marginBottom: '0.25rem' }}>Account Status</label>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', color: '#2E7D32', fontWeight: 600 }}>
                  <CheckCircle2 size={16} /> Verified B2B Partner
                </div>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--color-text-light)', marginBottom: '0.25rem' }}>Member Since</label>
                <div style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--color-text-dark)' }}>{user.memberSince || '2021'}</div>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--color-text-light)', marginBottom: '0.25rem' }}>Client Code</label>
                <div style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--color-text-dark)', fontFamily: 'monospace' }}>{user.clientCode}</div>
              </div>
            </div>
          </div>
        )}

        {/* 3. My Orders */}
        {activeTab === 'orders' && (
          <div style={{ background: '#FFFFFF', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-2xl)', padding: '2rem', boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', color: 'var(--color-primary-dark)', margin: 0 }}>My Demonstration Orders</h2>
                <p style={{ margin: '0.25rem 0 0', color: 'var(--color-text-muted)', fontSize: '0.88rem' }}>Orders submitted via frontend checkout prototype</p>
              </div>
              <Link to="/orders" className="btn btn-rose btn-sm">
                <span>Open Dedicated Orders Page</span>
                <ChevronRight size={14} />
              </Link>
            </div>

            {orders.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '3.5rem 1rem' }}>
                <ShoppingBag size={48} color="var(--color-accent-rose)" style={{ margin: '0 auto 1rem' }} />
                <h3 style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-primary-dark)' }}>No Orders Placed Yet</h3>
                <p style={{ color: 'var(--color-text-muted)', maxWidth: '420px', margin: '0 auto 1.5rem', fontSize: '0.88rem' }}>
                  Browse our flavours and fragrances, add items to your cart, and experience the checkout flow.
                </p>
                <Link to="/products" className="btn btn-secondary btn-sm">Browse Products</Link>
              </div>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
                  <thead>
                    <tr style={{ background: 'var(--color-bg-ivory)', borderBottom: '1px solid var(--color-border)' }}>
                      <th style={{ padding: '0.75rem 1rem' }}>Order ID</th>
                      <th style={{ padding: '0.75rem 1rem' }}>Date</th>
                      <th style={{ padding: '0.75rem 1rem' }}>Items</th>
                      <th style={{ padding: '0.75rem 1rem' }}>Total</th>
                      <th style={{ padding: '0.75rem 1rem' }}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map(o => (
                      <tr key={o.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                        <td style={{ padding: '1rem', fontWeight: 600, fontFamily: 'monospace' }}>{o.orderNumber || o.id}</td>
                        <td style={{ padding: '1rem' }}>{o.date}</td>
                        <td style={{ padding: '1rem' }}>{o.items?.length || 1} product(s)</td>
                        <td style={{ padding: '1rem', fontWeight: 700, color: 'var(--color-accent-rose)' }}>₹{o.total?.toLocaleString('en-IN')}</td>
                        <td style={{ padding: '1rem' }}>
                          <span style={{ background: '#E8F5E9', color: '#2E7D32', padding: '0.2rem 0.6rem', borderRadius: 'var(--radius-full)', fontSize: '0.75rem', fontWeight: 600 }}>
                            Confirmed (Demo)
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* 4. My Quote Requests */}
        {activeTab === 'quotes' && (
          <div style={{ background: '#FFFFFF', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-2xl)', padding: '2rem', boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', color: 'var(--color-primary-dark)', margin: 0 }}>My Quote Requests (RFQs)</h2>
                <p style={{ margin: '0.25rem 0 0', color: 'var(--color-text-muted)', fontSize: '0.88rem' }}>Commercial quotation and evaluation sample requests</p>
              </div>
              <Link to="/quotes" className="btn btn-rose btn-sm">
                <span>Open Dedicated Quotes Tracker</span>
                <ChevronRight size={14} />
              </Link>
            </div>

            {enquiries.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '3.5rem 1rem' }}>
                <FileText size={48} color="var(--color-accent-rose)" style={{ margin: '0 auto 1rem' }} />
                <h3 style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-primary-dark)' }}>No RFQs Submitted Yet</h3>
                <p style={{ color: 'var(--color-text-muted)', maxWidth: '420px', margin: '0 auto 1.5rem', fontSize: '0.88rem' }}>
                  Submit an RFQ for bespoke flavours, fragrances, or bulk production quantities.
                </p>
                <Link to="/request-quote" className="btn btn-secondary btn-sm">Submit B2B RFQ</Link>
              </div>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
                  <thead>
                    <tr style={{ background: 'var(--color-bg-ivory)', borderBottom: '1px solid var(--color-border)' }}>
                      <th style={{ padding: '0.75rem 1rem' }}>RFQ ID</th>
                      <th style={{ padding: '0.75rem 1rem' }}>Product / Category</th>
                      <th style={{ padding: '0.75rem 1rem' }}>Quantity</th>
                      <th style={{ padding: '0.75rem 1rem' }}>Date</th>
                      <th style={{ padding: '0.75rem 1rem' }}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {enquiries.map(enq => (
                      <tr key={enq.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                        <td style={{ padding: '1rem', fontWeight: 600, fontFamily: 'monospace' }}>{enq.refCode || enq.id}</td>
                        <td style={{ padding: '1rem', fontWeight: 600 }}>{enq.productName || enq.category || 'Flavour Compound'}</td>
                        <td style={{ padding: '1rem' }}>{enq.quantity} kg</td>
                        <td style={{ padding: '1rem' }}>{enq.date}</td>
                        <td style={{ padding: '1rem' }}>
                          <span style={{ background: 'var(--color-bg-pastel-pink)', color: 'var(--color-accent-rose)', padding: '0.2rem 0.6rem', borderRadius: 'var(--radius-full)', fontSize: '0.75rem', fontWeight: 600 }}>
                            Under Review
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* 5. Wishlist Tab */}
        {activeTab === 'wishlist' && (
          <div style={{ background: '#FFFFFF', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-2xl)', padding: '2rem', boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', color: 'var(--color-primary-dark)', margin: 0 }}>Saved Formulation Wishlist</h2>
                <p style={{ margin: '0.25rem 0 0', color: 'var(--color-text-muted)', fontSize: '0.88rem' }}>You have {wishlistItems.length} formulation(s) saved for future evaluation</p>
              </div>
              <Link to="/wishlist" className="btn btn-rose btn-sm">
                <span>View Full Wishlist Page</span>
                <ChevronRight size={14} />
              </Link>
            </div>

            {wishlistItems.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '3.5rem 1rem' }}>
                <Heart size={48} color="var(--color-accent-rose)" style={{ margin: '0 auto 1rem' }} />
                <h3 style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-primary-dark)' }}>Wishlist is Empty</h3>
                <p style={{ color: 'var(--color-text-muted)', maxWidth: '420px', margin: '0 auto 1.5rem', fontSize: '0.88rem' }}>
                  Explore flavours and fragrances and click the heart icon to save products for later evaluation.
                </p>
                <Link to="/products" className="btn btn-secondary btn-sm">Browse Products</Link>
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
                {wishlistItems.slice(0, 4).map(item => (
                  <div key={item.id} style={{ display: 'flex', gap: '1rem', padding: '1rem', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', background: 'var(--color-bg-ivory)' }}>
                    <img src={item.image} alt={item.name} style={{ width: '60px', height: '60px', borderRadius: 'var(--radius-md)', objectFit: 'cover' }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '0.72rem', color: 'var(--color-accent-rose)', fontWeight: 700, textTransform: 'uppercase' }}>{item.categoryName}</div>
                      <Link to={`/products/${item.slug}`} style={{ fontWeight: 600, color: 'var(--color-primary-dark)', textDecoration: 'none', fontSize: '0.9rem', display: 'block' }}>{item.name}</Link>
                      <div style={{ fontSize: '0.72rem', color: 'var(--color-text-light)', fontFamily: 'monospace' }}>SKU: {item.sku || `SKFF-${item.id.toUpperCase()}`}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* 6. Saved Addresses */}
        {activeTab === 'addresses' && (
          <div style={{ background: '#FFFFFF', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-2xl)', padding: '2.5rem', boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', color: 'var(--color-primary-dark)', margin: 0 }}>Corporate Addresses &amp; Delivery Locations</h2>
                <p style={{ margin: '0.25rem 0 0', color: 'var(--color-text-muted)', fontSize: '0.88rem' }}>Registered GST billing offices and industrial plant delivery points</p>
              </div>
              <button onClick={() => addToast('Demonstration: Address creation modal ready in production', 'info')} className="btn btn-secondary btn-sm" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                <Plus size={14} />
                <span>Add New Address</span>
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
              {addresses.map(addr => (
                <div key={addr.id} style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--radius-xl)', padding: '1.5rem', background: addr.isDefault ? '#FFF8F8' : 'var(--color-bg-ivory)', position: 'relative' }}>
                  {addr.isDefault && (
                    <span style={{ position: 'absolute', top: '12px', right: '12px', background: 'var(--color-accent-rose)', color: '#FFFFFF', fontSize: '0.7rem', padding: '0.2rem 0.5rem', borderRadius: 'var(--radius-full)', fontWeight: 700 }}>
                      DEFAULT BILLING
                    </span>
                  )}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, color: 'var(--color-primary-dark)', marginBottom: '0.5rem', fontSize: '1rem' }}>
                    <MapPin size={16} color="var(--color-accent-rose)" />
                    <span>{addr.type}</span>
                  </div>
                  <div style={{ fontWeight: 600, color: 'var(--color-text-dark)', marginBottom: '0.25rem' }}>{addr.company}</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', lineHeight: 1.5 }}>
                    <div>Attn: {addr.attention}</div>
                    <div>{addr.street}</div>
                    <div>{addr.city}, {addr.state} - {addr.postalCode}</div>
                    <div>{addr.country}</div>
                    {addr.gstin && <div style={{ marginTop: '0.35rem', fontFamily: 'monospace', fontWeight: 600, color: 'var(--color-text-dark)' }}>GSTIN: {addr.gstin}</div>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 7. Company Information */}
        {activeTab === 'company' && (
          <div style={{ background: '#FFFFFF', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-2xl)', padding: '2.5rem', maxWidth: '840px', boxShadow: 'var(--shadow-sm)' }}>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', color: 'var(--color-primary-dark)', marginBottom: '1.5rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '0.75rem' }}>
              Enterprise Company Details
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--color-text-light)', marginBottom: '0.25rem' }}>Registered Corporate Name</label>
                <div style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--color-text-dark)' }}>{user.company}</div>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--color-text-light)', marginBottom: '0.25rem' }}>Industry Classification</label>
                <div style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--color-text-dark)' }}>{user.industry || 'Bakery and Confectionery'}</div>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--color-text-light)', marginBottom: '0.25rem' }}>Commercial GSTIN</label>
                <div style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--color-text-dark)', fontFamily: 'monospace' }}>27AABCK8842F1Z9</div>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--color-text-light)', marginBottom: '0.25rem' }}>Corporate PAN</label>
                <div style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--color-text-dark)', fontFamily: 'monospace' }}>AABCK8842F</div>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--color-text-light)', marginBottom: '0.25rem' }}>Credit &amp; Commercial Terms</label>
                <div style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--color-text-dark)' }}>Net 30 Days (Pre-Approved Tier 1)</div>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--color-text-light)', marginBottom: '0.25rem' }}>SKFF Agreement Reference</label>
                <div style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--color-text-dark)', fontFamily: 'monospace' }}>SKFF-MSA-2021-094</div>
              </div>
            </div>

            <div style={{ background: 'var(--color-bg-ivory)', padding: '1.25rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)' }}>
              <div style={{ fontWeight: 700, color: 'var(--color-primary-dark)', marginBottom: '0.35rem' }}>
                Need updates to company documentation?
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', margin: 0, lineHeight: 1.5 }}>
                To modify corporate tax registrations or add new plant delivery destinations, please email your dedicated account desk at <a href="mailto:corporate@skff.in" style={{ color: 'var(--color-accent-rose)' }}>corporate@skff.in</a>.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Account;

