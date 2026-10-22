import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { 
  Search, Heart, ShoppingBag, User, Menu, X, ChevronDown, 
  ArrowRight, Phone, Mail, Sparkles, Coffee, Cake, Cookie, 
  Utensils, Wine, Pill, Droplet, Home as HomeIcon, Sparkle, Shirt, Compass
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { PRODUCTS } from '../data/products';
import { FLAVOUR_CATEGORIES, FRAGRANCE_CATEGORIES } from '../data/categories';
import logoImg from '../assets/skff-logo.png';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { totalItems, setIsCartOpen } = useCart();
  const { totalWishlistItems } = useWishlist();

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileFlavoursOpen, setMobileFlavoursOpen] = useState(false);
  const [mobileFragrancesOpen, setMobileFragrancesOpen] = useState(false);
  const [mobileResourcesOpen, setMobileResourcesOpen] = useState(false);

  const searchRef = useRef(null);

  // Close menus on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsSearchOpen(false);
  }, [location.pathname]);

  // Handle outside click for search
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Live search filtering
  useEffect(() => {
    if (searchQuery.trim().length > 1) {
      const q = searchQuery.toLowerCase();
      const matches = PRODUCTS.filter(
        p => p.name.toLowerCase().includes(q) || 
             p.categoryName.toLowerCase().includes(q) ||
             p.shortDesc.toLowerCase().includes(q)
      ).slice(0, 5);
      setSearchResults(matches);
      setIsSearchOpen(true);
    } else {
      setSearchResults([]);
      setIsSearchOpen(false);
    }
  }, [searchQuery]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearchOpen(false);
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="announcement-bar" role="region" aria-label="Announcement">
        <div className="announcement-container">
          <div className="announcement-message">
            <span className="gold-tag">✨ 100+ YEARS OF EXCELLENCE</span>
            <span>• BESPOKE TASTE &amp; SCENT CREATION SINCE 1922 • PASSION TO PERFORM</span>
          </div>
          <div className="announcement-contact">
            <a href="tel:+912242866600" title="Call SKFF Head Office">
              <Phone size={13} />
              <span>+91-22-4286 6600</span>
            </a>
            <a href="mailto:info@skff.co.in" title="Email Business Enquiries">
              <Mail size={13} />
              <span>info@skff.co.in</span>
            </a>
            <Link to="/enquiry" style={{ color: 'var(--color-accent-rose)', fontWeight: 600 }}>
              <span>B2B Sample Request →</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Corporate Header */}
      <header className="main-header" role="banner">
        <div className="container header-container">
          {/* Logo & Branding */}
          <Link to="/" className="brand-logo-link" title="SKFF (INDIA) PVT. LTD.">
            <img 
              src={logoImg} 
              alt="SKFF (INDIA) PVT. LTD. Logo" 
              className="brand-logo-img"
              onError={(e) => {
                e.target.style.display = 'none';
                const parent = e.target.parentElement;
                if (!parent.querySelector('.brand-logo-fallback')) {
                  const fallback = document.createElement('div');
                  fallback.className = 'brand-logo-fallback';
                  fallback.innerHTML = `<span style="font-weight:800; font-size:1.4rem; letter-spacing:0.05em; color:#111;">SKFF</span><span style="font-size:0.65rem; color:#E85D75; display:block; letter-spacing:0.2em;">SINCE 1922</span>`;
                  parent.appendChild(fallback);
                }
              }}
            />
            <div className="brand-logo-text">
              <span className="brand-title">SKFF (INDIA) PVT. LTD.</span>
              <span className="brand-tagline">Passion to Perform</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="main-nav" role="navigation" aria-label="Main Navigation">
            <div className="nav-item">
              <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                Home
              </NavLink>
            </div>

            {/* Flavours Mega Menu Dropdown */}
            <div className="nav-item">
              <NavLink 
                to="/flavours" 
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                aria-haspopup="true"
              >
                <span>Flavours</span>
                <ChevronDown size={14} />
              </NavLink>
              <div className="mega-menu menu-flavours" role="menu">
                <div className="mega-menu-header">
                  <div>
                    <h4 className="mega-menu-title">Flavour Solutions</h4>
                    <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                      Crafted for confectionery, dairy, bakery, beverages, culinary, pharmaceuticals &amp; nutrition.
                    </p>
                  </div>
                  <Link to="/flavours" className="mega-menu-view-all">
                    All Flavours <ArrowRight size={14} />
                  </Link>
                </div>
                <div className="mega-menu-grid">
                  {FLAVOUR_CATEGORIES.map(cat => (
                    <Link 
                      key={cat.id} 
                      to={`/category/${cat.slug}`} 
                      className="mega-menu-item"
                      role="menuitem"
                    >
                      <div className="mega-item-icon">
                        {cat.id === 'confectionery' && <Cookie size={18} />}
                        {cat.id === 'dairy' && <Droplet size={18} />}
                        {cat.id === 'bakery' && <Cake size={18} />}
                        {cat.id === 'culinary-savory' && <Utensils size={18} />}
                        {cat.id === 'beverages' && <Wine size={18} />}
                        {cat.id === 'pharmaceuticals' && <Pill size={18} />}
                        {cat.id === 'instant-health-drinks' && <Coffee size={18} />}
                      </div>
                      <div className="mega-item-content">
                        <h5>{cat.name}</h5>
                        <p>{cat.shortDesc}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Fragrances Mega Menu Dropdown */}
            <div className="nav-item">
              <NavLink 
                to="/fragrances" 
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                aria-haspopup="true"
              >
                <span>Fragrances</span>
                <ChevronDown size={14} />
              </NavLink>
              <div className="mega-menu menu-fragrances" role="menu">
                <div className="mega-menu-header">
                  <div>
                    <h4 className="mega-menu-title">Fragrance Creations</h4>
                    <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                      Home care, personal care, fabric care and fine fragrances with the legacy of Grasse.
                    </p>
                  </div>
                  <Link to="/fragrances" className="mega-menu-view-all">
                    All Fragrances <ArrowRight size={14} />
                  </Link>
                </div>
                <div className="mega-menu-grid">
                  {FRAGRANCE_CATEGORIES.map(cat => (
                    <Link 
                      key={cat.id} 
                      to={`/category/${cat.slug}`} 
                      className="mega-menu-item"
                      role="menuitem"
                    >
                      <div className="mega-item-icon">
                        {cat.id === 'home-care' && <HomeIcon size={18} />}
                        {cat.id === 'personal-care' && <Sparkles size={18} />}
                        {cat.id === 'fabric-care' && <Shirt size={18} />}
                        {cat.id === 'fine-fragrances' && <Compass size={18} />}
                      </div>
                      <div className="mega-item-content">
                        <h5>{cat.name}</h5>
                        <p>{cat.shortDesc}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <div className="nav-item">
              <NavLink to="/products" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                Products
              </NavLink>
            </div>

            <div className="nav-item">
              <NavLink to="/contact" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                Contact
              </NavLink>
            </div>

            {/* Resources / More Menu Dropdown */}
            <div className="nav-item">
              <span className="nav-link" style={{ cursor: 'pointer' }} aria-haspopup="true">
                <span>More</span>
                <ChevronDown size={14} />
              </span>
              <div className="mega-menu menu-resources" role="menu">
                <div className="mega-menu-header">
                  <h4 className="mega-menu-title">Enterprise &amp; Science</h4>
                </div>
                <div className="mega-menu-grid" style={{ gridTemplateColumns: '1fr' }}>
                  <Link to="/industries" className="mega-menu-item" role="menuitem">
                    <div className="mega-item-icon">🏭</div>
                    <div className="mega-item-content">
                      <h5>Industries Served</h5>
                      <p>Solutions for food, beverage, personal care &amp; pharma</p>
                    </div>
                  </Link>
                  <Link to="/company-profile" className="mega-menu-item" role="menuitem">
                    <div className="mega-item-icon">🏢</div>
                    <div className="mega-item-content">
                      <h5>Company Profile</h5>
                      <p>Corporate infrastructure, Boisar plant &amp; accreditation</p>
                    </div>
                  </Link>
                  <Link to="/specifications" className="mega-menu-item" role="menuitem">
                    <div className="mega-item-icon">🔬</div>
                    <div className="mega-item-content">
                      <h5>Product Specifications</h5>
                      <p>Technical parameters, solubility &amp; dosage standards</p>
                    </div>
                  </Link>
                  <Link to="/faq" className="mega-menu-item" role="menuitem">
                    <div className="mega-item-icon">❓</div>
                    <div className="mega-item-content">
                      <h5>FAQs</h5>
                      <p>Frequently asked questions on sampling &amp; ordering</p>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </nav>

          {/* Header Action Controls */}
          <div className="header-actions">
            {/* Search Bar with Autocomplete */}
            <div className="header-search-wrapper" ref={searchRef}>
              <form onSubmit={handleSearchSubmit} className="search-input-box">
                <Search size={16} color="var(--color-text-light)" />
                <input 
                  type="text" 
                  placeholder="Search catalogue..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => searchQuery.trim().length > 1 && setIsSearchOpen(true)}
                  aria-label="Search catalogue"
                />
              </form>

              {/* Autocomplete Popup */}
              {isSearchOpen && searchResults.length > 0 && (
                <div className="search-results-dropdown">
                  <div style={{ fontSize: '0.72rem', color: 'var(--color-text-light)', marginBottom: '0.5rem', textTransform: 'uppercase', fontWeight: 700 }}>
                    Matching Products ({searchResults.length})
                  </div>
                  {searchResults.map(p => (
                    <Link
                      key={p.id}
                      to={`/product/${p.slug}`}
                      className="search-result-item"
                      onClick={() => setIsSearchOpen(false)}
                    >
                      <img src={p.image} alt={p.name} />
                      <div className="search-result-info">
                        <h6>{p.name}</h6>
                        <span>{p.categoryName} • ₹{p.demoPrice.toLocaleString('en-IN')}</span>
                      </div>
                    </Link>
                  ))}
                  <div style={{ borderTop: '1px solid var(--color-border)', marginTop: '0.5rem', paddingTop: '0.5rem', textAlign: 'center' }}>
                    <button 
                      onClick={handleSearchSubmit}
                      style={{ fontSize: '0.75rem', color: 'var(--color-accent-rose)', fontWeight: 600 }}
                    >
                      View all search results →
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Account Link */}
            <Link to="/account" className="action-icon-btn" title="Account / Profile">
              <User size={19} />
            </Link>

            {/* Wishlist Link with Live Badge */}
            <Link to="/wishlist" className="action-icon-btn" title="Saved Wishlist">
              <Heart size={19} />
              {totalWishlistItems > 0 && (
                <span className="badge-count">{totalWishlistItems}</span>
              )}
            </Link>

            {/* Cart Button with Live Badge */}
            <button 
              className="action-icon-btn" 
              onClick={() => setIsCartOpen(true)} 
              title="Shopping Cart &amp; Samples"
              aria-label="Shopping Cart"
            >
              <ShoppingBag size={19} />
              {totalItems > 0 && (
                <span className="badge-count">{totalItems}</span>
              )}
            </button>

            {/* Visible Quote CTA Button */}
            <Link to="/request-quote" className="btn btn-rose btn-header-quote">
              Request Quote
            </Link>

            {/* Mobile Menu Hamburger */}
            <button 
              className="mobile-menu-toggle"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open mobile navigation menu"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <div 
        className={`mobile-nav-drawer ${isMobileMenuOpen ? 'open' : ''}`}
        onClick={() => setIsMobileMenuOpen(false)}
      >
        <div className="drawer-panel" onClick={(e) => e.stopPropagation()}>
          <div className="drawer-header">
            <div className="brand-logo-text">
              <span className="brand-title">SKFF</span>
              <span className="brand-tagline">Passion to Perform</span>
            </div>
            <button 
              className="drawer-close-btn"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label="Close mobile menu"
            >
              <X size={22} />
            </button>
          </div>

          <div className="mobile-nav-links">
            <NavLink to="/" className="mobile-sublink" onClick={() => setIsMobileMenuOpen(false)}>
              Home
            </NavLink>
            {/* Mobile Accordion: Flavours */}
            <div>
              <button 
                className="mobile-accordion-header"
                onClick={() => setMobileFlavoursOpen(!mobileFlavoursOpen)}
              >
                <span>Flavours ({FLAVOUR_CATEGORIES.length})</span>
                <ChevronDown size={16} style={{ transform: mobileFlavoursOpen ? 'rotate(180deg)' : 'none', transition: '0.2s' }} />
              </button>
              {mobileFlavoursOpen && (
                <div className="mobile-accordion-body">
                  <Link to="/flavours" className="mobile-sublink" style={{ fontWeight: 600, color: 'var(--color-accent-rose)' }}>
                    • Explore All Flavours
                  </Link>
                  {FLAVOUR_CATEGORIES.map(cat => (
                    <Link key={cat.id} to={`/category/${cat.slug}`} className="mobile-sublink">
                      {cat.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Accordion: Fragrances */}
            <div>
              <button 
                className="mobile-accordion-header"
                onClick={() => setMobileFragrancesOpen(!mobileFragrancesOpen)}
              >
                <span>Fragrances ({FRAGRANCE_CATEGORIES.length})</span>
                <ChevronDown size={16} style={{ transform: mobileFragrancesOpen ? 'rotate(180deg)' : 'none', transition: '0.2s' }} />
              </button>
              {mobileFragrancesOpen && (
                <div className="mobile-accordion-body">
                  <Link to="/fragrances" className="mobile-sublink" style={{ fontWeight: 600, color: 'var(--color-accent-rose)' }}>
                    • Explore All Fragrances
                  </Link>
                  {FRAGRANCE_CATEGORIES.map(cat => (
                    <Link key={cat.id} to={`/category/${cat.slug}`} className="mobile-sublink">
                      {cat.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <NavLink to="/products" className="mobile-sublink" onClick={() => setIsMobileMenuOpen(false)}>
              Products Catalogue
            </NavLink>
            <NavLink to="/contact" className="mobile-sublink" onClick={() => setIsMobileMenuOpen(false)}>
              Contact Us
            </NavLink>

            {/* Mobile Accordion: Account & Orders */}
            <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '0.5rem', marginTop: '0.5rem' }}>
              <NavLink to="/account" className="mobile-sublink" onClick={() => setIsMobileMenuOpen(false)}>
                👤 Client Account Dashboard
              </NavLink>
              <NavLink to="/orders" className="mobile-sublink" onClick={() => setIsMobileMenuOpen(false)}>
                📦 My Orders &amp; Dispatches
              </NavLink>
              <NavLink to="/quotes" className="mobile-sublink" onClick={() => setIsMobileMenuOpen(false)}>
                📋 My Quote Requests (RFQs)
              </NavLink>
              <NavLink to="/wishlist" className="mobile-sublink" onClick={() => setIsMobileMenuOpen(false)}>
                ❤️ Saved Formulations Wishlist
              </NavLink>
            </div>

            {/* Mobile Accordion: Resources */}
            <div>
              <button 
                className="mobile-accordion-header"
                onClick={() => setMobileResourcesOpen(!mobileResourcesOpen)}
              >
                <span>More Resources</span>
                <ChevronDown size={16} style={{ transform: mobileResourcesOpen ? 'rotate(180deg)' : 'none', transition: '0.2s' }} />
              </button>
              {mobileResourcesOpen && (
                <div className="mobile-accordion-body">
                  <Link to="/industries" className="mobile-sublink">Industries Served</Link>
                  <Link to="/company-profile" className="mobile-sublink">Company Profile</Link>
                  <Link to="/specifications" className="mobile-sublink">Product Specifications</Link>
                  <Link to="/faq" className="mobile-sublink">Frequently Asked Questions</Link>
                </div>
              )}
            </div>
          </div>

          <div className="mobile-drawer-footer">
            <Link to="/request-quote" className="btn btn-rose btn-block" onClick={() => setIsMobileMenuOpen(false)}>
              Request a B2B Quote
            </Link>
            <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', textAlign: 'center' }}>
              Mumbai • Boisar • Grasse • Sharjah
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
