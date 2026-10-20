import React from 'react';
import { Link } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb';
import { BLOGS } from '../data/blogs';
import { ArrowRight, Clock, User, Calendar, BookOpen } from 'lucide-react';

const Blog = () => {
  return (
    <div className="blog-listing-page" style={{ paddingBottom: '5rem' }}>
      <div className="container">
        <Breadcrumb items={[{ label: 'Blogs & Insights' }]} />

        {/* Header */}
        <div style={{ padding: '2.5rem 0 3.5rem' }}>
          <span className="eyebrow">RESEARCH &amp; INDUSTRY INSIGHTS</span>
          <h1 style={{ fontSize: 'clamp(2.2rem, 4vw, 3.5rem)', color: 'var(--color-primary-dark)', marginBottom: '0.75rem' }}>
            Sensory Science &amp; Innovation Blogs
          </h1>
          <p style={{ fontSize: '1.05rem', color: 'var(--color-text-muted)', maxWidth: '780px', lineHeight: 1.7 }}>
            Articles, formulations case-studies, and trend briefings exploring the latest advances in taste modulation, aroma chemistry, and fragrance technologies.
          </p>
        </div>

        {/* Blog Cards Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '2.5rem', marginBottom: '4rem' }}>
          {BLOGS.map(blog => (
            <article key={blog.id} className="category-feature-card">
              <div className="category-card-media" style={{ height: '260px' }}>
                <img src={blog.image} alt={blog.title} />
                <div className="category-card-badge">
                  <span className="badge badge-rose">{blog.category}</span>
                </div>
              </div>

              <div className="category-card-content" style={{ padding: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.78rem', color: 'var(--color-text-light)', marginBottom: '0.75rem' }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                    <Calendar size={13} /> {blog.date}
                  </span>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                    <Clock size={13} /> {blog.readTime}
                  </span>
                </div>

                <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.45rem', lineHeight: 1.3, marginBottom: '0.75rem' }}>
                  <Link to={`/blog/${blog.slug}`} style={{ color: 'var(--color-primary-dark)' }}>
                    {blog.title}
                  </Link>
                </h2>

                <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', lineHeight: 1.6, marginBottom: '1.5rem', flex: 1 }}>
                  {blog.excerpt}
                </p>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--color-border-subtle)', paddingTop: '1rem', marginTop: 'auto' }}>
                  <span style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                    <User size={13} /> {blog.author}
                  </span>
                  <Link 
                    to={`/blog/${blog.slug}`} 
                    style={{ fontSize: '0.82rem', color: 'var(--color-accent-rose)', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}
                  >
                    Read Full Article <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
