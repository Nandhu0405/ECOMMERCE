import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb';
import { FileText, Calendar, Eye, Send, AlertCircle, X, CheckCircle, Clock } from 'lucide-react';

const STATUS_COLORS = {
  'New': '#0288D1',
  'Under Review': '#F57C00',
  'Quoted': '#7B1FA2',
  'Accepted': '#2E7D32',
  'Rejected': '#D32F2F',
  'Completed': '#388E3C'
};

const Quotes = () => {
  const [quotes, setQuotes] = useState([]);
  const [selectedQuote, setSelectedQuote] = useState(null);

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('skff_demo_enquiries') || '[]');
      if (stored.length > 0) {
        setQuotes(stored);
      } else {
        // Initial sample demonstration quotes
        const sampleQuotes = [
          {
            id: 'RFQ-784012',
            date: '20 Oct 2026',
            fullName: 'Dr. Vikram Malhotra',
            companyName: 'Cadbury Kraft Confectionery Division',
            email: 'v.malhotra@cadbury-kraft.demo',
            phone: '+91-98201-44820',
            productName: 'Bourbon Vanilla Bean Extract',
            productCode: 'SKFF-CONF-002',
            category: 'Confectionery',
            requiredQuantity: '500 kg',
            preferredPackSize: '25 kg Drum',
            application: 'Hard Boiled Candies & White Chocolate Bar',
            status: 'Under Review',
            message: 'Need high thermal retention formulation with Certificate of Analysis (COA) for pilot extrusion.'
          },
          {
            id: 'RFQ-783905',
            date: '14 Oct 2026',
            fullName: 'Dr. Vikram Malhotra',
            companyName: 'Cadbury Kraft Confectionery Division',
            email: 'v.malhotra@cadbury-kraft.demo',
            phone: '+91-98201-44820',
            productName: 'Alphonso Mango Essence (Bake-Stable)',
            productCode: 'SKFF-BAKE-004',
            category: 'Bakery',
            requiredQuantity: '100 kg',
            preferredPackSize: '5 kg Can',
            application: 'Fruit Tart Fillings & Wafer Creams',
            status: 'Quoted',
            message: 'Evaluation canisters approved by sensory panel. Requesting formal proforma quotation.'
          }
        ];
        setQuotes(sampleQuotes);
        localStorage.setItem('skff_demo_enquiries', JSON.stringify(sampleQuotes));
      }
    } catch (e) {
      console.warn('Failed to load quotes', e);
    }
  }, []);

  return (
    <div className="quotes-page" style={{ paddingBottom: '6rem' }}>
      <div className="container">
        <Breadcrumb items={[{ label: 'Home', url: '/' }, { label: 'Account', url: '/account' }, { label: 'My Quotes' }]} />

        {/* Header */}
        <div style={{ padding: '2.5rem 0 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <span className="eyebrow">COMMERCIAL RFQ TRACKER</span>
            <h1 style={{ fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', color: 'var(--color-primary-dark)', marginBottom: '0.5rem' }}>
              My Quotation Requests (RFQs)
            </h1>
            <p style={{ color: 'var(--color-text-muted)' }}>
              Review the live evaluation status of your custom compounding and bulk volume price quotes.
            </p>
          </div>
          <Link to="/request-quote" className="btn btn-rose btn-sm">
            <Send size={14} />
            <span>+ Request New Quotation</span>
          </Link>
        </div>

        {/* Demo Notice */}
        <div style={{ background: 'var(--color-bg-ivory)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', padding: '0.85rem 1.25rem', marginBottom: '2rem', fontSize: '0.82rem', color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <AlertCircle size={16} color="var(--color-accent-rose)" />
          <span>
            <strong>Simulated RFQ Portal:</strong> Status updates shown below represent frontend simulation. Official quotations are dispatched via proforma email from SKFF Mumbai.
          </span>
        </div>

        {/* Quotes Table or Empty State */}
        {quotes.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '5rem 1rem', background: '#FFFFFF', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-xl)', maxWidth: '600px', margin: '2rem auto' }}>
            <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'var(--color-bg-ivory)', color: 'var(--color-text-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem' }}>
              <FileText size={28} />
            </div>
            <h2 style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-primary-dark)', marginBottom: '0.5rem' }}>
              No Quotation Requests Found
            </h2>
            <p style={{ color: 'var(--color-text-muted)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
              You haven't requested any custom bulk pricing or formulation quotes yet.
            </p>
            <Link to="/request-quote" className="btn btn-rose">
              Submit Your First B2B RFQ
            </Link>
          </div>
        ) : (
          <div style={{ background: '#FFFFFF', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-xl)', overflow: 'hidden', boxShadow: 'var(--shadow-sm)' }}>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Quote ID</th>
                  <th>Request Date</th>
                  <th>Requested Formulation</th>
                  <th>Quantity / Pack</th>
                  <th>Quote Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {quotes.map((q) => {
                  const statusColor = STATUS_COLORS[q.status] || '#555';
                  return (
                    <tr key={q.id}>
                      <td>
                        <strong style={{ color: 'var(--color-primary-dark)' }}>{q.id}</strong>
                        <span style={{ display: 'block', fontSize: '0.72rem', color: 'var(--color-text-light)' }}>
                          {q.companyName || 'Enterprise Client'}
                        </span>
                      </td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>
                          <Calendar size={13} />
                          <span>{q.date}</span>
                        </div>
                      </td>
                      <td>
                        <strong style={{ color: 'var(--color-primary-dark)', fontSize: '0.9rem' }}>
                          {q.productName || q.category || 'Custom Flavour/Fragrance Solution'}
                        </strong>
                        {q.productCode && (
                          <span style={{ display: 'block', fontSize: '0.72rem', color: 'var(--color-accent-rose)' }}>
                            SKU: {q.productCode}
                          </span>
                        )}
                      </td>
                      <td>
                        <span style={{ fontSize: '0.85rem' }}>
                          {q.requiredQuantity} ({q.preferredPackSize || 'Standard HDPE'})
                        </span>
                      </td>
                      <td>
                        <span 
                          style={{
                            display: 'inline-block',
                            padding: '0.25rem 0.65rem',
                            borderRadius: 'var(--radius-full)',
                            fontSize: '0.75rem',
                            fontWeight: 700,
                            color: statusColor,
                            backgroundColor: `${statusColor}18`,
                            border: `1px solid ${statusColor}33`
                          }}
                        >
                          ● {q.status || 'Under Review'}
                        </span>
                      </td>
                      <td>
                        <button 
                          className="btn btn-secondary btn-xs"
                          onClick={() => setSelectedQuote(q)}
                          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}
                        >
                          <Eye size={13} />
                          <span>View Details</span>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Quote Details Modal */}
        {selectedQuote && (
          <div 
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0,0,0,0.5)',
              backdropFilter: 'blur(4px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1000,
              padding: '1.5rem'
            }}
            onClick={() => setSelectedQuote(null)}
          >
            <div 
              style={{
                background: '#FFFFFF',
                borderRadius: 'var(--radius-xl)',
                maxWidth: '620px',
                width: '100%',
                maxHeight: '90vh',
                overflowY: 'auto',
                padding: '2.5rem',
                boxShadow: 'var(--shadow-luxury)',
                position: 'relative'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setSelectedQuote(null)}
                style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', color: 'var(--color-text-light)' }}
              >
                <X size={20} />
              </button>

              <span className="eyebrow">QUOTATION DOSSIER</span>
              <h2 style={{ fontSize: '1.6rem', color: 'var(--color-primary-dark)', marginBottom: '0.5rem' }}>
                {selectedQuote.id}
              </h2>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginBottom: '1.5rem' }}>
                Requested on {selectedQuote.date} &bull; Status: <strong style={{ color: STATUS_COLORS[selectedQuote.status] || 'var(--color-accent-rose)' }}>{selectedQuote.status}</strong>
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', background: 'var(--color-bg-ivory)', padding: '1.25rem', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem', fontSize: '0.85rem' }}>
                <div>
                  <span style={{ color: 'var(--color-text-light)', display: 'block' }}>Target Product:</span>
                  <strong>{selectedQuote.productName || selectedQuote.category}</strong>
                </div>
                <div>
                  <span style={{ color: 'var(--color-text-light)', display: 'block' }}>Estimated Volume:</span>
                  <strong>{selectedQuote.requiredQuantity}</strong>
                </div>
                <div>
                  <span style={{ color: 'var(--color-text-light)', display: 'block' }}>Packaging Type:</span>
                  <strong>{selectedQuote.preferredPackSize || 'Industrial Pack'}</strong>
                </div>
                <div>
                  <span style={{ color: 'var(--color-text-light)', display: 'block' }}>Target Application:</span>
                  <strong>{selectedQuote.application || 'Food / Beverage / Fragrance Matrix'}</strong>
                </div>
              </div>

              {selectedQuote.message && (
                <div style={{ marginBottom: '1.5rem' }}>
                  <strong style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-primary-dark)', display: 'block', marginBottom: '0.35rem' }}>
                    Formulation Notes &amp; Specifications:
                  </strong>
                  <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', lineHeight: 1.6, background: '#FAF5F0', padding: '1rem', borderRadius: 'var(--radius-sm)' }}>
                    "{selectedQuote.message}"
                  </p>
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                <button className="btn btn-secondary" onClick={() => setSelectedQuote(null)}>
                  Close
                </button>
                <Link to="/contact" className="btn btn-rose" onClick={() => setSelectedQuote(null)}>
                  Follow-Up with Commercial Desk
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Quotes;
