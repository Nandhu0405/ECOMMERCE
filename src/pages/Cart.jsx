import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useToast } from '../context/ToastContext';
import { Trash2, ShoppingBag, ArrowRight, AlertCircle, ArrowLeft, Heart, FileText } from 'lucide-react';

const Cart = () => {
  const navigate = useNavigate();
  const { 
    cartItems, 
    pricedItems,
    quoteItems,
    hasPricedItems,
    hasQuoteItems,
    removeFromCart, 
    updateQuantity, 
    clearCart, 
    subtotal, 
    shipping, 
    tax, 
    total 
  } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { addToast } = useToast();

  const [couponCode, setCouponCode] = useState('');
  const [couponDiscount, setCouponDiscount] = useState(0);

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (!hasPricedItems) {
      addToast('Coupons apply only to catalog priced products.', 'info');
      return;
    }
    if (couponCode.trim().toUpperCase() === 'SKFFDEMO') {
      const discountVal = Math.round(subtotal * 0.1);
      setCouponDiscount(discountVal);
      addToast('Demo Coupon SKFFDEMO applied! (10% discount deducted)', 'success');
    } else {
      addToast('Invalid coupon code. Try "SKFFDEMO"', 'error');
    }
  };

  const handleMoveToWishlist = (item) => {
    if (!isInWishlist(item.id)) {
      toggleWishlist(item);
    }
    removeFromCart(item.id, item.selectedPackSize);
    addToast(`Moved "${item.name}" to your saved wishlist!`, 'success');
  };

  const finalTotal = Math.max(0, total - couponDiscount);

  if (cartItems.length === 0) {
    return (
      <div className="cart-page" style={{ paddingBottom: '6rem' }}>
        <div className="container">
          <Breadcrumb items={[{ label: 'Sample & Order Cart' }]} />
          <div style={{ textAlign: 'center', padding: '5rem 1.5rem', background: '#FFFFFF', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-2xl)', maxWidth: '640px', margin: '3rem auto', boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ width: '72px', height: '72px', borderRadius: '50%', background: 'var(--color-bg-pastel-pink)', color: 'var(--color-accent-rose)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
              <ShoppingBag size={34} />
            </div>
            <h2 style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-primary-dark)', marginBottom: '0.75rem', fontSize: '1.75rem' }}>
              Your Sample &amp; Order Cart is Empty
            </h2>
            <p style={{ color: 'var(--color-text-muted)', marginBottom: '2rem', lineHeight: 1.6, maxWidth: '480px', margin: '0 auto 2rem' }}>
              You have not added any flavour or fragrance samples to your cart. Explore our catalog of 112 commercial formulations to begin.
            </p>
            <Link to="/products" className="btn btn-rose btn-lg" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
              <span>Explore All Products</span>
              <ArrowRight size={18} />
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

        <div style={{ padding: '2rem 0 2rem' }}>
          <span className="eyebrow" style={{ color: 'var(--color-accent-rose)' }}>B2B SAMPLE &amp; ORDER CART</span>
          <h1 style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)', color: 'var(--color-primary-dark)', marginBottom: '0.5rem', fontFamily: 'var(--font-heading)' }}>
            Shopping &amp; Sample Cart ({cartItems.length} {cartItems.length === 1 ? 'Item' : 'Items'})
          </h1>
          <p style={{ color: 'var(--color-text-muted)', margin: 0 }}>
            Manage product evaluation canisters, bulk packs, and quote requests before final submission.
          </p>
        </div>

        {/* Informative B2B Demonstration Banner */}
        <div className="demo-disclaimer-banner" style={{ marginBottom: '2rem', borderRadius: 'var(--radius-lg)' }}>
          <AlertCircle size={20} />
          <span>
            <strong>B2B Evaluation Cart:</strong> For priced evaluation packs, demo checkout provides sample invoices. Products requiring custom synthesis or bespoke bulk pricing are routed to SKFF commercial quotation.
          </span>
        </div>

        <div className="cart-page-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 380px', gap: '2rem', alignItems: 'start' }}>
          {/* Items Table */}
          <div>
            <div style={{ background: '#FFFFFF', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-2xl)', overflow: 'hidden', boxShadow: 'var(--shadow-sm)' }}>
              <table className="cart-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: 'var(--color-bg-ivory)', borderBottom: '1px solid var(--color-border)' }}>
                    <th style={{ padding: '1rem', textAlign: 'left' }}>Product &amp; SKU</th>
                    <th style={{ padding: '1rem', textAlign: 'left' }}>Pack Size</th>
                    <th style={{ padding: '1rem', textAlign: 'left' }}>Rate</th>
                    <th style={{ padding: '1rem', textAlign: 'center' }}>Quantity</th>
                    <th style={{ padding: '1rem', textAlign: 'right' }}>Subtotal</th>
                    <th style={{ padding: '1rem', textAlign: 'center' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item) => {
                    const isItemQuoteReq = item.quoteRequired || (!item.price && !item.demoPrice);
                    const itemRate = item.price || item.demoPrice;
                    const sku = item.sku || `SKFF-${item.id.toUpperCase()}`;

                    return (
                      <tr key={`${item.id}-${item.selectedPackSize}`} style={{ borderBottom: '1px solid var(--color-border)' }}>
                        <td style={{ padding: '1.25rem 1rem' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <img 
                              src={item.image} 
                              alt={item.name} 
                              style={{ width: '64px', height: '64px', borderRadius: 'var(--radius-md)', objectFit: 'cover', border: '1px solid var(--color-border)' }} 
                            />
                            <div>
                              <Link to={`/products/${item.slug}`} style={{ fontWeight: 700, color: 'var(--color-primary-dark)', fontSize: '0.95rem', textDecoration: 'none' }}>
                                {item.name}
                              </Link>
                              <div style={{ fontSize: '0.72rem', color: 'var(--color-accent-rose)', fontWeight: 600, marginTop: '2px' }}>
                                {item.categoryName}
                              </div>
                              <div style={{ fontSize: '0.72rem', color: 'var(--color-text-light)', fontFamily: 'monospace', letterSpacing: '0.04em', marginTop: '2px' }}>
                                SKU: {sku}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td style={{ padding: '1.25rem 1rem', fontSize: '0.88rem', fontWeight: 500, color: 'var(--color-text-dark)' }}>
                          {item.selectedPackSize}
                        </td>
                        <td style={{ padding: '1.25rem 1rem', fontSize: '0.9rem' }}>
                          {isItemQuoteReq ? (
                            <span className="badge badge-soft-peach" style={{ color: 'var(--color-accent-rose)', fontWeight: 600, fontSize: '0.75rem', padding: '0.2rem 0.5rem' }}>
                              Quote Required
                            </span>
                          ) : (
                            <span style={{ fontWeight: 600, color: 'var(--color-primary-dark)' }}>
                              ₹{itemRate.toLocaleString('en-IN')}
                            </span>
                          )}
                        </td>
                        <td style={{ padding: '1.25rem 1rem', textAlign: 'center' }}>
                          <div className="quantity-stepper" style={{ margin: '0 auto' }}>
                            <button type="button" onClick={() => updateQuantity(item.id, item.selectedPackSize, item.quantity - 1)} aria-label="Decrease quantity">-</button>
                            <input 
                              type="number" 
                              min="1" 
                              value={item.quantity} 
                              onChange={(e) => updateQuantity(item.id, item.selectedPackSize, e.target.value)} 
                              aria-label="Quantity"
                            />
                            <button type="button" onClick={() => updateQuantity(item.id, item.selectedPackSize, item.quantity + 1)} aria-label="Increase quantity">+</button>
                          </div>
                        </td>
                        <td style={{ padding: '1.25rem 1rem', textAlign: 'right', fontWeight: 700, color: 'var(--color-primary-dark)' }}>
                          {isItemQuoteReq ? (
                            <span style={{ fontSize: '0.85rem', color: 'var(--color-accent-rose)', fontStyle: 'italic' }}>
                              Pending Quote
                            </span>
                          ) : (
                            <span>₹{(itemRate * item.quantity).toLocaleString('en-IN')}</span>
                          )}
                        </td>
                        <td style={{ padding: '1.25rem 1rem', textAlign: 'center' }}>
                          <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
                            <button 
                              onClick={() => handleMoveToWishlist(item)}
                              style={{ background: 'none', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', padding: '6px', color: 'var(--color-text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center', transition: 'all 0.2s ease' }}
                              title="Move to Wishlist"
                              aria-label={`Move ${item.name} to Wishlist`}
                            >
                              <Heart size={15} />
                            </button>
                            <button 
                              onClick={() => removeFromCart(item.id, item.selectedPackSize)}
                              style={{ background: 'none', border: '1px solid rgba(211, 47, 47, 0.2)', borderRadius: 'var(--radius-sm)', padding: '6px', color: '#D32F2F', cursor: 'pointer', display: 'flex', alignItems: 'center', transition: 'all 0.2s ease' }}
                              title="Remove item"
                              aria-label={`Remove ${item.name} from cart`}
                            >
                              <Trash2 size={15} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Bottom Actions */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
              <Link to="/products" className="btn btn-secondary btn-sm" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                <ArrowLeft size={14} />
                <span>Continue Shopping</span>
              </Link>

              <button className="btn btn-secondary btn-sm" onClick={clearCart} style={{ color: '#D32F2F', borderColor: 'rgba(211, 47, 47, 0.25)' }}>
                Clear Entire Cart
              </button>
            </div>
          </div>

          {/* Order Summary Box */}
          <div className="order-summary-card" style={{ background: '#FFFFFF', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-2xl)', padding: '1.75rem', boxShadow: 'var(--shadow-sm)' }}>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.35rem', color: 'var(--color-primary-dark)', marginBottom: '1.25rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '0.75rem' }}>
              Cart Summary
            </h3>

            {hasPricedItems ? (
              <>
                <div className="summary-row" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
                  <span>Priced Items ({pricedItems.length}):</span>
                  <span style={{ fontWeight: 600, color: 'var(--color-text-dark)' }}>₹{subtotal.toLocaleString('en-IN')}</span>
                </div>

                <div className="summary-row" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
                  <span>Logistics / Freight:</span>
                  <span>{shipping === 0 ? <strong style={{ color: '#2E7D32' }}>FREE (Demo)</strong> : `₹${shipping}`}</span>
                </div>

                <div className="summary-row" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
                  <span>Estimated GST (18%):</span>
                  <span style={{ fontWeight: 600, color: 'var(--color-text-dark)' }}>₹{tax.toLocaleString('en-IN')}</span>
                </div>

                {couponDiscount > 0 && (
                  <div className="summary-row" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', fontSize: '0.9rem', color: '#2E7D32', fontWeight: 600 }}>
                    <span>Coupon Discount (10%):</span>
                    <span>-₹{couponDiscount.toLocaleString('en-IN')}</span>
                  </div>
                )}

                <div className="summary-row total" style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem 0', borderTop: '2px solid var(--color-border)', marginTop: '0.75rem', fontSize: '1.15rem', fontWeight: 700, color: 'var(--color-primary-dark)' }}>
                  <span>Payable Total:</span>
                  <span style={{ color: 'var(--color-accent-rose)' }}>₹{finalTotal.toLocaleString('en-IN')}</span>
                </div>
              </>
            ) : (
              <div style={{ background: 'var(--color-bg-pastel-pink)', padding: '1rem', borderRadius: 'var(--radius-lg)', marginBottom: '1.25rem', border: '1px solid rgba(232, 93, 117, 0.2)' }}>
                <div style={{ fontWeight: 700, color: 'var(--color-accent-rose)', fontSize: '0.92rem', marginBottom: '0.25rem' }}>
                  Commercial RFQ Required
                </div>
                <p style={{ fontSize: '0.8rem', color: 'var(--color-text-dark)', margin: 0, lineHeight: 1.45 }}>
                  All items in this cart are industrial formulations requiring specialized technical quotation. Monetary totals cannot be computed prior to technical review.
                </p>
              </div>
            )}

            {/* Note if mixed cart */}
            {hasPricedItems && hasQuoteItems && (
              <div style={{ background: 'var(--color-bg-ivory)', padding: '0.75rem 0.9rem', borderRadius: 'var(--radius-md)', margin: '1rem 0', fontSize: '0.78rem', color: 'var(--color-text-muted)', border: '1px solid var(--color-border)' }}>
                ℹ️ <strong>Note:</strong> {quoteItems.length} quote-required formulation(s) are excluded from this monetary total and will be quoted separately by our technical team.
              </div>
            )}

            {/* Coupon Code Input for Priced Items */}
            {hasPricedItems && (
              <form onSubmit={handleApplyCoupon} style={{ margin: '1.25rem 0', display: 'flex', gap: '0.5rem' }}>
                <div style={{ flex: 1 }}>
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
            )}

            {/* Proceed to Checkout Button */}
            {hasPricedItems && (
              <button 
                className="btn btn-rose btn-block btn-lg"
                onClick={() => navigate('/checkout')}
                style={{ width: '100%', justifyContent: 'center', marginBottom: '0.75rem' }}
              >
                <span>Proceed to Checkout</span>
                <ArrowRight size={16} />
              </button>
            )}

            {/* Request Quote Button */}
            <button 
              className={`btn ${hasPricedItems ? 'btn-secondary' : 'btn-rose'} btn-block btn-lg`}
              onClick={() => navigate('/request-quote')}
              style={{ width: '100%', justifyContent: 'center' }}
            >
              <FileText size={16} />
              <span>{hasPricedItems ? 'Request Quote for Items' : 'Submit Commercial Quote Request'}</span>
            </button>

            <div style={{ marginTop: '1.25rem', textAlign: 'center', fontSize: '0.75rem', color: 'var(--color-text-light)' }}>
              🔒 Enterprise Simulation • GST Invoicing Ready
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;

