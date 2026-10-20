import React, { useState, useMemo, useEffect } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb';
import ProductGrid from '../components/ProductGrid';
import ProductFilters from '../components/ProductFilters';
import { CATEGORIES, FLAVOUR_CATEGORIES, FRAGRANCE_CATEGORIES } from '../data/categories';
import { PRODUCTS } from '../data/products';
import { Filter, X, ArrowUpDown, Search, PackageCheck } from 'lucide-react';

const CategoryPage = ({ overrideType = null }) => {
  const { slug } = useParams();
  const location = useLocation();

  // Determine active view context
  let currentCategory = null;
  let pageTitle = 'Commercial Product Catalogue';
  let pageEyebrow = 'SKFF B2B Portfolio';
  let pageDesc = 'Explore our complete industrial portfolio of 112 flavour and fragrance formulations.';
  let bannerImg = null;

  if (slug) {
    currentCategory = CATEGORIES.find(c => c.slug === slug);
    if (currentCategory) {
      pageTitle = currentCategory.name;
      pageEyebrow = currentCategory.type === 'flavour' ? 'Flavour Solutions' : 'Fragrance Creations';
      pageDesc = currentCategory.description;
      bannerImg = currentCategory.bannerImage;
    }
  } else if (overrideType === 'flavour' || location.pathname === '/flavours') {
    pageTitle = 'Flavour Solutions';
    pageEyebrow = 'Taste Creations Since 1922';
    pageDesc = 'Explore our 7 specialized flavour divisions crafted for confectionery, dairy, bakery, beverages, culinary, pharmaceuticals, and health drinks.';
    bannerImg = FLAVOUR_CATEGORIES[0]?.bannerImage;
  } else if (overrideType === 'fragrance' || location.pathname === '/fragrances') {
    pageTitle = 'Fragrance Solutions';
    pageEyebrow = 'Scent Creations from Grasse to Mumbai';
    pageDesc = 'Explore our 4 fragrance divisions: Home Care, Personal Care, Fabric Care, and Fine Fragrances crafted with century-old perfumery excellence.';
    bannerImg = FRAGRANCE_CATEGORIES[0]?.bannerImage;
  }

  // State for Filters & Search
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState(
    currentCategory ? [currentCategory.id] : []
  );
  const [selectedType, setSelectedType] = useState(
    currentCategory ? currentCategory.type : (overrideType || 'all')
  );
  const [priceRange, setPriceRange] = useState([1000, 5000]);
  const [selectedPackSizes, setSelectedPackSizes] = useState([]);
  const [selectedAvailability, setSelectedAvailability] = useState([]);
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState('featured');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(12);

  // Synchronize when route slug changes
  useEffect(() => {
    if (currentCategory) {
      setSelectedCategories([currentCategory.id]);
      setSelectedType(currentCategory.type);
    } else if (overrideType) {
      setSelectedType(overrideType);
      setSelectedCategories([]);
    } else {
      setSelectedCategories([]);
      setSelectedType('all');
    }
    setSearchTerm('');
    setVisibleCount(12);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [slug, overrideType, location.pathname]);

  // Filtering Logic
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(product => {
      // Division type
      if (selectedType !== 'all' && product.type !== selectedType) {
        return false;
      }

      // Specific Category
      if (selectedCategories.length > 0 && !selectedCategories.includes(product.categoryId)) {
        return false;
      }

      // Search term
      if (searchTerm.trim()) {
        const q = searchTerm.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(q);
        const matchesCategory = product.categoryName.toLowerCase().includes(q);
        const matchesDesc = product.shortDesc.toLowerCase().includes(q);
        const matchesNotes = (product.sensoryProfile || '').toLowerCase().includes(q);
        if (!matchesName && !matchesCategory && !matchesDesc && !matchesNotes) {
          return false;
        }
      }

      // Price range (demo price)
      if (product.demoPrice < priceRange[0] || product.demoPrice > priceRange[1]) {
        return false;
      }

      // Pack size
      if (selectedPackSizes.length > 0) {
        const hasMatchingPack = product.packSizes.some(size => selectedPackSizes.includes(size));
        if (!hasMatchingPack) return false;
      }

      // Availability
      if (selectedAvailability.length > 0 && !selectedAvailability.includes(product.availability)) {
        return false;
      }

      // Rating
      if (minRating > 0 && product.demoRating < minRating) {
        return false;
      }

      return true;
    });
  }, [selectedType, selectedCategories, searchTerm, priceRange, selectedPackSizes, selectedAvailability, minRating]);

  // Sorting Logic
  const sortedProducts = useMemo(() => {
    const list = [...filteredProducts];
    switch (sortBy) {
      case 'bestselling':
        return list.sort((a, b) => (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0) || b.reviewCount - a.reviewCount);
      case 'name-asc':
        return list.sort((a, b) => a.name.localeCompare(b.name));
      case 'name-desc':
        return list.sort((a, b) => b.name.localeCompare(a.name));
      case 'price-low':
        return list.sort((a, b) => a.demoPrice - b.demoPrice);
      case 'price-high':
        return list.sort((a, b) => b.demoPrice - a.demoPrice);
      case 'rating':
        return list.sort((a, b) => b.demoRating - a.demoRating);
      case 'featured':
      default:
        return list.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
    }
  }, [filteredProducts, sortBy]);

  const displayedProducts = sortedProducts.slice(0, visibleCount);

  // Toggle helpers
  const handleToggleCategory = (catId) => {
    setSelectedCategories(prev => 
      prev.includes(catId) ? prev.filter(c => c !== catId) : [...prev, catId]
    );
  };

  const handleTogglePackSize = (size) => {
    setSelectedPackSizes(prev =>
      prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
    );
  };

  const handleToggleAvailability = (status) => {
    setSelectedAvailability(prev =>
      prev.includes(status) ? prev.filter(s => s !== status) : [...prev, status]
    );
  };

  const handleClearAll = () => {
    setSelectedCategories(currentCategory ? [currentCategory.id] : []);
    setSelectedType(currentCategory ? currentCategory.type : (overrideType || 'all'));
    setSearchTerm('');
    setPriceRange([1000, 5000]);
    setSelectedPackSizes([]);
    setSelectedAvailability([]);
    setMinRating(0);
    setSortBy('featured');
  };

  // Breadcrumbs items
  const breadcrumbItems = [];
  if (currentCategory) {
    breadcrumbItems.push({
      label: currentCategory.type === 'flavour' ? 'Flavours' : 'Fragrances',
      url: currentCategory.type === 'flavour' ? '/flavours' : '/fragrances'
    });
    breadcrumbItems.push({ label: currentCategory.name });
  } else if (overrideType === 'flavour') {
    breadcrumbItems.push({ label: 'Flavours' });
  } else if (overrideType === 'fragrance') {
    breadcrumbItems.push({ label: 'Fragrances' });
  } else {
    breadcrumbItems.push({ label: 'Product Catalogue' });
  }

  return (
    <div className="catalogue-page" style={{ paddingBottom: '5rem' }}>
      <div className="container">
        <Breadcrumb items={breadcrumbItems} />

        {/* Hero Category Banner */}
        <section className="category-hero-banner" aria-label="Category Overview">
          {bannerImg && (
            <img src={bannerImg} alt={pageTitle} className="category-banner-bg" />
          )}
          <div className="category-banner-overlay"></div>
          <div className="category-banner-content">
            <span className="eyebrow" style={{ color: 'var(--color-accent-soft-rose)' }}>
              {pageEyebrow}
            </span>
            <h1>{pageTitle}</h1>
            <p>{pageDesc}</p>
          </div>
        </section>

        {/* Main Catalogue Layout */}
        <div className="catalogue-layout">
          {/* Desktop Filter Sidebar */}
          <ProductFilters
            selectedCategories={selectedCategories}
            onToggleCategory={handleToggleCategory}
            selectedType={selectedType}
            onSelectType={setSelectedType}
            priceRange={priceRange}
            onPriceChange={setPriceRange}
            selectedPackSizes={selectedPackSizes}
            onTogglePackSize={handleTogglePackSize}
            selectedAvailability={selectedAvailability}
            onToggleAvailability={handleToggleAvailability}
            minRating={minRating}
            onSelectRating={setMinRating}
            onClearAll={handleClearAll}
          />

          {/* Main Product Area */}
          <main className="catalogue-main">
            {/* Toolbar: Search & Sort */}
            <div className="catalogue-toolbar">
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                <span className="results-count-text">
                  Showing <strong>{displayedProducts.length}</strong> of <strong>{sortedProducts.length}</strong> Products
                </span>

                {/* Inline Search Input */}
                <div style={{ display: 'flex', alignItems: 'center', background: 'var(--color-bg-ivory)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-full)', padding: '0.35rem 0.75rem', gap: '0.4rem' }}>
                  <Search size={14} color="var(--color-text-light)" />
                  <input
                    type="text"
                    placeholder="Search in this view..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{ border: 'none', background: 'transparent', outline: 'none', fontSize: '0.8rem', width: '150px' }}
                  />
                  {searchTerm && (
                    <button onClick={() => setSearchTerm('')} style={{ fontSize: '0.8rem', color: 'var(--color-text-light)' }}>
                      ×
                    </button>
                  )}
                </div>
              </div>

              <div className="toolbar-controls">
                {/* Mobile Filter Button */}
                <button 
                  className="btn-mobile-filter-trigger"
                  onClick={() => setIsMobileFilterOpen(true)}
                  aria-label="Open filter drawer"
                >
                  <Filter size={14} />
                  <span>Filters</span>
                </button>

                {/* Sort Dropdown */}
                <div className="sort-dropdown-box">
                  <ArrowUpDown size={14} />
                  <label htmlFor="sortSelect" style={{ fontSize: '0.8rem', fontWeight: 600 }}>Sort:</label>
                  <select 
                    id="sortSelect" 
                    value={sortBy} 
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    <option value="featured">Featured First</option>
                    <option value="bestselling">Best Selling (Demo)</option>
                    <option value="name-asc">Name: A to Z</option>
                    <option value="name-desc">Name: Z to A</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Active Filter Chips */}
            {(selectedCategories.length > 0 || selectedPackSizes.length > 0 || selectedAvailability.length > 0 || minRating > 0 || searchTerm) && (
              <div className="active-chips-container">
                <span style={{ fontSize: '0.75rem', color: 'var(--color-text-light)', fontWeight: 600, textTransform: 'uppercase' }}>
                  Active Filters:
                </span>

                {searchTerm && (
                  <span className="filter-chip">
                    Search: "{searchTerm}"
                    <button onClick={() => setSearchTerm('')}>×</button>
                  </span>
                )}

                {selectedCategories.map(catId => {
                  const cat = CATEGORIES.find(c => c.id === catId);
                  return (
                    <span key={catId} className="filter-chip">
                      {cat ? cat.name : catId}
                      <button onClick={() => handleToggleCategory(catId)}>×</button>
                    </span>
                  );
                })}

                {selectedPackSizes.map(size => (
                  <span key={size} className="filter-chip">
                    Pack: {size}
                    <button onClick={() => handleTogglePackSize(size)}>×</button>
                  </span>
                ))}

                {selectedAvailability.map(status => (
                  <span key={status} className="filter-chip">
                    Status: {status}
                    <button onClick={() => handleToggleAvailability(status)}>×</button>
                  </span>
                ))}

                {minRating > 0 && (
                  <span className="filter-chip">
                    Rating: {minRating}★+
                    <button onClick={() => setMinRating(0)}>×</button>
                  </span>
                )}

                <button 
                  onClick={handleClearAll}
                  style={{ fontSize: '0.78rem', color: 'var(--color-accent-rose)', textDecoration: 'underline', marginLeft: '0.5rem', fontWeight: 600 }}
                >
                  Clear All
                </button>
              </div>
            )}

            {/* Product Grid */}
            <ProductGrid 
              products={displayedProducts} 
              onClearFilters={handleClearAll}
            />

            {/* Load More Button */}
            {visibleCount < sortedProducts.length && (
              <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
                <button 
                  className="btn btn-secondary btn-lg"
                  onClick={() => setVisibleCount(prev => prev + 12)}
                >
                  Load More Products ({sortedProducts.length - visibleCount} Remaining)
                </button>
              </div>
            )}
          </main>
        </div>

        {/* Mobile Filter Modal Drawer */}
        <div 
          className={`mobile-filter-modal ${isMobileFilterOpen ? 'open' : ''}`}
          onClick={() => setIsMobileFilterOpen(false)}
        >
          <div className="mobile-filter-content" onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', paddingBottom: '0.75rem', borderBottom: '1px solid var(--color-border)' }}>
              <h3 style={{ fontSize: '1.2rem', fontFamily: 'var(--font-heading)' }}>Filter Products</h3>
              <button onClick={() => setIsMobileFilterOpen(false)} aria-label="Close filter modal">
                <X size={20} />
              </button>
            </div>

            <ProductFilters
              selectedCategories={selectedCategories}
              onToggleCategory={handleToggleCategory}
              selectedType={selectedType}
              onSelectType={setSelectedType}
              priceRange={priceRange}
              onPriceChange={setPriceRange}
              selectedPackSizes={selectedPackSizes}
              onTogglePackSize={handleTogglePackSize}
              selectedAvailability={selectedAvailability}
              onToggleAvailability={handleToggleAvailability}
              minRating={minRating}
              onSelectRating={setMinRating}
              onClearAll={handleClearAll}
            />

            <button 
              className="btn btn-rose btn-block"
              onClick={() => setIsMobileFilterOpen(false)}
              style={{ marginTop: '1.5rem' }}
            >
              Apply Filters ({sortedProducts.length} Results)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
