import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

// Global Contexts
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { ToastProvider } from './context/ToastContext';

// Core Components
import Header from './components/Header';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';

// Storefront & Corporate Pages
import Home from './pages/Home';
import About from './pages/About';
import CompanyProfile from './pages/CompanyProfile';
import Industries from './pages/Industries';
import CategoryPage from './pages/CategoryPage';
import ProductDetails from './pages/ProductDetails';
import ProductCatalogue from './pages/ProductCatalogue';
import ProductSpecifications from './pages/ProductSpecifications';
import SearchResults from './pages/SearchResults';
import BulkEnquiry from './pages/BulkEnquiry';
import Contact from './pages/Contact';
import Blog from './pages/Blog';
import BlogDetails from './pages/BlogDetails';
import FAQ from './pages/FAQ';
import Policies from './pages/Policies';

// E-Commerce & Demo Flow Pages
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderConfirmation from './pages/OrderConfirmation';
import Wishlist from './pages/Wishlist';
import Login from './pages/Login';
import Register from './pages/Register';
import Account from './pages/Account';
import NotFound from './pages/NotFound';

// Demo Admin Module
import AdminDashboard from './admin/AdminDashboard';

// Helper component to scroll to top on every route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Layout wrapper to conditionally render standard header/footer
const AppLayout = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="app-root">
      {!isAdminRoute && <Header />}
      <CartDrawer />
      <main id="main-content" className="main-content-area">
        <Routes>
          {/* Main Corporate Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/company-profile" element={<CompanyProfile />} />
          <Route path="/industries" element={<Industries />} />

          {/* Catalogue & Category Routes */}
          <Route path="/flavours" element={<CategoryPage overrideType="flavour" />} />
          <Route path="/fragrances" element={<CategoryPage overrideType="fragrance" />} />
          <Route path="/category/:slug" element={<CategoryPage />} />
          <Route path="/catalogue" element={<ProductCatalogue />} />
          <Route path="/specifications" element={<ProductSpecifications />} />
          <Route path="/product/:slug" element={<ProductDetails />} />
          <Route path="/search" element={<SearchResults />} />

          {/* B2B Enquiry & Quotations */}
          <Route path="/enquiry" element={<BulkEnquiry />} />
          <Route path="/bulk-enquiry" element={<BulkEnquiry />} />
          <Route path="/contact" element={<Contact />} />

          {/* Knowledge & Resources */}
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogDetails />} />
          <Route path="/faq" element={<FAQ />} />

          {/* Governance & Policies */}
          <Route path="/privacy" element={<Policies />} />
          <Route path="/terms" element={<Policies />} />
          <Route path="/shipping" element={<Policies />} />
          <Route path="/returns" element={<Policies />} />

          {/* Interactive B2B Commerce Demo */}
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-confirmation" element={<OrderConfirmation />} />
          <Route path="/wishlist" element={<Wishlist />} />

          {/* Client Authentication & Portal Demo */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/account" element={<Account />} />

          {/* Demo Admin Console */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/*" element={<AdminDashboard />} />

          {/* 404 Fallback */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      {!isAdminRoute && <Footer />}
    </div>
  );
};

function App() {
  return (
    <ToastProvider>
      <CartProvider>
        <WishlistProvider>
          <Router>
            <ScrollToTop />
            <AppLayout />
          </Router>
        </WishlistProvider>
      </CartProvider>
    </ToastProvider>
  );
}

export default App;
