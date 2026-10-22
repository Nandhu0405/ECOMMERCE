import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Building2, Mail, Lock, Phone, User, ShieldAlert, ArrowRight, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { useToast } from '../context/ToastContext';
import Breadcrumb from '../components/Breadcrumb';

const Register = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    contactPerson: '',
    designation: '',
    workEmail: '',
    phone: '',
    industry: 'Food and Beverage',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const { addToast } = useToast();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errorMsg) setErrorMsg('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    // Validation
    if (!formData.companyName.trim()) {
      setErrorMsg('Please provide your registered corporate company name.');
      return;
    }
    if (!formData.contactPerson.trim()) {
      setErrorMsg('Please provide your full name.');
      return;
    }
    if (!formData.workEmail.trim() || !/\S+@\S+\.\S+/.test(formData.workEmail)) {
      setErrorMsg('Please provide a valid corporate work email address.');
      return;
    }
    if (formData.password.length < 6) {
      setErrorMsg('Password must be at least 6 characters in length.');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setErrorMsg('Passwords do not match. Please verify both entries.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      const demoUser = {
        name: formData.contactPerson,
        email: formData.workEmail,
        company: formData.companyName,
        role: formData.designation || 'Procurement Executive',
        industry: formData.industry,
        accountTier: 'New Verified Partner',
        clientCode: `SKFF-CL-${Math.floor(1000 + Math.random() * 9000)}`,
        memberSince: '2026',
        isLoggedIn: true
      };
      // Save simulated session (never store plain passwords in production)
      localStorage.setItem('skff_demo_user', JSON.stringify(demoUser));
      addToast('Registration complete! Welcome to the SKFF B2B Portal (Demo)', 'success');
      navigate('/account');
    }, 800);
  };

  return (
    <div className="register-page">
      <div className="container" style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
        <Breadcrumb items={[{ label: 'Home', path: '/' }, { label: 'B2B Partner Registration' }]} />

        <div className="auth-card-container wide-card" style={{ maxWidth: '780px', margin: '0 auto' }}>
          <div className="auth-card" style={{ borderRadius: 'var(--radius-2xl)', background: '#FFFFFF', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-md)', padding: '2.5rem' }}>
            <div className="demo-notice-banner" style={{ background: 'var(--color-bg-pastel-pink)', border: '1px solid rgba(232, 93, 117, 0.25)', color: 'var(--color-text-dark)', borderRadius: 'var(--radius-md)', padding: '0.75rem 1rem', display: 'flex', gap: '0.6rem', alignItems: 'center', marginBottom: '1.5rem', fontSize: '0.82rem' }}>
              <ShieldAlert size={18} color="var(--color-accent-rose)" />
              <span>
                <strong>Frontend Demonstration:</strong> Submitting creates a local simulated session. No actual data is transmitted to remote servers.
              </span>
            </div>

            <div className="auth-header" style={{ marginBottom: '1.75rem', textAlign: 'center' }}>
              <span className="auth-kicker" style={{ color: 'var(--color-accent-rose)', fontWeight: 700, fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Enterprise Onboarding</span>
              <h1 style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-primary-dark)', fontSize: '1.85rem', margin: '0.25rem 0 0.5rem' }}>Register B2B Company Account</h1>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', lineHeight: 1.5, margin: 0 }}>
                Join world-leading confectionery, beverage, dairy, bakery, and fragrance brands partnering with SKFF.
              </p>
            </div>

            {errorMsg && (
              <div style={{ background: '#FFEBEE', border: '1px solid #FFCDD2', color: '#D32F2F', borderRadius: 'var(--radius-md)', padding: '0.75rem 1rem', marginBottom: '1.25rem', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <AlertCircle size={16} />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate>
              <div style={{ fontWeight: 700, color: 'var(--color-primary-dark)', fontSize: '1rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '0.5rem', marginBottom: '1.25rem' }}>
                1. Company Information
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem', marginBottom: '1.5rem' }}>
                <div className="form-group">
                  <label htmlFor="reg-company" style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-dark)', marginBottom: '0.35rem' }}>
                    Registered Corporate Name *
                  </label>
                  <div className="input-with-icon" style={{ position: 'relative' }}>
                    <Building2 size={18} className="input-icon" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-light)' }} />
                    <input
                      id="reg-company"
                      name="companyName"
                      type="text"
                      placeholder="e.g. Britannia Industries Formulation Unit"
                      value={formData.companyName}
                      onChange={handleChange}
                      style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 2.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', fontSize: '0.9rem' }}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="reg-industry" style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-dark)', marginBottom: '0.35rem' }}>
                    Primary Industry Sector *
                  </label>
                  <select
                    id="reg-industry"
                    name="industry"
                    value={formData.industry}
                    onChange={handleChange}
                    style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', fontSize: '0.9rem', background: '#FFFFFF' }}
                    required
                  >
                    <option value="Bakery and Confectionery">Bakery and Confectionery</option>
                    <option value="Food and Beverage">Food and Beverage</option>
                    <option value="Dairy Products">Dairy Products</option>
                    <option value="Pharmaceuticals & Health">Pharmaceuticals & Health</option>
                    <option value="Personal Care & Cosmetics">Personal Care & Cosmetics</option>
                    <option value="Home Care & Air Care">Home Care & Air Care</option>
                    <option value="Fabric Care & Detergents">Fabric Care & Detergents</option>
                    <option value="Fine Fragrances">Fine Fragrances</option>
                  </select>
                </div>
              </div>

              <div style={{ fontWeight: 700, color: 'var(--color-primary-dark)', fontSize: '1rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '0.5rem', marginBottom: '1.25rem' }}>
                2. Contact Representative
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem', marginBottom: '1.5rem' }}>
                <div className="form-group">
                  <label htmlFor="reg-name" style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-dark)', marginBottom: '0.35rem' }}>
                    Full Name *
                  </label>
                  <div className="input-with-icon" style={{ position: 'relative' }}>
                    <User size={18} className="input-icon" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-light)' }} />
                    <input
                      id="reg-name"
                      name="contactPerson"
                      type="text"
                      placeholder="e.g. Dr. Rajesh Sharma"
                      value={formData.contactPerson}
                      onChange={handleChange}
                      style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 2.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', fontSize: '0.9rem' }}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="reg-desig" style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-dark)', marginBottom: '0.35rem' }}>
                    Designation / Role
                  </label>
                  <input
                    id="reg-desig"
                    name="designation"
                    type="text"
                    placeholder="e.g. Chief R&D Food Technologist"
                    value={formData.designation}
                    onChange={handleChange}
                    style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', fontSize: '0.9rem' }}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="reg-email" style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-dark)', marginBottom: '0.35rem' }}>
                    Work / Corporate Email *
                  </label>
                  <div className="input-with-icon" style={{ position: 'relative' }}>
                    <Mail size={18} className="input-icon" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-light)' }} />
                    <input
                      id="reg-email"
                      name="workEmail"
                      type="email"
                      placeholder="r.sharma@britannia.demo"
                      value={formData.workEmail}
                      onChange={handleChange}
                      style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 2.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', fontSize: '0.9rem' }}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="reg-phone" style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-dark)', marginBottom: '0.35rem' }}>
                    Direct Contact Phone
                  </label>
                  <div className="input-with-icon" style={{ position: 'relative' }}>
                    <Phone size={18} className="input-icon" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-light)' }} />
                    <input
                      id="reg-phone"
                      name="phone"
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={handleChange}
                      style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 2.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', fontSize: '0.9rem' }}
                    />
                  </div>
                </div>
              </div>

              <div style={{ fontWeight: 700, color: 'var(--color-primary-dark)', fontSize: '1rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '0.5rem', marginBottom: '1.25rem' }}>
                3. Security &amp; Password
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem', marginBottom: '1.75rem' }}>
                <div className="form-group">
                  <label htmlFor="reg-pass" style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-dark)', marginBottom: '0.35rem' }}>
                    Create Password *
                  </label>
                  <div className="input-with-icon" style={{ position: 'relative' }}>
                    <Lock size={18} className="input-icon" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-light)' }} />
                    <input
                      id="reg-pass"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••••••"
                      value={formData.password}
                      onChange={handleChange}
                      style={{ width: '100%', padding: '0.75rem 2.5rem 0.75rem 2.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', fontSize: '0.9rem' }}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--color-text-muted)', cursor: 'pointer', padding: 0 }}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="reg-cpass" style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-dark)', marginBottom: '0.35rem' }}>
                    Confirm Password *
                  </label>
                  <div className="input-with-icon" style={{ position: 'relative' }}>
                    <Lock size={18} className="input-icon" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-light)' }} />
                    <input
                      id="reg-cpass"
                      name="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder="••••••••••••"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      style={{ width: '100%', padding: '0.75rem 2.5rem 0.75rem 2.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', fontSize: '0.9rem' }}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--color-text-muted)', cursor: 'pointer', padding: 0 }}
                      aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                    >
                      {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-rose btn-block submit-auth-btn"
                disabled={loading}
                style={{ width: '100%', justifyContent: 'center', padding: '0.85rem' }}
              >
                {loading ? 'Setting Up B2B Account...' : 'Complete Simulated Registration'}
                {!loading && <ArrowRight size={18} />}
              </button>
            </form>

            <div className="auth-footer" style={{ marginTop: '1.75rem', textAlign: 'center', paddingTop: '1.25rem', borderTop: '1px solid var(--color-border)' }}>
              <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
                Already have a verified account?{' '}
                <Link to="/login" style={{ color: 'var(--color-accent-rose)', fontWeight: 600, textDecoration: 'none' }}>
                  Log in to portal
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;

