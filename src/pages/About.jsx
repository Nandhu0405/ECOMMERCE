import React from 'react';
import { Link } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb';
import whoWeAreLab from '../assets/who-we-are-lab.png';
import timeline1922 from '../assets/timeline-1922.png';
import timeline1960 from '../assets/timeline-1960.png';
import appLab from '../assets/application-lab.jpg';
import plantImg from '../assets/production-plant.jpg';
import rdLab from '../assets/rd-lab.jpg';
import grasseImg from '../assets/grasse-france.jpg';
import { ShieldCheck, Sparkles, HeartHandshake, Compass, CheckCircle2 } from 'lucide-react';

const About = () => {
  const milestones = [
    {
      year: '1922',
      title: 'Founded as S. Kushalchand in Kolkata',
      description: 'Founded as a traditional merchant house in Kolkata, establishing early commercial roots in the natural essential oils and aroma trade.',
      image: timeline1922
    },
    {
      year: '1960',
      title: 'Operations Shifted to Mumbai',
      description: 'Operations shifted to Mumbai to expand market presence and build a nationwide distribution network across Western and Southern India.',
      image: timeline1960
    },
    {
      year: '1988',
      title: 'Formation of SKFF (INDIA) PVT. LTD.',
      description: 'SKFF was officially incorporated for large-scale industrial compounding of flavour and fragrance formulations.',
      image: null
    },
    {
      year: '2001',
      title: 'Andheri Industrial Facility Established',
      description: 'Dedicated modern manufacturing and application facility established in Industrial Estate, Andheri, Mumbai.',
      image: appLab
    },
    {
      year: '2012',
      title: '75,000 sq.ft. Manufacturing Complex in Boisar',
      description: 'Major industrial expansion with a 75,000 sq.ft. automated manufacturing complex launched in Boisar to meet escalating global export demand.',
      image: plantImg
    },
    {
      year: '2017',
      title: 'Advanced Application Centre & R&D Laboratory',
      description: 'State-of-the-art analytical R&D Laboratory in Boisar and dedicated Application Centre in Andheri commissioned for client testing.',
      image: rdLab
    },
    {
      year: '2018',
      title: 'SKFrance Established in Grasse, France',
      description: 'SKFrance established in Grasse—the world capital of perfumery—bridging centuries-old European perfume art with Indian synthesis capabilities.',
      image: grasseImg
    },
    {
      year: '2021',
      title: 'SKFF Middle East LLC in Sharjah',
      description: 'Established SKFF Middle East LLC in Sharjah (UAE) to provide localized formulation support across GCC and MENA markets.',
      image: null
    },
    {
      year: '2025',
      title: 'Sharjah Laboratory Operational',
      description: 'Expanded regional operations with a fully equipped analytical and application laboratory in Sharjah.',
      image: null
    }
  ];

  return (
    <div className="about-page">
      <div className="container">
        <Breadcrumb items={[{ label: 'About Us' }]} />

        {/* Hero Section */}
        <div style={{ padding: '3rem 0 4rem' }}>
          <div style={{ maxWidth: '850px' }}>
            <span className="eyebrow">A CENTURY OF SENSORY MASTERY</span>
            <h1 style={{ fontSize: 'clamp(2.4rem, 4.5vw, 3.8rem)', color: 'var(--color-primary-dark)', marginBottom: '1.25rem', lineHeight: 1.15 }}>
              Leading the Future of <em style={{ fontStyle: 'italic', color: 'var(--color-accent-rose)' }}>Flavours &amp; Fragrances</em> Since 1922
            </h1>
            <p style={{ fontSize: '1.1rem', color: 'var(--color-text-muted)', lineHeight: 1.8 }}>
              <strong>SKFF (INDIA) PVT. LTD.</strong> is a leading organization in the Indian subcontinent in the field of Flavours and Fragrances. We are engaged in the creation, development, manufacturing and supplying of an extensive range of sensory solutions for the food, beverage, pharmaceutical, nutraceutical, consumer goods and cosmetic industries.
            </p>
          </div>
        </div>

        {/* Feature Image & Story */}
        <div style={{ marginBottom: '5rem' }}>
          <div style={{ borderRadius: 'var(--radius-xl)', overflow: 'hidden', boxShadow: 'var(--shadow-luxury)', marginBottom: '3rem' }}>
            <img 
              src={whoWeAreLab} 
              alt="SKFF laboratory chemists formulating flavours and fragrances" 
              style={{ width: '100%', maxHeight: '520px', objectFit: 'cover' }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2.5rem' }}>
            <div style={{ background: '#FFFFFF', padding: '2rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ width: '44px', height: '44px', borderRadius: 'var(--radius-md)', background: 'rgba(232,93,117,0.1)', color: 'var(--color-accent-rose)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                <HeartHandshake size={22} />
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: 'var(--color-primary-dark)' }}>
                Family-Run Independence
              </h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
                We are a family-run organization, committed to our independence and taking pride in our freedom to excel. This allows us to invest long-term in research and authentic relationships.
              </p>
            </div>

            <div style={{ background: '#FFFFFF', padding: '2rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ width: '44px', height: '44px', borderRadius: 'var(--radius-md)', background: 'rgba(232,93,117,0.1)', color: 'var(--color-accent-rose)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                <Sparkles size={22} />
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: 'var(--color-primary-dark)' }}>
                Sensory Artistry &amp; Science
              </h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
                Four generations of curiosity rooted in nature, refined by gas chromatography, mass spectrometry, and application pilot plants in Mumbai, Boisar, and Grasse.
              </p>
            </div>

            <div style={{ background: '#FFFFFF', padding: '2rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ width: '44px', height: '44px', borderRadius: 'var(--radius-md)', background: 'rgba(232,93,117,0.1)', color: 'var(--color-accent-rose)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                <Compass size={22} />
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: 'var(--color-primary-dark)' }}>
                Global Footprint
              </h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
                From our roots in Kolkata to our manufacturing hub in Boisar, creative studios in Grasse, and Middle East presence in Sharjah, we serve brands across continents.
              </p>
            </div>
          </div>
        </div>

        {/* Historical Evolution Timeline */}
        <div style={{ padding: '3rem 0 5rem', borderTop: '1px solid var(--color-border)' }}>
          <div style={{ textAlign: 'center', maxWidth: '650px', margin: '0 auto 3rem' }}>
            <span className="eyebrow">HISTORICAL MILESTONES</span>
            <h2 style={{ color: 'var(--color-primary-dark)', marginBottom: '0.5rem' }}>
              Our Journey Over a Century
            </h2>
            <p>
              Key milestones tracking our growth from a local aroma merchant house in 1922 to an international manufacturer.
            </p>
          </div>

          <div className="timeline-container">
            <div className="timeline-line"></div>
            {milestones.map((m, idx) => (
              <div key={idx} className="timeline-item">
                <div className="timeline-node"></div>
                <div className="timeline-card">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
                    <div className="timeline-year">{m.year}</div>
                    <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-accent-rose)', fontWeight: 700 }}>
                      Milestone
                    </span>
                  </div>
                  <h3 className="timeline-title">{m.title}</h3>
                  <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
                    {m.description}
                  </p>
                  {m.image && (
                    <div style={{ marginTop: '1rem', borderRadius: 'var(--radius-md)', overflow: 'hidden', maxHeight: '180px' }}>
                      <img src={m.image} alt={m.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div style={{ padding: '0 0 5rem', textAlign: 'center' }}>
          <div style={{ background: 'var(--color-bg-ivory)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-xl)', padding: '3rem 2rem' }}>
            <h2 style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-primary-dark)', marginBottom: '1rem' }}>
              Create Exceptional Sensory Signatures with Us
            </h2>
            <p style={{ maxWidth: '580px', margin: '0 auto 2rem', color: 'var(--color-text-muted)' }}>
              Partner with our flavour chemists and perfumers to formulate high-impact solutions for your brand.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
              <Link to="/enquiry" className="btn btn-rose btn-lg">
                Discuss Your Requirements
              </Link>
              <Link to="/company-profile" className="btn btn-secondary btn-lg">
                View Company Profile
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
