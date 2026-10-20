import React, { useState, useEffect } from 'react';
import { Mail, Phone, Building2, Calendar, FileText, CheckCircle2, Clock, Trash2, X } from 'lucide-react';
import { useToast } from '../context/ToastContext';

const AdminEnquiries = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const { addToast } = useToast();

  const mockInitialEnquiries = [
    {
      id: 'RFQ-2026-901',
      refCode: 'RFQ-2026-901',
      name: 'Dr. Alok Verma',
      company: 'Parle Agro Products Ltd',
      email: 'a.verma@parleagro.demo',
      phone: '+91 98200 11223',
      industry: 'Food and Beverage',
      division: 'Flavours',
      category: 'Beverages',
      productName: 'Alphonso Mango Flavour (SKFF-FL-043)',
      quantity: 500,
      packSize: '25 kg Food-Grade Drum',
      message: 'Urgent sample required for trial batch of ready-to-drink mango nectar. Looking for high thermal stability during pasteurization.',
      date: '2026-10-18',
      status: 'Under Lab Evaluation'
    },
    {
      id: 'RFQ-2026-902',
      refCode: 'RFQ-2026-902',
      name: 'Sunita Chawla',
      company: 'Godrej Consumer Products R&D',
      email: 's.chawla@godrejcp.demo',
      phone: '+91 99300 44556',
      industry: 'Home Care',
      division: 'Fragrances',
      category: 'Home Care',
      productName: 'Fresh Lavender Fragrance (SKFF-FR-071)',
      quantity: 1200,
      packSize: '200 kg Epoxy Drum',
      message: 'Need 1.2 tons/month for floor cleaner reformulation. Must comply with low VOC standards and have superior bloom.',
      date: '2026-10-19',
      status: 'Sample Dispatched'
    },
    {
      id: 'RFQ-2026-903',
      refCode: 'RFQ-2026-903',
      name: 'Rohan Mehra',
      company: 'Sun Pharma Formulation Centre',
      email: 'rohan.m@sunpharma.demo',
      phone: '+91 98111 88990',
      industry: 'Pharmaceuticals',
      division: 'Flavours',
      category: 'Pharmaceuticals',
      productName: 'Flavour Masking Solutions (SKFF-FL-060)',
      quantity: 150,
      packSize: '10 kg Canister',
      message: 'Seeking active bitterness masking solution for an iron + vitamin oral suspension. Need technical support for dispersion.',
      date: '2026-10-20',
      status: 'Formulation In Progress'
    }
  ];

  useEffect(() => {
    const saved = localStorage.getItem('skff_demo_enquiries');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Merge user submitted with mock
          setEnquiries([...parsed, ...mockInitialEnquiries.filter((m) => !parsed.some((p) => p.id === m.id))]);
          return;
        }
      } catch (e) {
        console.error(e);
      }
    }
    setEnquiries(mockInitialEnquiries);
  }, []);

  const handleUpdateStatus = (id, newStatus) => {
    const updated = enquiries.map((enq) => {
      if (enq.id === id) {
        return { ...enq, status: newStatus };
      }
      return enq;
    });
    setEnquiries(updated);
    localStorage.setItem('skff_demo_enquiries', JSON.stringify(updated));
    addToast(`Updated status to "${newStatus}"`, 'info');
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete this demo enquiry from local storage?')) {
      const updated = enquiries.filter((e) => e.id !== id);
      setEnquiries(updated);
      localStorage.setItem('skff_demo_enquiries', JSON.stringify(updated));
      addToast('Enquiry removed from local browser demo', 'info');
      if (selectedEnquiry?.id === id) setSelectedEnquiry(null);
    }
  };

  return (
    <div className="admin-enquiries-view">
      <div className="admin-card">
        <div className="admin-card-header">
          <div>
            <h3>Customer RFQs & Sample Enquiries ({enquiries.length})</h3>
            <p style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>
              Submissions received from the Request a Quote modal, B2B forms, and product pages.
            </p>
          </div>
        </div>

        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Ref Number</th>
                <th>Company & Contact</th>
                <th>Industry & Division</th>
                <th>Target Formulation</th>
                <th>Required Qty</th>
                <th>Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {enquiries.map((enq) => (
                <tr key={enq.id}>
                  <td><strong>{enq.refCode || enq.id}</strong></td>
                  <td>
                    <div style={{ fontWeight: 600 }}>{enq.company || 'Enterprise Client'}</div>
                    <div style={{ fontSize: '0.78rem', color: '#555' }}>
                      {enq.name} &bull; <a href={`mailto:${enq.email}`} style={{ color: 'var(--color-accent-rose)' }}>{enq.email}</a>
                    </div>
                  </td>
                  <td>
                    <div>{enq.industry || 'General Industry'}</div>
                    <span style={{
                      fontSize: '0.72rem',
                      padding: '0.15rem 0.45rem',
                      borderRadius: '4px',
                      background: enq.division === 'Fragrances' ? '#FCE4EC' : '#FFF3E0',
                      color: enq.division === 'Fragrances' ? '#C2185B' : '#E65100',
                      fontWeight: 600
                    }}>
                      {enq.division || 'Flavours'}
                    </span>
                  </td>
                  <td>
                    <div style={{ fontWeight: 600 }}>{enq.productName || enq.category || 'General Flavour'}</div>
                    <div style={{ fontSize: '0.75rem', color: '#777' }}>{enq.category}</div>
                  </td>
                  <td>
                    <strong>{enq.quantity || 100} kg</strong>
                    <div style={{ fontSize: '0.72rem', color: '#777' }}>{enq.packSize || 'Drum'}</div>
                  </td>
                  <td style={{ fontSize: '0.8rem', whiteSpace: 'nowrap' }}>{enq.date || 'Recent'}</td>
                  <td>
                    <select
                      value={enq.status || 'Under Lab Evaluation'}
                      onChange={(e) => handleUpdateStatus(enq.id, e.target.value)}
                      style={{
                        padding: '0.35rem 0.5rem',
                        borderRadius: '6px',
                        border: '1px solid var(--color-border)',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        background: '#FFF'
                      }}
                    >
                      <option value="Under Lab Evaluation">Under Lab Evaluation</option>
                      <option value="Formulation In Progress">Formulation In Progress</option>
                      <option value="Sample Dispatched">Sample Dispatched</option>
                      <option value="Quotation Approved">Quotation Approved</option>
                      <option value="Closed">Closed</option>
                    </select>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '0.35rem' }}>
                      <button
                        onClick={() => setSelectedEnquiry(enq)}
                        className="admin-action-btn admin-action-edit"
                        title="View Full Details"
                      >
                        <FileText size={14} />
                      </button>
                      <button
                        onClick={() => handleDelete(enq.id)}
                        className="admin-action-btn admin-action-delete"
                        title="Delete Enquiry"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Modal */}
      {selectedEnquiry && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          padding: '1rem'
        }}>
          <div style={{
            background: '#FFF',
            borderRadius: '12px',
            width: '100%',
            maxWidth: '560px',
            maxHeight: '90vh',
            overflowY: 'auto',
            padding: '1.75rem',
            boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--color-border)', paddingBottom: '1rem', marginBottom: '1.25rem' }}>
              <div>
                <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-accent-rose)', fontWeight: 700 }}>
                  RFQ Dossier
                </span>
                <h3 style={{ margin: '0.2rem 0 0', fontSize: '1.3rem' }}>{selectedEnquiry.refCode || selectedEnquiry.id}</h3>
              </div>
              <button onClick={() => setSelectedEnquiry(null)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.88rem' }}>
              <div><strong>Company:</strong> {selectedEnquiry.company}</div>
              <div><strong>Contact Person:</strong> {selectedEnquiry.name}</div>
              <div><strong>Email:</strong> <a href={`mailto:${selectedEnquiry.email}`}>{selectedEnquiry.email}</a></div>
              <div><strong>Phone:</strong> <a href={`tel:${selectedEnquiry.phone}`}>{selectedEnquiry.phone}</a></div>
              <div><strong>Industry:</strong> {selectedEnquiry.industry}</div>
              <div><strong>Requested Formulation:</strong> {selectedEnquiry.productName || selectedEnquiry.category}</div>
              <div><strong>Required Quantity:</strong> {selectedEnquiry.quantity} kg ({selectedEnquiry.packSize || 'Standard Drum'})</div>
              <div style={{ marginTop: '0.5rem', padding: '0.85rem', background: 'var(--color-bg-ivory)', borderRadius: '8px', border: '1px solid var(--color-border)' }}>
                <strong>Client Technical Notes / Application:</strong>
                <p style={{ marginTop: '0.35rem', color: '#444' }}>{selectedEnquiry.message || 'No additional notes provided.'}</p>
              </div>
            </div>

            <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
              <button onClick={() => setSelectedEnquiry(null)} className="btn btn-outline btn-sm">
                Close
              </button>
              <button
                onClick={() => {
                  handleUpdateStatus(selectedEnquiry.id, 'Sample Dispatched');
                  setSelectedEnquiry(null);
                }}
                className="btn btn-primary btn-sm"
              >
                Mark Sample Dispatched
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminEnquiries;
