import React from 'react';
import { BarChart3, TrendingUp, PieChart, Download, FileSpreadsheet, Layers, Sparkles } from 'lucide-react';
import { categories } from '../data/categories';
import { products } from '../data/products';
import { useToast } from '../context/ToastContext';

const AdminReports = () => {
  const { addToast } = useToast();

  const handleExport = (format) => {
    addToast(`Exporting demonstration B2B formulation catalogue report (${format})...`, 'info');
    setTimeout(() => {
      addToast(`Demonstration ${format} export generated successfully`, 'success');
    }, 600);
  };

  const flavourCount = products.filter((p) => p.division === 'Flavours').length;
  const fragranceCount = products.filter((p) => p.division === 'Fragrances').length;

  return (
    <div className="admin-reports-view">
      <div className="admin-card">
        <div className="admin-card-header">
          <div>
            <h3>Sensory Portfolio Analytics & Demonstration Reports</h3>
            <p style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>
              Statistical breakdown of SKFF's active B2B formulations and inquiry volumes.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button onClick={() => handleExport('CSV')} className="btn btn-outline btn-sm">
              <Download size={14} /> Export CSV
            </button>
            <button onClick={() => handleExport('PDF')} className="btn btn-primary btn-sm">
              <FileSpreadsheet size={14} /> Export PDF Dossier
            </button>
          </div>
        </div>

        <div style={{ padding: '1.75rem' }}>
          {/* Ratio Progress Bars */}
          <div style={{ marginBottom: '2.5rem' }}>
            <h4 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.75rem' }}>
              Divisional Formulation Distribution
            </h4>
            <div style={{ height: '24px', width: '100%', background: '#F0ECE9', borderRadius: '12px', overflow: 'hidden', display: 'flex' }}>
              <div
                style={{
                  width: `${(flavourCount / products.length) * 100}%`,
                  background: 'var(--color-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFF',
                  fontSize: '0.75rem',
                  fontWeight: 700
                }}
              >
                Flavours ({flavourCount})
              </div>
              <div
                style={{
                  width: `${(fragranceCount / products.length) * 100}%`,
                  background: 'var(--color-accent-rose)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFF',
                  fontSize: '0.75rem',
                  fontWeight: 700
                }}
              >
                Fragrances ({fragranceCount})
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#666', marginTop: '0.5rem' }}>
              <span>7 Flavour Categories: {flavourCount} Formulations (62.5%)</span>
              <span>4 Fragrance Categories: {fragranceCount} Formulations (37.5%)</span>
            </div>
          </div>

          {/* Breakdown Table */}
          <h4 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.75rem' }}>
            Category Volume & Demo Demand Index
          </h4>
          <div className="admin-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Division</th>
                  <th>Formulations</th>
                  <th>Market Applications</th>
                  <th>Demo Demand Index</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((cat) => {
                  const catProducts = products.filter((p) => p.category === cat.name);
                  return (
                    <tr key={cat.id}>
                      <td><strong>{cat.name}</strong></td>
                      <td>{cat.division}</td>
                      <td>{catProducts.length} items</td>
                      <td style={{ fontSize: '0.8rem', color: '#666' }}>{cat.applications?.slice(0, 3).join(', ') || 'Custom'}</td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <div style={{ flex: 1, height: '6px', background: '#EEE', borderRadius: '3px', overflow: 'hidden' }}>
                            <div
                              style={{
                                height: '100%',
                                width: `${Math.min(100, catProducts.length * 9)}%`,
                                background: cat.division === 'Fragrances' ? 'var(--color-accent-rose)' : 'var(--color-accent-gold)'
                              }}
                            />
                          </div>
                          <span style={{ fontSize: '0.75rem', fontWeight: 700 }}>
                            {Math.min(98, catProducts.length * 9)}%
                          </span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminReports;
