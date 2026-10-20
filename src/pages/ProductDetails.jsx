import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb';
import ProductCard from '../components/ProductCard';
import { PRODUCTS, getProductBySlug, getRelatedProducts } from '../data/products';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useToast } from '../context/ToastContext';
import { 
  Star, Heart, ShoppingBag, Send, ShieldCheck, CheckCircle2, 
  FileText, ArrowRight, AlertCircle, RefreshCw, Layers 
} from 'lucide-react';

const RECENTLY_VIEWED_KEY = 'skff_recently_viewed_products';

const ProductDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const product = getProductBySlug(slug);

  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { addToast } = useToast();

  const [selectedPackSize, setSelectedPackSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('specs');
  const [recentlyViewed, setRecentlyViewed] = useState([]);

  useEffect(() => {
    if (product) {
      setSelectedPackSize(product.packSizes[0] || '5 kg Can');
      setQuantity(1);
      window.scrollTo({ top: 0, behavior: 'smooth' });

      // Save to recently viewed
      try {
        const stored = JSON.parse(localStorage.getItem(RECENTLY_VIEWED_KEY) || '[]');
        const updated = [product.id, ...stored.filter(id => id !== product.id)].slice(0, 4);
        localStorage.setItem(RECENTLY_VIEWED_KEY, JSON.stringify(updated));

        // Load objects
        const loadedRecent = updated
          .filter(id => id !== product.id)
          .map(id => PRODUCTS.find(p => p.id === id))
          .filter(Boolean);
        setRecentlyViewed(loadedRecent);
      } catch (e) {
        console.warn('Recently viewed error', e);
      }
    }
  }, [slug, product]);

  if (!product) {
    return (
      <div className="container" style={{ padding: '6rem 0', textAlign: 'center' }}>
        <h2 style={{ fontFamily: 'var(--font-heading)', marginBottom: '1rem' }}>Product Not Found</h2>
        <p style={{ marginBottom: '2rem', color: 'var(--color-text-muted)' }}>
          The requested flavour or fragrance formulation could not be located in our catalogue index.
        </p>
        <Link to="/catalogue" className="btn btn-primary">
          Browse Complete Catalogue
        </Link>
      </div>
    );
  }

  const isSaved = isInWishlist(product.id);
  const relatedProducts = getRelatedProducts(product, 4);

  const handleAddToCart = () => {
    addToCart(product, selectedPackSize, quantity);
    addToast(`Added ${quantity} × ${product.name} (${selectedPackSize}) to demo cart!`, 'success');
  };

  const handleToggleWishlist = () => {
    toggleWishlist(product);
    if (!isSaved) {
      addToast(`Saved "${product.name}" to wishlist`, 'info');
    } else {
      addToast(`Removed "${product.name}" from wishlist`, 'info');
    }
  };

  const handleRequestQuote = () => {
    navigate(`/enquiry?product=${encodeURIComponent(product.name)}&category=${encodeURIComponent(product.categoryName)}`);
  };

  const breadcrumbs = [
    { label: product.type === 'flavour' ? 'Flavours' : 'Fragrances', url: product.type === 'flavour' ? '/flavours' : '/fragrances' },
    { label: product.categoryName, url: `/category/${product.categoryId}` },
    { label: product.name }
  ];

  return (
    <div className="product-details-page" style={{ paddingBottom: '5rem' }}>
      <div className="container">
        <Breadcrumb items={breadcrumbs} />

        {/* Main Product Layout */}
        <div className="product-detail-layout">
          {/* Gallery / Image Panel */}
          <div className="product-gallery-panel">
            <div className="product-main-image-box">
              <img src={product.image} alt={product.name} />
            </div>

            {/* Quality & Manufacturing Assurance Badge */}
            <div style={{ background: '#FFFFFF', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#2E7D32', fontWeight: 600, fontSize: '0.85rem' }}>
                <CheckCircle2 size={16} /> FSSAI / IFRA Compliant Compounding
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-text-main)', fontSize: '0.85rem' }}>
                <ShieldCheck size={16} color="var(--color-accent-rose)" /> Manufactured at 75,000 sq.ft Boisar Facility
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-text-main)', fontSize: '0.85rem' }}>
                <FileText size={16} color="var(--color-accent-rose)" /> Certificate of Analysis (COA) Available
              </div>
            </div>
          </div>

          {/* Details & Actions Panel */}
          <div className="product-detail-info">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <Link to={`/category/${product.categoryId}`} className="badge badge-rose">
                {product.categoryName}
              </Link>
              <span className="badge badge-primary">
                {product.type === 'flavour' ? 'Taste Division' : 'Scent Division'}
              </span>
              <span style={{ fontSize: '0.78rem', color: '#2E7D32', fontWeight: 600, marginLeft: 'auto' }}>
                ● {product.availability}
              </span>
            </div>

            <h1 className="product-detail-title">{product.name}</h1>

            {/* Rating Box */}
            <div className="product-rating-box" style={{ marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', gap: '2px' }}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={15} fill="#F59E0B" />
                ))}
              </div>
              <span style={{ fontWeight: 700, color: 'var(--color-text-main)', marginLeft: '0.25rem' }}>
                {product.demoRating}
              </span>
              <span className="rating-count">({product.reviewCount} customer reviews)</span>
              <span style={{ margin: '0 0.5rem', color: 'var(--color-border)' }}>|</span>
              <span style={{ fontSize: '0.8rem', color: 'var(--color-text-light)' }}>
                Item Ref: #{product.id.toUpperCase()}
              </span>
            </div>

            {/* Demo Pricing Box */}
            <div style={{ background: 'var(--color-bg-ivory)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '1.25rem', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.65rem' }}>
                <span style={{ fontSize: '1.8rem', fontWeight: 700, color: 'var(--color-primary-dark)' }}>
                  ₹{product.demoPrice.toLocaleString('en-IN')}
                </span>
                {product.originalPrice && (
                  <span style={{ fontSize: '1rem', color: 'var(--color-text-light)', textDecoration: 'line-through' }}>
                    ₹{product.originalPrice.toLocaleString('en-IN')}
                  </span>
                )}
                <span style={{ fontSize: '0.8rem', color: 'var(--color-accent-rose)', fontWeight: 600 }}>
                  Demo Quote / {selectedPackSize}
                </span>
              </div>
              <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '0.35rem' }}>
                *Illustrative B2B demonstration pricing. Official commercial pricing is determined by order volume, delivery location, and contract terms.
              </p>
            </div>

            {/* Sensory Profile / Fragrance Notes Callout */}
            <div style={{ background: '#FFFFFF', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', padding: '1rem', marginBottom: '1.5rem' }}>
              {product.type === 'flavour' ? (
                <div>
                  <strong style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-accent-rose)' }}>
                    Sensory Profile:
                  </strong>
                  <p style={{ fontSize: '0.92rem', color: 'var(--color-text-main)', marginTop: '0.25rem' }}>
                    {product.sensoryProfile}
                  </p>
                </div>
              ) : (
                <div>
                  <strong style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-accent-rose)' }}>
                    Olfactory Pyramid:
                  </strong>
                  <div style={{ fontSize: '0.85rem', color: 'var(--color-text-main)', marginTop: '0.35rem', display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                    <div><strong>Top Notes:</strong> {product.fragranceNotes?.top}</div>
                    <div><strong>Heart Notes:</strong> {product.fragranceNotes?.middle}</div>
                    <div><strong>Base Notes:</strong> {product.fragranceNotes?.base}</div>
                  </div>
                </div>
              )}
            </div>

            {/* Full Description */}
            <p className="product-detail-desc">
              {product.fullDesc}
            </p>

            {/* Pack Size Selector */}
            <div className="pack-sizes-selector">
              <span className="pack-sizes-label">Available Packaging Units:</span>
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

            {/* Quantity Stepper & Action Buttons */}
            <div className="quantity-add-row">
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
                className="btn btn-primary btn-lg"
                onClick={handleAddToCart}
                style={{ flex: 1, minWidth: '180px' }}
              >
                <ShoppingBag size={18} />
                <span>Add Sample to Cart</span>
              </button>

              <button 
                type="button" 
                className="btn btn-rose btn-lg"
                onClick={handleRequestQuote}
              >
                <Send size={16} />
                <span>Request Quotation</span>
              </button>

              <button 
                type="button" 
                className={`product-wishlist-btn ${isSaved ? 'active' : ''}`}
                onClick={handleToggleWishlist}
                style={{ position: 'static', width: '46px', height: '46px' }}
                title={isSaved ? "Remove from wishlist" : "Save to wishlist"}
              >
                <Heart size={20} fill={isSaved ? 'var(--color-accent-rose)' : 'none'} />
              </button>
            </div>

            {/* Suggested Applications */}
            <div style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--color-border)' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '0.5rem' }}>
                Recommended Formulation Applications:
              </span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                {product.suggestedApplications.map((app, i) => (
                  <span key={i} className="industry-tag" style={{ background: 'var(--color-bg-ivory)', border: '1px solid var(--color-border)', padding: '0.35rem 0.75rem', borderRadius: 'var(--radius-full)', fontSize: '0.82rem' }}>
                    ✓ {app}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Technical Specifications Section */}
        <div style={{ marginTop: '3rem', marginBottom: '4rem' }}>
          <div style={{ display: 'flex', borderBottom: '1px solid var(--color-border)', gap: '2rem', marginBottom: '1.5rem' }}>
            <button 
              style={{ padding: '0.75rem 0', fontWeight: 700, fontSize: '0.95rem', color: activeTab === 'specs' ? 'var(--color-accent-rose)' : 'var(--color-text-muted)', borderBottom: activeTab === 'specs' ? '2px solid var(--color-accent-rose)' : 'none', cursor: 'pointer' }}
              onClick={() => setActiveTab('specs')}
            >
              Technical Specifications (Demo Data)
            </button>
            <button 
              style={{ padding: '0.75rem 0', fontWeight: 700, fontSize: '0.95rem', color: activeTab === 'sampling' ? 'var(--color-accent-rose)' : 'var(--color-text-muted)', borderBottom: activeTab === 'sampling' ? '2px solid var(--color-accent-rose)' : 'none', cursor: 'pointer' }}
              onClick={() => setActiveTab('sampling')}
            >
              Sampling &amp; Bulk Ordering Guidelines
            </button>
          </div>

          {activeTab === 'specs' ? (
            <div className="spec-table-container">
              <table className="spec-table">
                <tbody>
                  <tr>
                    <th>Appearance &amp; Form</th>
                    <td>{product.specifications.appearance}</td>
                  </tr>
                  <tr>
                    <th>Solubility &amp; Dispersion</th>
                    <td>{product.specifications.solubility}</td>
                  </tr>
                  <tr>
                    <th>Recommended Dosage Rate</th>
                    <td>{product.specifications.recommendedDosage}</td>
                  </tr>
                  <tr>
                    <th>Shelf Life Retention</th>
                    <td>{product.specifications.shelfLife}</td>
                  </tr>
                  <tr>
                    <th>Recommended Storage</th>
                    <td>{product.specifications.storageCondition}</td>
                  </tr>
                  <tr>
                    <th>Regulatory &amp; Quality Status</th>
                    <td>{product.specifications.status}</td>
                  </tr>
                </tbody>
              </table>

              <div style={{ padding: '1rem 1.25rem', background: '#FFF8E1', borderTop: '1px solid #FFE082', fontSize: '0.78rem', color: '#795548', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <AlertCircle size={16} color="#FF8F00" style={{ flexShrink: 0 }} />
                <span>
                  <strong>Illustrative Specifications Notice:</strong> The specifications presented above are illustrative demonstration data. Official Certificate of Analysis (COA) is issued by SKFF Quality Control per production batch upon commercial dispatch.
                </span>
              </div>
            </div>
          ) : (
            <div style={{ background: '#FFFFFF', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '2rem', lineHeight: 1.7, fontSize: '0.92rem', color: 'var(--color-text-muted)' }}>
              <h4 style={{ color: 'var(--color-primary-dark)', marginBottom: '0.75rem' }}>How to Order Samples from SKFF</h4>
              <p style={{ marginBottom: '1rem' }}>
                SKFF supplies evaluation sample canisters (typically 1 kg or 500 g) to verified product development teams, manufacturing facilities, and R&amp;D scientists.
              </p>
              <ul style={{ paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.5rem' }}>
                <li>Samples are dispatched directly from our Mumbai Application Center.</li>
                <li>Comprehensive dosage guidelines and starting formulations can be requested from our technical sales team.</li>
                <li>Commercial quantities (HDPE drums of 25 kg and steel barrels of 200 kg) are scheduled from the Boisar manufacturing complex.</li>
              </ul>
              <Link to="/enquiry" className="btn btn-rose">
                Submit Sample Request Form
              </Link>
            </div>
          )}
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div style={{ marginTop: '4rem', marginBottom: '4rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
              <div>
                <span className="eyebrow">SIMILAR FORMULATIONS</span>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', color: 'var(--color-primary-dark)' }}>
                  More in {product.categoryName}
                </h3>
              </div>
              <Link to={`/category/${product.categoryId}`} style={{ color: 'var(--color-accent-rose)', fontWeight: 600, fontSize: '0.85rem' }}>
                View All {product.categoryName} →
              </Link>
            </div>

            <div className="product-grid">
              {relatedProducts.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}

        {/* Recently Viewed Products */}
        {recentlyViewed.length > 0 && (
          <div style={{ marginTop: '4rem', paddingTop: '3rem', borderTop: '1px solid var(--color-border)' }}>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', color: 'var(--color-primary-dark)', marginBottom: '1.5rem' }}>
              Recently Viewed by You
            </h3>
            <div className="product-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
              {recentlyViewed.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
