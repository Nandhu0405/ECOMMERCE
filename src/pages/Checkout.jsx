import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { AlertCircle, ShieldCheck, CheckCircle2, Lock, ArrowLeft, Loader2 } from 'lucide-react';

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, subtotal, shipping, tax, total, clearCart } = useCart();
  const { addToast } = useToast();

  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    gstin: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: 'Maharashtra',
    pincode: '',
    paymentMethod: 'invoice',
    orderNotes: ''
  });

  const [errors, setErrors] = useState({});
  const [isPlacing, setIsPlacing] = useState(false);

  const validate = () => {
    const errs = {};
    if (!formData.fullName.trim()) errs.fullName = 'Full Name is required';
    if (!formData.companyName.trim()) errs.companyName = 'Company name is required';
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = 'Valid corporate email is required';
    }
    if (!formData.phone.trim() || !/^\+?[\d\s-]{7,18}$/.test(formData.phone.trim())) {
      errs.phone = 'Valid contact phone number is required';
    }
    if (!formData.address.trim()) errs.address = 'Delivery / Factory address is required';
    if (!formData.city.trim()) errs.city = 'City is required';
    if (!formData.pincode.trim()) errs.pincode = 'PIN Code is required';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (!validate()) {
      addToast('Please fill all required shipping & contact fields.', 'error');
      return;
    }

    if (cartItems.length === 0) {
      addToast('Your cart is empty.', 'error');
      return;
    }

    setIsPlacing(true);

    setTimeout(() => {
      const orderId = 'SKFF-ORD-' + Math.floor(100000 + Math.random() * 900000);
      const orderRecord = {
        id: orderId,
        date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
        customer: formData,
        items: cartItems,
        subtotal,
        shipping,
        tax,
        total,
        status: 'Confirmed (Demo)'
      };

      try {
        const storedOrders = JSON.parse(localStorage.getItem('skff_demo_orders') || '[]');
        localStorage.setItem('skff_demo_orders', JSON.stringify([orderRecord, ...storedOrders]));
      } catch (err) {
        console.warn('Failed to persist demo order', err);
      }

      clearCart();
      setIsPlacing(false);
      navigate(`/order-confirmation?orderId=${orderId}`);
    }, 1500);
  };

  if (cartItems.length === 0) {
    return (
      <div className="container" style={{ padding: '6rem 0', textAlign: 'center' }}>
        <h2 style={{ fontFamily: 'var(--font-heading)' }}>No Items in Cart for Checkout</h2>
        <p style={{ margin: '1rem 0 2rem', color: 'var(--color-text-muted)' }}>
          Please add flavour or fragrance samples before proceeding to demo checkout.
        </p>
        <Link to="/catalogue" className="btn btn-primary">
          Return to Catalogue
        </Link>
      </div>
    );
  }

  return (
    <div className="checkout-page" style={{ paddingBottom: '6rem' }}>
      <div className="container">
        <Breadcrumb items={[{ label: 'Sample Cart', url: '/cart' }, { label: 'Demo Checkout' }]} />

        <div style={{ padding: '2rem 0 2.5rem' }}>
          <span className="eyebrow">COMMERCIAL DISPATCH DEMO</span>
          <h1 style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)', color: 'var(--color-primary-dark)', marginBottom: '0.5rem' }}>
            B2B Sample Order Checkout
          </h1>
        </div>

        {/* Mandatory Demo Banner */}
        <div className="demo-disclaimer-banner" style={{ marginBottom: '2.5rem' }}>
          <AlertCircle size={22} />
          <span>
            <strong>Frontend Simulation Notice:</strong> This checkout is for demonstration purposes only. It will generate a simulated order number and confirmation. No real financial transaction will occur and no real order is sent to SKFF.
          </span>
        </div>

        <form onSubmit={handlePlaceOrder}>
          <div className="cart-page-grid">
            {/* Left Column: Form Details */}
            <div style={{ background: '#FFFFFF', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-xl)', padding: '2.5rem', boxShadow: 'var(--shadow-sm)' }}>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', color: 'var(--color-primary-dark)', marginBottom: '1.5rem', borderBottom: '1px solid var(--color-border-subtle)', paddingBottom: '0.75rem' }}>
                1. Commercial Contact &amp; Entity
              </h3>

              <div className="form-grid-2">
                <div className="form-group">
                  <label className="form-label" htmlFor="fullName">Full Name <span className="req">*</span></label>
                  <input
                    id="fullName"
                    type="text"
                    name="fullName"
                    className="form-input"
                    placeholder="e.g. Vikram Mehra"
                    value={formData.fullName}
                    onChange={handleChange}
                  />
                  {errors.fullName && <span className="form-error-msg">{errors.fullName}</span>}
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="companyName">Company / Enterprise Name <span className="req">*</span></label>
                  <input
                    id="companyName"
                    type="text"
                    name="companyName"
                    className="form-input"
                    placeholder="e.g. Royal Confectionery Works"
                    value={formData.companyName}
                    onChange={handleChange}
                  />
                  {errors.companyName && <span className="form-error-msg">{errors.companyName}</span>}
                </div>
              </div>

              <div className="form-grid-2">
                <div className="form-group">
                  <label className="form-label" htmlFor="email">Business Email <span className="req">*</span></label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    className="form-input"
                    placeholder="vikram@royalconfectionery.com"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  {errors.email && <span className="form-error-msg">{errors.email}</span>}
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="phone">Phone / WhatsApp Number <span className="req">*</span></label>
                  <input
                    id="phone"
                    type="tel"
                    name="phone"
                    className="form-input"
                    placeholder="+91-9820012345"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                  {errors.phone && <span className="form-error-msg">{errors.phone}</span>}
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="gstin">GSTIN / Tax ID (Optional)</label>
                <input
                  id="gstin"
                  type="text"
                  name="gstin"
                  className="form-input"
                  placeholder="27AAAAA0000A1Z5 (Demo)"
                  value={formData.gstin}
                  onChange={handleChange}
                />
              </div>

              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', color: 'var(--color-primary-dark)', margin: '2rem 0 1.25rem', borderBottom: '1px solid var(--color-border-subtle)', paddingBottom: '0.75rem' }}>
                2. Shipping &amp; Factory Delivery Address
              </h3>

              <div className="form-group">
                <label className="form-label" htmlFor="address">Factory / Laboratory Address <span className="req">*</span></label>
                <input
                  id="address"
                  type="text"
                  name="address"
                  className="form-input"
                  placeholder="Plot No., Industrial Area, Street..."
                  value={formData.address}
                  onChange={handleChange}
                />
                {errors.address && <span className="form-error-msg">{errors.address}</span>}
              </div>

              <div className="form-grid-2">
                <div className="form-group">
                  <label className="form-label" htmlFor="city">City <span className="req">*</span></label>
                  <input
                    id="city"
                    type="text"
                    name="city"
                    className="form-input"
                    placeholder="e.g. Pune"
                    value={formData.city}
                    onChange={handleChange}
                  />
                  {errors.city && <span className="form-error-msg">{errors.city}</span>}
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="pincode">PIN Code <span className="req">*</span></label>
                  <input
                    id="pincode"
                    type="text"
                    name="pincode"
                    className="form-input"
                    placeholder="e.g. 411001"
                    value={formData.pincode}
                    onChange={handleChange}
                  />
                  {errors.pincode && <span className="form-error-msg">{errors.pincode}</span>}
                </div>
              </div>

              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', color: 'var(--color-primary-dark)', margin: '2rem 0 1.25rem', borderBottom: '1px solid var(--color-border-subtle)', paddingBottom: '0.75rem' }}>
                3. Demonstration Payment Mode
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <label className="filter-checkbox-label" style={{ padding: '0.85rem', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)' }}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="invoice"
                    checked={formData.paymentMethod === 'invoice'}
                    onChange={handleChange}
                  />
                  <div>
                    <strong style={{ color: 'var(--color-text-main)' }}>Proforma Invoice on Delivery (Commercial Terms)</strong>
                    <p style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>
                      Payment processed via bank NEFT/RTGS after formal invoice verification. (Demo)
                    </p>
                  </div>
                </label>

                <label className="filter-checkbox-label" style={{ padding: '0.85rem', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)' }}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="neft"
                    checked={formData.paymentMethod === 'neft'}
                    onChange={handleChange}
                  />
                  <div>
                    <strong style={{ color: 'var(--color-text-main)' }}>Direct NEFT / RTGS Bank Transfer</strong>
                    <p style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>
                      Simulated direct bank transfer simulation. No payment details required.
                    </p>
                  </div>
                </label>
              </div>
            </div>

            {/* Right Column: Order Review */}
            <div className="order-summary-card">
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.35rem', color: 'var(--color-primary-dark)', marginBottom: '1.25rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '0.75rem' }}>
                Order Items ({cartItems.length})
              </h3>

              <div style={{ maxHeight: '280px', overflowY: 'auto', marginBottom: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                {cartItems.map(item => (
                  <div key={`${item.id}-${item.selectedPackSize}`} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                    <div>
                      <strong style={{ color: 'var(--color-text-main)' }}>{item.name}</strong>
                      <div style={{ fontSize: '0.75rem', color: 'var(--color-text-light)' }}>
                        {item.quantity} × {item.selectedPackSize}
                      </div>
                    </div>
                    <span style={{ fontWeight: 600 }}>
                      ₹{((item.demoPrice || 0) * item.quantity).toLocaleString('en-IN')}
                    </span>
                  </div>
                ))}
              </div>

              <div className="summary-row">
                <span>Subtotal:</span>
                <span>₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="summary-row">
                <span>Freight:</span>
                <span>{shipping === 0 ? 'FREE (Demo)' : `₹${shipping}`}</span>
              </div>
              <div className="summary-row">
                <span>Estimated GST (18%):</span>
                <span>₹{tax.toLocaleString('en-IN')}</span>
              </div>

              <div className="summary-row total">
                <span>Total Amount:</span>
                <span>₹{total.toLocaleString('en-IN')}</span>
              </div>

              <button 
                type="submit" 
                className="btn btn-rose btn-block btn-lg"
                disabled={isPlacing}
                style={{ marginTop: '1.5rem' }}
              >
                {isPlacing ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    <span>Processing Demo Order...</span>
                  </>
                ) : (
                  <>
                    <Lock size={16} />
                    <span>Place Demo Order</span>
                  </>
                )}
              </button>

              <div style={{ marginTop: '1.25rem', textAlign: 'center' }}>
                <Link to="/cart" style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                  <ArrowLeft size={13} /> Return to Cart
                </Link>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
