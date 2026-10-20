import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, Layers, CheckCircle2, Plus } from 'lucide-react';
import { categories as initialCategories } from '../data/categories';
import { products } from '../data/products';
import { useToast } from '../context/ToastContext';

const AdminCategories = () => {
  const [categoriesList, setCategoriesList] = useState(initialCategories);
  const { addToast } = useToast();

  const getProductCount = (categoryName) => {
    return products.filter((p) => p.category === categoryName).length;
  };

  const handleToggleStatus = (id, currentStatus) => {
    addToast(`Category status updated to ${currentStatus ? 'Hidden' : 'Active'} (Demo simulation)`, 'info');
  };

  return (
    <div className="admin-categories-view">
      <div className="admin-card">
        <div className="admin-card-header">
          <div>
            <h3>Official Category Groups (11 Divisions)</h3>
            <p style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>
              7 Flavours categories and 4 Fragrance categories conforming to SKFF B2B manufacturing scope.
            </p>
          </div>
          <button
            onClick={() => addToast('Category group creation is restricted to sensory division leads in demo mode', 'info')}
            className="btn btn-outline btn-sm"
          >
            <Plus size={16} /> New Category Group
          </button>
        </div>

        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Code</th>
                <th>Category Title</th>
                <th>Primary Division</th>
                <th>Active Formulations</th>
                <th>Typical Packaging</th>
                <th>Live Route</th>
                <th>Operational Status</th>
              </tr>
            </thead>
            <tbody>
              {categoriesList.map((cat, idx) => {
                const count = getProductCount(cat.name);
                return (
                  <tr key={cat.id}>
                    <td><strong>CAT-0{idx + 1}</strong></td>
                    <td>
                      <div style={{ fontWeight: 600 }}>{cat.name}</div>
                      <div style={{ fontSize: '0.75rem', color: '#777' }}>
                        {cat.description?.slice(0, 70)}...
                      </div>
                    </td>
                    <td>
                      <span style={{
                        fontSize: '0.75rem',
                        padding: '0.2rem 0.5rem',
                        borderRadius: '4px',
                        background: cat.division === 'Fragrances' ? '#FCE4EC' : '#FFF3E0',
                        color: cat.division === 'Fragrances' ? '#C2185B' : '#E65100',
                        fontWeight: 600
                      }}>
                        {cat.division}
                      </span>
                    </td>
                    <td>
                      <strong>{count}</strong> formulations
                    </td>
                    <td>25 kg / 200 kg Drums</td>
                    <td>
                      <Link
                        to={`/category/${cat.slug}`}
                        target="_blank"
                        rel="noreferrer"
                        style={{ color: 'var(--color-accent-rose)', display: 'inline-flex', alignItems: 'center', gap: '0.25rem', fontWeight: 600, fontSize: '0.82rem' }}
                      >
                        /{cat.slug} <ExternalLink size={12} />
                      </Link>
                    </td>
                    <td>
                      <span style={{
                        fontSize: '0.75rem',
                        padding: '0.2rem 0.6rem',
                        borderRadius: '999px',
                        background: '#E8F5E9',
                        color: '#2E7D32',
                        fontWeight: 700,
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.3rem'
                      }}>
                        <CheckCircle2 size={12} /> Active B2B Scope
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminCategories;
