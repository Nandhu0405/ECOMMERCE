import React, { useMemo, useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb';
import ProductGrid from '../components/ProductGrid';
import { PRODUCTS } from '../data/products';
import { CATEGORIES } from '../data/categories';
import { Search, ArrowUpDown, X, Sparkles, PackageSearch } from 'lucide-react';

const SearchResults = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [localQuery, setLocalQuery] = useState(query);
  const [selectedType, setSelectedType] = useState('all'); // 'all' | 'flavour' | 'fragrance'
  const [sortBy, setSortBy] = useState('featured');

  useEffect(() => {
    setLocalQuery(query);
  }, [query]);

  // Search across Product name, SKU/product code, Category, Flavour type, Fragrance type, Application
  const matchingProducts = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase().trim();

    return PRODUCTS.filter(p => {
      // Type filter
      if (selectedType !== 'all' && p.type !== selectedType) {
        return false;
      }

      const nameMatch = p.name.toLowerCase().includes(q);
      const skuMatch = (p.sku || p.id || '').toLowerCase().includes(q);
      const catMatch = (p.categoryName || '').toLowerCase().includes(q);
      const descMatch = (p.shortDescription || p.shortDesc || '').toLowerCase().includes(q);
      const profileMatch = (p.sensoryProfile || '').toLowerCase().includes(q);
      const typeMatch = (p.type || '').toLowerCase().includes(q);

      // Search across applications
      const applications = p.suggestedApplications || p.applications || [];
      const appMatch = applications.some(app => app.toLowerCase().includes(q));

      // Fragrance pyramid notes
      const notesMatch = p.fragranceNotes 
        ? Object.values(p.fragranceNotes).some(val => (val || '').toLowerCase().includes(q))
        : false;

      return nameMatch || skuMatch || catMatch || descMatch || profileMatch || typeMatch || appMatch || notesMatch;
    });
  }, [query, selectedType]);

  const sortedResults = useMemo(() => {
    const list = [...matchingProducts];
    switch (sortBy) {
      case 'price-low':
        return list.sort((a, b) => (a.price || a.demoPrice || 0) - (b.price || b.demoPrice || 0));
      case 'price-high':
        return list.sort((a, b) => (b.price || b.demoPrice || 0) - (a.price || a.demoPrice || 0));
      case 'name-asc':
        return list.sort((a, b) => a.name.localeCompare(b.name));
      case 'rating':
        return list.sort((a, b) => (b.demoRating || 0) - (a.demoRating || 0));
      case 'featured':
      default:
        return list.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
    }
  }, [matchingProducts, sortBy]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (localQuery.trim()) {
      setSearchParams({ q: localQuery.trim() });
    }
  };

  const handleClearSearch = () => {
    setLocalQuery('');
    setSearchParams({});
    setSelectedType('all');
  };

  return (
    <div className="search-results-page" style={{ paddingBottom: '6rem' }}>
      <div className="container">
        <Breadcrumb items={[{ label: 'Home', url: '/' }, { label: 'Search Results' }]} />

        <div style={{ padding: '2rem 0 2.5rem' }}>
          <span className="eyebrow">CATALOGUE SEARCH</span>
          <h1 style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)', color: 'var(--color-primary-dark)', marginBottom: '0.75rem' }}>
            {query.trim() ? `Search Results for "${query}"` : 'Search Product Catalogue'}
          </h1>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem' }}>
            Search across commercial product names, SKU codes, categories, flavour systems, fragrance pyramids, and industrial applications.
          </p>
        </div>

        {/* Search Input Bar with Clear button */}
        <form onSubmit={handleSearchSubmit} style={{ maxWidth: '640px', display: 'flex', gap: '0.75rem', marginBottom: '2rem' }}>
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', background: '#FFFFFF', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-full)', padding: '0.65rem 1.25rem', gap: '0.5rem', boxShadow: 'var(--shadow-sm)' }}>
            <Search size={18} color="var(--color-text-light)" />
            <input
              type="text"
              placeholder="Search flavours, fragrances, SKU codes (e.g. SKFF-CF), applications..."
              value={localQuery}
              onChange={(e) => setLocalQuery(e.target.value)}
              style={{ border: 'none', background: 'transparent', outline: 'none', width: '100%', fontSize: '0.95rem' }}
            />
            {localQuery && (
              <button 
                type="button" 
                onClick={handleClearSearch} 
                style={{ color: 'var(--color-text-light)', cursor: 'pointer' }}
                title="Clear search"
              >
                <X size={16} />
              </button>
            )}
          </div>
          <button type="submit" className="btn btn-primary">
            Search
          </button>
        </form>

        {/* Controls Bar: Type Filters & Sorting */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', background: '#FFFFFF', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', padding: '0.75rem 1.25rem', marginBottom: '2rem', boxShadow: 'var(--shadow-sm)' }}>
          {/* Quick Division Filters */}
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-text-light)' }}>Division:</span>
            <button
              type="button"
              className={`pack-size-chip ${selectedType === 'all' ? 'active' : ''}`}
              onClick={() => setSelectedType('all')}
              style={{ fontSize: '0.75rem', padding: '0.25rem 0.65rem' }}
            >
              All ({matchingProducts.length})
            </button>
            <button
              type="button"
              className={`pack-size-chip ${selectedType === 'flavour' ? 'active' : ''}`}
              onClick={() => setSelectedType('flavour')}
              style={{ fontSize: '0.75rem', padding: '0.25rem 0.65rem' }}
            >
              Flavours
            </button>
            <button
              type="button"
              className={`pack-size-chip ${selectedType === 'fragrance' ? 'active' : ''}`}
              onClick={() => setSelectedType('fragrance')}
              style={{ fontSize: '0.75rem', padding: '0.25rem 0.65rem' }}
            >
              Fragrances
            </button>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
              Found <strong>{sortedResults.length}</strong> matching formulation{sortedResults.length !== 1 ? 's' : ''}
            </span>

            <div className="sort-dropdown-box" style={{ margin: 0 }}>
              <ArrowUpDown size={14} />
              <label htmlFor="searchSortSelect" style={{ fontSize: '0.8rem', fontWeight: 600 }}>Sort:</label>
              <select 
                id="searchSortSelect" 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="featured">Featured First</option>
                <option value="name-asc">Name: A to Z</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results or Empty State */}
        {sortedResults.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '5rem 1rem', background: '#FFFFFF', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-xl)', maxWidth: '640px', margin: '2rem auto' }}>
            <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'var(--color-bg-ivory)', color: 'var(--color-text-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem' }}>
              <PackageSearch size={30} />
            </div>
            <h2 style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-primary-dark)', marginBottom: '0.5rem' }}>
              No Formulations Found
            </h2>
            <p style={{ color: 'var(--color-text-muted)', marginBottom: '1.75rem', lineHeight: 1.6 }}>
              We could not find any flavour or fragrance matches for "<strong>{query}</strong>". Try checking for spelling errors, using broader keywords, or exploring our full catalogue index.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              <button className="btn btn-secondary" onClick={handleClearSearch}>
                Clear Search
              </button>
              <Link to="/products" className="btn btn-primary">
                Browse Complete Catalogue
              </Link>
            </div>
          </div>
        ) : (
          <ProductGrid products={sortedResults} onClearFilters={handleClearSearch} />
        )}
      </div>
    </div>
  );
};

export default SearchResults;
