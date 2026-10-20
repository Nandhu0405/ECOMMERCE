import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Lock, Mail, ArrowRight, ShieldAlert, CheckCircle2, UserCheck } from 'lucide-react';
import { useToast } from '../context/ToastContext';
import Breadcrumb from '../components/Breadcrumb';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { addToast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const handleQuickFill = () => {
    setEmail('procurement.lead@kraft-foods.demo');
    setPassword('DemoClient@2026');
    addToast('Sample B2B client credentials populated', 'info');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      addToast('Please enter both email and password', 'error');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      // Save simulated session
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
    }, 800);
  };

  return (
    <div className="login-page">
      <div className="container" style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
        <Breadcrumb items={[{ label: 'Home', path: '/' }, { label: 'B2B Client Portal Login' }]} />

        <div className="auth-card-container">
          <div className="auth-card">
            <div className="demo-notice-banner">
              <ShieldAlert size={18} />
              <span>
                <strong>Frontend Demonstration:</strong> No backend authentication is active. Do not enter confidential credentials.
              </span>
            </div>

            <div className="auth-header">
              <span className="auth-kicker">Client Access</span>
              <h1>B2B Client Portal</h1>
              <p>Access your company's custom sensory formulations, sample requests, and wholesale quotations.</p>
            </div>

            <form onSubmit={handleSubmit} className="auth-form">
              <div className="form-group">
                <label htmlFor="login-email">Business Work Email *</label>
                <div className="input-with-icon">
                  <Mail size={18} className="input-icon" />
                  <input
                    id="login-email"
                    type="email"
                    placeholder="name@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <div className="label-with-link">
                  <label htmlFor="login-password">Portal Password *</label>
                  <button
                    type="button"
                    onClick={() => addToast('Simulated password reset email sent to your inbox', 'info')}
                    className="text-link-btn"
                  >
                    Forgot password?
                  </button>
                </div>
                <div className="input-with-icon">
                  <Lock size={18} className="input-icon" />
                  <input
                    id="login-password"
                    type="password"
                    placeholder="••••••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="form-actions-row">
                <button
                  type="button"
                  onClick={handleQuickFill}
                  className="btn btn-outline btn-sm quick-fill-btn"
                >
                  <UserCheck size={16} /> Quick-Fill Demo Client
                </button>
              </div>

              <button
                type="submit"
                className="btn btn-primary btn-block submit-auth-btn"
                disabled={loading}
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
