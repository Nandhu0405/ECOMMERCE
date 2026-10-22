import React from 'react';
import { Link } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { Heart, ShoppingBag, Trash2, ArrowRight, Eye } from 'lucide-react';
import { getProductAvailability } from '../data/products';

const Wishlist = () => {
  const { wishlistItems, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { addToast } = useToast();

  const handleAddToCart = (product) => {
    const avail = getProductAvailability(product);
    if (avail === 'Out of Stock') {
      addToast(`"${product.name}" is currently out of stock. You can submit a sample request or commercial quote.`, 'error');
      return;
    }
    const packSize = product.packSizes ? product.packSizes[0] : '5 kg Standard';
    addToCart(product, packSize, 1);
    addToast(`Added "${product.name}" (${packSize}) to your cart!`, 'success');
  };

  const handleRemove = (productId, productName) => {
    removeFromWishlist(productId);
    addToast(`Removed "${productName}" from wishlist`, 'info');
  };

  const handleMoveAllToCart = () => {
    wishlistItems.forEach(item => {
      const packSize = item.packSizes ? item.packSizes[0] : '5 kg Standard';
      addToCart(item, packSize, 1);
    });
    addToast(`Moved ${wishlistItems.length} products to your cart!`, 'success');
  };

  if (wishlistItems.length === 0) {
    return (
      <div className="wishlist-page" style={{ paddingBottom: '6rem' }}>
        <div className="container">
          <Breadcrumb items={[{ label: 'Saved Wishlist' }]} />
          <div style={{ textAlign: 'center', padding: '5rem 1.5rem', background: '#FFFFFF', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-2xl)', maxWidth: '640px', margin: '3rem auto', boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ width: '72px', height: '72px', borderRadius: '50%', background: 'var(--color-bg-pastel-pink)', color: 'var(--color-accent-rose)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
              <Heart size={34} />
            </div>
            <h2 style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-primary-dark)', marginBottom: '0.75rem', fontSize: '1.75rem' }}>
              Your Wishlist is Empty
            </h2>
            <p style={{ color: 'var(--color-text-muted)', marginBottom: '2rem', lineHeight: 1.6, maxWidth: '480px', margin: '0 auto 2rem' }}>
              You haven't saved any flavour or fragrance formulations yet. Click the heart icon on any product to save it for benchmarking and evaluation.
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
    <div className="wishlist-page" style={{ paddingBottom: '6rem' }}>
      <div className="container">
        <Breadcrumb items={[{ label: 'Saved Wishlist' }]} />

        <div style={{ padding: '2rem 0 2.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <span className="eyebrow" style={{ color: 'var(--color-accent-rose)' }}>SAVED BENCHMARKS</span>
            <h1 style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)', color: 'var(--color-primary-dark)', marginBottom: '0.5rem', fontFamily: 'var(--font-heading)' }}>
              My Saved Formulations ({wishlistItems.length})
            </h1>
            <p style={{ color: 'var(--color-text-muted)', margin: 0 }}>
              Review saved flavours and fragrances, request production quotes, or move formulations to cart.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <button className="btn btn-rose btn-sm" onClick={handleMoveAllToCart}>
              <ShoppingBag size={14} />
              <span>Move All to Cart</span>
            </button>
            <button className="btn btn-secondary btn-sm" onClick={clearWishlist} style={{ color: '#D32F2F', borderColor: 'rgba(211, 47, 47, 0.3)' }}>
              <Trash2 size={14} />
              <span>Clear Wishlist</span>
            </button>
          </div>
        </div>

        <div className="product-grid">
          {wishlistItems.map(product => {
            const sku = product.sku || `SKFF-${product.id.toUpperCase()}`;
            const isQuoteReq = product.quoteRequired || (!product.price && !product.demoPrice);

            return (
              <div 
                key={product.id} 
                className="product-card"
                style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#FFFFFF', borderRadius: 'var(--radius-2xl)', overflow: 'hidden', border: '1px solid var(--color-border)', transition: 'all 0.25s ease' }}
              >
                {/* Product Image */}
                <div style={{ position: 'relative', height: '220px', background: 'var(--color-bg-ivory)', overflow: 'hidden' }}>
                  <Link to={`/products/${product.slug}`}>
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }}
                      loading="lazy"
                    />
                  </Link>

                  <div style={{ position: 'absolute', top: '10px', left: '10px', display: 'flex', gap: '4px' }}>
                    <span className="badge badge-primary" style={{ fontSize: '0.7rem' }}>
                      {product.type === 'flavour' ? 'Flavour' : 'Fragrance'}
                    </span>
                  </div>

                  <button
                    onClick={() => handleRemove(product.id, product.name)}
                    title="Remove from Wishlist"
                    aria-label={`Remove ${product.name} from wishlist`}
                    style={{
                      position: 'absolute',
                      top: '10px',
                      right: '10px',
                      background: 'rgba(255, 255, 255, 0.92)',
                      border: '1px solid var(--color-border)',
                      borderRadius: '50%',
                      width: '34px',
                      height: '34px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--color-accent-rose)',
                      cursor: 'pointer',
                      boxShadow: 'var(--shadow-sm)'
                    }}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>

                {/* Card Body */}
                <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                    <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700, color: 'var(--color-accent-rose)' }}>
                      {product.categoryName}
                    </span>
                    {(() => {
                      const avail = getProductAvailability(product);
                      const color = avail === 'Out of Stock' ? '#C62828' : avail === 'Available on Request' ? '#B45309' : '#2E7D32';
                      return (
                        <span style={{ fontSize: '0.72rem', color, fontWeight: 600 }}>
                          ● {avail}
                        </span>
                      );
                    })()}
                  </div>

                  <div style={{ fontSize: '0.72rem', color: 'var(--color-text-light)', fontFamily: 'monospace', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>
                    SKU: {sku}
                  </div>

                  <Link to={`/products/${product.slug}`} style={{ textDecoration: 'none' }}>
                    <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--color-primary-dark)', margin: '0 0 0.5rem', lineHeight: 1.35, fontFamily: 'var(--font-heading)' }}>
                      {product.name}
                    </h3>
                  </Link>

                  <p style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', lineHeight: 1.5, margin: '0 0 1rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', flex: 1 }}>
                    {product.shortDescription || product.shortDesc || product.sensoryProfile}
                  </p>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: '0.65rem 0', borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)', marginBottom: '1rem' }}>
                    {isQuoteReq ? (
                      <span style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--color-accent-rose)' }}>
                        Request a Quote
                      </span>
                    ) : (
                      <span style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--color-primary-dark)' }}>
                        ₹{(product.price || product.demoPrice).toLocaleString('en-IN')}
                        <span style={{ fontSize: '0.72rem', fontWeight: 400, color: 'var(--color-text-light)', marginLeft: '4px' }}>
                          / {product.packSizes ? product.packSizes[0] : '5 kg'}
                        </span>
                      </span>
                    )}
                    <span style={{ fontSize: '0.72rem', color: 'var(--color-text-light)' }}>
                      MOQ: {product.minimumOrderQuantity || product.minOrderQuantity || '5 kg'}
                    </span>
                  </div>

                  {/* Actions: Add to Cart and Remove from Wishlist */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                    <button
                      className="btn btn-rose btn-sm"
                      onClick={() => handleAddToCart(product)}
                      style={{ justifyContent: 'center', fontSize: '0.78rem', padding: '0.45rem 0.5rem' }}
                    >
                      <ShoppingBag size={13} />
                      <span>Add to Cart</span>
                    </button>

                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={() => handleRemove(product.id, product.name)}
                      style={{ justifyContent: 'center', fontSize: '0.78rem', padding: '0.45rem 0.5rem', color: '#D32F2F', borderColor: 'rgba(211, 47, 47, 0.25)' }}
                    >
                      <Trash2 size={13} />
                      <span>Remove</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;

