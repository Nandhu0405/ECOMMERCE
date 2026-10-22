import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb';
import ProductCard from '../components/ProductCard';
import RequestSampleModal from '../components/RequestSampleModal';
import { PRODUCTS, getProductBySlug, getRelatedProducts, getProductAvailability } from '../data/products';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useToast } from '../context/ToastContext';
import { 
  Star, Heart, ShoppingBag, Send, ShieldCheck, CheckCircle2, 
  FileText, ArrowRight, AlertCircle, RefreshCw, Layers, FlaskConical 
} from 'lucide-react';
import appLab from '../assets/application-lab.jpg';
import plantImg from '../assets/production-plant.jpg';
import rdLab from '../assets/rd-lab.jpg';

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
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isSampleModalOpen, setIsSampleModalOpen] = useState(false);

  const galleryImages = product ? [product.image, appLab, plantImg, rdLab] : [];

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

  const availability = getProductAvailability(product);
  const isOutOfStock = availability === 'Out of Stock';
  const isAvailableOnRequest = availability === 'Available on Request';

  const getAvailabilityBadgeStyle = (status) => {
    switch (status) {
      case 'Out of Stock':
        return { color: '#C62828', background: 'rgba(198, 40, 40, 0.08)', border: '1px solid rgba(198, 40, 40, 0.25)' };
      case 'Available on Request':
        return { color: '#B45309', background: 'rgba(245, 158, 11, 0.08)', border: '1px solid rgba(245, 158, 11, 0.25)' };
      case 'In Stock':
      default:
        return { color: '#2E7D32', background: 'rgba(46, 125, 50, 0.08)', border: '1px solid rgba(46, 125, 50, 0.25)' };
    }
  };

  const handleAddToCart = () => {
    if (isOutOfStock) {
      addToast(`"${product.name}" is currently out of stock. You can submit a laboratory sample request or quotation for batch allocation.`, 'error');
      return;
    }
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
    navigate(`/enquiry?product=${encodeURIComponent(product.name)}&category=${encodeURIComponent(product.categoryName || product.category)}&sku=${encodeURIComponent(product.sku || product.id)}`);
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
            <div className="product-main-image-box" style={{ borderRadius: 'var(--radius-xl)', overflow: 'hidden', height: '380px' }}>
              <img 
                src={galleryImages[activeImageIndex] || product.image} 
                alt={product.name} 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>

            {/* Thumbnail Row */}
            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem', marginBottom: '1.5rem' }}>
              {galleryImages.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveImageIndex(idx)}
                  style={{
                    width: '68px',
                    height: '68px',
                    borderRadius: 'var(--radius-md)',
                    overflow: 'hidden',
                    border: activeImageIndex === idx ? '2px solid var(--color-accent-rose)' : '1px solid var(--color-border)',
                    padding: 0,
                    opacity: activeImageIndex === idx ? 1 : 0.7,
                    transition: 'all 0.2s'
                  }}
                >
                  <img src={img} alt={`View ${idx + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </button>
              ))}
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
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
              <Link to={`/category/${product.categoryId}`} className="badge badge-rose">
                {product.categoryName}
              </Link>
              <span className="badge badge-primary">
                {product.type === 'flavour' ? 'Taste Division' : 'Scent Division'}
              </span>
              <span style={{ fontSize: '0.8rem', fontFamily: 'monospace', color: 'var(--color-text-light)', background: '#F0ECE9', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>
                SKU: {product.sku || `SKFF-${product.id.toUpperCase()}`}
              </span>
              <span 
                style={{ 
                  fontSize: '0.8rem', 
                  fontWeight: 600, 
                  marginLeft: 'auto',
                  padding: '0.25rem 0.75rem',
                  borderRadius: 'var(--radius-full)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  ...getAvailabilityBadgeStyle(availability)
                }}
              >
                ● {availability}
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
                {product.demoRating || 4.8}
              </span>
              <span className="rating-count">({product.reviewCount || 24} customer evaluations)</span>
              <span style={{ margin: '0 0.5rem', color: 'var(--color-border)' }}>|</span>
              <span style={{ fontSize: '0.8rem', color: 'var(--color-text-light)' }}>
                MOQ: {product.minimumOrderQuantity || product.minOrderQuantity || '5 kg'}
              </span>
            </div>

            {/* Pricing / Quote Box */}
            <div style={{ background: 'var(--color-bg-ivory)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '1.25rem', marginBottom: '1.5rem' }}>
              {product.quoteRequired ? (
                <div>
                  <span style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--color-accent-rose)' }}>
                    Commercial Quotation Required
                  </span>
                  <p style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', marginTop: '0.25rem' }}>
                    Due to bespoke matrix compatibility and batch compounding parameters, official volume pricing is provided via Request a Quote.
                  </p>
                </div>
              ) : (
                <div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.65rem' }}>
                    <span style={{ fontSize: '1.8rem', fontWeight: 700, color: 'var(--color-primary-dark)' }}>
                      ₹{(product.price || product.demoPrice).toLocaleString('en-IN')}
                    </span>
                    {product.originalPrice && (
                      <span style={{ fontSize: '1rem', color: 'var(--color-text-light)', textDecoration: 'line-through' }}>
                        ₹{product.originalPrice.toLocaleString('en-IN')}
                      </span>
                    )}
                    <span style={{ fontSize: '0.8rem', color: 'var(--color-accent-rose)', fontWeight: 600 }}>
                      Demo Rate / {selectedPackSize}
                    </span>
                  </div>
                  <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '0.35rem' }}>
                    *Illustrative B2B demonstration pricing. Official commercial pricing is determined by order volume, delivery location, and proforma terms.
                  </p>
                </div>
              )}
            </div>

            {/* Facility Dispatch & Lead Time Indicator */}
            <div style={{
              padding: '0.75rem 1rem',
              borderRadius: 'var(--radius-md)',
              marginBottom: '1.5rem',
              fontSize: '0.84rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.65rem',
              background: isOutOfStock ? 'rgba(198, 40, 40, 0.05)' : isAvailableOnRequest ? 'rgba(245, 158, 11, 0.07)' : 'rgba(46, 125, 50, 0.05)',
              border: `1px solid ${isOutOfStock ? 'rgba(198, 40, 40, 0.2)' : isAvailableOnRequest ? 'rgba(245, 158, 11, 0.2)' : 'rgba(46, 125, 50, 0.2)'}`,
              color: isOutOfStock ? '#C62828' : isAvailableOnRequest ? '#92400E' : '#2E7D32'
            }}>
              {isOutOfStock ? (
                <>
                  <AlertCircle size={18} style={{ flexShrink: 0 }} />
                  <span>
                    <strong>Currently Out of Stock:</strong> Immediate dispatch unavailable. Add to Cart is disabled. You can submit an evaluation sample request or RFQ for upcoming production runs.
                  </span>
                </>
              ) : isAvailableOnRequest ? (
                <>
                  <CheckCircle2 size={18} style={{ flexShrink: 0 }} />
                  <span>
                    <strong>Compounded to Order:</strong> Manufactured at our Boisar plant. Typical lead time: 3–5 working days. Request a pilot evaluation sample below.
                  </span>
                </>
              ) : (
                <>
                  <CheckCircle2 size={18} style={{ flexShrink: 0 }} />
                  <span>
                    <strong>In Stock at Boisar Facility:</strong> Ready for immediate dispatch. Typical dispatch lead time: 24–48 hours from order confirmation.
                  </span>
                </>
              )}
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

            {/* Short & Detailed Description */}
            <p style={{ fontSize: '0.95rem', fontWeight: 500, color: 'var(--color-primary-dark)', marginBottom: '0.5rem' }}>
              {product.shortDescription || product.shortDesc}
            </p>
            <p className="product-detail-desc" style={{ marginBottom: '1.5rem' }}>
              {product.description || product.fullDesc}
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
            <div className="quantity-add-row" style={{ flexWrap: 'wrap', gap: '0.75rem' }}>
              <div className="quantity-stepper">
                <button type="button" onClick={() => setQuantity(Math.max(1, quantity - 1))} disabled={isOutOfStock}>-</button>
                <input 
                  type="number" 
                  min="1" 
                  value={quantity} 
                  disabled={isOutOfStock}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))} 
                />
                <button type="button" onClick={() => setQuantity(quantity + 1)} disabled={isOutOfStock}>+</button>
              </div>

              {isOutOfStock ? (
                <button 
                  type="button" 
                  className="btn btn-secondary btn-lg"
                  disabled
                  style={{ flex: 1, minWidth: '160px', opacity: 0.55, cursor: 'not-allowed' }}
                  title="Formulation is currently out of stock — immediate purchase disabled"
                >
                  <ShoppingBag size={18} />
                  <span>Out of Stock</span>
                </button>
              ) : (
                <button 
                  type="button" 
                  className="btn btn-primary btn-lg"
                  onClick={handleAddToCart}
                  style={{ flex: 1, minWidth: '160px' }}
                >
                  <ShoppingBag size={18} />
                  <span>Add to Cart</span>
                </button>
              )}

              <button 
                type="button" 
                className="btn btn-secondary btn-lg"
                onClick={() => setIsSampleModalOpen(true)}
                style={{ minWidth: '160px', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
                title="Request official laboratory evaluation sample"
              >
                <FlaskConical size={17} color="var(--color-accent-rose)" />
                <span>Request Sample</span>
              </button>

              <button 
                type="button" 
                className="btn btn-rose btn-lg"
                onClick={handleRequestQuote}
              >
                <Send size={16} />
                <span>Request Quote</span>
              </button>

              <button 
                type="button" 
                className={`product-wishlist-btn ${isSaved ? 'active' : ''}`}
                onClick={handleToggleWishlist}
                style={{ position: 'static', width: '48px', height: '48px' }}
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

        {/* Technical Specifications, Applications, Packaging, Storage Section */}
        <div style={{ marginTop: '3rem', marginBottom: '4rem' }}>
          <div style={{ display: 'flex', borderBottom: '1px solid var(--color-border)', gap: '1.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
            <button 
              style={{ padding: '0.75rem 0', fontWeight: 700, fontSize: '0.95rem', color: activeTab === 'specs' ? 'var(--color-accent-rose)' : 'var(--color-text-muted)', borderBottom: activeTab === 'specs' ? '2px solid var(--color-accent-rose)' : 'none', cursor: 'pointer' }}
              onClick={() => setActiveTab('specs')}
            >
              Product Specifications
            </button>
            <button 
              style={{ padding: '0.75rem 0', fontWeight: 700, fontSize: '0.95rem', color: activeTab === 'applications' ? 'var(--color-accent-rose)' : 'var(--color-text-muted)', borderBottom: activeTab === 'applications' ? '2px solid var(--color-accent-rose)' : 'none', cursor: 'pointer' }}
              onClick={() => setActiveTab('applications')}
            >
              Applications &amp; Dosages
            </button>
            <button 
              style={{ padding: '0.75rem 0', fontWeight: 700, fontSize: '0.95rem', color: activeTab === 'packaging' ? 'var(--color-accent-rose)' : 'var(--color-text-muted)', borderBottom: activeTab === 'packaging' ? '2px solid var(--color-accent-rose)' : 'none', cursor: 'pointer' }}
              onClick={() => setActiveTab('packaging')}
            >
              Packaging &amp; MOQs
            </button>
            <button 
              style={{ padding: '0.75rem 0', fontWeight: 700, fontSize: '0.95rem', color: activeTab === 'storage' ? 'var(--color-accent-rose)' : 'var(--color-text-muted)', borderBottom: activeTab === 'storage' ? '2px solid var(--color-accent-rose)' : 'none', cursor: 'pointer' }}
              onClick={() => setActiveTab('storage')}
            >
              Storage &amp; Handling
            </button>
          </div>

          {activeTab === 'specs' && (
            <div className="spec-table-container">
              <table className="spec-table">
                <tbody>
                  <tr>
                    <th>Appearance &amp; Form</th>
                    <td>{product.specifications?.appearance || 'Standard Free-Flowing Liquid'}</td>
                  </tr>
                  <tr>
                    <th>Solubility &amp; Dispersion</th>
                    <td>{product.specifications?.solubility || 'Water & Oil Soluble'}</td>
                  </tr>
                  <tr>
                    <th>Recommended Dosage Rate</th>
                    <td>{product.specifications?.recommendedDosage || '0.10% – 0.35%'}</td>
                  </tr>
                  <tr>
                    <th>Shelf Life Retention</th>
                    <td>{product.specifications?.shelfLife || '24 Months in original sealed container'}</td>
                  </tr>
                  <tr>
                    <th>Recommended Storage</th>
                    <td>{product.specifications?.storageCondition || 'Cool, dry environment (15°C - 25°C)'}</td>
                  </tr>
                  <tr>
                    <th>Regulatory &amp; Quality Status</th>
                    <td>{product.specifications?.status || 'FSSAI / IFRA Compliant'}</td>
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
          )}

          {activeTab === 'applications' && (
            <div style={{ background: '#FFFFFF', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '2rem', lineHeight: 1.7, fontSize: '0.92rem', color: 'var(--color-text-muted)' }}>
              <h4 style={{ color: 'var(--color-primary-dark)', marginBottom: '0.75rem' }}>Recommended Applications for {product.name}</h4>
              <p style={{ marginBottom: '1.25rem' }}>
                Formulated and validated across our pilot-scale application lines in Mumbai and Boisar to ensure maximum aromatic release and thermal stability.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
                {(product.suggestedApplications || product.applications || []).map((app, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'var(--color-bg-ivory)', padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
                    <CheckCircle2 size={16} color="#2E7D32" />
                    <span style={{ fontWeight: 600, color: 'var(--color-primary-dark)' }}>{app}</span>
                  </div>
                ))}
              </div>
              <p style={{ fontSize: '0.85rem' }}>
                Need dosage optimization for custom matrices (e.g. sugar-reduced beverage or high-protein dough)? <Link to="/request-quote" style={{ color: 'var(--color-accent-rose)', fontWeight: 600 }}>Consult our Flavour Specialists →</Link>
              </p>
            </div>
          )}

          {activeTab === 'packaging' && (
            <div style={{ background: '#FFFFFF', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '2rem', lineHeight: 1.7, fontSize: '0.92rem', color: 'var(--color-text-muted)' }}>
              <h4 style={{ color: 'var(--color-primary-dark)', marginBottom: '0.75rem' }}>Standard Packaging Options</h4>
              <p style={{ marginBottom: '1rem' }}>
                All SKFF shipments use high-density fluorinated HDPE containers, UN-certified food-grade drums, or stainless steel barrels sealed with tamper-evident security closures.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
                <div style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', padding: '1rem', textAlign: 'center' }}>
                  <strong style={{ display: 'block', color: 'var(--color-primary-dark)' }}>1 kg Sample</strong>
                  <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>Aluminium or HDPE Canister</span>
                </div>
                <div style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', padding: '1rem', textAlign: 'center' }}>
                  <strong style={{ display: 'block', color: 'var(--color-primary-dark)' }}>5 kg &amp; 25 kg</strong>
                  <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>Food-Grade HDPE Carboys</span>
                </div>
                <div style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', padding: '1rem', textAlign: 'center' }}>
                  <strong style={{ display: 'block', color: 'var(--color-primary-dark)' }}>200 kg Barrel</strong>
                  <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>Epoxy-Lined Steel Drums</span>
                </div>
              </div>
              <p style={{ fontSize: '0.85rem' }}>
                <strong>Minimum Order Quantity (MOQ):</strong> {product.minimumOrderQuantity || product.minOrderQuantity || '5 kg'}. Sample canisters (1 kg) available for verified formulation laboratories.
              </p>
            </div>
          )}

          {activeTab === 'storage' && (
            <div style={{ background: '#FFFFFF', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '2rem', lineHeight: 1.7, fontSize: '0.92rem', color: 'var(--color-text-muted)' }}>
              <h4 style={{ color: 'var(--color-primary-dark)', marginBottom: '0.75rem' }}>Storage &amp; Stability Guidelines</h4>
              <p style={{ marginBottom: '1rem' }}>
                To preserve volatile aromatic esters and prevent photochemical oxidation:
              </p>
              <ul style={{ paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.5rem' }}>
                <li>Store in original sealed containers in a cool, well-ventilated warehouse (recommended: 15°C to 25°C).</li>
                <li>Protect from direct sunlight, open flames, and prolonged exposure to atmospheric humidity.</li>
                <li>Once opened, reseal tightly under nitrogen headspace if available, or consume within 90 days.</li>
                <li>Shelf Life: {product.specifications?.shelfLife || '24 Months from manufacturing date under recommended storage.'}</li>
              </ul>
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
        {/* Request Sample Modal */}
        <RequestSampleModal 
          isOpen={isSampleModalOpen}
          onClose={() => setIsSampleModalOpen(false)}
          product={product}
          initialSampleSize={selectedPackSize}
        />
      </div>
    </div>
  );
};

export default ProductDetails;
