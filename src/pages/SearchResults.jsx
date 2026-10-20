import React, { useMemo, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb';
import ProductGrid from '../components/ProductGrid';
import { PRODUCTS } from '../data/products';
import { Search, ArrowUpDown } from 'lucide-react';

const SearchResults = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [localQuery, setLocalQuery] = useState(query);
  const [sortBy, setSortBy] = useState('featured');

  const matchingProducts = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase().trim();
    return PRODUCTS.filter(p => 
      p.name.toLowerCase().includes(q) ||
      p.categoryName.toLowerCase().includes(q) ||
      p.shortDesc.toLowerCase().includes(q) ||
      (p.sensoryProfile || '').toLowerCase().includes(q) ||
      (p.type || '').toLowerCase().includes(q)
    );
  }, [query]);

  const sortedResults = useMemo(() => {
    const list = [...matchingProducts];
    switch (sortBy) {
      case 'price-low':
        return list.sort((a, b) => a.demoPrice - b.demoPrice);
      case 'price-high':
        return list.sort((a, b) => b.demoPrice - a.demoPrice);
      case 'name-asc':
        return list.sort((a, b) => a.name.localeCompare(b.name));
      case 'rating':
        return list.sort((a, b) => b.demoRating - a.demoRating);
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

  return (
    <div className="search-results-page" style={{ paddingBottom: '5rem' }}>
      <div className="container">
        <Breadcrumb items={[{ label: 'Search Results' }]} />

        <div style={{ padding: '2rem 0 3rem' }}>
          <span className="eyebrow">CATALOGUE SEARCH</span>
          <h1 style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)', color: 'var(--color-primary-dark)', marginBottom: '1.25rem' }}>
            Results for: "{query}"
          </h1>

          {/* Search Bar Form */}
          <form onSubmit={handleSearchSubmit} style={{ maxWidth: '600px', display: 'flex', gap: '0.75rem', marginBottom: '2rem' }}>
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', background: '#FFFFFF', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-full)', padding: '0.65rem 1.25rem', gap: '0.5rem', boxShadow: 'var(--shadow-sm)' }}>
              <Search size={18} color="var(--color-text-light)" />
              <input
                type="text"
                placeholder="Search flavours, fragrances, categories..."
                value={localQuery}
                onChange={(e) => setLocalQuery(e.target.value)}
                style={{ border: 'none', background: 'transparent', outline: 'none', width: '100%', fontSize: '0.95rem' }}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Search
            </button>
          </form>

          {/* Controls Bar */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', background: '#FFFFFF', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', padding: '0.75rem 1.25rem', marginBottom: '2rem' }}>
            <span style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
              Found <strong>{sortedResults.length}</strong> matching formulation{sortedResults.length !== 1 ? 's' : ''}
            </span>

            <div className="sort-dropdown-box">
              <ArrowUpDown size={14} />
              <label htmlFor="searchSortSelect" style={{ fontSize: '0.8rem', fontWeight: 600 }}>Sort:</label>
              <select 
                id="searchSortSelect" 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="featured">Featured First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name-asc">Name: A to Z</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>

          {/* Grid */}
          <ProductGrid products={sortedResults} />
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
