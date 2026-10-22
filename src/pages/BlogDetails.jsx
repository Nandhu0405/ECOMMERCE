import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb';
import { BLOGS } from '../data/blogs';
import { Calendar, Clock, User, ArrowLeft, AlertCircle, Share2 } from 'lucide-react';

const BlogDetails = () => {
  const { slug } = useParams();
  const blog = BLOGS.find(b => b.slug === slug);

  if (!blog) {
    return (
      <div className="container" style={{ padding: '6rem 0', textAlign: 'center' }}>
        <h2>Article Not Found</h2>
        <p style={{ margin: '1rem 0 2rem', color: 'var(--color-text-muted)' }}>
          The requested educational article could not be found.
        </p>
        <Link to="/blog" className="btn btn-rose">
          Return to Insights &amp; Articles
        </Link>
      </div>
    );
  }

  const otherBlogs = BLOGS.filter(b => b.id !== blog.id).slice(0, 2);

  return (
    <div className="blog-details-page" style={{ paddingBottom: '6rem' }}>
      <div className="container">
        <Breadcrumb items={[{ label: 'Insights & Articles', url: '/blog' }, { label: blog.title }]} />

        <article style={{ maxWidth: '840px', margin: '0 auto', paddingTop: '2rem' }}>
          <div style={{ marginBottom: '1rem' }}>
            <span className="badge badge-rose">{blog.category}</span>
          </div>

          <h1 style={{ fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', color: 'var(--color-primary-dark)', lineHeight: 1.2, marginBottom: '1.25rem', fontFamily: 'var(--font-heading)' }}>
            {blog.title}
          </h1>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap', fontSize: '0.85rem', color: 'var(--color-text-light)', borderBottom: '1px solid var(--color-border)', paddingBottom: '1.5rem', marginBottom: '2.5rem' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
              <User size={15} /> {blog.author}
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
              <Calendar size={15} /> {blog.date}
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
              <Clock size={15} /> {blog.readTime}
            </span>
          </div>

          {/* Featured Image */}
          <div style={{ borderRadius: 'var(--radius-xl)', overflow: 'hidden', boxShadow: 'var(--shadow-luxury)', marginBottom: '3rem' }}>
            <img src={blog.image} alt={blog.title} style={{ width: '100%', maxHeight: '480px', objectFit: 'cover' }} />
          </div>

          {/* Article Body */}
          <div 
            className="blog-article-content"
            style={{ fontSize: '1.05rem', lineHeight: 1.85, color: '#333333' }}
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />

          {/* Educational Content Notice */}
          <div className="demo-disclaimer-banner" style={{ marginTop: '3rem', marginBottom: '3rem' }}>
            <AlertCircle size={18} />
            <span>
              <strong>Sample Educational Content:</strong> This article is demonstration educational content illustrating technical capabilities and sensory chemistry.
            </span>
          </div>

          {/* Post Footer */}
          <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <Link to="/blog" className="btn btn-secondary btn-sm" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
              <ArrowLeft size={14} />
              <span>Back to All Articles</span>
            </Link>
            <Link to="/request-quote" className="btn btn-rose btn-sm">
              Discuss with Authors / Request Quote
            </Link>
          </div>
        </article>

        {/* Other Insights */}
        {otherBlogs.length > 0 && (
          <div style={{ maxWidth: '840px', margin: '4rem auto 0', borderTop: '1px solid var(--color-border)', paddingTop: '3rem' }}>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', color: 'var(--color-primary-dark)', marginBottom: '1.5rem' }}>
              Related Insights
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
              {otherBlogs.map(b => (
                <div key={b.id} style={{ background: '#FFFFFF', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-xl)', padding: '1.5rem', boxShadow: 'var(--shadow-sm)' }}>
                  <span className="badge badge-primary" style={{ marginBottom: '0.5rem', fontSize: '0.72rem' }}>{b.category}</span>
                  <h4 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', fontFamily: 'var(--font-heading)' }}>
                    <Link to={`/blog/${b.slug}`} style={{ color: 'var(--color-primary-dark)', textDecoration: 'none' }}>
                      {b.title}
                    </Link>
                  </h4>
                  <p style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', lineHeight: 1.5 }}>{b.excerpt}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogDetails;
