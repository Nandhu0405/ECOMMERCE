import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb';
import { Package, Calendar, ArrowRight, Eye, AlertCircle, ShoppingBag, X } from 'lucide-react';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('skff_demo_orders') || '[]');
      if (stored.length > 0) {
        setOrders(stored);
      } else {
        // Initial sample demonstration order
        const demoSampleOrder = [
          {
            id: 'SKFF-ORD-549210',
            date: '18 Oct 2026',
            status: 'Confirmed (Demo)',
            customer: {
              fullName: 'Vikram Malhotra',
              companyName: 'Cadbury Kraft Confectionery Division',
              email: 'v.malhotra@cadbury-kraft.demo',
              city: 'Mumbai',
              state: 'Maharashtra'
            },
            items: [
              {
                id: 'conf-1',
                name: 'Chocolate Flavour',
                categoryName: 'Confectionery',
                selectedPackSize: '25 kg Drum',
                quantity: 2,
                demoPrice: 1850,
                price: 1850
              },
              {
                id: 'dairy-2',
                name: 'Condensed Milk Flavour',
                categoryName: 'Dairy',
                selectedPackSize: '5 kg Can',
                quantity: 1,
                demoPrice: 1400,
                price: 1400
              }
            ],
            subtotal: 5100,
            shipping: 0,
            tax: 918,
            total: 6018
          }
        ];
        setOrders(demoSampleOrder);
        localStorage.setItem('skff_demo_orders', JSON.stringify(demoSampleOrder));
      }
    } catch (e) {
      console.warn('Failed to load orders', e);
    }
  }, []);

  return (
    <div className="orders-page" style={{ paddingBottom: '6rem' }}>
      <div className="container">
        <Breadcrumb items={[{ label: 'Home', url: '/' }, { label: 'Account', url: '/account' }, { label: 'My Orders' }]} />

        {/* Header */}
        <div style={{ padding: '2.5rem 0 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <span className="eyebrow">ORDER REPOSITORY</span>
            <h1 style={{ fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', color: 'var(--color-primary-dark)', marginBottom: '0.5rem' }}>
              My Orders &amp; Dispatches
            </h1>
            <p style={{ color: 'var(--color-text-muted)' }}>
              Track your commercial proforma orders, sample dispatches, and processing stages.
            </p>
          </div>
          <Link to="/products" className="btn btn-primary btn-sm">
            + New Order / Sample
          </Link>
        </div>

        {/* Demo Notice */}
        <div style={{ background: 'var(--color-bg-ivory)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', padding: '0.85rem 1.25rem', marginBottom: '2rem', fontSize: '0.82rem', color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <AlertCircle size={16} color="var(--color-accent-rose)" />
          <span>
            <strong>B2B Demonstration Orders:</strong> The order histories listed here are demonstration records maintained in your local browser session.
          </span>
        </div>

        {/* Orders Table or Empty State */}
        {orders.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '5rem 1rem', background: '#FFFFFF', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-xl)', maxWidth: '600px', margin: '2rem auto' }}>
            <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'var(--color-bg-ivory)', color: 'var(--color-text-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem' }}>
              <Package size={28} />
            </div>
            <h2 style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-primary-dark)', marginBottom: '0.5rem' }}>
              No Orders Found
            </h2>
            <p style={{ color: 'var(--color-text-muted)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
              You have not placed any commercial demonstration orders or sample requests yet.
            </p>
            <Link to="/products" className="btn btn-primary">
              Explore Product Catalogue
            </Link>
          </div>
        ) : (
          <div style={{ background: '#FFFFFF', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-xl)', overflow: 'hidden', boxShadow: 'var(--shadow-sm)' }}>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Order Reference</th>
                  <th>Order Date</th>
                  <th>Formulations &amp; Quantities</th>
                  <th>Status</th>
                  <th>Order Total</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td>
                      <strong style={{ color: 'var(--color-primary-dark)' }}>{order.id}</strong>
                      <span style={{ display: 'block', fontSize: '0.72rem', color: 'var(--color-text-light)' }}>
                        {order.customer?.companyName || 'Enterprise Account'}
                      </span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>
                        <Calendar size={13} />
                        <span>{order.date}</span>
                      </div>
                    </td>
                    <td>
                      <div style={{ fontSize: '0.85rem' }}>
                        {order.items?.map((item, idx) => (
                          <div key={idx} style={{ marginBottom: '0.2rem' }}>
                            • <strong>{item.name}</strong> ({item.selectedPackSize || item.packSize}) × {item.quantity}
                          </div>
                        ))}
                      </div>
                    </td>
                    <td>
                      <span className="badge badge-rose" style={{ fontSize: '0.75rem' }}>
                        {order.status || 'Processing'}
                      </span>
                    </td>
                    <td>
                      <strong style={{ color: 'var(--color-primary-dark)', fontSize: '0.95rem' }}>
                        {order.total ? `₹${order.total.toLocaleString('en-IN')}` : 'Quotation Pending'}
                      </strong>
                    </td>
                    <td>
                      <button 
                        className="btn btn-secondary btn-xs"
                        onClick={() => setSelectedOrder(order)}
                        style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}
                      >
                        <Eye size={13} />
                        <span>View Details</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Order Details Modal */}
        {selectedOrder && (
          <div 
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0,0,0,0.5)',
              backdropFilter: 'blur(4px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1000,
              padding: '1.5rem'
            }}
            onClick={() => setSelectedOrder(null)}
          >
            <div 
              style={{
                background: '#FFFFFF',
                borderRadius: 'var(--radius-xl)',
                maxWidth: '620px',
                width: '100%',
                maxHeight: '90vh',
                overflowY: 'auto',
                padding: '2.5rem',
                boxShadow: 'var(--shadow-luxury)',
                position: 'relative'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setSelectedOrder(null)}
                style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', color: 'var(--color-text-light)' }}
              >
                <X size={20} />
              </button>

              <span className="eyebrow">ORDER DETAILS</span>
              <h2 style={{ fontSize: '1.6rem', color: 'var(--color-primary-dark)', marginBottom: '0.5rem' }}>
                {selectedOrder.id}
              </h2>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginBottom: '1.5rem' }}>
                Placed on {selectedOrder.date} &bull; Status: <span style={{ color: 'var(--color-accent-rose)', fontWeight: 600 }}>{selectedOrder.status}</span>
              </p>

              <div style={{ borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)', padding: '1rem 0', marginBottom: '1.5rem' }}>
                <h4 style={{ fontSize: '0.9rem', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Items in this Order:
                </h4>
                {selectedOrder.items?.map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.4rem 0', fontSize: '0.88rem' }}>
                    <span>{item.name} ({item.selectedPackSize}) × {item.quantity}</span>
                    <strong>{item.demoPrice ? `₹${(item.demoPrice * item.quantity).toLocaleString('en-IN')}` : 'Quote Required'}</strong>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.1rem', fontWeight: 700, marginBottom: '2rem' }}>
                <span>Order Total:</span>
                <span style={{ color: 'var(--color-accent-rose)' }}>
                  {selectedOrder.total ? `₹${selectedOrder.total.toLocaleString('en-IN')}` : 'Quotation Pending'}
                </span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                <button className="btn btn-secondary" onClick={() => setSelectedOrder(null)}>
                  Close
                </button>
                <Link to="/contact" className="btn btn-primary" onClick={() => setSelectedOrder(null)}>
                  Contact Sales Desk
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
