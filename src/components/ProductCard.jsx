import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, ShoppingBag, Star, Eye, Send } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useToast } from '../context/ToastContext';

const ProductCard = ({ product, onQuickView }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { addToast } = useToast();

  const isSaved = isInWishlist(product.id);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, product.packSizes[0], 1);
    addToast(`Added "${product.name}" (${product.packSizes[0]}) to demo cart!`, 'success');
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
    navigate(`/enquiry?product=${encodeURIComponent(product.name)}&category=${encodeURIComponent(product.categoryName)}`);
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
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span className="product-category-tag">
            {product.categoryName}
          </span>
          <span style={{ fontSize: '0.72rem', color: '#2E7D32', fontWeight: 600 }}>
            ● {product.availability}
          </span>
        </div>

        <Link to={`/product/${product.slug}`} className="product-name-link">
          <h3 className="product-card-title">{product.name}</h3>
        </Link>

        <p className="product-short-desc">
          {product.sensoryProfile || product.shortDesc}
        </p>

        {/* Rating Stars */}
        <div className="product-rating-box">
          <Star size={13} fill="#F59E0B" />
          <span style={{ fontWeight: 600 }}>{product.demoRating}</span>
          <span className="rating-count">({product.reviewCount} demo reviews)</span>
        </div>

        {/* Pricing Box (Illustrative Demo) */}
        <div className="product-pricing-box">
          <div>
            <div className="price-container">
              <span className="demo-price">₹{product.demoPrice.toLocaleString('en-IN')}</span>
              {product.originalPrice && (
                <span className="original-price">₹{product.originalPrice.toLocaleString('en-IN')}</span>
              )}
            </div>
            <span className="price-subtext">Demo rate / {product.packSizes[0]}</span>
          </div>

          <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
            MOQ: {product.minOrderQuantity}
          </span>
        </div>

        {/* Card Action Buttons */}
        <div className="product-card-actions">
          <button 
            className="btn btn-primary btn-card-cart"
            onClick={handleAddToCart}
            title="Add sample / pack to demo cart"
          >
            <ShoppingBag size={14} />
            <span>Add to Cart</span>
          </button>

          <button 
            className="btn btn-card-quote"
            onClick={handleRequestQuote}
            title="Request custom bulk quotation"
          >
            <Send size={13} />
            <span>Get Quote</span>
          </button>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
