import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Home, ArrowRight, PackageSearch, Mail } from 'lucide-react';
import Breadcrumb from '../components/Breadcrumb';

const NotFound = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <div className="not-found-page">
      <div className="container" style={{ paddingTop: '3rem', paddingBottom: '6rem' }}>
        <Breadcrumb items={[{ label: 'Home', path: '/' }, { label: '404 - Formulation Not Found' }]} />

        <div className="not-found-box">
          <div className="not-found-kicker">SKFF (INDIA) PVT. LTD. &bull; Error 404</div>
          <h1 className="not-found-title">404</h1>
          <h2 className="not-found-subtitle">We couldn't locate this specific sensory formulation or route.</h2>
          <p className="not-found-description">
            The page you are looking for may have been restructured, moved to another category, or is an invalid URL.
            Explore our 11 product categories or search our comprehensive B2B catalogue below.
          </p>

          <form onSubmit={handleSearch} className="not-found-search">
            <div className="search-input-wrap">
              <Search size={18} className="search-icon" />
              <input
                type="text"
                placeholder="Search flavour or fragrance (e.g. Vanilla, Mango, Lavender, Oud)..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button type="submit" className="btn btn-primary btn-sm">
                Search Catalogue
              </button>
            </div>
          </form>

          <div className="not-found-links">
            <Link to="/" className="btn btn-primary">
              <Home size={18} /> Return to Homepage
            </Link>
            <Link to="/catalogue" className="btn btn-outline">
              <PackageSearch size={18} /> Browse All 112 Products
            </Link>
            <Link to="/enquiry" className="btn btn-outline">
              <Mail size={18} /> Send Custom B2B Enquiry
            </Link>
          </div>

          <div className="quick-categories-links">
            <span>Popular Categories:</span>
            <Link to="/category/confectionery">Confectionery</Link>
            <Link to="/category/beverages">Beverages</Link>
            <Link to="/category/bakery">Bakery</Link>
            <Link to="/category/dairy">Dairy</Link>
            <Link to="/category/home-care">Home Care</Link>
            <Link to="/category/fine-fragrances">Fine Fragrances</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
