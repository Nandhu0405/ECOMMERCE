import React from 'react';
import { Link } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb';
import ProductCard from '../components/ProductCard';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { Heart, ShoppingBag, Trash2 } from 'lucide-react';

const Wishlist = () => {
  const { wishlistItems, clearWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { addToast } = useToast();

  const handleMoveAllToCart = () => {
    wishlistItems.forEach(item => {
      addToCart(item, item.packSizes[0], 1);
    });
    addToast(`Moved ${wishlistItems.length} products to your demo cart!`, 'success');
  };

  if (wishlistItems.length === 0) {
    return (
      <div className="wishlist-page" style={{ paddingBottom: '6rem' }}>
        <div className="container">
          <Breadcrumb items={[{ label: 'Saved Wishlist' }]} />
          <div style={{ textAlign: 'center', padding: '5rem 1rem', background: '#FFFFFF', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-xl)', maxWidth: '640px', margin: '3rem auto' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'var(--color-bg-ivory)', color: 'var(--color-text-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
              <Heart size={30} />
            </div>
            <h2 style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-primary-dark)', marginBottom: '0.75rem' }}>
              Your Wishlist is Empty
            </h2>
            <p style={{ color: 'var(--color-text-muted)', marginBottom: '2rem', lineHeight: 1.6 }}>
              You haven't saved any flavour or fragrance formulations yet. Click the heart icon on any product to save it for later evaluation.
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
    <div className="wishlist-page" style={{ paddingBottom: '6rem' }}>
      <div className="container">
        <Breadcrumb items={[{ label: 'Saved Wishlist' }]} />

        <div style={{ padding: '2rem 0 2.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <span className="eyebrow">SAVED BENCHMARKS</span>
            <h1 style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)', color: 'var(--color-primary-dark)', marginBottom: '0.5rem' }}>
              My Saved Formulations ({wishlistItems.length})
            </h1>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button className="btn btn-primary btn-sm" onClick={handleMoveAllToCart}>
              <ShoppingBag size={14} />
              <span>Move All to Cart</span>
            </button>
            <button className="btn btn-secondary btn-sm" onClick={clearWishlist} style={{ color: '#D32F2F' }}>
              <Trash2 size={14} />
              <span>Clear Wishlist</span>
            </button>
          </div>
        </div>

        <div className="product-grid">
          {wishlistItems.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
