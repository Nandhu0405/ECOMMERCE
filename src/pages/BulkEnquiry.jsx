import React from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb';
import EnquiryForm from '../components/EnquiryForm';
import { Phone, Mail, MapPin, Clock, ShieldCheck, CheckCircle2 } from 'lucide-react';

const BulkEnquiry = () => {
  const [searchParams] = useSearchParams();
  const initialProduct = searchParams.get('product') || '';
  const initialCategory = searchParams.get('category') || '';

  return (
    <div className="bulk-enquiry-page" style={{ paddingBottom: '5rem' }}>
      <div className="container">
        <Breadcrumb items={[{ label: 'Business Enquiry / Request a Quote' }]} />

        <div style={{ padding: '2rem 0 3rem' }}>
          <span className="eyebrow">COMMERCIAL ENQUIRY &amp; SAMPLES</span>
          <h1 style={{ fontSize: 'clamp(2.2rem, 4vw, 3.5rem)', color: 'var(--color-primary-dark)', marginBottom: '0.75rem' }}>
            Request a Commercial Quotation
          </h1>
          <p style={{ fontSize: '1.05rem', color: 'var(--color-text-muted)', maxWidth: '780px', lineHeight: 1.7 }}>
            Connect with the SKFF sales and technical formulation team. Submit your target dosage, base matrix parameters, and estimated batch volume to receive product specifications, sample canisters, and volume pricing.
          </p>
        </div>

        <div className="enquiry-page-layout">
          {/* Main Enquiry Form */}
          <div>
            <EnquiryForm
              initialCategory={initialCategory}
              initialProduct={initialProduct}
            />
          </div>

          {/* Company Details Sidebar */}
          <div className="contact-info-panel">
            <div className="contact-card-box">
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', color: 'var(--color-primary-dark)', marginBottom: '1.25rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '0.75rem' }}>
                Corporate Contact Office
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                  <MapPin size={18} color="var(--color-accent-rose)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong style={{ color: 'var(--color-text-main)' }}>Head Office:</strong>
                    <p style={{ fontSize: '0.85rem', marginTop: '0.2rem' }}>
                      G 1601 / 1602, Lotus Corporate Park, Off Western Express Highway, Goregaon East, Mumbai – 400063, India.
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                  <Phone size={18} color="var(--color-accent-rose)" style={{ flexShrink: 0 }} />
                  <div>
                    <strong style={{ color: 'var(--color-text-main)' }}>Direct Line: </strong>
                    <a href="tel:+912242866600" style={{ color: 'var(--color-accent-rose)', fontWeight: 600 }}>
                      +91-22-4286 6600
                    </a>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                  <Mail size={18} color="var(--color-accent-rose)" style={{ flexShrink: 0 }} />
                  <div>
                    <strong style={{ color: 'var(--color-text-main)' }}>Commercial Desk: </strong>
                    <a href="mailto:info@skff.co.in" style={{ color: 'var(--color-accent-rose)', fontWeight: 600 }}>
                      info@skff.co.in
                    </a>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                  <Clock size={18} color="var(--color-accent-rose)" style={{ flexShrink: 0 }} />
                  <div>
                    <strong style={{ color: 'var(--color-text-main)' }}>Operating Hours: </strong>
                    <span>Monday – Friday, 9:30 AM – 6:00 PM IST</span>
                  </div>
                </div>
              </div>
            </div>

            {/* B2B Evaluation Kit Details */}
            <div className="contact-card-box" style={{ background: 'var(--color-bg-ivory)' }}>
              <span className="badge badge-gold" style={{ marginBottom: '0.5rem' }}>B2B Sampling</span>
              <h4 style={{ color: 'var(--color-primary-dark)', marginBottom: '0.5rem' }}>
                Standard Sample Kit Packaging
              </h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', lineHeight: 1.6, marginBottom: '1rem' }}>
                Samples are packaged in tamper-evident aluminium or fluorinated HDPE canisters to preserve volatile headspaces during courier transit.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.82rem', color: 'var(--color-text-main)' }}>
                <div>✓ 500 g / 1 kg Lab Evaluation Samples</div>
                <div>✓ Technical Data Sheet (TDS) enclosed</div>
                <div>✓ Allergen &amp; Purity Certification enclosed</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BulkEnquiry;
