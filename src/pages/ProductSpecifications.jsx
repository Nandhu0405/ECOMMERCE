import React from 'react';
import { Link } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb';
import { Microscope, ShieldCheck, FileCheck, CheckCircle2, AlertCircle, Send } from 'lucide-react';

const ProductSpecifications = () => {
  return (
    <div className="product-specifications-page" style={{ paddingBottom: '5rem' }}>
      <div className="container">
        <Breadcrumb items={[{ label: 'Product Specifications' }]} />

        {/* Header */}
        <div style={{ padding: '2.5rem 0 3.5rem' }}>
          <span className="eyebrow">QUALITY &amp; ANALYTICAL STANDARDS</span>
          <h1 style={{ fontSize: 'clamp(2.2rem, 4vw, 3.5rem)', color: 'var(--color-primary-dark)', marginBottom: '0.75rem' }}>
            Product Specifications &amp; Technical Parameters
          </h1>
          <p style={{ fontSize: '1.05rem', color: 'var(--color-text-muted)', maxWidth: '780px', lineHeight: 1.7 }}>
            A comprehensive guide to physical, chemical, and organoleptic testing parameters standardized across SKFF (INDIA) PVT. LTD. flavour and fragrance compounds.
          </p>
        </div>

        {/* Analytical Testing Suite */}
        <div style={{ background: '#FFFFFF', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-xl)', padding: '2.5rem', boxShadow: 'var(--shadow-sm)', marginBottom: '3.5rem' }}>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', color: 'var(--color-primary-dark)', marginBottom: '1.5rem' }}>
            Standard Analytical QC Release Protocol
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
            <div>
              <div style={{ width: '40px', height: '40px', borderRadius: 'var(--radius-md)', background: 'rgba(232,93,117,0.1)', color: 'var(--color-accent-rose)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.75rem' }}>
                <Microscope size={20} />
              </div>
              <h4 style={{ color: 'var(--color-primary-dark)', marginBottom: '0.4rem' }}>GC-MS Chromatography</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
                Gas Chromatography-Mass Spectrometry fingerprinting confirms purity profiles, checks raw material consistency, and identifies volatile key notes down to parts-per-billion.
              </p>
            </div>

            <div>
              <div style={{ width: '40px', height: '40px', borderRadius: 'var(--radius-md)', background: 'rgba(232,93,117,0.1)', color: 'var(--color-accent-rose)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.75rem' }}>
                <ShieldCheck size={20} />
              </div>
              <h4 style={{ color: 'var(--color-primary-dark)', marginBottom: '0.4rem' }}>Physical Properties</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
                Precise testing of Specific Gravity (at 20°C/25°C), Refractive Index (nD20), Flash Point, and Optical Rotation ensures continuous batch-to-batch physical identity.
              </p>
            </div>

            <div>
              <div style={{ width: '40px', height: '40px', borderRadius: 'var(--radius-md)', background: 'rgba(232,93,117,0.1)', color: 'var(--color-accent-rose)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.75rem' }}>
                <FileCheck size={20} />
              </div>
              <h4 style={{ color: 'var(--color-primary-dark)', marginBottom: '0.4rem' }}>Sensory &amp; Bloom Panels</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
                Dual expert panel sensory testing evaluates aroma release kinetics upon dilution in water, performance in dough matrices, and headspaces after retort cooking.
              </p>
            </div>
          </div>
        </div>

        {/* Sample COA Representation */}
        <div style={{ background: '#FFFFFF', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-xl)', padding: '2.5rem', boxShadow: 'var(--shadow-sm)', marginBottom: '3.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '1rem' }}>
            <div>
              <span className="badge badge-gold">Document Template</span>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', color: 'var(--color-primary-dark)', marginTop: '0.35rem' }}>
                Certificate of Analysis (COA) Structure
              </h3>
            </div>
            <Link to="/enquiry" className="btn btn-primary btn-sm">
              Request Specific Product COA →
            </Link>
          </div>

          <table className="spec-table">
            <thead>
              <tr>
                <th style={{ width: '30%' }}>Quality Parameter</th>
                <th style={{ width: '35%' }}>Standard Commercial Method</th>
                <th>Typical Specification Target</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Appearance</strong></td>
                <td>Visual Inspection</td>
                <td>Clear, free-flowing liquid / Fine uniform powder</td>
              </tr>
              <tr>
                <td><strong>Colour</strong></td>
                <td>Lovibond / Visual Comparator</td>
                <td>Pale yellow to amber depending on formulation</td>
              </tr>
              <tr>
                <td><strong>Odour / Aroma Profile</strong></td>
                <td>Organoleptic Panel vs Master Standard</td>
                <td>Conforms to approved standard lot</td>
              </tr>
              <tr>
                <td><strong>Specific Gravity (at 20°C)</strong></td>
                <td>Digital Density Meter</td>
                <td>0.9800 – 1.0550 g/cm³</td>
              </tr>
              <tr>
                <td><strong>Refractive Index (at 20°C)</strong></td>
                <td>Refractometer (nD20)</td>
                <td>1.4100 – 1.4550</td>
              </tr>
              <tr>
                <td><strong>Solubility</strong></td>
                <td>Solvent Dissolution Test</td>
                <td>100% Soluble in water / PG / Alcohol / Oil as specified</td>
              </tr>
              <tr>
                <td><strong>Heavy Metals</strong></td>
                <td>Atomic Absorption Spectrometry</td>
                <td>&lt; 10 ppm (Food / Pharma compliant)</td>
              </tr>
            </tbody>
          </table>

          <div className="demo-disclaimer-banner" style={{ marginTop: '1.5rem' }}>
            <AlertCircle size={18} />
            <span>
              <strong>Technical Disclaimer:</strong> Values displayed above represent a demonstration framework. Exact lot-specific COA data is generated by SKFF Quality Control per industrial shipment.
            </span>
          </div>
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center', padding: '0 0 2rem' }}>
          <div className="cta-banner-box">
            <div className="cta-banner-content">
              <h2>Need Custom Testing or Regulatory Declarations?</h2>
              <p>Our regulatory affairs and technical documentation team can provide allergen certificates, non-GMO statements, and IFRA certificates.</p>
              <Link to="/enquiry" className="btn btn-rose btn-lg">
                <Send size={15} />
                <span>Submit Technical Documentation Request</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductSpecifications;
