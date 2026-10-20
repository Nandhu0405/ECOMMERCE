import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, Sparkles, Award, ShieldCheck, Microscope, 
  Globe2, CheckCircle2, ChevronRight, Phone, Mail, Send, Eye
} from 'lucide-react';
import heroFloral from '../assets/hero-floral.jpg';
import aboutCorporate from '../assets/about-corporate.png';
import flavoursHero from '../assets/flavours-hero.jpg';
import fragrancesHero from '../assets/fragrances-hero.jpg';
import whoWeAreLab from '../assets/who-we-are-lab.png';
import { CATEGORIES, FLAVOUR_CATEGORIES, FRAGRANCE_CATEGORIES } from '../data/categories';
import { PRODUCTS, getFeaturedProducts, getBestsellerProducts } from '../data/products';
import { INDUSTRIES } from '../data/industries';
import { BLOGS } from '../data/blogs';
import ProductCard from '../components/ProductCard';
import QuickViewModal from '../components/QuickViewModal';

const Home = () => {
  const [activeDivisionTab, setActiveDivisionTab] = useState('all');
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  const featuredProducts = getFeaturedProducts().slice(0, 8);

  const displayCategories = activeDivisionTab === 'flavour' 
    ? FLAVOUR_CATEGORIES 
    : activeDivisionTab === 'fragrance' 
      ? FRAGRANCE_CATEGORIES 
      : CATEGORIES;

  return (
    <div className="homepage-wrapper">
      {/* =========================================================================
          A. HERO SECTION
          ========================================================================= */}
      <section className="hero-section" aria-label="Hero Introduction">
        <img 
          src={heroFloral} 
          alt="SKFF Floral & Botanical Sensory Heritage" 
          className="hero-background-img" 
        />
        <div className="hero-gradient-overlay"></div>

        <div className="container" style={{ position: 'relative', zIndex: 10 }}>
          <div className="hero-content">
            <div className="hero-tagline-badge">
              <span className="line"></span>
              <span className="eyebrow" style={{ marginBottom: 0 }}>
                SINCE 1922 • PASSION TO PERFORM
              </span>
            </div>

            <h1 className="hero-title">
              The Craft of <span className="italic-accent">Flavour</span> &amp;<br />
              The Poetry of <span className="italic-accent">Fragrance</span>
            </h1>

            <p className="hero-subtitle">
              For over a century, SKFF (INDIA) PVT. LTD. has combined nature’s botanicals with precision analytical science to formulate signature taste and scent solutions for global brands.
            </p>

            <div className="hero-cta-group">
              <Link to="/flavours" className="btn btn-primary btn-lg">
                Explore Flavours
              </Link>
              <Link to="/fragrances" className="btn btn-secondary btn-lg" style={{ background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(8px)' }}>
                Explore Fragrances
              </Link>
              <Link to="/enquiry" className="btn btn-rose btn-lg">
                <Send size={15} />
                <span>Send an Enquiry</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          B. ABOUT SKFF SECTION
          ========================================================================= */}
      <section className="section" style={{ backgroundColor: '#FFFFFF', borderBottom: '1px solid var(--color-border)' }}>
        <div className="container">
          <div className="about-split-section">
            <div className="about-image-wrapper">
              <img 
                src={aboutCorporate} 
                alt="SKFF laboratory equipment, glassware, and natural ingredients" 
              />
            </div>

            <div>
              <span className="eyebrow">OUR HERITAGE &amp; MISSION</span>
              <h2 style={{ marginBottom: '1.25rem', color: 'var(--color-primary-dark)' }}>
                Four generations of curiosity, rooted in nature.
              </h2>
              <p style={{ marginBottom: '1rem', lineHeight: 1.8 }}>
                <strong>SKFF (INDIA) PVT. LTD.</strong> is a leading organization in the Indian subcontinent, engaged in the creation, development, manufacturing and supply of flavours and fragrances for the food, beverage, pharmaceutical, nutraceutical, consumer goods and cosmetic industries.
              </p>
              <p style={{ lineHeight: 1.8, marginBottom: '1.75rem' }}>
                We are a family-run organization, committed to our independence and proud of the freedom to excel. Through innovation, quality, and customer-focused solutions, we create sensory experiences that inspire brands and consumers worldwide.
              </p>

              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <Link to="/about" className="btn btn-primary">
                  <span>Our Century Story</span>
                  <ArrowRight size={15} />
                </Link>
                <Link to="/company-profile" className="btn btn-secondary">
                  <span>Company Profile</span>
                </Link>
              </div>

              {/* Verified Facts Ribbon */}
              <div className="about-stats-ribbon">
                <div className="stat-item">
                  <h3>1922</h3>
                  <p>Founded Legacy</p>
                </div>
                <div className="stat-item">
                  <h3>75,000</h3>
                  <p>Sq.ft Boisar Facility</p>
                </div>
                <div className="stat-item">
                  <h3>4</h3>
                  <p>Global Locations</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          C & D. FLAVOURS & FRAGRANCES DIVISION OVERVIEW
          ========================================================================= */}
      <section className="section" style={{ backgroundColor: 'var(--color-bg-ivory)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 3rem' }}>
            <span className="eyebrow">COMPREHENSIVE B2B PORTFOLIO</span>
            <h2 style={{ color: 'var(--color-primary-dark)', marginBottom: '0.75rem' }}>
              Explore All 11 Product Category Groups
            </h2>
            <p>
              Discover authentic taste profiles and captivating scent formulations developed with industrial reliability and sensory finesse.
            </p>
          </div>

          {/* Division Filter Pills */}
          <div className="categories-tabs-header">
            <div className="category-filter-pills">
              <button 
                className={`category-pill-btn ${activeDivisionTab === 'all' ? 'active' : ''}`}
                onClick={() => setActiveDivisionTab('all')}
              >
                All 11 Categories ({CATEGORIES.length})
              </button>
              <button 
                className={`category-pill-btn ${activeDivisionTab === 'flavour' ? 'active' : ''}`}
                onClick={() => setActiveDivisionTab('flavour')}
              >
                Flavours ({FLAVOUR_CATEGORIES.length})
              </button>
              <button 
                className={`category-pill-btn ${activeDivisionTab === 'fragrance' ? 'active' : ''}`}
                onClick={() => setActiveDivisionTab('fragrance')}
              >
                Fragrances ({FRAGRANCE_CATEGORIES.length})
              </button>
            </div>

            <Link 
              to={activeDivisionTab === 'fragrance' ? '/fragrances' : '/flavours'}
              style={{ fontSize: '0.85rem', color: 'var(--color-accent-rose)', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}
            >
              Browse Complete Category Index <ArrowRight size={15} />
            </Link>
          </div>

          {/* Category Cards Grid */}
          <div className="category-cards-grid">
            {displayCategories.map(cat => (
              <div key={cat.id} className="category-feature-card">
                <div className="category-card-media">
                  <img src={cat.image} alt={cat.name} loading="lazy" />
                  <div className="category-card-badge">
                    <span className="badge badge-rose">
                      {cat.type === 'flavour' ? 'Flavour' : 'Fragrance'}
                    </span>
                  </div>
                </div>
                <div className="category-card-content">
                  <h3>{cat.name}</h3>
                  <p>{cat.shortDesc}</p>
                  
                  <div style={{ marginBottom: '1.25rem' }}>
                    <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--color-text-main)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      Key Applications:
                    </span>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginTop: '0.35rem' }}>
                      {cat.applications.slice(0, 3).map((app, i) => (
                        <span key={i} className="industry-tag">{app}</span>
                      ))}
                    </div>
                  </div>

                  <Link to={`/category/${cat.slug}`} className="category-card-link">
                    <span>Explore {cat.name} Catalogue</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          E. INDUSTRIES SERVED
          ========================================================================= */}
      <section className="section" style={{ backgroundColor: '#FFFFFF', borderY: '1px solid var(--color-border)' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem', marginBottom: '3rem' }}>
            <div>
              <span className="eyebrow">DIVERSE SECTORS</span>
              <h2 style={{ color: 'var(--color-primary-dark)' }}>
                Industries We Formulate For
              </h2>
            </div>
            <Link to="/industries" className="btn btn-secondary">
              View All Industry Applications →
            </Link>
          </div>

          <div className="industries-grid">
            {INDUSTRIES.map(ind => (
              <div key={ind.id} className="industry-card">
                <div className="industry-card-icon">
                  <Sparkles size={22} />
                </div>
                <h4>{ind.name}</h4>
                <p>{ind.description}</p>
                <div className="industry-solutions-tags">
                  {ind.solutions.map((sol, i) => (
                    <span key={i} className="industry-tag">{sol}</span>
                  ))}
                </div>
                <Link 
                  to={`/enquiry?industry=${encodeURIComponent(ind.name)}`}
                  style={{ fontSize: '0.8rem', color: 'var(--color-accent-rose)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.3rem', marginTop: 'auto' }}
                >
                  Request Industry Solutions <ArrowRight size={13} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          F. PRODUCT AND APPLICATION HIGHLIGHTS
          ========================================================================= */}
      <section className="section" style={{ backgroundColor: 'var(--color-bg-ivory)' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem', marginBottom: '2.5rem' }}>
            <div>
              <span className="eyebrow">COMMERCIAL BENCHMARKS</span>
              <h2 style={{ color: 'var(--color-primary-dark)' }}>
                Featured Formulations
              </h2>
              <p style={{ marginTop: '0.35rem' }}>
                Illustrative catalogue highlights representing our industrial-grade aroma systems.
              </p>
            </div>
            <Link to="/catalogue" className="btn btn-primary">
              View All 112 Products →
            </Link>
          </div>

          <div className="product-grid">
            {featuredProducts.map(p => (
              <ProductCard
                key={p.id}
                product={p}
                onQuickView={(prod) => setQuickViewProduct(prod)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          G. RESEARCH, DEVELOPMENT & APPLICATION CAPABILITIES
          ========================================================================= */}
      <section className="section capabilities-section">
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 3rem' }}>
            <span className="eyebrow">SCIENTIFIC EXCELLENCE</span>
            <h2 style={{ color: 'var(--color-primary-dark)', marginBottom: '0.75rem' }}>
              Advanced R&amp;D &amp; Application Laboratories
            </h2>
            <p>
              Combining rigorous scientific research with state-of-the-art analytical equipment to craft bespoke flavours and fragrances tailored to complex manufacturing processes.
            </p>
          </div>

          <div className="capabilities-grid">
            <div className="capability-card">
              <div style={{ width: '48px', height: '48px', borderRadius: 'var(--radius-md)', background: 'rgba(232,93,117,0.1)', color: 'var(--color-accent-rose)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                <Microscope size={24} />
              </div>
              <h4>Application Center (Andheri, Mumbai)</h4>
              <p>
                Dedicated sensory tasting panels, prototype bakery ovens, beverage bottling units, and cosmetic testing benches replicating customer manufacturing processes in real time.
              </p>
            </div>

            <div className="capability-card">
              <div style={{ width: '48px', height: '48px', borderRadius: 'var(--radius-md)', background: 'rgba(232,93,117,0.1)', color: 'var(--color-accent-rose)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                <Globe2 size={24} />
              </div>
              <h4>Boisar 75,000 Sq.Ft Manufacturing Plant</h4>
              <p>
                Equipped with automated batch compounding, analytical Gas Chromatography-Mass Spectrometry (GC-MS), high-shear emulsification, and stainless steel distillation columns.
              </p>
            </div>

            <div className="capability-card">
              <div style={{ width: '48px', height: '48px', borderRadius: 'var(--radius-md)', background: 'rgba(232,93,117,0.1)', color: 'var(--color-accent-rose)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                <Sparkles size={24} />
              </div>
              <h4>Creative Studio (Grasse, France)</h4>
              <p>
                Our international creative presence in Grasse, France connects historical French fine perfumery craftsmanship with cutting-edge aroma synthesis for global luxury applications.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          H. QUALITY & CUSTOMER COMMITMENT
          ========================================================================= */}
      <section className="section" style={{ backgroundColor: '#FFFFFF', borderBottom: '1px solid var(--color-border)' }}>
        <div className="container">
          <div style={{ background: 'var(--color-bg-ivory)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-xl)', padding: '3.5rem 3rem' }}>
            <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
              <span className="eyebrow">RESPONSIBLE FORMULATION</span>
              <h2 style={{ color: 'var(--color-primary-dark)', marginBottom: '1rem' }}>
                Our Commitment to Quality &amp; Product Suitability
              </h2>
              <p style={{ lineHeight: 1.8, marginBottom: '2rem' }}>
                At SKFF, we maintain strict quality standards in sourcing raw aroma chemicals, essential oils, and botanicals. Every batch is evaluated for sensory fidelity, solubility, thermal resistance, and chemical consistency so that your final consumer products perform dependably on shelves.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', textAlign: 'left' }}>
                <div style={{ background: '#FFFFFF', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#2E7D32', fontWeight: 600, fontSize: '0.9rem', marginBottom: '0.35rem' }}>
                    <CheckCircle2 size={16} /> Batch Consistency
                  </div>
                  <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                    Standardized organoleptic evaluation across all production lots.
                  </p>
                </div>

                <div style={{ background: '#FFFFFF', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#2E7D32', fontWeight: 600, fontSize: '0.9rem', marginBottom: '0.35rem' }}>
                    <CheckCircle2 size={16} /> Technical Support
                  </div>
                  <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                    Direct formulation guidance from experienced flavourists &amp; perfumers.
                  </p>
                </div>

                <div style={{ background: '#FFFFFF', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#2E7D32', fontWeight: 600, fontSize: '0.9rem', marginBottom: '0.35rem' }}>
                    <CheckCircle2 size={16} /> Custom Blending
                  </div>
                  <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                    Tailored profiles matched to your precise base matrix &amp; target market.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          I. BUSINESS ENQUIRY CTA SECTION
          ========================================================================= */}
      <section className="section" style={{ backgroundColor: 'var(--color-bg-ivory)' }}>
        <div className="container">
          <div className="cta-banner-box">
            <div className="cta-banner-content">
              <span className="eyebrow" style={{ color: 'var(--color-accent-soft-rose)' }}>
                PARTNER WITH AN INDUSTRY LEADER
              </span>
              <h2>Discuss Your Flavour or Fragrance Requirements</h2>
              <p>
                Whether you need a custom taste solution for a beverage launch or a signature scent for personal care, our team is ready to collaborate.
              </p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                <Link to="/enquiry" className="btn btn-rose btn-lg">
                  Request a Commercial Quote
                </Link>
                <Link to="/contact" className="btn btn-outline-white btn-lg">
                  Contact Our Specialists
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          J. INSIGHTS AND BLOGS
          ========================================================================= */}
      <section className="section" style={{ backgroundColor: '#FFFFFF', borderBottom: '1px solid var(--color-border)' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem', marginBottom: '2.5rem' }}>
            <div>
              <span className="eyebrow">KNOWLEDGE &amp; INNOVATION</span>
              <h2 style={{ color: 'var(--color-primary-dark)' }}>
                Educational Insights &amp; Articles
              </h2>
            </div>
            <Link to="/blog" className="btn btn-secondary">
              View All Insights →
            </Link>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
            {BLOGS.slice(0, 3).map(blog => (
              <article key={blog.id} className="category-feature-card">
                <div className="category-card-media" style={{ aspectRatio: '16 / 10' }}>
                  <img src={blog.image} alt={blog.title} />
                  <div className="category-card-badge">
                    <span className="badge badge-primary">{blog.category}</span>
                  </div>
                </div>
                <div className="category-card-content">
                  <div style={{ fontSize: '0.78rem', color: 'var(--color-text-light)', marginBottom: '0.4rem' }}>
                    {blog.date} • {blog.readTime}
                  </div>
                  <h3 style={{ fontSize: '1.2rem', lineHeight: 1.35, marginBottom: '0.65rem' }}>
                    <Link to={`/blog/${blog.slug}`} style={{ color: 'var(--color-text-main)' }}>
                      {blog.title}
                    </Link>
                  </h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginBottom: '1.25rem' }}>
                    {blog.excerpt}
                  </p>
                  <Link 
                    to={`/blog/${blog.slug}`} 
                    style={{ fontSize: '0.82rem', color: 'var(--color-accent-rose)', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '0.35rem', marginTop: 'auto' }}
                  >
                    Read Article <ArrowRight size={13} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          K. VERIFIED CONTACT SECTION
          ========================================================================= */}
      <section className="section" style={{ backgroundColor: 'var(--color-bg-ivory)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'center' }}>
            <div>
              <span className="eyebrow">HEADQUARTERS &amp; HUBS</span>
              <h2 style={{ color: 'var(--color-primary-dark)', marginBottom: '1.25rem' }}>
                Connect with SKFF (INDIA) PVT. LTD.
              </h2>
              <p style={{ marginBottom: '1.5rem', lineHeight: 1.7 }}>
                Our commercial headquarters and laboratories in Mumbai work closely with brand owners, beverage formulators, bakery manufacturers, and cosmetic chemists across the Indian subcontinent and international markets.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(232,93,117,0.1)', color: 'var(--color-accent-rose)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    📍
                  </div>
                  <div>
                    <strong style={{ fontSize: '0.9rem', color: 'var(--color-primary-dark)' }}>Registered Office:</strong>
                    <p style={{ fontSize: '0.85rem' }}>
                      G 1601 / 1602, Lotus Corporate Park, Off Western Express Highway, Goregaon East, Mumbai – 400063, India.
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(232,93,117,0.1)', color: 'var(--color-accent-rose)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Phone size={16} />
                  </div>
                  <div>
                    <strong style={{ fontSize: '0.9rem', color: 'var(--color-primary-dark)' }}>Telephone: </strong>
                    <a href="tel:+912242866600" style={{ color: 'var(--color-accent-rose)', fontWeight: 600 }}>
                      +91-22-4286 6600
                    </a>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(232,93,117,0.1)', color: 'var(--color-accent-rose)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Mail size={16} />
                  </div>
                  <div>
                    <strong style={{ fontSize: '0.9rem', color: 'var(--color-primary-dark)' }}>Email: </strong>
                    <a href="mailto:info@skff.co.in" style={{ color: 'var(--color-accent-rose)', fontWeight: 600 }}>
                      info@skff.co.in
                    </a>
                  </div>
                </div>
              </div>

              <Link to="/contact" className="btn btn-primary">
                Visit Contact Page →
              </Link>
            </div>

            {/* Quick Inquiry Card */}
            <div style={{ background: '#FFFFFF', padding: '2.5rem', borderRadius: 'var(--radius-xl)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-md)' }}>
              <span className="eyebrow">FAST SENSORY SAMPLING</span>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', marginBottom: '0.5rem', color: 'var(--color-primary-dark)' }}>
                Request an Evaluation Sample Kit
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginBottom: '1.5rem' }}>
                Are you formulating a new product? Request a curated 1 kg laboratory sample kit tested for your target application.
              </p>
              <Link to="/enquiry" className="btn btn-rose btn-block">
                Start B2B Sample Request
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quick View Modal */}
      {quickViewProduct && (
        <QuickViewModal
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
        />
      )}
    </div>
  );
};

export default Home;
