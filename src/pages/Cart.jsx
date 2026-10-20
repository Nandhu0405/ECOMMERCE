import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { Trash2, ShoppingBag, ArrowRight, AlertCircle, ArrowLeft, Tag } from 'lucide-react';

const Cart = () => {
  const navigate = useNavigate();
  const { 
    cartItems, 
    removeFromCart, 
    updateQuantity, 
    clearCart, 
    subtotal, 
    shipping, 
    tax, 
    total 
  } = useCart();
  const { addToast } = useToast();

  const [couponCode, setCouponCode] = useState('');
  const [couponDiscount, setCouponDiscount] = useState(0);

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (couponCode.trim().toUpperCase() === 'SKFFDEMO') {
      const discountVal = Math.round(subtotal * 0.1);
      setCouponDiscount(discountVal);
      addToast('Demo Coupon SKFFDEMO applied! (10% discount deducted)', 'success');
    } else {
      addToast('Invalid coupon code. Try "SKFFDEMO"', 'error');
    }
  };

  const finalTotal = Math.max(0, total - couponDiscount);

  if (cartItems.length === 0) {
    return (
      <div className="cart-page" style={{ paddingBottom: '6rem' }}>
        <div className="container">
          <Breadcrumb items={[{ label: 'Sample & Order Cart' }]} />
          <div style={{ textAlign: 'center', padding: '5rem 1rem', background: '#FFFFFF', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-xl)', maxWidth: '640px', margin: '3rem auto' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'var(--color-bg-ivory)', color: 'var(--color-text-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
              <ShoppingBag size={30} />
            </div>
            <h2 style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-primary-dark)', marginBottom: '0.75rem' }}>
              Your Sample Cart is Empty
            </h2>
            <p style={{ color: 'var(--color-text-muted)', marginBottom: '2rem', lineHeight: 1.6 }}>
              You have not added any flavour or fragrance samples to your cart. Explore our 11 product category groups to begin.
            </p>
            <Link to="/catalogue" className="btn btn-primary btn-lg">
              Explore 112 Formulations
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page" style={{ paddingBottom: '6rem' }}>
      <div className="container">
        <Breadcrumb items={[{ label: 'Sample & Order Cart' }]} />

        <div style={{ padding: '2rem 0 2.5rem' }}>
          <span className="eyebrow">DEMONSTRATION CART</span>
          <h1 style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)', color: 'var(--color-primary-dark)', marginBottom: '0.5rem' }}>
            Shopping &amp; Sample Cart ({cartItems.length} Items)
          </h1>
        </div>

        {/* Mandatory Demo Banner */}
        <div className="demo-disclaimer-banner" style={{ marginBottom: '2rem' }}>
          <AlertCircle size={20} />
          <span>
            <strong>B2B Demonstration Cart:</strong> This is a frontend demonstration cart. SKFF orders are processed through signed proforma invoices. No actual payment will be collected.
          </span>
        </div>

        <div className="cart-page-grid">
          {/* Items Table */}
          <div>
            <table className="cart-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Pack Size</th>
                  <th>Rate</th>
                  <th>Quantity</th>
                  <th>Subtotal</th>
                  <th>Remove</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={`${item.id}-${item.selectedPackSize}`}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          style={{ width: '56px', height: '56px', borderRadius: 'var(--radius-sm)', objectFit: 'cover' }} 
                        />
                        <div>
                          <Link to={`/product/${item.slug}`} style={{ fontWeight: 600, color: 'var(--color-primary-dark)', fontSize: '0.95rem' }}>
                            {item.name}
                          </Link>
                          <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--color-accent-rose)' }}>
                            {item.categoryName}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td style={{ fontSize: '0.85rem' }}>{item.selectedPackSize}</td>
                    <td style={{ fontSize: '0.9rem', fontWeight: 600 }}>₹{item.demoPrice?.toLocaleString('en-IN')}</td>
                    <td>
                      <div className="quantity-stepper" style={{ transform: 'scale(0.9)', transformOrigin: 'left center' }}>
                        <button type="button" onClick={() => updateQuantity(item.id, item.selectedPackSize, item.quantity - 1)}>-</button>
                        <input 
                          type="number" 
                          min="1" 
                          value={item.quantity} 
                          onChange={(e) => updateQuantity(item.id, item.selectedPackSize, e.target.value)} 
                        />
                        <button type="button" onClick={() => updateQuantity(item.id, item.selectedPackSize, item.quantity + 1)}>+</button>
                      </div>
                    </td>
                    <td style={{ fontWeight: 700, color: 'var(--color-primary-dark)' }}>
                      ₹{((item.demoPrice || 0) * item.quantity).toLocaleString('en-IN')}
                    </td>
                    <td>
                      <button 
                        onClick={() => removeFromCart(item.id, item.selectedPackSize)}
                        style={{ color: '#D32F2F', padding: '4px' }}
                        title="Remove item"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
              <Link to="/catalogue" className="btn btn-secondary btn-sm">
                <ArrowLeft size={14} />
                <span>Continue Browsing</span>
              </Link>

              <button className="btn btn-secondary btn-sm" onClick={clearCart} style={{ color: '#D32F2F' }}>
                Clear Entire Cart
              </button>
            </div>
          </div>

          {/* Order Summary Box */}
          <div className="order-summary-card">
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.35rem', color: 'var(--color-primary-dark)', marginBottom: '1.25rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '0.75rem' }}>
              Order Estimate (Demo)
            </h3>

            <div className="summary-row">
              <span>Items Subtotal:</span>
              <span>₹{subtotal.toLocaleString('en-IN')}</span>
            </div>

            <div className="summary-row">
              <span>Estimated Logistics / Freight:</span>
              <span>{shipping === 0 ? <strong style={{ color: '#2E7D32' }}>FREE (Demo)</strong> : `₹${shipping}`}</span>
            </div>

            <div className="summary-row">
              <span>Estimated GST (18%):</span>
              <span>₹{tax.toLocaleString('en-IN')}</span>
            </div>

            {couponDiscount > 0 && (
              <div className="summary-row" style={{ color: '#2E7D32', fontWeight: 600 }}>
                <span>Coupon Discount (10%):</span>
                <span>-₹{couponDiscount.toLocaleString('en-IN')}</span>
              </div>
            )}

            <div className="summary-row total">
              <span>Estimated Total:</span>
              <span>₹{finalTotal.toLocaleString('en-IN')}</span>
            </div>

            {/* Coupon Code Input */}
            <form onSubmit={handleApplyCoupon} style={{ margin: '1.5rem 0', display: 'flex', gap: '0.5rem' }}>
              <div style={{ flex: 1, position: 'relative' }}>
                <input
                  type="text"
                  placeholder="Coupon code (Try SKFFDEMO)"
                  className="form-input"
                  style={{ padding: '0.55rem 0.75rem', fontSize: '0.85rem' }}
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                />
              </div>
              <button type="submit" className="btn btn-secondary btn-sm">
                Apply
              </button>
            </form>

            <button 
              className="btn btn-rose btn-block btn-lg"
              onClick={() => navigate('/checkout')}
            >
              <span>Proceed to Demo Checkout</span>
              <ArrowRight size={16} />
            </button>

            <div style={{ marginTop: '1.25rem', textAlign: 'center', fontSize: '0.78rem', color: 'var(--color-text-light)' }}>
              🔒 Safe &amp; Secure Frontend Simulation
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
