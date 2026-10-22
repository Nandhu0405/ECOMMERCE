import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, AlertCircle, Loader2, FlaskConical, Send, Building2, User, Mail, Phone, Globe, Layers } from 'lucide-react';
import { useToast } from '../context/ToastContext';

const SAMPLE_SIZE_OPTIONS = [
  '1 kg Evaluation Canister (Recommended for Pilot Testing)',
  '500 g Analytical Lab Pack',
  '250 g Sensory Tasting Sample',
  '5 kg Pilot Compounding Drum'
];

const COUNTRY_OPTIONS = [
  'India', 'United Arab Emirates', 'Saudi Arabia', 'France', 'Germany', 
  'United Kingdom', 'United States', 'Singapore', 'Malaysia', 'Australia', 'Other'
];

const RequestSampleModal = ({ isOpen, onClose, product, initialSampleSize }) => {
  const { addToast } = useToast();

  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    email: '',
    phone: '',
    country: 'India',
    sampleSize: initialSampleSize || SAMPLE_SIZE_OPTIONS[0],
    intendedApplication: '',
    additionalMessage: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [requestId, setRequestId] = useState('');

  // Reset form when modal opens with a new product
  useEffect(() => {
    if (isOpen && product) {
      setFormData(prev => ({
        ...prev,
        sampleSize: initialSampleSize || (product.packSizes ? product.packSizes[0] : SAMPLE_SIZE_OPTIONS[0]),
        intendedApplication: product.suggestedApplications ? product.suggestedApplications[0] : ''
      }));
      setErrors({});
      setIsSuccess(false);
      setIsSubmitting(false);
    }
  }, [isOpen, product, initialSampleSize]);

  if (!isOpen || !product) return null;

  const validateForm = () => {
    const errs = {};
    if (!formData.fullName.trim()) errs.fullName = 'Full Name is required';
    if (!formData.companyName.trim()) errs.companyName = 'Company / Enterprise Name is required';
    
    if (!formData.email.trim()) {
      errs.email = 'Corporate email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = 'Please provide a valid corporate email format';
    }

    if (!formData.phone.trim()) {
      errs.phone = 'Contact telephone or mobile number is required';
    } else if (formData.phone.trim().length < 8) {
      errs.phone = 'Please provide a valid phone number (minimum 8 digits)';
    }

    if (!formData.intendedApplication.trim()) {
      errs.intendedApplication = 'Please specify your target application or formulation base';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    // Simulate frontend validation & local recording
    setTimeout(() => {
      const generatedId = `SKFF-SMP-${Date.now().toString().slice(-6)}`;
      setRequestId(generatedId);

      const newSampleRecord = {
        id: generatedId,
        date: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
        productId: product.id,
        productName: product.name,
        productSku: product.sku || `SKFF-${product.id.toUpperCase()}`,
        productCategory: product.categoryName || product.category,
        productImage: product.image,
        sampleSize: formData.sampleSize,
        fullName: formData.fullName.trim(),
        companyName: formData.companyName.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        country: formData.country,
        intendedApplication: formData.intendedApplication.trim(),
        additionalMessage: formData.additionalMessage.trim(),
        status: 'Sample Request Recorded (Demo)'
      };

      try {
        const existing = JSON.parse(localStorage.getItem('skff_demo_sample_requests') || '[]');
        existing.unshift(newSampleRecord);
        localStorage.setItem('skff_demo_sample_requests', JSON.stringify(existing));
      } catch (err) {
        console.error('Failed to store sample request in localStorage:', err);
      }

      setIsSubmitting(false);
      setIsSuccess(true);
      addToast(`Evaluation sample requested for "${product.name}"!`, 'success');
    }, 850);
  };

  const handleReset = () => {
    setIsSuccess(false);
    onClose();
  };

  return (
    <div 
      className="modal-overlay" 
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="sample-modal-title"
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(31, 36, 33, 0.65)',
        backdropFilter: 'blur(5px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10000,
        padding: '1.25rem'
      }}
    >
      <div 
        className="modal-card animate-fade-in-up"
        onClick={(e) => e.stopPropagation()}
        style={{
          background: '#FFFFFF',
          borderRadius: 'var(--radius-2xl)',
          maxWidth: '680px',
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          border: '1px solid rgba(232, 93, 117, 0.2)'
        }}
      >
        {/* Header */}
        <div style={{
          padding: '1.5rem 1.75rem',
          borderBottom: '1px solid var(--color-border)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: 'linear-gradient(135deg, #FFF5F6 0%, #FFFFFF 100%)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: 'var(--radius-lg)',
              backgroundColor: 'rgba(232, 93, 117, 0.12)',
              color: 'var(--color-accent-rose)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <FlaskConical size={22} />
            </div>
            <div>
              <span className="eyebrow" style={{ fontSize: '0.72rem', color: 'var(--color-accent-rose)' }}>
                LABORATORY EVALUATION
              </span>
              <h2 id="sample-modal-title" style={{ fontSize: '1.3rem', margin: 0, color: 'var(--color-primary-dark)', fontFamily: 'var(--font-heading)' }}>
                Request Product Evaluation Sample
              </h2>
            </div>
          </div>
          <button 
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            style={{
              background: '#F0ECE9',
              border: 'none',
              borderRadius: '50%',
              width: '34px',
              height: '34px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: 'var(--color-text-main)'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Content */}
        <div style={{ padding: '1.75rem' }}>
          {isSuccess ? (
            /* Success State */
            <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
              <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: '#E8F5E9',
                color: '#2E7D32',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.5rem'
              }}>
                <CheckCircle2 size={36} />
              </div>

              <h3 style={{ fontSize: '1.5rem', color: 'var(--color-primary-dark)', marginBottom: '0.75rem', fontFamily: 'var(--font-heading)' }}>
                Sample Request Recorded!
              </h3>

              {/* Exact required sentence */}
              <p style={{ fontSize: '1.05rem', color: 'var(--color-text-main)', fontWeight: 600, marginBottom: '1rem' }}>
                Thank you. Your sample request has been recorded in this demonstration.
              </p>

              <div style={{
                background: 'var(--color-bg-ivory)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-lg)',
                padding: '1.25rem',
                maxWidth: '480px',
                margin: '0 auto 1.75rem',
                textAlign: 'left',
                fontSize: '0.88rem'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span style={{ color: 'var(--color-text-muted)' }}>Demo Reference ID:</span>
                  <strong style={{ color: 'var(--color-accent-rose)', fontFamily: 'monospace' }}>{requestId}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span style={{ color: 'var(--color-text-muted)' }}>Product:</span>
                  <strong>{product.name}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span style={{ color: 'var(--color-text-muted)' }}>Sample Size:</span>
                  <span>{formData.sampleSize}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--color-text-muted)' }}>Company:</span>
                  <span>{formData.companyName}</span>
                </div>
              </div>

              {/* Explicit demonstration disclaimer */}
              <div className="demo-disclaimer-banner" style={{ maxWidth: '480px', margin: '0 auto 2rem', textAlign: 'left' }}>
                <AlertCircle size={18} />
                <span>
                  <strong>Frontend Demonstration:</strong> No real request was sent to SKFF and no email notifications were dispatched. All records are stored locally for prototype evaluation.
                </span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
                <button 
                  type="button" 
                  className="btn btn-primary"
                  onClick={handleReset}
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            /* Request Form */
            <form onSubmit={handleSubmit}>
              {/* Product Info Card Preview */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                background: 'var(--color-bg-ivory)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-lg)',
                padding: '0.85rem 1rem',
                marginBottom: '1.5rem'
              }}>
                <img 
                  src={product.image} 
                  alt={product.name} 
                  style={{ width: '56px', height: '56px', borderRadius: 'var(--radius-md)', objectFit: 'cover' }}
                />
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                    <span className="badge badge-primary" style={{ fontSize: '0.7rem' }}>
                      {product.categoryName || product.category}
                    </span>
                    <span style={{ fontSize: '0.72rem', color: '#2E7D32', fontWeight: 600 }}>
                      ● {product.availability || 'In Stock'}
                    </span>
                  </div>
                  <h4 style={{ fontSize: '1rem', margin: '0.2rem 0', color: 'var(--color-primary-dark)' }}>
                    {product.name}
                  </h4>
                  <span style={{ fontSize: '0.75rem', fontFamily: 'monospace', color: 'var(--color-text-light)' }}>
                    SKU: {product.sku || `SKFF-${product.id.toUpperCase()}`}
                  </span>
                </div>
              </div>

              {/* Field Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                {/* Full Name */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '0.35rem', color: 'var(--color-text-main)' }}>
                    Full Name <span style={{ color: 'var(--color-accent-rose)' }}>*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Dr. Rajesh Sharma"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.65rem 0.85rem',
                      borderRadius: 'var(--radius-md)',
                      border: errors.fullName ? '1.5px solid var(--color-accent-rose)' : '1px solid var(--color-border)',
                      fontSize: '0.88rem'
                    }}
                  />
                  {errors.fullName && (
                    <span style={{ fontSize: '0.74rem', color: 'var(--color-accent-rose)', marginTop: '0.25rem', display: 'block' }}>
                      {errors.fullName}
                    </span>
                  )}
                </div>

                {/* Company Name */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '0.35rem', color: 'var(--color-text-main)' }}>
                    Company / Lab Name <span style={{ color: 'var(--color-accent-rose)' }}>*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Apex Health & Foods Ltd"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.65rem 0.85rem',
                      borderRadius: 'var(--radius-md)',
                      border: errors.companyName ? '1.5px solid var(--color-accent-rose)' : '1px solid var(--color-border)',
                      fontSize: '0.88rem'
                    }}
                  />
                  {errors.companyName && (
                    <span style={{ fontSize: '0.74rem', color: 'var(--color-accent-rose)', marginTop: '0.25rem', display: 'block' }}>
                      {errors.companyName}
                    </span>
                  )}
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                {/* Email */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '0.35rem', color: 'var(--color-text-main)' }}>
                    Corporate Email <span style={{ color: 'var(--color-accent-rose)' }}>*</span>
                  </label>
                  <input
                    type="email"
                    placeholder="name@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.65rem 0.85rem',
                      borderRadius: 'var(--radius-md)',
                      border: errors.email ? '1.5px solid var(--color-accent-rose)' : '1px solid var(--color-border)',
                      fontSize: '0.88rem'
                    }}
                  />
                  {errors.email && (
                    <span style={{ fontSize: '0.74rem', color: 'var(--color-accent-rose)', marginTop: '0.25rem', display: 'block' }}>
                      {errors.email}
                    </span>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '0.35rem', color: 'var(--color-text-main)' }}>
                    Contact Phone <span style={{ color: 'var(--color-accent-rose)' }}>*</span>
                  </label>
                  <input
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.65rem 0.85rem',
                      borderRadius: 'var(--radius-md)',
                      border: errors.phone ? '1.5px solid var(--color-accent-rose)' : '1px solid var(--color-border)',
                      fontSize: '0.88rem'
                    }}
                  />
                  {errors.phone && (
                    <span style={{ fontSize: '0.74rem', color: 'var(--color-accent-rose)', marginTop: '0.25rem', display: 'block' }}>
                      {errors.phone}
                    </span>
                  )}
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                {/* Country */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '0.35rem', color: 'var(--color-text-main)' }}>
                    Dispatch Country
                  </label>
                  <select
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.65rem 0.85rem',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--color-border)',
                      fontSize: '0.88rem',
                      background: '#FFFFFF'
                    }}
                  >
                    {COUNTRY_OPTIONS.map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                {/* Required Quantity / Sample Size */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '0.35rem', color: 'var(--color-text-main)' }}>
                    Sample Size / Unit
                  </label>
                  <select
                    value={formData.sampleSize}
                    onChange={(e) => setFormData({ ...formData, sampleSize: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.65rem 0.85rem',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--color-border)',
                      fontSize: '0.88rem',
                      background: '#FFFFFF'
                    }}
                  >
                    {SAMPLE_SIZE_OPTIONS.map(opt => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                    {product.packSizes && product.packSizes.map(ps => (
                      <option key={ps} value={ps}>Pack Option: {ps}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Intended Application */}
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '0.35rem', color: 'var(--color-text-main)' }}>
                  Intended Application / Formulation Base <span style={{ color: 'var(--color-accent-rose)' }}>*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. High-temperature baked cookie dough, carbonated soft drink, fine fragrance mist"
                  value={formData.intendedApplication}
                  onChange={(e) => setFormData({ ...formData, intendedApplication: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.65rem 0.85rem',
                    borderRadius: 'var(--radius-md)',
                    border: errors.intendedApplication ? '1.5px solid var(--color-accent-rose)' : '1px solid var(--color-border)',
                    fontSize: '0.88rem'
                  }}
                />
                {errors.intendedApplication && (
                  <span style={{ fontSize: '0.74rem', color: 'var(--color-accent-rose)', marginTop: '0.25rem', display: 'block' }}>
                    {errors.intendedApplication}
                  </span>
                )}
              </div>

              {/* Additional Message */}
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '0.35rem', color: 'var(--color-text-main)' }}>
                  Technical Requirements / Additional Notes (Optional)
                </label>
                <textarea
                  placeholder="e.g. Please include Certificate of Analysis (COA), recommended dosage rate, and thermal processing limits."
                  rows={3}
                  value={formData.additionalMessage}
                  onChange={(e) => setFormData({ ...formData, additionalMessage: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.65rem 0.85rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--color-border)',
                    fontSize: '0.88rem'
                  }}
                />
              </div>

              {/* Demo Notice */}
              <div className="demo-disclaimer-banner" style={{ marginBottom: '1.5rem' }}>
                <AlertCircle size={16} />
                <span style={{ fontSize: '0.76rem' }}>
                  <strong>Demonstration Portal:</strong> Submitting will record your sample request into your local browser test environment.
                </span>
              </div>

              {/* Actions */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', borderTop: '1px solid var(--color-border)', paddingTop: '1rem' }}>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={onClose}
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-rose"
                  disabled={isSubmitting}
                  style={{ minWidth: '170px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={16} className="spinner" />
                      <span>Recording Request...</span>
                    </>
                  ) : (
                    <>
                      <Send size={15} />
                      <span>Submit Sample Request</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default RequestSampleModal;
