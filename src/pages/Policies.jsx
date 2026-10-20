import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb';
import { AlertCircle, Shield, FileText, Truck, RotateCcw } from 'lucide-react';

const Policies = () => {
  const location = useLocation();

  // Determine active tab from route
  const getTabFromPath = () => {
    if (location.pathname.includes('terms')) return 'terms';
    if (location.pathname.includes('shipping')) return 'shipping';
    if (location.pathname.includes('returns')) return 'returns';
    return 'privacy';
  };

  const [activeTab, setActiveTab] = useState(getTabFromPath());

  useEffect(() => {
    setActiveTab(getTabFromPath());
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  return (
    <div className="policies-page" style={{ paddingBottom: '6rem' }}>
      <div className="container">
        <Breadcrumb items={[{ label: 'Legal Policies' }, { label: activeTab.toUpperCase() }]} />

        {/* Header */}
        <div style={{ padding: '2.5rem 0 2rem' }}>
          <span className="eyebrow">GOVERNANCE &amp; LEGAL POLICIES</span>
          <h1 style={{ fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', color: 'var(--color-primary-dark)', marginBottom: '0.75rem' }}>
            Corporate Policies &amp; Terms
          </h1>
          <p style={{ color: 'var(--color-text-muted)' }}>
            Official governance frameworks, data privacy commitments, and demonstration transaction policies.
          </p>
        </div>

        {/* Tab Buttons */}
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '2.5rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '0.75rem' }}>
          <Link 
            to="/privacy"
            className={`pack-size-chip ${activeTab === 'privacy' ? 'active' : ''}`}
            onClick={() => setActiveTab('privacy')}
          >
            Privacy Policy
          </Link>
          <Link 
            to="/terms"
            className={`pack-size-chip ${activeTab === 'terms' ? 'active' : ''}`}
            onClick={() => setActiveTab('terms')}
          >
            Terms &amp; Conditions
          </Link>
          <Link 
            to="/shipping"
            className={`pack-size-chip ${activeTab === 'shipping' ? 'active' : ''}`}
            onClick={() => setActiveTab('shipping')}
          >
            Shipping Policy (Demo)
          </Link>
          <Link 
            to="/returns"
            className={`pack-size-chip ${activeTab === 'returns' ? 'active' : ''}`}
            onClick={() => setActiveTab('returns')}
          >
            Return &amp; Refund Policy (Demo)
          </Link>
        </div>

        {/* Content Box */}
        <div style={{ background: '#FFFFFF', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-xl)', padding: '3rem', boxShadow: 'var(--shadow-sm)', maxWidth: '920px', lineHeight: 1.8, fontSize: '0.95rem', color: '#444444' }}>
          
          {/* TAB 1: PRIVACY POLICY */}
          {activeTab === 'privacy' && (
            <div>
              <h2 style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-primary-dark)', marginBottom: '1.25rem' }}>
                Privacy Policy — SKFF (INDIA) PVT. LTD.
              </h2>
              <p style={{ marginBottom: '1.25rem' }}>
                SKFF (INDIA) PVT. LTD. ("SKFF", "we", "our") is dedicated to protecting the confidentiality and privacy of the commercial and personal information entrusted to us by clients, suppliers, and website visitors.
              </p>

              <h4 style={{ color: 'var(--color-primary-dark)', margin: '1.5rem 0 0.5rem' }}>1. Information We Collect</h4>
              <p>
                When you interact with our website to request quotations or evaluate sample kits, we may collect business contact information, including your full name, enterprise entity, official email address, telephone number, and application parameters.
              </p>

              <h4 style={{ color: 'var(--color-primary-dark)', margin: '1.5rem 0 0.5rem' }}>2. Use of Information</h4>
              <p>
                Your information is utilized solely to process B2B quotations, fulfill sample dispatch requests, provide regulatory and technical documentation (COA/MSDS), and communicate regarding commercial manufacturing orders. We do not sell, rent, or trade client information to third parties.
              </p>

              <h4 style={{ color: 'var(--color-primary-dark)', margin: '1.5rem 0 0.5rem' }}>3. Data Security &amp; Confidentiality</h4>
              <p>
                Proprietary customer formulation details, NDA agreements, and recipe benchmarks are maintained under strict commercial confidentiality protocols across our Mumbai and Boisar technical teams.
              </p>

              <h4 style={{ color: 'var(--color-primary-dark)', margin: '1.5rem 0 0.5rem' }}>4. Contact for Privacy Matters</h4>
              <p>
                For questions regarding data records or to update your commercial contact details, please contact our compliance desk at <strong>info@skff.co.in</strong>.
              </p>
            </div>
          )}

          {/* TAB 2: TERMS AND CONDITIONS */}
          {activeTab === 'terms' && (
            <div>
              <h2 style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-primary-dark)', marginBottom: '1.25rem' }}>
                Terms &amp; Conditions of Commercial Supply
              </h2>
              <p style={{ marginBottom: '1.25rem' }}>
                Welcome to the digital portal of SKFF (INDIA) PVT. LTD. By accessing this catalogue or submitting evaluation enquiries, you agree to comply with the following commercial terms.
              </p>

              <h4 style={{ color: 'var(--color-primary-dark)', margin: '1.5rem 0 0.5rem' }}>1. Commercial Quotations &amp; Orders</h4>
              <p>
                All pricing displayed in frontend demonstration modules is illustrative. Binding commercial quotations are issued formally through proforma invoices and purchase orders confirmed by our Mumbai head office.
              </p>

              <h4 style={{ color: 'var(--color-primary-dark)', margin: '1.5rem 0 0.5rem' }}>2. Intellectual Property &amp; Trademarks</h4>
              <p>
                The SKFF logo, the tagline "Passion to Perform", formulation codes, and catalogue compilations are the intellectual property of SKFF (INDIA) PVT. LTD. Unauthorized copying, reverse engineering, or commercial reproduction is prohibited.
              </p>

              <h4 style={{ color: 'var(--color-primary-dark)', margin: '1.5rem 0 0.5rem' }}>3. Product Suitability</h4>
              <p>
                While SKFF provides technical guidance and recommended dosage ranges, the client remains responsible for conducting shelf-life and regulatory compatibility testing within their finished consumer matrix.
              </p>

              <h4 style={{ color: 'var(--color-primary-dark)', margin: '1.5rem 0 0.5rem' }}>4. Jurisdiction</h4>
              <p>
                Commercial agreements and disputes are governed under the laws of India and subject to the exclusive jurisdiction of the courts of Mumbai, Maharashtra.
              </p>
            </div>
          )}

          {/* TAB 3: SHIPPING POLICY (DEMO) */}
          {activeTab === 'shipping' && (
            <div>
              <div className="demo-disclaimer-banner" style={{ marginBottom: '1.5rem' }}>
                <AlertCircle size={18} />
                <span>
                  <strong>Notice:</strong> This Shipping Policy is an illustrative demonstration policy for website evaluation and does not constitute a legally binding shipping commitment by SKFF without a formal commercial contract.
                </span>
              </div>

              <h2 style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-primary-dark)', marginBottom: '1.25rem' }}>
                Demonstration Shipping &amp; Logistics Policy
              </h2>
              
              <h4 style={{ color: 'var(--color-primary-dark)', margin: '1.5rem 0 0.5rem' }}>1. Sample Canister Dispatch</h4>
              <p>
                Laboratory evaluation samples (1 kg / 500 g canisters) are dispatched via express courier from our Mumbai Application Center. Estimated transit times are 2 to 4 business days across major Indian industrial hubs.
              </p>

              <h4 style={{ color: 'var(--color-primary-dark)', margin: '1.5rem 0 0.5rem' }}>2. Commercial Bulk Freight (Boisar Plant)</h4>
              <p>
                Industrial quantities (25 kg HDPE drums and 200 kg steel barrels) are shipped via approved chemical freight carriers, complete with secondary containment, palletization, and dangerous goods transit compliance where applicable.
              </p>

              <h4 style={{ color: 'var(--color-primary-dark)', margin: '1.5rem 0 0.5rem' }}>3. Export Logistics</h4>
              <p>
                International consignments through Nhava Sheva (JNPT) Mumbai port or air freight via Mumbai International Airport (BOM) are managed under Incoterms (FOB, CIF, or Ex-Works).
              </p>
            </div>
          )}

          {/* TAB 4: RETURN AND REFUND POLICY (DEMO) */}
          {activeTab === 'returns' && (
            <div>
              <div className="demo-disclaimer-banner" style={{ marginBottom: '1.5rem' }}>
                <AlertCircle size={18} />
                <span>
                  <strong>Notice:</strong> This Return &amp; Refund Policy is an illustrative demonstration policy for website evaluation. Real commercial return protocols are stipulated in signed bilateral purchase agreements.
                </span>
              </div>

              <h2 style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-primary-dark)', marginBottom: '1.25rem' }}>
                Demonstration Return &amp; Refund Policy
              </h2>

              <h4 style={{ color: 'var(--color-primary-dark)', margin: '1.5rem 0 0.5rem' }}>1. Quality Claim Period</h4>
              <p>
                Due to the sensitive nature of flavour and fragrance ingredients, commercial clients must inspect seals upon delivery and report any transit damage or organoleptic deviations within 10 days of delivery.
              </p>

              <h4 style={{ color: 'var(--color-primary-dark)', margin: '1.5rem 0 0.5rem' }}>2. Sample Evaluations</h4>
              <p>
                Because sample canisters are compounded on-demand for specific client evaluations, opened sample canisters are non-refundable.
              </p>

              <h4 style={{ color: 'var(--color-primary-dark)', margin: '1.5rem 0 0.5rem' }}>3. Non-Conforming Batches</h4>
              <p>
                If an analytical test demonstrates non-conformity against the mutually agreed Certificate of Analysis (COA) specifications, SKFF will replace the affected lot or issue credit notes following joint technical review.
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default Policies;
