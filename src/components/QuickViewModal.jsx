import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { X, Star, ShoppingBag, Send, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';

const QuickViewModal = ({ product, onClose }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { addToast } = useToast();

  const [selectedPackSize, setSelectedPackSize] = useState(
    product?.packSizes ? product.packSizes[0] : '5 kg Can'
  );
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  const handleAddToCart = () => {
    addToCart(product, selectedPackSize, quantity);
    addToast(`Added ${quantity} × ${product.name} (${selectedPackSize}) to demo cart!`, 'success');
    onClose();
  };

  const handleRequestQuote = () => {
    onClose();
    navigate(`/enquiry?product=${encodeURIComponent(product.name)}&category=${encodeURIComponent(product.categoryName)}`);
  };

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          <X size={22} />
        </button>

        <div className="modal-product-grid">
          {/* Image */}
          <div style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', background: 'var(--color-bg-cream)' }}>
            <img 
              src={product.image} 
              alt={product.name} 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
            />
          </div>

          {/* Details */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
              <span className="badge badge-rose">{product.categoryName}</span>
              <span style={{ fontSize: '0.75rem', color: '#2E7D32', fontWeight: 600 }}>
                ● {product.availability}
              </span>
            </div>

            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', color: 'var(--color-primary-dark)', marginBottom: '0.5rem' }}>
              {product.name}
            </h2>

            <div className="product-rating-box" style={{ marginBottom: '1rem' }}>
              <Star size={14} fill="#F59E0B" />
              <span style={{ fontWeight: 600 }}>{product.demoRating}</span>
              <span className="rating-count">({product.reviewCount} reviews)</span>
              <span style={{ margin: '0 0.5rem', color: 'var(--color-border)' }}>|</span>
              <span style={{ fontSize: '0.75rem', color: 'var(--color-text-light)' }}>
                MOQ: {product.minOrderQuantity}
              </span>
            </div>

            <div style={{ margin: '0.75rem 0', padding: '0.75rem', background: 'var(--color-bg-ivory)', borderRadius: 'var(--radius-md)' }}>
              <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-primary-dark)' }}>
                ₹{product.demoPrice.toLocaleString('en-IN')}
                <span style={{ fontSize: '0.8rem', fontWeight: 400, color: 'var(--color-text-muted)', marginLeft: '0.5rem' }}>
                  (Illustrative demo price / {selectedPackSize})
                </span>
              </div>
            </div>

            <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', lineHeight: 1.6, marginBottom: '1.25rem' }}>
              {product.fullDesc || product.shortDesc}
            </p>

            {/* Pack Size Selection */}
            <div style={{ marginBottom: '1.25rem' }}>
              <span style={{ fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '0.5rem' }}>
                Select Pack Size:
              </span>
              <div className="pack-sizes-options">
                {product.packSizes.map(size => (
                  <button
                    key={size}
                    type="button"
                    className={`pack-size-chip ${selectedPackSize === size ? 'active' : ''}`}
                    onClick={() => setSelectedPackSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Stepper & Actions */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
              <div className="quantity-stepper">
                <button type="button" onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
                <input 
                  type="number" 
                  min="1" 
                  value={quantity} 
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))} 
                />
                <button type="button" onClick={() => setQuantity(quantity + 1)}>+</button>
              </div>

              <button 
                type="button" 
                className="btn btn-primary"
                onClick={handleAddToCart}
                style={{ flex: 1 }}
              >
                <ShoppingBag size={15} />
                <span>Add to Cart</span>
              </button>

              <button 
                type="button" 
                className="btn btn-secondary"
                onClick={handleRequestQuote}
              >
                <Send size={14} />
                <span>Get Quote</span>
              </button>
            </div>

            <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                Food/IFRA Certified Quality
              </span>
              <Link 
                to={`/product/${product.slug}`} 
                onClick={onClose}
                style={{ fontSize: '0.82rem', color: 'var(--color-accent-rose)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}
              >
                View Full Specifications <ArrowRight size={13} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickViewModal;
