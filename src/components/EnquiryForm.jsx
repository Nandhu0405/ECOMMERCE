import React, { useState, useEffect } from 'react';
import { Send, CheckCircle2, RotateCcw, AlertCircle, Loader2 } from 'lucide-react';
import { CATEGORIES } from '../data/categories';
import { INDUSTRIES } from '../data/industries';

const EnquiryForm = ({ initialCategory = '', initialProduct = '' }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    email: '',
    phone: '',
    industry: '',
    division: 'flavour',
    category: initialCategory || '',
    productName: initialProduct || '',
    requiredQuantity: '25 kg',
    preferredPackSize: '25 kg Drum',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (initialCategory) {
      setFormData(prev => ({ ...prev, category: initialCategory }));
    }
    if (initialProduct) {
      setFormData(prev => ({ ...prev, productName: initialProduct }));
    }
  }, [initialCategory, initialProduct]);

  const validate = () => {
    const errs = {};
    if (!formData.fullName.trim()) errs.fullName = 'Full Name is required';
    if (!formData.companyName.trim()) errs.companyName = 'Company / Enterprise Name is required';
    
    // Email regex
    if (!formData.email.trim()) {
      errs.email = 'Business email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = 'Please enter a valid email address';
    }

    // Phone validation: permits international numbers + and 7-15 digits
    if (!formData.phone.trim()) {
      errs.phone = 'Contact number is required';
    } else if (!/^\+?[\d\s-]{7,18}$/.test(formData.phone.trim())) {
      errs.phone = 'Please provide a valid phone number (at least 7 digits)';
    }

    if (!formData.industry) errs.industry = 'Please select your industry';
    if (!formData.category) errs.category = 'Please select a product category';
    if (!formData.requiredQuantity.trim()) errs.requiredQuantity = 'Please state required quantity or sample size';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // Simulate backend processing
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);

      // Persist to localStorage for demo admin review
      try {
        const existing = JSON.parse(localStorage.getItem('skff_demo_enquiries') || '[]');
        const newRecord = {
          id: 'ENQ-' + Date.now().toString().slice(-6),
          date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
          status: 'New',
          ...formData
        };
        localStorage.setItem('skff_demo_enquiries', JSON.stringify([newRecord, ...existing]));
      } catch (err) {
        console.warn('Failed to save demo enquiry', err);
      }
    }, 1200);
  };

  const handleReset = () => {
    setFormData({
      fullName: '',
      companyName: '',
      email: '',
      phone: '',
      industry: '',
      division: 'flavour',
      category: '',
      productName: '',
      requiredQuantity: '25 kg',
      preferredPackSize: '25 kg Drum',
      message: ''
    });
    setErrors({});
    setIsSubmitted(false);
  };

  if (isSubmitted) {
    return (
      <div className="enquiry-form-card" style={{ textAlign: 'center', padding: '3.5rem 2rem' }}>
        <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#E8F5E9', color: '#2E7D32', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
          <CheckCircle2 size={36} />
        </div>
        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', color: 'var(--color-primary-dark)', marginBottom: '0.75rem' }}>
          Enquiry Received (Demonstration)
        </h3>
        <p style={{ color: 'var(--color-text-muted)', maxWidth: '520px', margin: '0 auto 1.5rem', lineHeight: 1.6 }}>
          Thank you, <strong>{formData.fullName}</strong> from <strong>{formData.companyName}</strong>. Your requirement for <strong>{formData.productName || formData.category}</strong> has been logged in this demonstration session.
        </p>

        <div className="demo-disclaimer-banner" style={{ maxWidth: '520px', margin: '0 auto 2rem' }}>
          <AlertCircle size={18} />
          <span>
            <strong>Demonstration Notice:</strong> Your enquiry has not been sent to SKFF. Connect an approved submission service to enable real submissions.
          </span>
        </div>

        <button className="btn btn-secondary" onClick={handleReset}>
          <RotateCcw size={15} />
          <span>Submit Another Enquiry</span>
        </button>
      </div>
    );
  }

  const filteredCategories = CATEGORIES.filter(c => c.type === formData.division);

  return (
    <form className="enquiry-form-card" onSubmit={handleSubmit} noValidate>
      <div style={{ marginBottom: '1.5rem' }}>
        <span className="eyebrow">Direct B2B Manufacturing Quotation</span>
        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', color: 'var(--color-primary-dark)' }}>
          Request a Quote / Custom Formulation
        </h3>
        <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', marginTop: '0.35rem' }}>
          Submit your application parameters to receive commercial pricing, samples, and technical specifications.
        </p>
      </div>

      <div className="form-grid-2">
        {/* Full Name */}
        <div className="form-group">
          <label className="form-label" htmlFor="fullName">
            Full Name <span className="req">*</span>
          </label>
          <input
            id="fullName"
            type="text"
            name="fullName"
            className="form-input"
            placeholder="e.g. Rajesh Sharma"
            value={formData.fullName}
            onChange={handleChange}
          />
          {errors.fullName && <span className="form-error-msg">{errors.fullName}</span>}
        </div>

        {/* Company Name */}
        <div className="form-group">
          <label className="form-label" htmlFor="companyName">
            Company / Enterprise Name <span className="req">*</span>
          </label>
          <input
            id="companyName"
            type="text"
            name="companyName"
            className="form-input"
            placeholder="e.g. Apex Foods &amp; Beverages Ltd."
            value={formData.companyName}
            onChange={handleChange}
          />
          {errors.companyName && <span className="form-error-msg">{errors.companyName}</span>}
        </div>
      </div>

      <div className="form-grid-2">
        {/* Business Email */}
        <div className="form-group">
          <label className="form-label" htmlFor="email">
            Business Email <span className="req">*</span>
          </label>
          <input
            id="email"
            type="email"
            name="email"
            className="form-input"
            placeholder="name@company.com"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <span className="form-error-msg">{errors.email}</span>}
        </div>

        {/* Phone Number */}
        <div className="form-group">
          <label className="form-label" htmlFor="phone">
            Phone / WhatsApp Number <span className="req">*</span>
          </label>
          <input
            id="phone"
            type="tel"
            name="phone"
            className="form-input"
            placeholder="+91-9876543210"
            value={formData.phone}
            onChange={handleChange}
          />
          {errors.phone && <span className="form-error-msg">{errors.phone}</span>}
        </div>
      </div>

      <div className="form-grid-2">
        {/* Industry */}
        <div className="form-group">
          <label className="form-label" htmlFor="industry">
            Target Industry <span className="req">*</span>
          </label>
          <select
            id="industry"
            name="industry"
            className="form-select"
            value={formData.industry}
            onChange={handleChange}
          >
            <option value="">-- Select Industry --</option>
            {INDUSTRIES.map(ind => (
              <option key={ind.id} value={ind.name}>{ind.name}</option>
            ))}
          </select>
          {errors.industry && <span className="form-error-msg">{errors.industry}</span>}
        </div>

        {/* Division */}
        <div className="form-group">
          <label className="form-label" htmlFor="division">
            Product Division <span className="req">*</span>
          </label>
          <select
            id="division"
            name="division"
            className="form-select"
            value={formData.division}
            onChange={(e) => {
              handleChange(e);
              setFormData(prev => ({ ...prev, division: e.target.value, category: '' }));
            }}
          >
            <option value="flavour">Flavours Division (Taste)</option>
            <option value="fragrance">Fragrances Division (Scent)</option>
          </select>
        </div>
      </div>

      <div className="form-grid-2">
        {/* Category */}
        <div className="form-group">
          <label className="form-label" htmlFor="category">
            Product Category Group <span className="req">*</span>
          </label>
          <select
            id="category"
            name="category"
            className="form-select"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="">-- Select Category Group --</option>
            {filteredCategories.map(cat => (
              <option key={cat.id} value={cat.name}>{cat.name}</option>
            ))}
          </select>
          {errors.category && <span className="form-error-msg">{errors.category}</span>}
        </div>

        {/* Product Name (Optional / Prefilled) */}
        <div className="form-group">
          <label className="form-label" htmlFor="productName">
            Specific Product Name (Optional)
          </label>
          <input
            id="productName"
            type="text"
            name="productName"
            className="form-input"
            placeholder="e.g. Chocolate Flavour / Lavender Fragrance"
            value={formData.productName}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="form-grid-2">
        {/* Required Quantity */}
        <div className="form-group">
          <label className="form-label" htmlFor="requiredQuantity">
            Estimated Required Quantity <span className="req">*</span>
          </label>
          <input
            id="requiredQuantity"
            type="text"
            name="requiredQuantity"
            className="form-input"
            placeholder="e.g. 5 kg (Trial) / 100 kg (Commercial)"
            value={formData.requiredQuantity}
            onChange={handleChange}
          />
          {errors.requiredQuantity && <span className="form-error-msg">{errors.requiredQuantity}</span>}
        </div>

        {/* Preferred Pack Size */}
        <div className="form-group">
          <label className="form-label" htmlFor="preferredPackSize">
            Preferred Packaging
          </label>
          <select
            id="preferredPackSize"
            name="preferredPackSize"
            className="form-select"
            value={formData.preferredPackSize}
            onChange={handleChange}
          >
            <option value="1 kg Sample Canister">1 kg Sample Canister</option>
            <option value="5 kg Canister">5 kg Canister</option>
            <option value="25 kg HDPE Drum">25 kg HDPE Drum</option>
            <option value="200 kg Barrel">200 kg Coated Steel Barrel</option>
            <option value="Custom Tanker Bulk">Custom Bulk Tanker</option>
          </select>
        </div>
      </div>

      {/* Message */}
      <div className="form-group">
        <label className="form-label" htmlFor="message">
          Specific Application Details &amp; Requirements
        </label>
        <textarea
          id="message"
          name="message"
          rows={3}
          className="form-textarea"
          placeholder="Please describe your base matrix, processing temperatures, target dosage, or sensory profile..."
          value={formData.message}
          onChange={handleChange}
        />
      </div>

      {/* Mandatory Demo Disclaimer Notice */}
      <div className="demo-disclaimer-banner">
        <AlertCircle size={18} />
        <span>
          <strong>Notice:</strong> This is a demonstration form. Your enquiry has not been sent to SKFF. Connect an approved submission service to enable real submissions.
        </span>
      </div>

      {/* Submit Button & Reset */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '1.25rem', flexWrap: 'wrap' }}>
        <button 
          type="submit" 
          className="btn btn-rose btn-lg" 
          disabled={isSubmitting}
          style={{ minWidth: '220px' }}
        >
          {isSubmitting ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              <span>Simulating Submission...</span>
            </>
          ) : (
            <>
              <Send size={16} />
              <span>Submit Commercial Enquiry</span>
            </>
          )}
        </button>

        <button 
          type="button" 
          className="btn btn-secondary"
          onClick={handleReset}
          disabled={isSubmitting}
        >
          Reset Form
        </button>
      </div>
    </form>
  );
};

export default EnquiryForm;
