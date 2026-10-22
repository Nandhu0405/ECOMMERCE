import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, ShoppingBag, Star, Eye, Send } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useToast } from '../context/ToastContext';
import { getProductAvailability } from '../data/products';

const ProductCard = ({ product, onQuickView }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { addToast } = useToast();

  const isSaved = isInWishlist(product.id);
  const availability = getProductAvailability(product);
  const isOutOfStock = availability === 'Out of Stock';
  const isAvailableOnRequest = availability === 'Available on Request';

  const getAvailabilityBadgeStyle = (status) => {
    switch (status) {
      case 'Out of Stock':
        return { color: '#C62828', background: 'rgba(198, 40, 40, 0.08)', border: '1px solid rgba(198, 40, 40, 0.2)' };
      case 'Available on Request':
        return { color: '#B45309', background: 'rgba(245, 158, 11, 0.08)', border: '1px solid rgba(245, 158, 11, 0.2)' };
      case 'In Stock':
      default:
        return { color: '#2E7D32', background: 'rgba(46, 125, 50, 0.08)', border: '1px solid rgba(46, 125, 50, 0.2)' };
    }
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isOutOfStock) {
      addToast(`"${product.name}" is currently out of stock. You can request custom compounding or an evaluation sample.`, 'error');
      return;
    }
    addToCart(product, product.packSizes ? product.packSizes[0] : '5 kg', 1);
    addToast(`Added "${product.name}" (${product.packSizes ? product.packSizes[0] : '5 kg'}) to demo cart!`, 'success');
  };

  const handleToggleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
    if (!isSaved) {
      addToast(`Saved "${product.name}" to your wishlist`, 'info');
    } else {
      addToast(`Removed "${product.name}" from wishlist`, 'info');
    }
  };

  const handleRequestQuote = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/enquiry?product=${encodeURIComponent(product.name)}&category=${encodeURIComponent(product.categoryName || product.category)}&sku=${encodeURIComponent(product.sku || product.id)}`);
  };

  return (
    <article className="product-card" id={`product-${product.id}`}>
      {/* Product Image & Badges */}
      <div className="product-image-container">
        <Link to={`/product/${product.slug}`} title={`View ${product.name}`}>
          <img 
            src={product.image} 
            alt={product.name} 
            className="product-card-img" 
            loading="lazy"
          />
        </Link>

        {/* Badges Overlay */}
        <div className="product-badge-overlay">
          {product.isFeatured && (
            <span className="badge badge-gold">Featured</span>
          )}
          {product.isBestseller && (
            <span className="badge badge-rose">Bestseller</span>
          )}
          <span className="badge badge-primary">
            {product.type === 'flavour' ? 'Flavour' : 'Fragrance'}
          </span>
        </div>

        {/* Wishlist Button */}
        <button 
          className={`product-wishlist-btn ${isSaved ? 'active' : ''}`}
          onClick={handleToggleWishlist}
          aria-label={isSaved ? "Remove from wishlist" : "Add to wishlist"}
          title={isSaved ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart size={16} fill={isSaved ? 'var(--color-accent-rose)' : 'none'} />
        </button>

        {/* Quick View Button */}
        {onQuickView && (
          <button 
            className="product-quick-view-btn"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onQuickView(product);
            }}
            aria-label={`Quick view ${product.name}`}
          >
            Quick View
          </button>
        )}
      </div>

      {/* Card Body */}
      <div className="product-card-body">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.5rem' }}>
          <span className="product-category-tag">
            {product.categoryName || product.category}
          </span>
          <span 
            style={{ 
              fontSize: '0.7rem', 
              fontWeight: 600, 
              padding: '0.15rem 0.5rem', 
              borderRadius: 'var(--radius-full)', 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '0.25rem',
              whiteSpace: 'nowrap',
              ...getAvailabilityBadgeStyle(availability)
            }}
          >
            ● {availability}
          </span>
        </div>

        <div style={{ fontSize: '0.72rem', color: 'var(--color-text-light)', fontFamily: 'monospace', letterSpacing: '0.05em', marginTop: '0.15rem' }}>
          SKU: {product.sku || `SKFF-${product.id.toUpperCase()}`}
        </div>

        <Link to={`/product/${product.slug}`} className="product-name-link">
          <h3 className="product-card-title">{product.name}</h3>
        </Link>

        <p className="product-short-desc">
          {product.shortDescription || product.shortDesc || product.sensoryProfile}
        </p>

        {/* Rating Stars */}
        <div className="product-rating-box">
          <Star size={13} fill="#F59E0B" />
          <span style={{ fontWeight: 600 }}>{product.demoRating || 4.8}</span>
          <span className="rating-count">({product.reviewCount || 24} reviews)</span>
        </div>

        {/* Pricing Box (Illustrative Demo or Quotation Required) */}
        <div className="product-pricing-box">
          <div>
            {product.quoteRequired || (!product.demoPrice && !product.price) ? (
              <div>
                <span style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--color-accent-rose)' }}>
                  Request a Quote
                </span>
                <span className="price-subtext" style={{ display: 'block' }}>Commercial wholesale</span>
              </div>
            ) : (
              <div>
                <div className="price-container">
                  <span className="demo-price">₹{(product.price || product.demoPrice).toLocaleString('en-IN')}</span>
                  {product.originalPrice && (
                    <span className="original-price">₹{product.originalPrice.toLocaleString('en-IN')}</span>
                  )}
                </div>
                <span className="price-subtext">Demo rate / {product.packSizes ? product.packSizes[0] : '5 kg'}</span>
              </div>
            )}
          </div>

          <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
            MOQ: {product.minimumOrderQuantity || product.minOrderQuantity || '5 kg'}
          </span>
        </div>

        {/* Out of Stock Notice if applicable */}
        {isOutOfStock && (
          <div style={{ fontSize: '0.72rem', color: '#C62828', background: 'rgba(198, 40, 40, 0.05)', border: '1px solid rgba(198, 40, 40, 0.15)', padding: '0.25rem 0.5rem', borderRadius: '4px', marginBottom: '0.5rem', textAlign: 'center' }}>
            Unavailable for instant dispatch (Compounding on request)
          </div>
        )}

        {/* Card Action Buttons */}
        <div className="product-card-actions" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.4rem' }}>
          <Link
            to={`/product/${product.slug}`}
            className="btn btn-secondary btn-sm"
            style={{ textAlign: 'center', justifyContent: 'center', fontSize: '0.78rem', padding: '0.45rem 0.5rem' }}
          >
            <span>View Details</span>
          </Link>

          {isOutOfStock ? (
            <button 
              type="button"
              className="btn btn-secondary btn-sm"
              disabled
              title="Out of stock — Custom batch compounding on request"
              style={{ justifyContent: 'center', fontSize: '0.78rem', padding: '0.45rem 0.5rem', opacity: 0.55, cursor: 'not-allowed' }}
            >
              <span>Out of Stock</span>
            </button>
          ) : isAvailableOnRequest ? (
            <button 
              type="button"
              className="btn btn-rose btn-sm"
              onClick={handleRequestQuote}
              title="Available on request — Request Sample or Commercial Quote"
              style={{ justifyContent: 'center', fontSize: '0.78rem', padding: '0.45rem 0.5rem' }}
            >
              <Send size={12} />
              <span>Request Quote</span>
            </button>
          ) : (
            <button 
              type="button"
              className="btn btn-primary btn-sm btn-card-cart"
              onClick={handleAddToCart}
              title="Add sample / pack to demo cart"
              style={{ justifyContent: 'center', fontSize: '0.78rem', padding: '0.45rem 0.5rem' }}
            >
              <ShoppingBag size={13} />
              <span>Add to Cart</span>
            </button>
          )}
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
