import React, { useState, useEffect } from 'react';
import { Send, CheckCircle2, RotateCcw, AlertCircle, Loader2, UploadCloud, FileText, Trash2 } from 'lucide-react';
import { CATEGORIES } from '../data/categories';
import { INDUSTRIES } from '../data/industries';

const ALLOWED_EXTENSIONS = ['pdf', 'doc', 'docx', 'jpg', 'jpeg', 'png'];
const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB

const EnquiryForm = ({ initialCategory = '', initialProduct = '', initialSku = '' }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    email: '',
    phone: '',
    country: 'India',
    industry: '',
    division: 'flavour',
    category: initialCategory || '',
    productName: initialProduct || '',
    productCode: initialSku || '',
    requiredQuantity: '25 kg',
    preferredPackSize: '25 kg Drum',
    application: '',
    message: ''
  });

  const [attachedFile, setAttachedFile] = useState(null);
  const [fileError, setFileError] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedRef, setSubmittedRef] = useState('');

  useEffect(() => {
    if (initialCategory) {
      setFormData(prev => ({ ...prev, category: initialCategory }));
    }
    if (initialProduct) {
      setFormData(prev => ({ ...prev, productName: initialProduct }));
    }
    if (initialSku) {
      setFormData(prev => ({ ...prev, productCode: initialSku }));
    }
  }, [initialCategory, initialProduct, initialSku]);

  const handleFileChange = (e) => {
    setFileError('');
    const file = e.target.files[0];
    if (!file) return;

    // Validate size
    if (file.size > MAX_FILE_SIZE_BYTES) {
      setFileError(`File size exceeds 5 MB limit (${(file.size / (1024 * 1024)).toFixed(1)} MB).`);
      e.target.value = '';
      return;
    }

    // Validate extension
    const ext = file.name.split('.').pop().toLowerCase();
    if (!ALLOWED_EXTENSIONS.includes(ext)) {
      setFileError(`Invalid file format .${ext}. Allowed formats: PDF, DOC, DOCX, JPG, PNG.`);
      e.target.value = '';
      return;
    }

    setAttachedFile(file);
  };

  const removeFile = () => {
    setAttachedFile(null);
    setFileError('');
  };

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

    // Phone validation
    if (!formData.phone.trim()) {
      errs.phone = 'Contact phone number is required';
    } else if (!/^\+?[\d\s-]{7,18}$/.test(formData.phone.trim())) {
      errs.phone = 'Please provide a valid phone number (at least 7 digits)';
    }

    if (!formData.country.trim()) errs.country = 'Country is required';
    if (!formData.requiredQuantity.trim()) errs.requiredQuantity = 'Please state required quantity or sample size';
    if (!formData.application.trim()) errs.application = 'Target application or food/fragrance matrix is required';

    setErrors(errs);
    return Object.keys(errs).length === 0 && !fileError;
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
      const generatedRef = 'RFQ-' + Math.floor(100000 + Math.random() * 900000);
      setSubmittedRef(generatedRef);
      setIsSubmitted(true);

      // Persist to localStorage for demo user and demo admin review
      try {
        const existing = JSON.parse(localStorage.getItem('skff_demo_enquiries') || '[]');
        const newRecord = {
          id: generatedRef,
          date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
          status: 'New',
          fileName: attachedFile ? attachedFile.name : null,
          fileSize: attachedFile ? `${(attachedFile.size / 1024).toFixed(0)} KB` : null,
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
      country: 'India',
      industry: '',
      division: 'flavour',
      category: '',
      productName: '',
      productCode: '',
      requiredQuantity: '25 kg',
      preferredPackSize: '25 kg Drum',
      application: '',
      message: ''
    });
    setAttachedFile(null);
    setFileError('');
    setErrors({});
    setIsSubmitted(false);
  };

  if (isSubmitted) {
    return (
      <div className="enquiry-form-card" style={{ textAlign: 'center', padding: '3.5rem 2rem', background: '#FFFFFF', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-2xl)', boxShadow: 'var(--shadow-sm)' }}>
        <div style={{ width: '68px', height: '68px', borderRadius: '50%', background: '#E8F5E9', color: '#2E7D32', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
          <CheckCircle2 size={38} />
        </div>
        <span className="eyebrow" style={{ color: 'var(--color-accent-rose)' }}>DEMO RFQ REFERENCE: {submittedRef}</span>
        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.85rem', color: 'var(--color-primary-dark)', margin: '0.25rem 0 0.75rem' }}>
          Quotation Request Logged (Demonstration)
        </h3>
        <p style={{ color: 'var(--color-text-muted)', maxWidth: '540px', margin: '0 auto 1.5rem', lineHeight: 1.6, fontSize: '0.92rem' }}>
          Thank you, <strong>{formData.fullName}</strong> from <strong>{formData.companyName}</strong>. Your requirement for <strong>{formData.productName || formData.category || 'Flavour/Fragrance Solution'}</strong> has been registered under reference <strong>{submittedRef}</strong> in this demonstration session.
        </p>

        <div className="demo-disclaimer-banner" style={{ maxWidth: '540px', margin: '0 auto 2rem', borderRadius: 'var(--radius-md)' }}>
          <AlertCircle size={18} />
          <span>
            <strong>Demonstration Notice:</strong> Submission is a frontend demonstration. Your quotation request has not been sent to SKFF corporate servers. Connect an approved backend service to enable production RFQ routing.
          </span>
        </div>

        <button className="btn btn-rose" onClick={handleReset} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
          <RotateCcw size={15} />
          <span>Submit Another Quotation Request</span>
        </button>
      </div>
    );
  }

  const filteredCategories = CATEGORIES.filter(c => c.type === formData.division);

  return (
    <form className="enquiry-form-card" onSubmit={handleSubmit} noValidate style={{ background: '#FFFFFF', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-2xl)', padding: '2.5rem', boxShadow: 'var(--shadow-sm)' }}>
      <div style={{ marginBottom: '1.75rem' }}>
        <span className="eyebrow" style={{ color: 'var(--color-accent-rose)' }}>Direct B2B Manufacturing Quotation</span>
        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.85rem', color: 'var(--color-primary-dark)', margin: '0.25rem 0 0.5rem' }}>
          Request a Quote / Custom Formulation
        </h3>
        <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', margin: 0, lineHeight: 1.5 }}>
          Submit your application parameters to receive commercial wholesale pricing, evaluation samples, and technical specification dossiers.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem', marginBottom: '1.25rem' }}>
        {/* Full Name */}
        <div className="form-group">
          <label className="form-label" htmlFor="fullName">
            Full Name <span className="req" style={{ color: 'var(--color-accent-rose)' }}>*</span>
          </label>
          <input
            id="fullName"
            type="text"
            name="fullName"
            className="form-input"
            placeholder="e.g. Rajesh Sharma"
            value={formData.fullName}
            onChange={handleChange}
            style={{ width: '100%', padding: '0.7rem 0.85rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}
          />
          {errors.fullName && <span style={{ color: '#D32F2F', fontSize: '0.75rem', marginTop: '0.25rem', display: 'block' }}>{errors.fullName}</span>}
        </div>

        {/* Company Name */}
        <div className="form-group">
          <label className="form-label" htmlFor="companyName">
            Company / Enterprise Name <span className="req" style={{ color: 'var(--color-accent-rose)' }}>*</span>
          </label>
          <input
            id="companyName"
            type="text"
            name="companyName"
            className="form-input"
            placeholder="e.g. Apex Foods &amp; Beverages Ltd."
            value={formData.companyName}
            onChange={handleChange}
            style={{ width: '100%', padding: '0.7rem 0.85rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}
          />
          {errors.companyName && <span style={{ color: '#D32F2F', fontSize: '0.75rem', marginTop: '0.25rem', display: 'block' }}>{errors.companyName}</span>}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem', marginBottom: '1.25rem' }}>
        {/* Business Email */}
        <div className="form-group">
          <label className="form-label" htmlFor="email">
            Business Email <span className="req" style={{ color: 'var(--color-accent-rose)' }}>*</span>
          </label>
          <input
            id="email"
            type="email"
            name="email"
            className="form-input"
            placeholder="name@company.com"
            value={formData.email}
            onChange={handleChange}
            style={{ width: '100%', padding: '0.7rem 0.85rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}
          />
          {errors.email && <span style={{ color: '#D32F2F', fontSize: '0.75rem', marginTop: '0.25rem', display: 'block' }}>{errors.email}</span>}
        </div>

        {/* Phone Number */}
        <div className="form-group">
          <label className="form-label" htmlFor="phone">
            Phone / WhatsApp Number <span className="req" style={{ color: 'var(--color-accent-rose)' }}>*</span>
          </label>
          <input
            id="phone"
            type="tel"
            name="phone"
            className="form-input"
            placeholder="+91-9876543210"
            value={formData.phone}
            onChange={handleChange}
            style={{ width: '100%', padding: '0.7rem 0.85rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}
          />
          {errors.phone && <span style={{ color: '#D32F2F', fontSize: '0.75rem', marginTop: '0.25rem', display: 'block' }}>{errors.phone}</span>}
        </div>

        {/* Country */}
        <div className="form-group">
          <label className="form-label" htmlFor="country">
            Country <span className="req" style={{ color: 'var(--color-accent-rose)' }}>*</span>
          </label>
          <select
            id="country"
            name="country"
            className="form-select"
            value={formData.country}
            onChange={handleChange}
            style={{ width: '100%', padding: '0.7rem 0.85rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', background: '#FFFFFF' }}
          >
            <option value="India">India</option>
            <option value="United Arab Emirates">United Arab Emirates</option>
            <option value="Saudi Arabia">Saudi Arabia</option>
            <option value="France">France</option>
            <option value="United Kingdom">United Kingdom</option>
            <option value="United States">United States</option>
            <option value="Germany">Germany</option>
            <option value="Singapore">Singapore</option>
            <option value="Bangladesh">Bangladesh</option>
            <option value="Sri Lanka">Sri Lanka</option>
            <option value="Other International">Other International</option>
          </select>
          {errors.country && <span style={{ color: '#D32F2F', fontSize: '0.75rem', marginTop: '0.25rem', display: 'block' }}>{errors.country}</span>}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem', marginBottom: '1.25rem' }}>
        {/* Product Name */}
        <div className="form-group">
          <label className="form-label" htmlFor="productName">
            Target Product Name / Profile
          </label>
          <input
            id="productName"
            type="text"
            name="productName"
            className="form-input"
            placeholder="e.g. Bourbon Vanilla Extract / Floral Jasmine"
            value={formData.productName}
            onChange={handleChange}
            style={{ width: '100%', padding: '0.7rem 0.85rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}
          />
        </div>

        {/* Product Code / SKU */}
        <div className="form-group">
          <label className="form-label" htmlFor="productCode">
            Product Code / SKU (if known)
          </label>
          <input
            id="productCode"
            type="text"
            name="productCode"
            className="form-input"
            placeholder="e.g. SKFF-CONF-002"
            value={formData.productCode}
            onChange={handleChange}
            style={{ width: '100%', padding: '0.7rem 0.85rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', fontFamily: 'monospace' }}
          />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem', marginBottom: '1.25rem' }}>
        {/* Required Quantity */}
        <div className="form-group">
          <label className="form-label" htmlFor="requiredQuantity">
            Required Quantity <span className="req" style={{ color: 'var(--color-accent-rose)' }}>*</span>
          </label>
          <input
            id="requiredQuantity"
            type="text"
            name="requiredQuantity"
            className="form-input"
            placeholder="e.g. 5 kg (Evaluation) / 500 kg (Commercial)"
            value={formData.requiredQuantity}
            onChange={handleChange}
            style={{ width: '100%', padding: '0.7rem 0.85rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}
          />
          {errors.requiredQuantity && <span style={{ color: '#D32F2F', fontSize: '0.75rem', marginTop: '0.25rem', display: 'block' }}>{errors.requiredQuantity}</span>}
        </div>

        {/* Preferred Pack Size */}
        <div className="form-group">
          <label className="form-label" htmlFor="preferredPackSize">
            Packaging Format
          </label>
          <select
            id="preferredPackSize"
            name="preferredPackSize"
            className="form-select"
            value={formData.preferredPackSize}
            onChange={handleChange}
            style={{ width: '100%', padding: '0.7rem 0.85rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', background: '#FFFFFF' }}
          >
            <option value="1 kg Sample Canister">1 kg Sample Canister</option>
            <option value="5 kg Canister">5 kg Canister</option>
            <option value="25 kg HDPE Drum">25 kg HDPE Drum</option>
            <option value="200 kg Barrel">200 kg Coated Steel Barrel</option>
            <option value="Custom Tanker Bulk">Custom Bulk Tanker</option>
          </select>
        </div>
      </div>

      {/* Application */}
      <div className="form-group" style={{ marginBottom: '1.25rem' }}>
        <label className="form-label" htmlFor="application">
          Application &amp; End Matrix <span className="req" style={{ color: 'var(--color-accent-rose)' }}>*</span>
        </label>
        <input
          id="application"
          type="text"
          name="application"
          className="form-input"
          placeholder="e.g. Carbonated Soft Drink, Hard Candy, Body Wash, Liquid Detergent..."
          value={formData.application}
          onChange={handleChange}
          style={{ width: '100%', padding: '0.7rem 0.85rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}
        />
        {errors.application && <span style={{ color: '#D32F2F', fontSize: '0.75rem', marginTop: '0.25rem', display: 'block' }}>{errors.application}</span>}
      </div>

      {/* Message */}
      <div className="form-group" style={{ marginBottom: '1.25rem' }}>
        <label className="form-label" htmlFor="message">
          Message &amp; Technical Requirements
        </label>
        <textarea
          id="message"
          name="message"
          rows={3}
          className="form-textarea"
          placeholder="Describe target organoleptic notes, thermal stability requirements, processing pH, compliance requirements (Halal, Kosher, FSSAI)..."
          value={formData.message}
          onChange={handleChange}
          style={{ width: '100%', padding: '0.7rem 0.85rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', resize: 'vertical' }}
        />
      </div>

      {/* File Attachment Input with Validation */}
      <div className="form-group" style={{ marginBottom: '1.5rem' }}>
        <label className="form-label" htmlFor="fileAttachment">
          Product Technical Specification or Benchmark File (Optional)
        </label>
        
        {!attachedFile ? (
          <div style={{ border: '2px dashed var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '1.25rem', textAlign: 'center', background: 'var(--color-bg-ivory)', position: 'relative' }}>
            <UploadCloud size={28} color="var(--color-accent-rose)" style={{ margin: '0 auto 0.5rem' }} />
            <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-dark)' }}>
              Click to browse or drag &amp; drop reference document
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--color-text-light)', marginTop: '0.25rem' }}>
              Allowed formats: PDF, DOC, DOCX, JPG, PNG (Max file size: 5 MB)
            </div>
            <input
              id="fileAttachment"
              type="file"
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
              onChange={handleFileChange}
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0, cursor: 'pointer' }}
            />
          </div>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem 1rem', background: '#F8F9FA', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <FileText size={20} color="var(--color-accent-rose)" />
              <div>
                <div style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--color-text-dark)' }}>{attachedFile.name}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--color-text-light)' }}>{(attachedFile.size / 1024).toFixed(0)} KB</div>
              </div>
            </div>
            <button
              type="button"
              onClick={removeFile}
              style={{ background: 'none', border: 'none', color: '#D32F2F', cursor: 'pointer', padding: '4px' }}
              title="Remove attached file"
            >
              <Trash2 size={16} />
            </button>
          </div>
        )}

        {fileError && <span style={{ color: '#D32F2F', fontSize: '0.78rem', marginTop: '0.35rem', display: 'block' }}>{fileError}</span>}
      </div>

      {/* Mandatory Demo Disclaimer Notice */}
      <div className="demo-disclaimer-banner" style={{ marginBottom: '1.5rem', borderRadius: 'var(--radius-md)' }}>
        <AlertCircle size={18} />
        <span>
          <strong>Notice:</strong> This is a demonstration form. Submission logs your quotation request locally in your browser for review in the My Quotes tracker. No actual transmission is made to SKFF sales desks.
        </span>
      </div>

      {/* Submit Button & Reset */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
        <button 
          type="submit" 
          className="btn btn-rose btn-lg" 
          disabled={isSubmitting}
          style={{ minWidth: '240px', justifyContent: 'center' }}
        >
          {isSubmitting ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              <span>Simulating Submission...</span>
            </>
          ) : (
            <>
              <Send size={16} />
              <span>Submit Commercial RFQ</span>
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

