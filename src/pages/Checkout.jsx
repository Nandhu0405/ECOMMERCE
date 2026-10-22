import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { AlertCircle, ShieldCheck, CheckCircle2, Lock, ArrowLeft, Loader2, FileText, Send, Building2, MapPin, Truck } from 'lucide-react';

const Checkout = () => {
  const navigate = useNavigate();
  const { 
    cartItems, 
    pricedItems, 
    quoteItems, 
    hasPricedItems, 
    hasQuoteItems, 
    subtotal, 
    shipping, 
    tax, 
    total, 
    clearCart 
  } = useCart();
  const { addToast } = useToast();

  const [formData, setFormData] = useState({
    // Section 1: Customer information
    fullName: '',
    companyName: '',
    email: '',
    phone: '',
    taxId: '',

    // Section 2: Billing address
    billingAddress: '',
    billingCity: '',
    billingState: 'Maharashtra',
    billingCountry: 'India',
    billingPostalCode: '',

    // Section 3: Shipping address
    sameAsBilling: true,
    shippingAddress: '',
    shippingCity: '',
    shippingState: 'Maharashtra',
    shippingCountry: 'India',
    shippingPostalCode: '',

    // Payment demo method
    paymentMethod: 'invoice',
    orderNotes: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const errs = {};
    // Section 1 Validation
    if (!formData.fullName.trim()) errs.fullName = 'Full Name is required';
    if (!formData.companyName.trim()) errs.companyName = 'Company / Enterprise name is required';
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = 'Valid corporate email is required';
    }
    if (!formData.phone.trim() || !/^\+?[\d\s-]{7,18}$/.test(formData.phone.trim())) {
      errs.phone = 'Valid contact phone number is required';
    }

    // Section 2 Validation
    if (!formData.billingAddress.trim()) errs.billingAddress = 'Billing address is required';
    if (!formData.billingCity.trim()) errs.billingCity = 'Billing city is required';
    if (!formData.billingState.trim()) errs.billingState = 'Billing state is required';
    if (!formData.billingCountry.trim()) errs.billingCountry = 'Billing country is required';
    if (!formData.billingPostalCode.trim()) errs.billingPostalCode = 'Postal / ZIP code is required';

    // Section 3 Validation (if different shipping address)
    if (!formData.sameAsBilling) {
      if (!formData.shippingAddress.trim()) errs.shippingAddress = 'Shipping delivery address is required';
      if (!formData.shippingCity.trim()) errs.shippingCity = 'Shipping city is required';
      if (!formData.shippingState.trim()) errs.shippingState = 'Shipping state is required';
      if (!formData.shippingCountry.trim()) errs.shippingCountry = 'Shipping country is required';
      if (!formData.shippingPostalCode.trim()) errs.shippingPostalCode = 'Shipping postal code is required';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) {
      addToast('Please complete all required customer and address fields.', 'error');
      return;
    }

    if (cartItems.length === 0) {
      addToast('Your cart is empty.', 'error');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const orderId = 'SKFF-ORD-' + Math.floor(100000 + Math.random() * 900000);
      const effectiveShippingAddr = formData.sameAsBilling 
        ? {
            address: formData.billingAddress,
            city: formData.billingCity,
            state: formData.billingState,
            country: formData.billingCountry,
            postalCode: formData.billingPostalCode
          }
        : {
            address: formData.shippingAddress,
            city: formData.shippingCity,
            state: formData.shippingState,
            country: formData.shippingCountry,
            postalCode: formData.shippingPostalCode
          };

      const orderRecord = {
        id: orderId,
        date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
        customer: {
          fullName: formData.fullName,
          companyName: formData.companyName,
          email: formData.email,
          phone: formData.phone,
          taxId: formData.taxId
        },
        billingAddress: {
          address: formData.billingAddress,
          city: formData.billingCity,
          state: formData.billingState,
          country: formData.billingCountry,
          postalCode: formData.billingPostalCode
        },
        shippingAddress: effectiveShippingAddr,
        items: cartItems,
        subtotal: hasPricedItems ? subtotal : null,
        shipping: hasPricedItems ? shipping : null,
        tax: hasPricedItems ? tax : null,
        total: hasPricedItems ? total : null,
        status: hasPricedItems ? 'Confirmed (Demo)' : 'Quote Under Review (Demo)'
      };

      try {
        const storedOrders = JSON.parse(localStorage.getItem('skff_demo_orders') || '[]');
        localStorage.setItem('skff_demo_orders', JSON.stringify([orderRecord, ...storedOrders]));

        // If quote items were part of this, also store as an RFQ entry
        if (hasQuoteItems) {
          const storedEnquiries = JSON.parse(localStorage.getItem('skff_demo_enquiries') || '[]');
          const rfqRecord = {
            id: 'RFQ-' + Math.floor(100000 + Math.random() * 900000),
            date: orderRecord.date,
            fullName: formData.fullName,
            companyName: formData.companyName,
            email: formData.email,
            phone: formData.phone,
            productName: quoteItems.map(i => i.name).join(', '),
            requiredQuantity: quoteItems.map(i => `${i.quantity} × ${i.selectedPackSize}`).join(', '),
            status: 'Under Review'
          };
          localStorage.setItem('skff_demo_enquiries', JSON.stringify([rfqRecord, ...storedEnquiries]));
        }
      } catch (err) {
        console.warn('Failed to persist demo order/quote', err);
      }

      clearCart();
      setIsSubmitting(false);
      navigate(`/order-confirmation?orderId=${orderId}`);
    }, 1200);
  };

  if (cartItems.length === 0) {
    return (
      <div className="container" style={{ padding: '6rem 0', textAlign: 'center' }}>
        <h2 style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-primary-dark)' }}>No Items in Cart for Checkout</h2>
        <p style={{ margin: '1rem 0 2rem', color: 'var(--color-text-muted)' }}>
          Please add flavour or fragrance formulations before proceeding to checkout.
        </p>
        <Link to="/products" className="btn btn-rose">
          Return to Products
        </Link>
      </div>
    );
  }

  return (
    <div className="checkout-page" style={{ paddingBottom: '6rem' }}>
      <div className="container">
        <Breadcrumb items={[{ label: 'Sample Cart', url: '/cart' }, { label: 'Commercial Checkout' }]} />

        <div style={{ padding: '2rem 0 1.5rem' }}>
          <span className="eyebrow" style={{ color: 'var(--color-accent-rose)' }}>B2B COMMERCIAL DISPATCH</span>
          <h1 style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)', color: 'var(--color-primary-dark)', marginBottom: '0.5rem', fontFamily: 'var(--font-heading)' }}>
            Enterprise Order &amp; Quotation Checkout
          </h1>
          <p style={{ color: 'var(--color-text-muted)', margin: 0 }}>
            Submit company invoicing details, billing coordinates, and dispatch destinations.
          </p>
        </div>

        {/* Mandatory Demo Banner */}
        <div className="demo-disclaimer-banner" style={{ marginBottom: '2rem', borderRadius: 'var(--radius-lg)' }}>
          <AlertCircle size={22} />
          <span>
            <strong>Frontend Demonstration Notice:</strong> Payment is a demonstration. No real financial or credit card transaction will occur and no payment gateway backend is connected.
          </span>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <div className="cart-page-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 400px', gap: '2.5rem', alignItems: 'start' }}>
            
            {/* Left Column: Multi-Section Interface */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              
              {/* SECTION 1: Customer information */}
              <div style={{ background: '#FFFFFF', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-2xl)', padding: '2rem', boxShadow: 'var(--shadow-sm)' }}>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.35rem', color: 'var(--color-primary-dark)', marginBottom: '1.25rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Building2 size={20} color="var(--color-accent-rose)" />
                  <span>Section 1: Customer Information</span>
                </h3>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
                  <div className="form-group">
                    <label className="form-label" htmlFor="fullName">Full Name <span className="req" style={{ color: 'var(--color-accent-rose)' }}>*</span></label>
                    <input
                      id="fullName"
                      type="text"
                      name="fullName"
                      className="form-input"
                      placeholder="e.g. Vikram Malhotra"
                      value={formData.fullName}
                      onChange={handleChange}
                      style={{ width: '100%', padding: '0.7rem 0.85rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}
                    />
                    {errors.fullName && <span style={{ color: '#D32F2F', fontSize: '0.75rem', marginTop: '0.25rem', display: 'block' }}>{errors.fullName}</span>}
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="companyName">Company Name <span className="req" style={{ color: 'var(--color-accent-rose)' }}>*</span></label>
                    <input
                      id="companyName"
                      type="text"
                      name="companyName"
                      className="form-input"
                      placeholder="e.g. Cadbury Kraft Confectionery"
                      value={formData.companyName}
                      onChange={handleChange}
                      style={{ width: '100%', padding: '0.7rem 0.85rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}
                    />
                    {errors.companyName && <span style={{ color: '#D32F2F', fontSize: '0.75rem', marginTop: '0.25rem', display: 'block' }}>{errors.companyName}</span>}
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
                  <div className="form-group">
                    <label className="form-label" htmlFor="email">Work Email <span className="req" style={{ color: 'var(--color-accent-rose)' }}>*</span></label>
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

                  <div className="form-group">
                    <label className="form-label" htmlFor="phone">Phone Number <span className="req" style={{ color: 'var(--color-accent-rose)' }}>*</span></label>
                    <input
                      id="phone"
                      type="tel"
                      name="phone"
                      className="form-input"
                      placeholder="+91 98200 12345"
                      value={formData.phone}
                      onChange={handleChange}
                      style={{ width: '100%', padding: '0.7rem 0.85rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}
                    />
                    {errors.phone && <span style={{ color: '#D32F2F', fontSize: '0.75rem', marginTop: '0.25rem', display: 'block' }}>{errors.phone}</span>}
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="taxId">GST / VAT / Tax ID (where applicable)</label>
                  <input
                    id="taxId"
                    type="text"
                    name="taxId"
                    className="form-input"
                    placeholder="e.g. 27AABCK8842F1Z9"
                    value={formData.taxId}
                    onChange={handleChange}
                    style={{ width: '100%', padding: '0.7rem 0.85rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}
                  />
                  <span style={{ fontSize: '0.75rem', color: 'var(--color-text-light)', marginTop: '0.25rem', display: 'block' }}>
                    Required for B2B input tax credit invoicing in India
                  </span>
                </div>
              </div>

              {/* SECTION 2: Billing address */}
              <div style={{ background: '#FFFFFF', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-2xl)', padding: '2rem', boxShadow: 'var(--shadow-sm)' }}>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.35rem', color: 'var(--color-primary-dark)', marginBottom: '1.25rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <MapPin size={20} color="var(--color-accent-rose)" />
                  <span>Section 2: Billing Address</span>
                </h3>

                <div className="form-group" style={{ marginBottom: '1rem' }}>
                  <label className="form-label" htmlFor="billingAddress">Billing Street Address <span className="req" style={{ color: 'var(--color-accent-rose)' }}>*</span></label>
                  <input
                    id="billingAddress"
                    type="text"
                    name="billingAddress"
                    className="form-input"
                    placeholder="Floor, Building, Industrial Zone, Street..."
                    value={formData.billingAddress}
                    onChange={handleChange}
                    style={{ width: '100%', padding: '0.7rem 0.85rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}
                  />
                  {errors.billingAddress && <span style={{ color: '#D32F2F', fontSize: '0.75rem', marginTop: '0.25rem', display: 'block' }}>{errors.billingAddress}</span>}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
                  <div className="form-group">
                    <label className="form-label" htmlFor="billingCity">City <span className="req" style={{ color: 'var(--color-accent-rose)' }}>*</span></label>
                    <input
                      id="billingCity"
                      type="text"
                      name="billingCity"
                      className="form-input"
                      placeholder="e.g. Mumbai"
                      value={formData.billingCity}
                      onChange={handleChange}
                      style={{ width: '100%', padding: '0.7rem 0.85rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}
                    />
                    {errors.billingCity && <span style={{ color: '#D32F2F', fontSize: '0.75rem', marginTop: '0.25rem', display: 'block' }}>{errors.billingCity}</span>}
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="billingState">State <span className="req" style={{ color: 'var(--color-accent-rose)' }}>*</span></label>
                    <input
                      id="billingState"
                      type="text"
                      name="billingState"
                      className="form-input"
                      placeholder="e.g. Maharashtra"
                      value={formData.billingState}
                      onChange={handleChange}
                      style={{ width: '100%', padding: '0.7rem 0.85rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}
                    />
                    {errors.billingState && <span style={{ color: '#D32F2F', fontSize: '0.75rem', marginTop: '0.25rem', display: 'block' }}>{errors.billingState}</span>}
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                  <div className="form-group">
                    <label className="form-label" htmlFor="billingCountry">Country <span className="req" style={{ color: 'var(--color-accent-rose)' }}>*</span></label>
                    <input
                      id="billingCountry"
                      type="text"
                      name="billingCountry"
                      className="form-input"
                      placeholder="e.g. India"
                      value={formData.billingCountry}
                      onChange={handleChange}
                      style={{ width: '100%', padding: '0.7rem 0.85rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}
                    />
                    {errors.billingCountry && <span style={{ color: '#D32F2F', fontSize: '0.75rem', marginTop: '0.25rem', display: 'block' }}>{errors.billingCountry}</span>}
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="billingPostalCode">Postal Code / PIN <span className="req" style={{ color: 'var(--color-accent-rose)' }}>*</span></label>
                    <input
                      id="billingPostalCode"
                      type="text"
                      name="billingPostalCode"
                      className="form-input"
                      placeholder="e.g. 400063"
                      value={formData.billingPostalCode}
                      onChange={handleChange}
                      style={{ width: '100%', padding: '0.7rem 0.85rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}
                    />
                    {errors.billingPostalCode && <span style={{ color: '#D32F2F', fontSize: '0.75rem', marginTop: '0.25rem', display: 'block' }}>{errors.billingPostalCode}</span>}
                  </div>
                </div>
              </div>

              {/* SECTION 3: Shipping address */}
              <div style={{ background: '#FFFFFF', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-2xl)', padding: '2rem', boxShadow: 'var(--shadow-sm)' }}>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.35rem', color: 'var(--color-primary-dark)', marginBottom: '1rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Truck size={20} color="var(--color-accent-rose)" />
                  <span>Section 3: Shipping / Plant Delivery Address</span>
                </h3>

                <label style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', padding: '0.75rem 1rem', background: 'var(--color-bg-ivory)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', cursor: 'pointer', marginBottom: '1.25rem' }}>
                  <input
                    type="checkbox"
                    name="sameAsBilling"
                    checked={formData.sameAsBilling}
                    onChange={handleChange}
                    style={{ width: '18px', height: '18px', accentColor: 'var(--color-accent-rose)' }}
                  />
                  <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--color-text-dark)' }}>
                    Shipping address is the same as billing address
                  </span>
                </label>

                {!formData.sameAsBilling && (
                  <div style={{ padding: '1rem', background: '#FFF8F8', borderRadius: 'var(--radius-lg)', border: '1px solid rgba(232, 93, 117, 0.2)' }}>
                    <div className="form-group" style={{ marginBottom: '1rem' }}>
                      <label className="form-label" htmlFor="shippingAddress">Plant / Receiving Warehouse Address <span className="req" style={{ color: 'var(--color-accent-rose)' }}>*</span></label>
                      <input
                        id="shippingAddress"
                        type="text"
                        name="shippingAddress"
                        className="form-input"
                        placeholder="Inward Goods Gate, Factory MIDC Plot..."
                        value={formData.shippingAddress}
                        onChange={handleChange}
                        style={{ width: '100%', padding: '0.7rem 0.85rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}
                      />
                      {errors.shippingAddress && <span style={{ color: '#D32F2F', fontSize: '0.75rem', marginTop: '0.25rem', display: 'block' }}>{errors.shippingAddress}</span>}
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
                      <div className="form-group">
                        <label className="form-label" htmlFor="shippingCity">City <span className="req" style={{ color: 'var(--color-accent-rose)' }}>*</span></label>
                        <input
                          id="shippingCity"
                          type="text"
                          name="shippingCity"
                          className="form-input"
                          placeholder="e.g. Boisar / Pune"
                          value={formData.shippingCity}
                          onChange={handleChange}
                          style={{ width: '100%', padding: '0.7rem 0.85rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}
                        />
                        {errors.shippingCity && <span style={{ color: '#D32F2F', fontSize: '0.75rem', marginTop: '0.25rem', display: 'block' }}>{errors.shippingCity}</span>}
                      </div>

                      <div className="form-group">
                        <label className="form-label" htmlFor="shippingState">State <span className="req" style={{ color: 'var(--color-accent-rose)' }}>*</span></label>
                        <input
                          id="shippingState"
                          type="text"
                          name="shippingState"
                          className="form-input"
                          placeholder="e.g. Maharashtra"
                          value={formData.shippingState}
                          onChange={handleChange}
                          style={{ width: '100%', padding: '0.7rem 0.85rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}
                        />
                        {errors.shippingState && <span style={{ color: '#D32F2F', fontSize: '0.75rem', marginTop: '0.25rem', display: 'block' }}>{errors.shippingState}</span>}
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                      <div className="form-group">
                        <label className="form-label" htmlFor="shippingCountry">Country <span className="req" style={{ color: 'var(--color-accent-rose)' }}>*</span></label>
                        <input
                          id="shippingCountry"
                          type="text"
                          name="shippingCountry"
                          className="form-input"
                          placeholder="e.g. India"
                          value={formData.shippingCountry}
                          onChange={handleChange}
                          style={{ width: '100%', padding: '0.7rem 0.85rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}
                        />
                        {errors.shippingCountry && <span style={{ color: '#D32F2F', fontSize: '0.75rem', marginTop: '0.25rem', display: 'block' }}>{errors.shippingCountry}</span>}
                      </div>

                      <div className="form-group">
                        <label className="form-label" htmlFor="shippingPostalCode">Postal Code / PIN <span className="req" style={{ color: 'var(--color-accent-rose)' }}>*</span></label>
                        <input
                          id="shippingPostalCode"
                          type="text"
                          name="shippingPostalCode"
                          className="form-input"
                          placeholder="e.g. 401506"
                          value={formData.shippingPostalCode}
                          onChange={handleChange}
                          style={{ width: '100%', padding: '0.7rem 0.85rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}
                        />
                        {errors.shippingPostalCode && <span style={{ color: '#D32F2F', fontSize: '0.75rem', marginTop: '0.25rem', display: 'block' }}>{errors.shippingPostalCode}</span>}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column: Order Summary & Submission */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              
              {/* SECTION 4: Order summary */}
              <div style={{ background: '#FFFFFF', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-2xl)', padding: '2rem', boxShadow: 'var(--shadow-sm)' }}>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.35rem', color: 'var(--color-primary-dark)', marginBottom: '1.25rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '0.75rem' }}>
                  Section 4: Order Summary
                </h3>

                <div style={{ maxHeight: '280px', overflowY: 'auto', marginBottom: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                  {cartItems.map((item) => {
                    const isQuoteReq = item.quoteRequired || (!item.price && !item.demoPrice);
                    const itemRate = item.price || item.demoPrice;

                    return (
                      <div key={`${item.id}-${item.selectedPackSize}`} style={{ borderBottom: '1px solid var(--color-border)', paddingBottom: '0.65rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                          <strong style={{ fontSize: '0.88rem', color: 'var(--color-primary-dark)' }}>{item.name}</strong>
                          {isQuoteReq ? (
                            <span className="badge badge-soft-peach" style={{ color: 'var(--color-accent-rose)', fontSize: '0.7rem', padding: '0.15rem 0.45rem' }}>
                              Quote Required
                            </span>
                          ) : (
                            <span style={{ fontWeight: 600, fontSize: '0.88rem' }}>
                              ₹{(itemRate * item.quantity).toLocaleString('en-IN')}
                            </span>
                          )}
                        </div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--color-text-light)', marginTop: '2px' }}>
                          Pack: {item.selectedPackSize} &bull; Qty: {item.quantity} {isQuoteReq ? '' : `(@ ₹${itemRate?.toLocaleString('en-IN')})`}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {hasPricedItems ? (
                  <>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', color: 'var(--color-text-muted)', marginBottom: '0.5rem' }}>
                      <span>Subtotal (Priced Items):</span>
                      <span style={{ fontWeight: 600, color: 'var(--color-text-dark)' }}>₹{subtotal.toLocaleString('en-IN')}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', color: 'var(--color-text-muted)', marginBottom: '0.5rem' }}>
                      <span>Logistics / Freight:</span>
                      <span>{shipping === 0 ? <strong style={{ color: '#2E7D32' }}>FREE (Demo)</strong> : `₹${shipping}`}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', color: 'var(--color-text-muted)', marginBottom: '0.75rem' }}>
                      <span>Estimated GST (18%):</span>
                      <span style={{ fontWeight: 600, color: 'var(--color-text-dark)' }}>₹{tax.toLocaleString('en-IN')}</span>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.15rem', fontWeight: 700, color: 'var(--color-primary-dark)', borderTop: '2px solid var(--color-border)', paddingTop: '0.75rem', marginTop: '0.5rem' }}>
                      <span>Total Amount:</span>
                      <span style={{ color: 'var(--color-accent-rose)' }}>₹{total.toLocaleString('en-IN')}</span>
                    </div>
                  </>
                ) : (
                  <div style={{ background: 'var(--color-bg-ivory)', padding: '0.85rem', borderRadius: 'var(--radius-md)', fontSize: '0.82rem', color: 'var(--color-text-dark)', lineHeight: 1.45 }}>
                    📌 All items in this order require commercial quotation. Total payable is determined after technical evaluation.
                  </div>
                )}
              </div>

              {/* SECTION 5: Submission */}
              <div style={{ background: '#FFFFFF', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-2xl)', padding: '2rem', boxShadow: 'var(--shadow-sm)' }}>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.35rem', color: 'var(--color-primary-dark)', marginBottom: '1.25rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '0.75rem' }}>
                  Section 5: Submission
                </h3>

                <p style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', marginBottom: '1.25rem', lineHeight: 1.5 }}>
                  {hasPricedItems 
                    ? 'Eligible priced products are processed via simulated commercial invoice.'
                    : 'Bespoke formulations requiring quotation will generate an official RFQ dossier.'}
                </p>

                {/* Submission CTA Buttons */}
                {hasPricedItems ? (
                  <button 
                    type="submit" 
                    className="btn btn-rose btn-block btn-lg"
                    disabled={isSubmitting}
                    style={{ width: '100%', justifyContent: 'center', marginBottom: '0.75rem' }}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={18} className="animate-spin" />
                        <span>Processing Demonstration Order...</span>
                      </>
                    ) : (
                      <>
                        <Lock size={16} />
                        <span>Proceed to Demonstration Payment</span>
                      </>
                    )}
                  </button>
                ) : (
                  <button 
                    type="submit" 
                    className="btn btn-rose btn-block btn-lg"
                    disabled={isSubmitting}
                    style={{ width: '100%', justifyContent: 'center', marginBottom: '0.75rem' }}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={18} className="animate-spin" />
                        <span>Submitting RFQ Dossier...</span>
                      </>
                    ) : (
                      <>
                        <Send size={16} />
                        <span>Submit Quote Request</span>
                      </>
                    )}
                  </button>
                )}

                <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                  <Link to="/cart" style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', display: 'inline-flex', alignItems: 'center', gap: '0.35rem', textDecoration: 'none' }}>
                    <ArrowLeft size={13} /> Return to Cart
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;

