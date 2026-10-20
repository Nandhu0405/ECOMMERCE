import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { X, Trash2, ShoppingBag, ArrowRight, AlertCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';

const CartDrawer = () => {
  const navigate = useNavigate();
  const { 
    cartItems, 
    isCartOpen, 
    setIsCartOpen, 
    removeFromCart, 
    updateQuantity, 
    clearCart,
    subtotal, 
    shipping, 
    tax, 
    total,
    totalItems 
  } = useCart();

  const handleProceedCheckout = () => {
    setIsCartOpen(false);
    navigate('/checkout');
  };

  return (
    <div 
      className={`cart-drawer-overlay ${isCartOpen ? 'open' : ''}`}
      onClick={() => setIsCartOpen(false)}
      role="dialog"
      aria-modal="true"
    >
      <div className="cart-drawer-panel" onClick={(e) => e.stopPropagation()}>
        {/* Drawer Header */}
        <div className="cart-drawer-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <ShoppingBag size={20} color="var(--color-accent-rose)" />
            <h3 style={{ fontSize: '1.2rem', fontFamily: 'var(--font-heading)' }}>
              Sample &amp; Demo Cart ({totalItems})
            </h3>
          </div>
          <button 
            onClick={() => setIsCartOpen(false)}
            style={{ color: 'var(--color-text-muted)', fontSize: '1.4rem' }}
            aria-label="Close cart drawer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Demo Notice */}
        <div style={{ padding: '0.65rem 1.25rem', background: '#FFF8E1', borderBottom: '1px solid #FFE082', fontSize: '0.76rem', color: '#795548', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <AlertCircle size={15} color="#FF8F00" style={{ flexShrink: 0 }} />
          <span>Demo B2B Cart: Illustrative sample ordering simulation for SKFF catalogue.</span>
        </div>

        {/* Drawer Body (Items) */}
        <div className="cart-drawer-body">
          {cartItems.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
              <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: 'var(--color-bg-ivory)', color: 'var(--color-text-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
                <ShoppingBag size={24} />
              </div>
              <h4 style={{ marginBottom: '0.35rem', color: 'var(--color-text-main)' }}>Your cart is empty</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginBottom: '1.25rem' }}>
                Explore our 11 flavour and fragrance categories to add sample packs.
              </p>
              <button 
                className="btn btn-primary btn-sm"
                onClick={() => {
                  setIsCartOpen(false);
                  navigate('/catalogue');
                }}
              >
                Explore Catalogue
              </button>
            </div>
          ) : (
            cartItems.map((item) => (
              <div key={`${item.id}-${item.selectedPackSize}`} className="cart-drawer-item">
                <img src={item.image} alt={item.name} />
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <h5 style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--color-text-main)' }}>
                      {item.name}
                    </h5>
                    <button 
                      onClick={() => removeFromCart(item.id, item.selectedPackSize)}
                      style={{ color: '#D32F2F', padding: '2px' }}
                      title="Remove item"
                      aria-label={`Remove ${item.name}`}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                  
                  <div style={{ fontSize: '0.75rem', color: 'var(--color-accent-rose)', margin: '0.2rem 0' }}>
                    Pack: {item.selectedPackSize}
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem' }}>
                    <div className="quantity-stepper" style={{ transform: 'scale(0.85)', transformOrigin: 'left center' }}>
                      <button type="button" onClick={() => updateQuantity(item.id, item.selectedPackSize, item.quantity - 1)}>-</button>
                      <input 
                        type="number" 
                        min="1" 
                        value={item.quantity} 
                        onChange={(e) => updateQuantity(item.id, item.selectedPackSize, e.target.value)} 
                      />
                      <button type="button" onClick={() => updateQuantity(item.id, item.selectedPackSize, item.quantity + 1)}>+</button>
                    </div>

                    <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--color-primary-dark)' }}>
                      ₹{((item.demoPrice || 0) * item.quantity).toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer (Summary & Actions) */}
        {cartItems.length > 0 && (
          <div className="cart-drawer-footer">
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
              <span>Subtotal:</span>
              <span>₹{subtotal.toLocaleString('en-IN')}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
              <span>Estimated Shipping:</span>
              <span>{shipping === 0 ? <strong style={{ color: '#2E7D32' }}>FREE (Demo)</strong> : `₹${shipping}`}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
              <span>Estimated GST (18%):</span>
              <span>₹{tax.toLocaleString('en-IN')}</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-primary-dark)', borderTop: '1px solid var(--color-border)', paddingTop: '0.65rem' }}>
              <span>Total:</span>
              <span>₹{total.toLocaleString('en-IN')}</span>
            </div>

            <button 
              className="btn btn-rose btn-block"
              onClick={handleProceedCheckout}
              style={{ marginTop: '0.5rem' }}
            >
              <span>Proceed to Demo Checkout</span>
              <ArrowRight size={16} />
            </button>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.35rem' }}>
              <button 
                onClick={() => {
                  setIsCartOpen(false);
                  navigate('/cart');
                }}
                style={{ fontSize: '0.78rem', color: 'var(--color-primary)', textDecoration: 'underline' }}
              >
                View Full Cart
              </button>
              <button 
                onClick={clearCart}
                style={{ fontSize: '0.78rem', color: '#D32F2F' }}
              >
                Clear Cart
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;
