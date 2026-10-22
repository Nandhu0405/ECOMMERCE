import React, { useState, useMemo, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb';
import ProductGrid from '../components/ProductGrid';
import { PRODUCTS, getProductAvailability } from '../data/products';
import { CATEGORIES, FLAVOUR_CATEGORIES, FRAGRANCE_CATEGORIES } from '../data/categories';
import { Download, Printer, Search, ArrowUpDown, Filter, X, ChevronLeft, ChevronRight, Send } from 'lucide-react';
import { useToast } from '../context/ToastContext';

const ITEMS_PER_PAGE = 12;

const ProductCatalogue = () => {
  const { addToast } = useToast();
  const [searchParams, setSearchParams] = useSearchParams();

  // Search and Filter States
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [selectedDivision, setSelectedDivision] = useState('all'); // 'all' | 'flavour' | 'fragrance'
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'all');
  const [selectedAvailability, setSelectedAvailability] = useState('all'); // 'all' | 'In Stock' | 'Available on Request' | 'Out of Stock'
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'table'
  const [currentPage, setCurrentPage] = useState(1);

  // Sync category param
  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) setSelectedCategory(cat);
  }, [searchParams]);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedDivision, selectedCategory, selectedAvailability, sortBy]);

  // Filtering Logic
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(product => {
      // Division filter
      if (selectedDivision !== 'all' && product.type !== selectedDivision) {
        return false;
      }

      // Category filter
      if (selectedCategory !== 'all' && product.categoryId !== selectedCategory) {
        return false;
      }

      // Availability filter
      const avail = getProductAvailability(product);
      if (selectedAvailability !== 'all' && avail !== selectedAvailability) {
        return false;
      }

      // Search query (matches name, category, SKU, shortDesc, sensory profile)
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = product.name.toLowerCase().includes(q);
        const matchesCat = product.categoryName.toLowerCase().includes(q);
        const matchesSku = (product.sku || product.id || '').toLowerCase().includes(q);
        const matchesDesc = (product.shortDesc || '').toLowerCase().includes(q);
        const matchesSensory = (product.sensoryProfile || '').toLowerCase().includes(q);
        if (!matchesName && !matchesCat && !matchesSku && !matchesDesc && !matchesSensory) {
          return false;
        }
      }

      return true;
    });
  }, [searchQuery, selectedDivision, selectedCategory, selectedAvailability]);

  // Sorting Logic
  const sortedProducts = useMemo(() => {
    const list = [...filteredProducts];
    switch (sortBy) {
      case 'price-low':
        return list.sort((a, b) => (a.price || a.demoPrice || 0) - (b.price || b.demoPrice || 0));
      case 'price-high':
        return list.sort((a, b) => (b.price || b.demoPrice || 0) - (a.price || a.demoPrice || 0));
      case 'name-asc':
        return list.sort((a, b) => a.name.localeCompare(b.name));
      case 'name-desc':
        return list.sort((a, b) => b.name.localeCompare(a.name));
      case 'rating':
        return list.sort((a, b) => (b.demoRating || 0) - (a.demoRating || 0));
      case 'featured':
      default:
        return list.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
    }
  }, [filteredProducts, sortBy]);

  // Pagination Logic
  const totalPages = Math.ceil(sortedProducts.length / ITEMS_PER_PAGE) || 1;
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return sortedProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [sortedProducts, currentPage]);

  const handleClearAllFilters = () => {
    setSearchQuery('');
    setSelectedDivision('all');
    setSelectedCategory('all');
    setSelectedAvailability('all');
    setSortBy('featured');
    setCurrentPage(1);
    setSearchParams({});
  };

  const handleDownloadDemo = () => {
    addToast('Generating SKFF B2B Commercial Product Catalogue PDF (Demonstration)...', 'info');
    setTimeout(() => {
      window.print();
    }, 600);
  };

  return (
    <div className="catalogue-index-page" style={{ paddingBottom: '6rem' }}>
      <div className="container">
        <Breadcrumb items={[{ label: 'Home', url: '/' }, { label: 'All Products' }]} />

        {/* Page Header */}
        <div style={{ padding: '2.5rem 0 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1.5rem' }}>
          <div>
            <span className="eyebrow">OFFICIAL B2B REPOSITORY</span>
            <h1 style={{ fontSize: 'clamp(2.2rem, 4vw, 3.5rem)', color: 'var(--color-primary-dark)', marginBottom: '0.75rem' }}>
              Complete Product Catalogue
            </h1>
            <p style={{ fontSize: '1.05rem', color: 'var(--color-text-muted)', maxWidth: '750px', lineHeight: 1.7 }}>
              Browse all 112 commercial flavours and fragrance formulations manufactured by SKFF (INDIA) PVT. LTD. Filter by sensory division, review specifications, and request evaluation samples.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button className="btn btn-secondary" onClick={handleDownloadDemo}>
              <Printer size={15} />
              <span>Print / Save PDF</span>
            </button>
            <Link to="/request-quote" className="btn btn-rose">
              <Send size={15} />
              <span>Request Quote</span>
            </Link>
          </div>
        </div>

        {/* Division Filter Pills */}
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
          <button
            type="button"
            className={`pack-size-chip ${selectedDivision === 'all' ? 'active' : ''}`}
            onClick={() => { setSelectedDivision('all'); setSelectedCategory('all'); }}
          >
            All Divisions ({PRODUCTS.length})
          </button>
          <button
            type="button"
            className={`pack-size-chip ${selectedDivision === 'flavour' ? 'active' : ''}`}
            onClick={() => { setSelectedDivision('flavour'); setSelectedCategory('all'); }}
          >
            Flavour Division (70)
          </button>
          <button
            type="button"
            className={`pack-size-chip ${selectedDivision === 'fragrance' ? 'active' : ''}`}
            onClick={() => { setSelectedDivision('fragrance'); setSelectedCategory('all'); }}
          >
            Fragrance Division (42)
          </button>
        </div>

        {/* Category Horizontal Filter Chips */}
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '2rem', paddingBottom: '1rem', borderBottom: '1px solid var(--color-border)' }}>
          <button 
            type="button"
            className={`pack-size-chip ${selectedCategory === 'all' ? 'active' : ''}`}
            onClick={() => setSelectedCategory('all')}
          >
            All Categories
          </button>
          {CATEGORIES
            .filter(c => selectedDivision === 'all' || c.type === selectedDivision)
            .map(cat => (
              <button 
                key={cat.id}
                type="button"
                className={`pack-size-chip ${selectedCategory === cat.id ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat.id)}
              >
                {cat.name} ({PRODUCTS.filter(p => p.categoryId === cat.id).length})
              </button>
            ))}
        </div>

        {/* Availability Filter Chips */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.75rem' }}>
          <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--color-text-muted)', marginRight: '0.25rem' }}>
            Filter by Availability:
          </span>
          {[
            { id: 'all', label: 'All Statuses' },
            { id: 'In Stock', label: 'In Stock', color: '#2E7D32' },
            { id: 'Available on Request', label: 'Available on Request', color: '#B45309' },
            { id: 'Out of Stock', label: 'Out of Stock', color: '#C62828' }
          ].map(status => {
            const count = status.id === 'all' 
              ? PRODUCTS.length 
              : PRODUCTS.filter(p => getProductAvailability(p) === status.id).length;
            return (
              <button
                key={status.id}
                type="button"
                className={`pack-size-chip ${selectedAvailability === status.id ? 'active' : ''}`}
                onClick={() => setSelectedAvailability(status.id)}
                style={selectedAvailability === status.id ? {} : { borderColor: 'rgba(0,0,0,0.1)' }}
              >
                {status.color && <span style={{ color: status.color, marginRight: '4px' }}>●</span>}
                {status.label}
                <span style={{ fontSize: '0.72rem', opacity: 0.75, marginLeft: '4px' }}>
                  ({count})
                </span>
              </button>
            );
          })}
        </div>

        {/* Search, Sort, View Controls Bar */}
        <div style={{ background: '#FFFFFF', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-xl)', padding: '1rem 1.5rem', marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', boxShadow: 'var(--shadow-sm)' }}>
          {/* Search Input Box */}
          <div style={{ display: 'flex', alignItems: 'center', background: 'var(--color-bg-ivory)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-full)', padding: '0.5rem 1rem', width: '100%', maxWidth: '360px', gap: '0.5rem' }}>
            <Search size={16} color="var(--color-text-light)" />
            <input
              type="text"
              placeholder="Search by name, SKU, or profile..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ border: 'none', background: 'transparent', outline: 'none', width: '100%', fontSize: '0.88rem' }}
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} style={{ color: 'var(--color-text-light)' }}>
                <X size={14} />
              </button>
            )}
          </div>

          {/* Result Count */}
          <span style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)' }}>
            Showing <strong>{paginatedProducts.length}</strong> of <strong>{sortedProducts.length}</strong> Products
          </span>

          {/* Right Controls: Sort Dropdown & Grid/Table Toggle */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <div className="sort-dropdown-box" style={{ margin: 0 }}>
              <ArrowUpDown size={14} />
              <label htmlFor="catalogueSort" style={{ fontSize: '0.8rem', fontWeight: 600 }}>Sort:</label>
              <select
                id="catalogueSort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="featured">Featured Benchmarks</option>
                <option value="name-asc">Name: A to Z</option>
                <option value="name-desc">Name: Z to A</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>

            <div style={{ display: 'flex', gap: '0.35rem' }}>
              <button 
                type="button"
                className={`btn btn-sm ${viewMode === 'grid' ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setViewMode('grid')}
              >
                Grid
              </button>
              <button 
                type="button"
                className={`btn btn-sm ${viewMode === 'table' ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setViewMode('table')}
              >
                Table
              </button>
            </div>
          </div>
        </div>

        {/* Active Filters Display */}
        {(searchQuery || selectedCategory !== 'all' || selectedDivision !== 'all') && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--color-text-light)', fontWeight: 600 }}>Active Filters:</span>
            {selectedDivision !== 'all' && (
              <span className="badge badge-rose">
                Division: {selectedDivision}
                <button onClick={() => setSelectedDivision('all')} style={{ marginLeft: '4px', cursor: 'pointer' }}>×</button>
              </span>
            )}
            {selectedCategory !== 'all' && (
              <span className="badge badge-rose">
                Category: {CATEGORIES.find(c => c.id === selectedCategory)?.name || selectedCategory}
                <button onClick={() => setSelectedCategory('all')} style={{ marginLeft: '4px', cursor: 'pointer' }}>×</button>
              </span>
            )}
            {searchQuery && (
              <span className="badge badge-rose">
                "{searchQuery}"
                <button onClick={() => setSearchQuery('')} style={{ marginLeft: '4px', cursor: 'pointer' }}>×</button>
              </span>
            )}
            <button 
              onClick={handleClearAllFilters}
              style={{ fontSize: '0.78rem', color: 'var(--color-accent-rose)', fontWeight: 600, textDecoration: 'underline' }}
            >
              Clear All
            </button>
          </div>
        )}

        {/* Products View: Grid vs Table */}
        {viewMode === 'grid' ? (
          <ProductGrid products={paginatedProducts} onClearFilters={handleClearAllFilters} />
        ) : (
          <div style={{ background: '#FFFFFF', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-xl)', overflowX: 'auto', boxShadow: 'var(--shadow-sm)' }}>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>SKU</th>
                  <th>Category</th>
                  <th>Sensory Notes</th>
                  <th>Pack Sizes</th>
                  <th>MOQ</th>
                  <th>Rate</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedProducts.map(p => (
                  <tr key={p.id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <img 
                          src={p.image} 
                          alt={p.name} 
                          style={{ width: '44px', height: '44px', borderRadius: 'var(--radius-sm)', objectFit: 'cover' }} 
                        />
                        <div>
                          <Link to={`/product/${p.slug}`} style={{ fontWeight: 600, color: 'var(--color-primary-dark)', fontSize: '0.9rem' }}>
                            {p.name}
                          </Link>
                          {(() => {
                            const avail = getProductAvailability(p);
                            const color = avail === 'Out of Stock' ? '#C62828' : avail === 'Available on Request' ? '#B45309' : '#2E7D32';
                            return (
                              <span style={{ display: 'block', fontSize: '0.72rem', color, fontWeight: 600 }}>
                                ● {avail}
                              </span>
                            );
                          })()}
                        </div>
                      </div>
                    </td>
                    <td style={{ fontFamily: 'monospace', fontSize: '0.8rem', color: 'var(--color-text-light)' }}>
                      {p.sku || `SKFF-${p.id.toUpperCase()}`}
                    </td>
                    <td>
                      <span className="badge badge-rose">{p.categoryName}</span>
                    </td>
                    <td style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', maxWidth: '240px' }}>
                      {p.sensoryProfile || p.shortDesc}
                    </td>
                    <td style={{ fontSize: '0.8rem' }}>{p.packSizes?.join(', ')}</td>
                    <td style={{ fontSize: '0.8rem', fontWeight: 600 }}>{p.minOrderQuantity}</td>
                    <td style={{ fontWeight: 700 }}>
                      {p.quoteRequired ? 'RFQ' : `₹${(p.price || p.demoPrice).toLocaleString('en-IN')}`}
                    </td>
                    <td>
                      <Link 
                        to={`/product/${p.slug}`}
                        className="btn btn-secondary btn-xs"
                      >
                        Details
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', marginTop: '3.5rem' }}>
            <button
              className="btn btn-secondary btn-sm"
              disabled={currentPage === 1}
              onClick={() => {
                setCurrentPage(p => Math.max(1, p - 1));
                window.scrollTo({ top: 350, behavior: 'smooth' });
              }}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', opacity: currentPage === 1 ? 0.5 : 1 }}
            >
              <ChevronLeft size={16} />
              <span>Previous</span>
            </button>

            {[...Array(totalPages)].map((_, i) => {
              const pageNum = i + 1;
              return (
                <button
                  key={pageNum}
                  className={`btn btn-sm ${currentPage === pageNum ? 'btn-primary' : 'btn-secondary'}`}
                  onClick={() => {
                    setCurrentPage(pageNum);
                    window.scrollTo({ top: 350, behavior: 'smooth' });
                  }}
                  style={{ minWidth: '38px', padding: '0.45rem 0.65rem' }}
                >
                  {pageNum}
                </button>
              );
            })}

            <button
              className="btn btn-secondary btn-sm"
              disabled={currentPage === totalPages}
              onClick={() => {
                setCurrentPage(p => Math.min(totalPages, p + 1));
                window.scrollTo({ top: 350, behavior: 'smooth' });
              }}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', opacity: currentPage === totalPages ? 0.5 : 1 }}
            >
              <span>Next</span>
              <ChevronRight size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCatalogue;
