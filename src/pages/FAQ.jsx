import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb';
import { ChevronDown, HelpCircle, Send } from 'lucide-react';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      q: 'How can our product development team request evaluation samples from SKFF?',
      a: 'Qualified commercial brand owners, product developers, and food/cosmetic technologists can request evaluation sample canisters (typically 500 g or 1 kg) through our online B2B enquiry portal or by emailing info@skff.co.in. Evaluation samples are dispatched with technical data sheets directly from our Mumbai Application Center.'
    },
    {
      q: 'What is the Minimum Order Quantity (MOQ) for commercial production batches?',
      a: 'Standard commercial trial batches typically start at 5 kg or 25 kg in fluorinated HDPE drums. Full-scale commercial deliveries are supplied in 25 kg drums or 200 kg coated steel barrels from our 75,000 sq.ft. Boisar manufacturing facility.'
    },
    {
      q: 'Does SKFF offer custom flavour matching or bespoke fragrance development?',
      a: 'Yes. Our specialized application centers in Mumbai and Boisar, alongside our creative perfumery in Grasse, France, offer custom formulation matching. Clients can submit target benchmark samples or physical base bases for stability and compatibility testing.'
    },
    {
      q: 'Are SKFF flavour formulations heat-stable for baking and confectionery?',
      a: 'Yes. We specifically formulate bake-stable flavours engineered to withstand high oven temperatures (up to 220°C - 230°C) without flash-off or degradation, as well as retort-stable formulations for UHT dairy and ready-to-drink beverages.'
    },
    {
      q: 'What technical documentation is provided with shipments?',
      a: 'Every commercial batch is accompanied by a lot-specific Certificate of Analysis (COA) confirming physical and chemical parameters, along with a GHS-compliant Material Safety Data Sheet (MSDS). Allergen declarations, nutritional statements, and non-GMO certificates are issued on request.'
    },
    {
      q: 'How does SKFF ensure compliance with fragrance safety regulations?',
      a: 'All SKFF fragrance compounds are compounded strictly adhering to the 51st Amendment standards of the International Fragrance Association (IFRA) and applicable skin-safe concentration limits for rinse-off and leave-on cosmetics.'
    },
    {
      q: 'What are the standard production lead times?',
      a: 'In-stock catalogue compounds are typically dispatched within 3 to 5 business days. Bespoke formulations and large industrial contract manufacturing orders generally follow a 2 to 3 week compounding schedule.'
    }
  ];

  return (
    <div className="faq-page" style={{ paddingBottom: '6rem' }}>
      <div className="container">
        <Breadcrumb items={[{ label: 'Frequently Asked Questions' }]} />

        {/* Header */}
        <div style={{ padding: '2.5rem 0 3rem', maxWidth: '780px' }}>
          <span className="eyebrow">HELP &amp; CLIENT GUIDANCE</span>
          <h1 style={{ fontSize: 'clamp(2.2rem, 4vw, 3.5rem)', color: 'var(--color-primary-dark)', marginBottom: '0.75rem' }}>
            Frequently Asked Questions
          </h1>
          <p style={{ fontSize: '1.05rem', color: 'var(--color-text-muted)', lineHeight: 1.7 }}>
            Answers to common B2B commercial questions regarding sample evaluations, custom compounding, manufacturing lead times, and regulatory documentation.
          </p>
        </div>

        {/* FAQ Accordions */}
        <div style={{ maxWidth: '850px', display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '4rem' }}>
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div 
                key={idx}
                style={{ 
                  background: '#FFFFFF', 
                  border: '1px solid var(--color-border)', 
                  borderRadius: 'var(--radius-lg)', 
                  overflow: 'hidden',
                  boxShadow: 'var(--shadow-sm)'
                }}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                  style={{ 
                    width: '100%', 
                    padding: '1.35rem 1.75rem', 
                    textAlign: 'left', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'space-between',
                    gap: '1rem',
                    background: isOpen ? 'var(--color-bg-ivory)' : '#FFFFFF'
                  }}
                  aria-expanded={isOpen}
                >
                  <span style={{ fontSize: '1.05rem', fontWeight: 600, color: 'var(--color-primary-dark)' }}>
                    {faq.q}
                  </span>
                  <ChevronDown 
                    size={18} 
                    color="var(--color-accent-rose)" 
                    style={{ transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.25s ease', flexShrink: 0 }} 
                  />
                </button>

                {isOpen && (
                  <div style={{ padding: '1.25rem 1.75rem', color: 'var(--color-text-muted)', fontSize: '0.95rem', lineHeight: 1.75, borderTop: '1px solid var(--color-border-subtle)' }}>
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Help CTA */}
        <div style={{ maxWidth: '850px', background: 'var(--color-bg-ivory)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-xl)', padding: '2.5rem', textAlign: 'center' }}>
          <h3 style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-primary-dark)', marginBottom: '0.5rem' }}>
            Have a Specific Formulation Question?
          </h3>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.92rem', marginBottom: '1.5rem' }}>
            Our technical support desk is available to assist with product matrix compatibility and dosage guidelines.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
            <Link to="/enquiry" className="btn btn-rose">
              <Send size={15} />
              <span>Contact Our Scientists</span>
            </Link>
            <Link to="/contact" className="btn btn-secondary">
              View Corporate Offices
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
