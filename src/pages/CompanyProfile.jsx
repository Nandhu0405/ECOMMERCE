import React from 'react';
import { Link } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb';
import plantImg from '../assets/production-plant.jpg';
import rdLab from '../assets/rd-lab.jpg';
import grasseImg from '../assets/grasse-france.jpg';
import { Building2, Globe, Shield, Microscope, CheckCircle2, FileText, Send } from 'lucide-react';

const CompanyProfile = () => {
  return (
    <div className="company-profile-page">
      <div className="container">
        <Breadcrumb items={[{ label: 'Company Profile' }]} />

        {/* Header */}
        <div style={{ padding: '2.5rem 0 3.5rem' }}>
          <span className="eyebrow">CORPORATE OVERVIEW &amp; INFRASTRUCTURE</span>
          <h1 style={{ fontSize: 'clamp(2.2rem, 4vw, 3.4rem)', color: 'var(--color-primary-dark)', marginBottom: '1rem' }}>
            Company Profile: SKFF (INDIA) PVT. LTD.
          </h1>
          <p style={{ fontSize: '1.05rem', color: 'var(--color-text-muted)', maxWidth: '780px', lineHeight: 1.7 }}>
            A leading Indian organization engaged in the creation, development, manufacturing, and supply of high-purity flavours and fragrances for global food, beverage, pharmaceutical, and consumer goods manufacturers.
          </p>
        </div>

        {/* Corporate Summary Card */}
        <div style={{ background: '#FFFFFF', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-xl)', padding: '2.5rem', boxShadow: 'var(--shadow-sm)', marginBottom: '3.5rem' }}>
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', color: 'var(--color-primary-dark)', marginBottom: '1.5rem', borderBottom: '1px solid var(--color-border-subtle)', paddingBottom: '0.75rem' }}>
            Corporate Information at a Glance
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem', fontSize: '0.9rem' }}>
            <div>
              <strong style={{ color: 'var(--color-text-main)', display: 'block', marginBottom: '0.2rem' }}>Legal Entity:</strong>
              <span style={{ color: 'var(--color-text-muted)' }}>SKFF (INDIA) PVT. LTD.</span>
            </div>
            <div>
              <strong style={{ color: 'var(--color-text-main)', display: 'block', marginBottom: '0.2rem' }}>Official Tagline:</strong>
              <span style={{ color: 'var(--color-accent-rose)', fontWeight: 600 }}>"Passion to Perform"</span>
            </div>
            <div>
              <strong style={{ color: 'var(--color-text-main)', display: 'block', marginBottom: '0.2rem' }}>Corporate Registered Office:</strong>
              <span style={{ color: 'var(--color-text-muted)' }}>G 1601 / 1602, Lotus Corporate Park, Off Western Express Highway, Goregaon East, Mumbai – 400063, India.</span>
            </div>
            <div>
              <strong style={{ color: 'var(--color-text-main)', display: 'block', marginBottom: '0.2rem' }}>Core Operations:</strong>
              <span style={{ color: 'var(--color-text-muted)' }}>Creation, compounding, manufacturing &amp; supply of flavours &amp; fragrance compounds.</span>
            </div>
            <div>
              <strong style={{ color: 'var(--color-text-main)', display: 'block', marginBottom: '0.2rem' }}>Flagship Manufacturing Facility:</strong>
              <span style={{ color: 'var(--color-text-muted)' }}>75,000 sq.ft. industrial manufacturing plant in Boisar, Maharashtra.</span>
            </div>
            <div>
              <strong style={{ color: 'var(--color-text-main)', display: 'block', marginBottom: '0.2rem' }}>International Centers:</strong>
              <span style={{ color: 'var(--color-text-muted)' }}>SKFrance (Grasse, France) • SKFF Middle East LLC &amp; Laboratory (Sharjah, UAE).</span>
            </div>
          </div>
        </div>

        {/* Global Infrastructure Grid */}
        <div style={{ marginBottom: '4rem' }}>
          <h2 style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-primary-dark)', marginBottom: '1.5rem' }}>
            Manufacturing &amp; Innovation Infrastructure
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
            {/* Boisar Plant */}
            <div className="category-feature-card">
              <div className="category-card-media" style={{ height: '220px' }}>
                <img src={plantImg} alt="75,000 sq ft Boisar plant" />
              </div>
              <div className="category-card-content">
                <span className="badge badge-rose" style={{ width: 'fit-content', marginBottom: '0.5rem' }}>Industrial Compounding</span>
                <h3>Boisar Complex (75,000 sq.ft.)</h3>
                <p>
                  High-capacity automated liquid compounding, vacuum distillation, temperature-controlled raw material warehouses, and analytical release laboratories.
                </p>
              </div>
            </div>

            {/* Application Lab */}
            <div className="category-feature-card">
              <div className="category-card-media" style={{ height: '220px' }}>
                <img src={rdLab} alt="Application center in Andheri Mumbai" />
              </div>
              <div className="category-card-content">
                <span className="badge badge-rose" style={{ width: 'fit-content', marginBottom: '0.5rem' }}>Application R&amp;D</span>
                <h3>Mumbai Application Center</h3>
                <p>
                  Client collaborative testing center featuring pilot-scale bakery ovens, carbonated soft drink lines, dairy homogenizers, and sensory tasting chambers.
                </p>
              </div>
            </div>

            {/* Grasse France */}
            <div className="category-feature-card">
              <div className="category-card-media" style={{ height: '220px' }}>
                <img src={grasseImg} alt="SKFrance creative perfumery in Grasse" />
              </div>
              <div className="category-card-content">
                <span className="badge badge-rose" style={{ width: 'fit-content', marginBottom: '0.5rem' }}>Creative Perfumery</span>
                <h3>SKFrance (Grasse, France)</h3>
                <p>
                  Located in the historical capital of world perfumery, driving fine fragrance formulation, trend analysis, and rare European botanical sourcing.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Capabilities & Quality Governance */}
        <div style={{ background: '#FFFFFF', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-xl)', padding: '3rem', marginBottom: '4rem' }}>
          <h2 style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-primary-dark)', marginBottom: '1.25rem' }}>
            Technical Capabilities &amp; Quality Governance
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '2.5rem' }}>
            <div>
              <h4 style={{ color: 'var(--color-primary-dark)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Microscope size={20} color="var(--color-accent-rose)" />
                Analytical Instrumentation
              </h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', lineHeight: 1.7, marginBottom: '1.25rem' }}>
                Our quality control suites are equipped with Gas Chromatography (GC), Mass Spectrometry (GC-MS), High-Performance Liquid Chromatography (HPLC), polarimeters, refractive index meters, and flashpoint analyzers to guarantee chemical purity and batch reproducibility.
              </p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.88rem', color: 'var(--color-text-main)' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CheckCircle2 size={16} color="#2E7D32" /> Organoleptic and olfactory screening for all incoming ingredients
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CheckCircle2 size={16} color="#2E7D32" /> Thermal stability testing for bakery and confectionery processing
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CheckCircle2 size={16} color="#2E7D32" /> Clear dispersion verification in carbonated beverage syrups
                </li>
              </ul>
            </div>

            <div>
              <h4 style={{ color: 'var(--color-primary-dark)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Shield size={20} color="var(--color-accent-rose)" />
                Regulatory &amp; Application Suitability
              </h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', lineHeight: 1.7, marginBottom: '1.25rem' }}>
                SKFF formulates flavours strictly adhering to national food safety guidelines (FSSAI) and global fragrance safety standards (IFRA). We maintain comprehensive documentation packages for our B2B commercial clients.
              </p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.88rem', color: 'var(--color-text-main)' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CheckCircle2 size={16} color="#2E7D32" /> Certificate of Analysis (COA) provided with every commercial batch
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CheckCircle2 size={16} color="#2E7D32" /> Material Safety Data Sheets (MSDS / SDS) compliant with GHS
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CheckCircle2 size={16} color="#2E7D32" /> Allergen declarations and non-GMO statements available on request
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center', padding: '0 0 5rem' }}>
          <div className="cta-banner-box">
            <div className="cta-banner-content">
              <h2>Collaborate with SKFF Engineering &amp; Creation Teams</h2>
              <p>Discuss your formulation parameters with our technical and sensory specialists.</p>
              <Link to="/enquiry" className="btn btn-rose btn-lg">
                <Send size={16} />
                <span>Submit Technical Enquiry</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyProfile;
