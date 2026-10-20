import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb';
import { CheckCircle2, AlertCircle, ShoppingBag, ArrowRight, Printer, FileText } from 'lucide-react';

const OrderConfirmation = () => {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('orderId') || 'SKFF-ORD-DEMO';
  const [orderData, setOrderData] = useState(null);

  useEffect(() => {
    try {
      const storedOrders = JSON.parse(localStorage.getItem('skff_demo_orders') || '[]');
      const found = storedOrders.find(o => o.id === orderId);
      if (found) setOrderData(found);
    } catch (e) {
      console.warn(e);
    }
  }, [orderId]);

  return (
    <div className="order-confirmation-page" style={{ paddingBottom: '6rem' }}>
      <div className="container">
        <Breadcrumb items={[{ label: 'Order Confirmation' }]} />

        <div style={{ maxWidth: '780px', margin: '2rem auto 0', textAlign: 'center' }}>
          <div style={{ width: '70px', height: '70px', borderRadius: '50%', background: '#E8F5E9', color: '#2E7D32', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
            <CheckCircle2 size={40} />
          </div>

          <span className="badge badge-success" style={{ marginBottom: '0.5rem' }}>
            Order Generated (Demonstration)
          </span>

          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.4rem', color: 'var(--color-primary-dark)', marginBottom: '0.75rem' }}>
            Thank You for Your Sample Order!
          </h1>

          <p style={{ fontSize: '1.05rem', color: 'var(--color-text-muted)', marginBottom: '2rem', lineHeight: 1.6 }}>
            Your simulated B2B order reference is <strong style={{ color: 'var(--color-accent-rose)' }}>#{orderId}</strong>.
          </p>

          {/* Mandatory Demo Notice */}
          <div className="demo-disclaimer-banner" style={{ textAlign: 'left', marginBottom: '2.5rem' }}>
            <AlertCircle size={22} />
            <span>
              <strong>Demonstration Notice:</strong> This is a frontend demonstration order. No payment has been captured, and your order has not been transmitted to SKFF (INDIA) PVT. LTD. For real industrial orders, contact <a href="mailto:info@skff.co.in" style={{ textDecoration: 'underline', fontWeight: 600 }}>info@skff.co.in</a>.
            </span>
          </div>

          {/* Order Details Card */}
          <div style={{ background: '#FFFFFF', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-xl)', padding: '2.5rem', textAlign: 'left', boxShadow: 'var(--shadow-sm)', marginBottom: '2.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--color-border)', paddingBottom: '1rem', marginBottom: '1.5rem' }}>
              <div>
                <h3 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-heading)', color: 'var(--color-primary-dark)' }}>
                  Order Summary
                </h3>
                <span style={{ fontSize: '0.8rem', color: 'var(--color-text-light)' }}>
                  Date: {orderData ? orderData.date : new Date().toLocaleDateString('en-IN')}
                </span>
              </div>
              <span className="badge badge-primary">Standard Express Courier (Demo)</span>
            </div>

            {orderData && (
              <>
                <div style={{ marginBottom: '1.5rem' }}>
                  <strong style={{ fontSize: '0.85rem', color: 'var(--color-text-main)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Delivery Destination:
                  </strong>
                  <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', marginTop: '0.25rem' }}>
                    {orderData.customer.fullName} ({orderData.customer.companyName})<br />
                    {orderData.customer.address}, {orderData.customer.city} – {orderData.customer.pincode}<br />
                    Phone: {orderData.customer.phone} • Email: {orderData.customer.email}
                  </p>
                </div>

                <div style={{ borderTop: '1px solid var(--color-border-subtle)', paddingTop: '1.25rem', marginBottom: '1.5rem' }}>
                  <strong style={{ fontSize: '0.85rem', color: 'var(--color-text-main)', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '0.75rem' }}>
                    Ordered Items:
                  </strong>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                    {orderData.items.map(item => (
                      <div key={`${item.id}-${item.selectedPackSize}`} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem' }}>
                        <span>
                          <strong>{item.name}</strong> ({item.selectedPackSize}) × {item.quantity}
                        </span>
                        <span>₹{((item.demoPrice || 0) * item.quantity).toLocaleString('en-IN')}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '1rem', display: 'flex', justifyContent: 'space-between', fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-primary-dark)' }}>
                  <span>Total Simulated Amount:</span>
                  <span>₹{orderData.total.toLocaleString('en-IN')}</span>
                </div>
              </>
            )}
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <Link to="/" className="btn btn-primary">
              Return to Homepage
            </Link>
            <Link to="/catalogue" className="btn btn-secondary">
              Browse More Formulations
            </Link>
            <button className="btn btn-secondary" onClick={() => window.print()}>
              <Printer size={15} />
              <span>Print Receipt</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
