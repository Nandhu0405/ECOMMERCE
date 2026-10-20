import React from 'react';
import { Link } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb';
import { INDUSTRIES } from '../data/industries';
import { CATEGORIES } from '../data/categories';
import { ArrowRight, CheckCircle2, Sparkles, Send } from 'lucide-react';

const Industries = () => {
  return (
    <div className="industries-page">
      <div className="container">
        <Breadcrumb items={[{ label: 'Industries Served' }]} />

        {/* Hero Banner */}
        <div style={{ padding: '2.5rem 0 3.5rem' }}>
          <span className="eyebrow">SECTORS &amp; APPLICATIONS</span>
          <h1 style={{ fontSize: 'clamp(2.2rem, 4vw, 3.5rem)', color: 'var(--color-primary-dark)', marginBottom: '1rem' }}>
            Industries Served by SKFF
          </h1>
          <p style={{ fontSize: '1.05rem', color: 'var(--color-text-muted)', maxWidth: '780px', lineHeight: 1.7 }}>
            At SKFF (INDIA) PVT. LTD., we understand that every manufacturing sector has distinct physical, chemical, thermal, and regulatory requirements. Discover our tailored taste and scent solutions designed for 10 core industrial sectors.
          </p>
        </div>

        {/* Industries List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem', marginBottom: '5rem' }}>
          {INDUSTRIES.map((ind, index) => {
            const isEven = index % 2 === 0;
            const relatedCategories = CATEGORIES.filter(c => ind.categoryIds.includes(c.id));

            return (
              <section 
                key={ind.id} 
                id={ind.id} 
                style={{ 
                  background: '#FFFFFF', 
                  border: '1px solid var(--color-border)', 
                  borderRadius: 'var(--radius-xl)', 
                  overflow: 'hidden',
                  boxShadow: 'var(--shadow-sm)'
                }}
              >
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: isEven ? '1.2fr 1fr' : '1fr 1.2fr', 
                  alignItems: 'center' 
                }}>
                  {/* Content Column */}
                  <div style={{ padding: '3rem', order: isEven ? 1 : 2 }}>
                    <span className="badge badge-rose" style={{ marginBottom: '0.75rem' }}>
                      Sector {index + 1} of 10
                    </span>
                    <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.85rem', color: 'var(--color-primary-dark)', marginBottom: '0.5rem' }}>
                      {ind.name}
                    </h2>
                    <p style={{ fontSize: '0.92rem', color: 'var(--color-accent-rose)', fontWeight: 600, marginBottom: '1rem' }}>
                      {ind.subtitle}
                    </p>
                    <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.7, marginBottom: '1.5rem', fontSize: '0.95rem' }}>
                      {ind.description}
                    </p>

                    <div style={{ marginBottom: '1.5rem' }}>
                      <strong style={{ fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-text-main)', display: 'block', marginBottom: '0.5rem' }}>
                        Target Application Niches:
                      </strong>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                        {ind.solutions.map((sol, i) => (
                          <span key={i} className="industry-tag" style={{ background: 'var(--color-bg-ivory)', border: '1px solid var(--color-border)', padding: '0.35rem 0.75rem', borderRadius: 'var(--radius-full)', fontSize: '0.8rem', color: 'var(--color-text-main)' }}>
                            ✓ {sol}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
                      <Link 
                        to={`/enquiry?industry=${encodeURIComponent(ind.name)}`}
                        className="btn btn-primary"
                      >
                        <Send size={14} />
                        <span>Request Industry Sample</span>
                      </Link>

                      {relatedCategories.length > 0 && (
                        <Link 
                          to={`/category/${relatedCategories[0].slug}`}
                          style={{ fontSize: '0.85rem', color: 'var(--color-accent-rose)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}
                        >
                          Explore {relatedCategories[0].name} Catalogue <ArrowRight size={14} />
                        </Link>
                      )}
                    </div>
                  </div>

                  {/* Image Column */}
                  <div style={{ height: '100%', minHeight: '360px', order: isEven ? 2 : 1 }}>
                    <img 
                      src={ind.image} 
                      alt={ind.name} 
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      loading="lazy"
                    />
                  </div>
                </div>
              </section>
            );
          })}
        </div>

        {/* Global CTA */}
        <div style={{ textAlign: 'center', padding: '0 0 5rem' }}>
          <div className="cta-banner-box">
            <div className="cta-banner-content">
              <h2>Need a Custom Industrial Sensory Solution?</h2>
              <p>Our application laboratories can match target benchmarks or formulate bespoke signatures for your brand.</p>
              <Link to="/enquiry" className="btn btn-rose btn-lg">
                Submit an Industry Enquiry
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Industries;
