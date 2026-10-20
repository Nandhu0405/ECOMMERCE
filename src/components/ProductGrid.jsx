import React, { useState } from 'react';
import ProductCard from './ProductCard';
import QuickViewModal from './QuickViewModal';
import { PackageSearch } from 'lucide-react';

const ProductGrid = ({ products = [], onClearFilters }) => {
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  if (products.length === 0) {
    return (
      <div className="catalogue-empty-state">
        <div className="empty-state-icon">
          <PackageSearch size={32} />
        </div>
        <h3 style={{ marginBottom: '0.5rem', fontFamily: 'var(--font-heading)' }}>
          No Products Found
        </h3>
        <p style={{ maxWidth: '420px', margin: '0 auto 1.5rem', fontSize: '0.9rem' }}>
          We could not find any products matching your selected search or filter criteria. Try clearing some filters or searching for another term.
        </p>
        {onClearFilters && (
          <button className="btn btn-secondary" onClick={onClearFilters}>
            Clear All Filters
          </button>
        )}
      </div>
    );
  }

  return (
    <>
      <div className="product-grid">
        {products.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            onQuickView={(p) => setQuickViewProduct(p)}
          />
        ))}
      </div>

      {quickViewProduct && (
        <QuickViewModal
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
        />
      )}
    </>
  );
};

export default ProductGrid;
