import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Lock, Mail, ArrowRight, ShieldAlert, UserCheck, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { useToast } from '../context/ToastContext';
import Breadcrumb from '../components/Breadcrumb';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const { addToast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const handleQuickFill = () => {
    setEmail('procurement.lead@kraft-foods.demo');
    setPassword('DemoClient@2026');
    setErrorMsg('');
    addToast('Sample B2B client credentials populated', 'info');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!email.trim() || !password) {
      setErrorMsg('Please enter both your corporate email and password.');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setErrorMsg('Please enter a valid work email address (e.g. name@company.com).');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      // Save simulated session (never store plain passwords in production)
      const demoUser = {
        name: email.split('@')[0].replace('.', ' ').toUpperCase(),
        email: email,
        company: 'Kraft Foods Global Formulation Lab',
        role: 'Senior Flavorist & Procurement Lead',
        accountTier: 'Tier 1 Enterprise Client',
        clientCode: 'SKFF-CL-8842',
        memberSince: '2021',
        isLoggedIn: true
      };
      localStorage.setItem('skff_demo_user', JSON.stringify(demoUser));
      addToast(`Welcome back, ${demoUser.name}! (Simulated B2B Session)`, 'success');

      const redirectPath = location.state?.from || '/account';
      navigate(redirectPath);
    }, 700);
  };

  return (
    <div className="login-page">
      <div className="container" style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
        <Breadcrumb items={[{ label: 'Home', path: '/' }, { label: 'B2B Client Portal Login' }]} />

        <div className="auth-card-container">
          <div className="auth-card" style={{ borderRadius: 'var(--radius-2xl)', background: '#FFFFFF', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-md)', padding: '2.5rem' }}>
            <div className="demo-notice-banner" style={{ background: 'var(--color-bg-pastel-pink)', border: '1px solid rgba(232, 93, 117, 0.25)', color: 'var(--color-text-dark)', borderRadius: 'var(--radius-md)', padding: '0.75rem 1rem', display: 'flex', gap: '0.6rem', alignItems: 'center', marginBottom: '1.5rem', fontSize: '0.82rem' }}>
              <ShieldAlert size={18} color="var(--color-accent-rose)" />
              <span>
                <strong>Frontend Demonstration:</strong> No backend authentication is connected. Authentication is simulated locally for prototype exploration.
              </span>
            </div>

            <div className="auth-header" style={{ marginBottom: '1.75rem', textAlign: 'center' }}>
              <span className="auth-kicker" style={{ color: 'var(--color-accent-rose)', fontWeight: 700, fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Client Access</span>
              <h1 style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-primary-dark)', fontSize: '1.85rem', margin: '0.25rem 0 0.5rem' }}>B2B Client Portal</h1>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', lineHeight: 1.5, margin: 0 }}>
                Access your company's custom sensory formulations, sample requests, and wholesale quotations.
              </p>
            </div>

            {errorMsg && (
              <div style={{ background: '#FFEBEE', border: '1px solid #FFCDD2', color: '#D32F2F', borderRadius: 'var(--radius-md)', padding: '0.75rem 1rem', marginBottom: '1.25rem', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <AlertCircle size={16} />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="auth-form" noValidate>
              <div className="form-group" style={{ marginBottom: '1.25rem' }}>
                <label htmlFor="login-email" style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-dark)', marginBottom: '0.35rem' }}>
                  Business Work Email *
                </label>
                <div className="input-with-icon" style={{ position: 'relative' }}>
                  <Mail size={18} className="input-icon" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-light)' }} />
                  <input
                    id="login-email"
                    type="email"
                    placeholder="name@company.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errorMsg) setErrorMsg('');
                    }}
                    style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 2.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', fontSize: '0.9rem' }}
                    required
                  />
                </div>
              </div>

              <div className="form-group" style={{ marginBottom: '1.25rem' }}>
                <div className="label-with-link" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                  <label htmlFor="login-password" style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-dark)' }}>
                    Portal Password *
                  </label>
                  <button
                    type="button"
                    onClick={() => addToast('Simulated password reset email sent to your inbox', 'info')}
                    className="text-link-btn"
                    style={{ background: 'none', border: 'none', color: 'var(--color-accent-rose)', fontSize: '0.8rem', cursor: 'pointer', padding: 0 }}
                  >
                    Forgot password?
                  </button>
                </div>
                <div className="input-with-icon" style={{ position: 'relative' }}>
                  <Lock size={18} className="input-icon" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-light)' }} />
                  <input
                    id="login-password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••••••"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (errorMsg) setErrorMsg('');
                    }}
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

              <div className="form-actions-row" style={{ marginBottom: '1.25rem' }}>
                <button
                  type="button"
                  onClick={handleQuickFill}
                  className="btn btn-secondary btn-sm quick-fill-btn"
                  style={{ width: '100%', justifyContent: 'center', fontSize: '0.82rem' }}
                >
                  <UserCheck size={16} /> Quick-Fill Demo Client
                </button>
              </div>

              <button
                type="submit"
                className="btn btn-rose btn-block submit-auth-btn"
                disabled={loading}
                style={{ width: '100%', justifyContent: 'center', padding: '0.85rem' }}
              >
                {loading ? 'Authenticating Simulated Client...' : 'Log In to B2B Portal'}
                {!loading && <ArrowRight size={18} />}
              </button>
            </form>

            <div className="auth-footer">
              <p>
                Need a corporate sample formulation account?{' '}
                <Link to="/register" className="highlight-link">
                  Register B2B Company Profile
                </Link>
              </p>
              <div className="auth-divider">
                <span>OR</span>
              </div>
              <p className="admin-shortcut">
                Sensory Formulation Manager?{' '}
                <Link to="/admin" className="admin-link">
                  Open Demo Admin Console
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
