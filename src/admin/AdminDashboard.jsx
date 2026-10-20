import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  Layers, 
  Mail, 
  BarChart3, 
  ExternalLink, 
  ShieldAlert, 
  Sparkles, 
  ArrowLeft,
  Users,
  CheckCircle2,
  TrendingUp,
  AlertTriangle
} from 'lucide-react';
import AdminProducts from './AdminProducts';
import AdminCategories from './AdminCategories';
import AdminEnquiries from './AdminEnquiries';
import AdminReports from './AdminReports';
import { products } from '../data/products';
import { categories } from '../data/categories';
import Breadcrumb from '../components/Breadcrumb';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const flavourCount = products.filter((p) => p.division === 'Flavours').length;
  const fragranceCount = products.filter((p) => p.division === 'Fragrances').length;

  return (
    <div className="admin-page-wrapper">
      {/* Top Disclaimer Header */}
      <div style={{ background: '#FFF3E0', borderBottom: '1px solid #FFE0B2', padding: '0.6rem 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#E65100', fontSize: '0.82rem', fontWeight: 600 }}>
          <AlertTriangle size={16} />
          <span>
            <strong>Demo Admin — No Backend:</strong> This administrative interface operates completely in-browser with mock data and localStorage. No backend server or database is connected.
          </span>
        </div>
        <Link to="/" style={{ color: '#E65100', fontSize: '0.82rem', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
          <ArrowLeft size={14} /> Back to Live Public Storefront
        </Link>
      </div>

      <div className="admin-layout">
        {/* Admin Sidebar */}
        <aside className="admin-sidebar">
          <div className="admin-sidebar-brand">
            <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-accent-rose)', fontWeight: 800 }}>
              SKFF Admin Portal
            </span>
            <h2 style={{ fontSize: '1.25rem', margin: 0, fontWeight: 700, color: 'var(--color-primary-dark)' }}>
              Sensory Console
            </h2>
            <div className="admin-badge-warning" style={{ marginTop: '0.5rem' }}>
              <ShieldAlert size={14} /> Demo Mode Active
            </div>
          </div>

          <ul className="admin-sidebar-nav">
            <li>
              <button
                className={`admin-nav-btn ${activeTab === 'overview' ? 'active' : ''}`}
                onClick={() => setActiveTab('overview')}
              >
                <LayoutDashboard size={18} />
                <span>Overview</span>
              </button>
            </li>
            <li>
              <button
                className={`admin-nav-btn ${activeTab === 'products' ? 'active' : ''}`}
                onClick={() => setActiveTab('products')}
              >
                <Package size={18} />
                <span>Product Formulations</span>
              </button>
            </li>
            <li>
              <button
                className={`admin-nav-btn ${activeTab === 'categories' ? 'active' : ''}`}
                onClick={() => setActiveTab('categories')}
              >
                <Layers size={18} />
                <span>11 Categories</span>
              </button>
            </li>
            <li>
              <button
                className={`admin-nav-btn ${activeTab === 'enquiries' ? 'active' : ''}`}
                onClick={() => setActiveTab('enquiries')}
              >
                <Mail size={18} />
                <span>Sample RFQs & Enquiries</span>
              </button>
            </li>
            <li>
              <button
                className={`admin-nav-btn ${activeTab === 'reports' ? 'active' : ''}`}
                onClick={() => setActiveTab('reports')}
              >
                <BarChart3 size={18} />
                <span>Analytics & Reports</span>
              </button>
            </li>
          </ul>

          <div style={{ marginTop: 'auto', paddingTop: '1.5rem', borderTop: '1px solid var(--color-border)', fontSize: '0.78rem', color: '#777' }}>
            <div><strong>SKFF (INDIA) PVT. LTD.</strong></div>
            <div>B2B Enterprise Demonstration</div>
            <div style={{ marginTop: '0.5rem' }}>
              <Link to="/" style={{ color: 'var(--color-accent-rose)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                Open Main Website <ExternalLink size={12} />
              </Link>
            </div>
          </div>
        </aside>

        {/* Admin Main View */}
        <main className="admin-main">
          {activeTab === 'overview' && (
            <div className="admin-overview">
              <div className="admin-header-row">
                <div>
                  <h1 style={{ fontSize: '1.8rem', fontWeight: 700, margin: '0 0 0.25rem 0' }}>
                    Sensory Formulation Operations
                  </h1>
                  <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
                    Real-time demonstration metrics for SKFF corporate catalogue and business development.
                  </p>
                </div>
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  <button onClick={() => setActiveTab('products')} className="btn btn-primary btn-sm">
                    Manage Formulations
                  </button>
                  <button onClick={() => setActiveTab('enquiries')} className="btn btn-outline btn-sm">
                    Review Inquiries
                  </button>
                </div>
              </div>

              {/* Metric Stats Cards */}
              <div className="admin-stats-grid">
                <div className="admin-stat-card">
                  <div className="admin-stat-icon icon-blue">
                    <Package size={26} />
                  </div>
                  <div className="admin-stat-info">
                    <h3>{products.length}</h3>
                    <p>Total Formulations</p>
                    <span style={{ fontSize: '0.72rem', color: '#0288D1', fontWeight: 600 }}>
                      {flavourCount} Flavours &bull; {fragranceCount} Fragrances
                    </span>
                  </div>
                </div>

                <div className="admin-stat-card">
                  <div className="admin-stat-icon icon-rose">
                    <Layers size={26} />
                  </div>
                  <div className="admin-stat-info">
                    <h3>11</h3>
                    <p>Category Groups</p>
                    <span style={{ fontSize: '0.72rem', color: 'var(--color-accent-rose)', fontWeight: 600 }}>
                      7 Flavours + 4 Fragrances
                    </span>
                  </div>
                </div>

                <div className="admin-stat-card">
                  <div className="admin-stat-icon icon-amber">
                    <Mail size={26} />
                  </div>
                  <div className="admin-stat-info">
                    <h3>3+</h3>
                    <p>Active RFQ Leads</p>
                    <span style={{ fontSize: '0.72rem', color: '#FFA000', fontWeight: 600 }}>
                      100% Demo Client Inquiries
                    </span>
                  </div>
                </div>

                <div className="admin-stat-card">
                  <div className="admin-stat-icon icon-green">
                    <Users size={26} />
                  </div>
                  <div className="admin-stat-info">
                    <h3>10</h3>
                    <p>B2B Industries Served</p>
                    <span style={{ fontSize: '0.72rem', color: '#2E7D32', fontWeight: 600 }}>
                      Food, Pharma, Cosmetics
                    </span>
                  </div>
                </div>
              </div>

              {/* Summary Sections */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem' }}>
                <div className="admin-card">
                  <div className="admin-card-header">
                    <h3>Quick Formulation Access (Sample Portfolio)</h3>
                    <button onClick={() => setActiveTab('products')} className="btn btn-outline btn-xs">
                      View All {products.length} &rarr;
                    </button>
                  </div>
                  <div className="admin-table-wrapper">
                    <table className="admin-table">
                      <thead>
                        <tr>
                          <th>Code</th>
                          <th>Formulation</th>
                          <th>Category</th>
                          <th>Division</th>
                          <th>Demo Price</th>
                          <th>Pack Size</th>
                        </tr>
                      </thead>
                      <tbody>
                        {products.slice(0, 6).map((p) => (
                          <tr key={p.id}>
                            <td><strong>{p.id}</strong></td>
                            <td style={{ fontWeight: 600 }}>{p.name}</td>
                            <td>{p.category}</td>
                            <td>
                              <span style={{
                                fontSize: '0.72rem',
                                padding: '0.15rem 0.45rem',
                                borderRadius: '4px',
                                background: p.division === 'Fragrances' ? '#FCE4EC' : '#FFF3E0',
                                color: p.division === 'Fragrances' ? '#C2185B' : '#E65100',
                                fontWeight: 600
                              }}>
                                {p.division}
                              </span>
                            </td>
                            <td>₹{p.price?.toLocaleString('en-IN')}</td>
                            <td>{p.packSize}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'products' && <AdminProducts />}
          {activeTab === 'categories' && <AdminCategories />}
          {activeTab === 'enquiries' && <AdminEnquiries />}
          {activeTab === 'reports' && <AdminReports />}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
