import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Building2, Mail, Lock, Phone, User, Globe, ShieldAlert, ArrowRight } from 'lucide-react';
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
    annualRequirement: '1,000 - 5,000 kg',
    country: 'India',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const { addToast } = useToast();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      addToast('Passwords do not match', 'error');
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
      localStorage.setItem('skff_demo_user', JSON.stringify(demoUser));
      addToast('Registration complete! Welcome to the SKFF B2B Portal (Demo)', 'success');
      navigate('/account');
    }, 900);
  };

  return (
    <div className="register-page">
      <div className="container" style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
        <Breadcrumb items={[{ label: 'Home', path: '/' }, { label: 'B2B Partner Registration' }]} />

        <div className="auth-card-container wide-card">
          <div className="auth-card">
            <div className="demo-notice-banner">
              <ShieldAlert size={18} />
              <span>
                <strong>Frontend Demonstration:</strong> Submitting will create a local browser session. No actual data is transmitted to remote servers.
              </span>
            </div>

            <div className="auth-header">
              <span className="auth-kicker">Enterprise Onboarding</span>
              <h1>Register B2B Company Account</h1>
              <p>Join world-leading confectionery, beverage, dairy, bakery, and fragrance brands partnering with SKFF.</p>
            </div>

            <form onSubmit={handleSubmit} className="auth-form-grid">
              <div className="form-section-title">Company Information</div>

              <div className="form-group">
                <label htmlFor="reg-company">Registered Corporate Name *</label>
                <div className="input-with-icon">
                  <Building2 size={18} className="input-icon" />
                  <input
                    id="reg-company"
                    name="companyName"
                    type="text"
                    placeholder="e.g. Britannia Industries Formulation Unit"
                    value={formData.companyName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="reg-industry">Primary Industry Sector *</label>
                <select
                  id="reg-industry"
                  name="industry"
                  value={formData.industry}
                  onChange={handleChange}
                  className="custom-select"
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

              <div className="form-section-title">Contact Executive</div>

              <div className="form-group">
                <label htmlFor="reg-name">Full Name *</label>
                <div className="input-with-icon">
                  <User size={18} className="input-icon" />
                  <input
                    id="reg-name"
                    name="contactPerson"
                    type="text"
                    placeholder="e.g. Dr. Rajesh Sharma"
                    value={formData.contactPerson}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="reg-desig">Designation / Role *</label>
                <input
                  id="reg-desig"
                  name="designation"
                  type="text"
                  placeholder="e.g. Chief R&D Food Technologist"
                  value={formData.designation}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="reg-email">Work / Corporate Email *</label>
                <div className="input-with-icon">
                  <Mail size={18} className="input-icon" />
                  <input
                    id="reg-email"
                    name="workEmail"
                    type="email"
                    placeholder="r.sharma@britannia.demo"
                    value={formData.workEmail}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="reg-phone">Direct Contact Phone *</label>
                <div className="input-with-icon">
                  <Phone size={18} className="input-icon" />
                  <input
                    id="reg-phone"
                    name="phone"
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-section-title">Security & Password</div>

              <div className="form-group">
                <label htmlFor="reg-pass">Create Password *</label>
                <div className="input-with-icon">
                  <Lock size={18} className="input-icon" />
                  <input
                    id="reg-pass"
                    name="password"
                    type="password"
                    placeholder="••••••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="reg-cpass">Confirm Password *</label>
                <div className="input-with-icon">
                  <Lock size={18} className="input-icon" />
                  <input
                    id="reg-cpass"
                    name="confirmPassword"
                    type="password"
                    placeholder="••••••••••••"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-submit-full">
                <button
                  type="submit"
                  className="btn btn-primary btn-block submit-auth-btn"
                  disabled={loading}
                >
                  {loading ? 'Setting Up B2B Account...' : 'Complete Simulated Registration'}
                  {!loading && <ArrowRight size={18} />}
                </button>
              </div>
            </form>

            <div className="auth-footer">
              <p>
                Already have a verified account?{' '}
                <Link to="/login" className="highlight-link">
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
