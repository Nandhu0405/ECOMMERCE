import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb';
import ProductGrid from '../components/ProductGrid';
import { PRODUCTS } from '../data/products';
import { CATEGORIES, FLAVOUR_CATEGORIES, FRAGRANCE_CATEGORIES } from '../data/categories';
import { Download, FileText, Printer, CheckCircle2, Sparkles, Send } from 'lucide-react';
import { useToast } from '../context/ToastContext';

const ProductCatalogue = () => {
  const { addToast } = useToast();
  const [selectedCat, setSelectedCat] = useState('all');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'table'

  const filteredProducts = selectedCat === 'all' 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.categoryId === selectedCat);

  const handleDownloadDemo = () => {
    addToast('Generating SKFF B2B Commercial Product Catalogue PDF (Demonstration)...', 'info');
    setTimeout(() => {
      window.print();
    }, 600);
  };

  return (
    <div className="catalogue-index-page" style={{ paddingBottom: '5rem' }}>
      <div className="container">
        <Breadcrumb items={[{ label: 'Product Catalogue' }]} />

        {/* Header */}
        <div style={{ padding: '2.5rem 0 3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1.5rem' }}>
          <div>
            <span className="eyebrow">OFFICIAL B2B REPOSITORY</span>
            <h1 style={{ fontSize: 'clamp(2.2rem, 4vw, 3.5rem)', color: 'var(--color-primary-dark)', marginBottom: '0.75rem' }}>
              Commercial Product Catalogue
            </h1>
            <p style={{ fontSize: '1.05rem', color: 'var(--color-text-muted)', maxWidth: '750px', lineHeight: 1.7 }}>
              Browse all 112 commercial flavours and fragrance formulations manufactured by SKFF (INDIA) PVT. LTD. Filter by category, review technical specifications, and request batch evaluation samples.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button className="btn btn-secondary" onClick={handleDownloadDemo}>
              <Printer size={15} />
              <span>Print / Save PDF</span>
            </button>
            <Link to="/enquiry" className="btn btn-rose">
              <Send size={15} />
              <span>Bulk RFQ</span>
            </Link>
          </div>
        </div>

        {/* Category Selector Tabs */}
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '2.5rem', paddingBottom: '1rem', borderBottom: '1px solid var(--color-border)' }}>
          <button 
            className={`pack-size-chip ${selectedCat === 'all' ? 'active' : ''}`}
            onClick={() => setSelectedCat('all')}
          >
            All Categories ({PRODUCTS.length})
          </button>
          {CATEGORIES.map(cat => (
            <button 
              key={cat.id}
              className={`pack-size-chip ${selectedCat === cat.id ? 'active' : ''}`}
              onClick={() => setSelectedCat(cat.id)}
            >
              {cat.name} ({PRODUCTS.filter(p => p.categoryId === cat.id).length})
            </button>
          ))}
        </div>

        {/* View Toggle */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <span style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
            Showing <strong>{filteredProducts.length}</strong> Products in {selectedCat === 'all' ? 'All Categories' : CATEGORIES.find(c => c.id === selectedCat)?.name}
          </span>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button 
              className={`btn btn-sm ${viewMode === 'grid' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setViewMode('grid')}
            >
              Grid View
            </button>
            <button 
              className={`btn btn-sm ${viewMode === 'table' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setViewMode('table')}
            >
              Table View
            </button>
          </div>
        </div>

        {/* Grid vs Table View */}
        {viewMode === 'grid' ? (
          <ProductGrid products={filteredProducts} />
        ) : (
          <div style={{ background: '#FFFFFF', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', overflowX: 'auto', boxShadow: 'var(--shadow-sm)' }}>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Product Name</th>
                  <th>Category</th>
                  <th>Sensory / Fragrance Notes</th>
                  <th>Pack Sizes</th>
                  <th>MOQ</th>
                  <th>Demo Rate (INR)</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map(p => (
                  <tr key={p.id}>
                    <td>
                      <Link to={`/product/${p.slug}`} style={{ fontWeight: 600, color: 'var(--color-primary-dark)' }}>
                        {p.name}
                      </Link>
                    </td>
                    <td>
                      <span className="badge badge-rose">{p.categoryName}</span>
                    </td>
                    <td style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', maxWidth: '280px' }}>
                      {p.sensoryProfile || p.shortDesc}
                    </td>
                    <td style={{ fontSize: '0.8rem' }}>{p.packSizes.join(', ')}</td>
                    <td style={{ fontSize: '0.8rem', fontWeight: 600 }}>{p.minOrderQuantity}</td>
                    <td style={{ fontWeight: 700 }}>₹{p.demoPrice.toLocaleString('en-IN')}</td>
                    <td>
                      <Link 
                        to={`/enquiry?product=${encodeURIComponent(p.name)}&category=${encodeURIComponent(p.categoryName)}`}
                        className="btn btn-secondary btn-sm"
                        style={{ padding: '0.35rem 0.65rem' }}
                      >
                        RFQ
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCatalogue;
