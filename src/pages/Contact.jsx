import React from 'react';
import Breadcrumb from '../components/Breadcrumb';
import EnquiryForm from '../components/EnquiryForm';
import { MapPin, Phone, Mail, Globe, Clock, Building2 } from 'lucide-react';

const Contact = () => {
  return (
    <div className="contact-page" style={{ paddingBottom: '5rem' }}>
      <div className="container">
        <Breadcrumb items={[{ label: 'Contact Us' }]} />

        {/* Header */}
        <div style={{ padding: '2.5rem 0 3.5rem' }}>
          <span className="eyebrow">GLOBAL LOCATIONS &amp; DESK</span>
          <h1 style={{ fontSize: 'clamp(2.2rem, 4vw, 3.5rem)', color: 'var(--color-primary-dark)', marginBottom: '0.75rem' }}>
            Get in Touch with SKFF
          </h1>
          <p style={{ fontSize: '1.05rem', color: 'var(--color-text-muted)', maxWidth: '780px', lineHeight: 1.7 }}>
            Our corporate headquarters, application centres, and international offices are ready to assist you with sample requests, custom compounding, and commercial inquiries.
          </p>
        </div>

        {/* Global Hubs Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', marginBottom: '4rem' }}>
          {/* Mumbai HQ */}
          <div style={{ background: '#FFFFFF', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '1.5rem', boxShadow: 'var(--shadow-sm)' }}>
            <span className="badge badge-rose" style={{ marginBottom: '0.5rem' }}>Corporate HQ</span>
            <h4 style={{ color: 'var(--color-primary-dark)', marginBottom: '0.4rem' }}>Mumbai, India</h4>
            <p style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', lineHeight: 1.6, marginBottom: '1rem' }}>
              Lotus Corporate Park, Off WEH, Goregaon East, Mumbai – 400063
            </p>
            <div style={{ fontSize: '0.82rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              <a href="tel:+912242866600" style={{ color: 'var(--color-accent-rose)', fontWeight: 600 }}>
                📞 +91-22-4286 6600
              </a>
              <a href="mailto:info@skff.co.in" style={{ color: 'var(--color-text-main)' }}>
                ✉️ info@skff.co.in
              </a>
            </div>
          </div>

          {/* Boisar Plant */}
          <div style={{ background: '#FFFFFF', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '1.5rem', boxShadow: 'var(--shadow-sm)' }}>
            <span className="badge badge-primary" style={{ marginBottom: '0.5rem' }}>Manufacturing Plant</span>
            <h4 style={{ color: 'var(--color-primary-dark)', marginBottom: '0.4rem' }}>Boisar, India</h4>
            <p style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', lineHeight: 1.6, marginBottom: '1rem' }}>
              75,000 sq.ft. Industrial Complex, MIDC Boisar, Maharashtra
            </p>
            <div style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>
              Bulk compounding, automated bottling &amp; analytical release lab.
            </div>
          </div>

          {/* Grasse France */}
          <div style={{ background: '#FFFFFF', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '1.5rem', boxShadow: 'var(--shadow-sm)' }}>
            <span className="badge badge-gold" style={{ marginBottom: '0.5rem' }}>Creative Perfumery</span>
            <h4 style={{ color: 'var(--color-primary-dark)', marginBottom: '0.4rem' }}>Grasse, France</h4>
            <p style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', lineHeight: 1.6, marginBottom: '1rem' }}>
              SKFrance, Historic Perfumery District, Grasse, France
            </p>
            <div style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>
              Fine fragrance design, trends &amp; European botanical curation.
            </div>
          </div>

          {/* Sharjah UAE */}
          <div style={{ background: '#FFFFFF', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '1.5rem', boxShadow: 'var(--shadow-sm)' }}>
            <span className="badge badge-primary" style={{ marginBottom: '0.5rem' }}>Regional Hub</span>
            <h4 style={{ color: 'var(--color-primary-dark)', marginBottom: '0.4rem' }}>Sharjah, UAE</h4>
            <p style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', lineHeight: 1.6, marginBottom: '1rem' }}>
              SKFF Middle East LLC, Application Laboratory, Sharjah
            </p>
            <div style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>
              Serving Middle East, North Africa (MENA) &amp; GCC brands.
            </div>
          </div>
        </div>

        {/* Split Layout: Contact Form & Map representation */}
        <div className="enquiry-page-layout">
          <div>
            <EnquiryForm />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div className="contact-card-box">
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', color: 'var(--color-primary-dark)', marginBottom: '1rem' }}>
                Corporate Registered Office Details
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', lineHeight: 1.7, marginBottom: '1.25rem' }}>
                Please direct official postal communications, sampling requests, and contract proposals to our registered headquarters in Mumbai.
              </p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.9rem' }}>
                <div>
                  <strong>Address:</strong>
                  <p style={{ color: 'var(--color-text-muted)', marginTop: '0.2rem' }}>
                    G 1601 / 1602, Lotus Corporate Park, Off Western Express Highway, Goregaon East, Mumbai – 400063, Maharashtra, India.
                  </p>
                </div>
                <div>
                  <strong>Telephone: </strong>
                  <a href="tel:+912242866600" style={{ color: 'var(--color-accent-rose)', fontWeight: 600 }}>
                    +91-22-4286 6600
                  </a>
                </div>
                <div>
                  <strong>Corporate Email: </strong>
                  <a href="mailto:info@skff.co.in" style={{ color: 'var(--color-accent-rose)', fontWeight: 600 }}>
                    info@skff.co.in
                  </a>
                </div>
                <div>
                  <strong>Official Website: </strong>
                  <a href="https://www.skff.in/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-primary)' }}>
                    https://www.skff.in/
                  </a>
                </div>
              </div>
            </div>

            {/* Product Consultation CTA Banner */}
            <div style={{ background: 'var(--color-bg-pastel-pink)', border: '1px solid rgba(232, 93, 117, 0.25)', borderRadius: 'var(--radius-xl)', padding: '1.75rem', textAlign: 'center' }}>
              <span className="eyebrow" style={{ color: 'var(--color-accent-rose)' }}>1-ON-1 TECHNICAL CONSULTATION</span>
              <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', color: 'var(--color-primary-dark)', margin: '0.25rem 0 0.5rem' }}>
                Schedule a Sensory Formulation Session
              </h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', lineHeight: 1.5, marginBottom: '1.25rem' }}>
                Need custom compounding or base matrix off-note masking? Book a direct session with our senior flavourists or fragrance evaluators.
              </p>
              <a href="mailto:consultation@skff.in?subject=Schedule%20Formulation%20Consultation" className="btn btn-rose btn-sm" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                <Mail size={14} />
                <span>Book Technical Consultation</span>
              </a>
            </div>

            {/* Verified Google Maps Embed Card */}
            <div style={{ background: '#FFFFFF', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-xl)', overflow: 'hidden', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ background: 'var(--color-primary-dark)', color: '#FFFFFF', padding: '0.85rem 1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', fontWeight: 600 }}>
                <MapPin size={16} color="var(--color-accent-rose)" />
                <span>Verified Corporate Headquarters — Goregaon East, Mumbai</span>
              </div>
              <div style={{ height: '260px', width: '100%', position: 'relative' }}>
                <iframe
                  title="SKFF Corporate Office Location Map"
                  src="https://maps.google.com/maps?q=Lotus+Corporate+Park+Goregaon+East+Mumbai&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <div style={{ padding: '0.75rem 1rem', background: 'var(--color-bg-ivory)', borderTop: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.78rem' }}>
                <span style={{ color: 'var(--color-text-muted)' }}>Lotus Corporate Park, Off Western Express Highway</span>
                <a 
                  href="https://maps.google.com/?q=Lotus+Corporate+Park+Goregaon+East+Mumbai" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{ color: 'var(--color-accent-rose)', fontWeight: 600, textDecoration: 'none' }}
                >
                  Open in Google Maps →
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
