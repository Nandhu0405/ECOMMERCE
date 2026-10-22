import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Globe, ArrowUpRight, ShieldCheck } from 'lucide-react';
import logoImg from '../assets/skff-logo.png';
import { FLAVOUR_CATEGORIES, FRAGRANCE_CATEGORIES } from '../data/categories';

const Footer = () => {
  return (
    <footer className="corporate-footer" role="contentinfo">
      <div className="footer-ambient-glow"></div>
      
      <div className="container" style={{ paddingTop: '4.5rem', position: 'relative', zIndex: 10 }}>
        <div className="footer-top-divider"></div>

        <div className="footer-main-grid">
          {/* Brand & Identity Column */}
          <div className="footer-brand-col">
            <div className="footer-logo-box">
              <img src={logoImg} alt="SKFF Logo" className="footer-logo-img" />
            </div>
            <p className="footer-brand-desc">
              <strong>SKFF (INDIA) PVT. LTD.</strong> — A family-run pioneer in flavours and fragrances since 1922. Creating innovative sensory solutions rooted in nature and backed by advanced analytical science.
            </p>
            <div className="footer-presence-badges">
              <span className="presence-tag">Mumbai</span>
              <span className="presence-tag">Boisar (75,000 sq.ft)</span>
              <span className="presence-tag">Grasse (France)</span>
              <span className="presence-tag">Sharjah (UAE)</span>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="footer-col">
            <h4>Company</h4>
            <ul className="footer-links-list">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/products">All Products</Link></li>
              <li><Link to="/company-profile">Company Profile</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
              <li><Link to="/request-quote">Request a Quote</Link></li>
              <li><Link to="/admin" className="footer-admin-link">Demo Admin</Link></li>
            </ul>
          </div>

          {/* Flavours Column */}
          <div className="footer-col">
            <h4>Flavours</h4>
            <ul className="footer-links-list">
              {FLAVOUR_CATEGORIES.map(cat => (
                <li key={cat.id}>
                  <Link to={`/category/${cat.slug}`}>{cat.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Fragrances Column */}
          <div className="footer-col">
            <h4>Fragrances</h4>
            <ul className="footer-links-list">
              {FRAGRANCE_CATEGORIES.map(cat => (
                <li key={cat.id}>
                  <Link to={`/category/${cat.slug}`}>{cat.name}</Link>
                </li>
              ))}
              <li style={{ marginTop: '0.75rem', paddingTop: '0.75rem', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                <Link to="/catalogue" style={{ color: 'var(--color-accent-soft-rose)', fontWeight: 600 }}>
                  Product Catalogue →
                </Link>
              </li>
              <li>
                <Link to="/specifications">Technical Specifications</Link>
              </li>
              <li>
                <Link to="/faq">Frequently Asked Questions</Link>
              </li>
            </ul>
          </div>

          {/* Verified Official Contact Details */}
          <div className="footer-col">
            <h4>Official Contact</h4>
            <div className="footer-contact-info">
              <div className="footer-contact-item">
                <MapPin size={18} />
                <span>
                  G 1601 / 1602, Lotus Corporate Park, Off Western Express Highway, Goregaon East, Mumbai – 400063, India.
                </span>
              </div>
              <div className="footer-contact-item">
                <Phone size={18} />
                <a href="tel:+912242866600">+91-22-4286 6600</a>
              </div>
              <div className="footer-contact-item">
                <Mail size={18} />
                <a href="mailto:info@skff.co.in">info@skff.co.in</a>
              </div>
              <div className="footer-contact-item">
                <Globe size={18} />
                <a href="https://www.skff.in/" target="_blank" rel="noopener noreferrer">
                  www.skff.in <ArrowUpRight size={12} style={{ display: 'inline' }} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Legal Bar */}
        <div className="footer-bottom-bar">
          <div>
            © 2026 SKFF (INDIA) PVT. LTD. All rights reserved. • Tagline: "Passion to Perform"
          </div>
          <div className="footer-legal-links">
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms &amp; Conditions</Link>
            <Link to="/shipping">Shipping Policy (Demo)</Link>
            <Link to="/returns">Refund Policy (Demo)</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
