import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import ThreeForces from './components/ThreeForces';
import Impact from './components/Impact';
import Membership from './components/Membership';
import Association from './components/Association';
import Formation from './components/Formation';
import Shop from './components/Shop';
import Footer from './components/Footer';
import ContactPage from './components/ContactPage';
import WhatsAppButton from './components/WhatsAppButton';
import CoursesPage from './components/CoursesPage';
import ShopPage from './components/ShopPage';
import BlogPage from './components/BlogPage';
import BlogPostPage from './components/BlogPostPage';
import { CartProvider } from './components/CartContext';
import CartModal from './components/CartModal';

// Admin imports
import { AuthProvider, useAuth } from './components/admin/AuthContext';
import AdminLogin from './components/admin/AdminLogin';
import AdminLayout from './components/admin/AdminLayout';
import AdminDashboard from './components/admin/AdminDashboard';
import BlogList from './components/admin/blog/BlogList';
import BlogEditor from './components/admin/blog/BlogEditor';
import ProductList from './components/admin/shop/ProductList';
import ProductEditor from './components/admin/shop/ProductEditor';
import CourseList from './components/admin/formations/CourseList';
import CourseEditor from './components/admin/formations/CourseEditor';
import PageEditor from './components/admin/pages/PageEditor';
import GlobalSettings from './components/admin/settings/GlobalSettings';

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
    } else {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        const header = document.querySelector('header');
        const headerOffset = header ? header.offsetHeight : 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
  }, [pathname, hash]);

  return null;
};

const HomePage: React.FC = () => (
  <>
    <Hero />
    <ThreeForces />
    <Impact />
    <Membership />
    <Association />
    <Formation />
    <Shop />
  </>
);

// Wrapper: if admin is authenticated show admin routes, else show login
const AdminGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#2f6c44] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }
  
  if (!isAuthenticated) return <AdminLogin />;
  return <>{children}</>;
};

// Public site layout (with header/footer)
const PublicLayout: React.FC = () => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');
  
  if (isAdmin) return null;
  
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/formations" element={<CoursesPage />} />
          <Route path="/boutique" element={<ShopPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:id" element={<BlogPostPage />} />
        </Routes>
      </main>
      <Footer />
      <WhatsAppButton />
      <CartModal />
    </>
  );
};

const App: React.FC = () => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <CartProvider>
      <AuthProvider>
        <div className={isAdmin ? '' : 'bg-white text-gray-800 font-sans'}>
          <ScrollToTop />
          
          {isAdmin ? (
            <Routes>
              <Route path="/admin/*" element={
                <AdminGuard>
                  <Routes>
                    <Route element={<AdminLayout />}>
                      <Route index element={<AdminDashboard />} />
                      <Route path="blog" element={<BlogList />} />
                      <Route path="blog/new" element={<BlogEditor />} />
                      <Route path="blog/:id/edit" element={<BlogEditor />} />
                      <Route path="shop" element={<ProductList />} />
                      <Route path="shop/new" element={<ProductEditor />} />
                      <Route path="shop/:id/edit" element={<ProductEditor />} />
                      <Route path="shop/categories" element={<ProductList />} />
                      <Route path="formations" element={<CourseList />} />
                      <Route path="formations/new" element={<CourseEditor />} />
                      <Route path="formations/:id/edit" element={<CourseEditor />} />
                      <Route path="pages/home" element={<PageEditor page="home" />} />
                      <Route path="pages/contact" element={<PageEditor page="contact" />} />
                      <Route path="settings" element={<GlobalSettings />} />
                    </Route>
                  </Routes>
                </AdminGuard>
              } />
            </Routes>
          ) : (
            <>
              <Header />
              <main>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="/formations" element={<CoursesPage />} />
                  <Route path="/boutique" element={<ShopPage />} />
                  <Route path="/blog" element={<BlogPage />} />
                  <Route path="/blog/:id" element={<BlogPostPage />} />
                </Routes>
              </main>
              <Footer />
              <WhatsAppButton />
              <CartModal />
            </>
          )}
        </div>
      </AuthProvider>
    </CartProvider>
  );
};

export default App;
