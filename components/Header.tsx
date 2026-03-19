import React, { useState, useEffect } from 'react';
import { Menu, X, ShoppingCart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from './CartContext';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { cartCount, setIsCartOpen } = useCart();

  const navLinks = [
    { name: 'Accueil', href: '/' },
    { name: 'Bandico Formation', href: '/formations' },
    { name: 'Bandico Shop', href: '/boutique' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
  ];

  const location = useLocation();
  const isHomePage = location.pathname === '/';

  const isActive = (href: string) => {
    if (href === '/') return location.pathname === '/' && !location.hash;
    if (href.startsWith('/#')) {
      const hash = href.split('#')[1];
      return location.pathname === '/' && location.hash === `#${hash}`;
    }
    return location.pathname === href;
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed w-full top-0 z-50 transition-all duration-300 ${isScrolled || !isHomePage ? 'bg-[#1a2e22]/90 backdrop-blur-md shadow-lg border-b border-white/10' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center space-x-2">
            <img src="/logo-bandecolong.png" alt="Bandico Group" className="h-[50px] w-auto brightness-0 invert" />
          </Link>

          <nav className="hidden lg:flex lg:space-x-8 items-center">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link 
                  key={link.name} 
                  to={link.href} 
                  className={`relative transition-colors duration-300 font-medium group py-2 ${active ? 'text-[#c8a849]' : 'text-white/90 hover:text-white'}`}
                >
                  {link.name}
                  <span className={`absolute left-0 bottom-0 h-0.5 bg-[#c8a849] transition-all duration-300 ${active ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
                </Link>
              );
            })}
            
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative text-white/90 hover:text-white transition-colors duration-300 group p-2"
            >
              <ShoppingCart className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#c8a849] text-gray-900 text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-[#1a2e22]">
                  {cartCount}
                </span>
              )}
            </button>
          </nav>

          <div className="hidden lg:block">
            <Link to="/contact" className="bg-[#c8a849] text-gray-900 hover:bg-[#d9b854] hover:shadow-glow hover:-translate-y-0.5 font-bold py-2.5 px-6 rounded-full transition-all duration-300 inline-block">
              Rejoignez-Nous
            </Link>
          </div>

          <div className="lg:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-white hover:text-[#c8a849] transition-colors">
              {isOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden overflow-hidden bg-[#1a2e22]/95 backdrop-blur-xl border-b border-white/10"
          >
            <nav className="flex flex-col items-center space-y-6 py-8 px-4">
              {navLinks.map((link) => {
                const active = isActive(link.href);
                return (
                  <motion.div
                    key={link.name}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      to={link.href}
                      onClick={() => setIsOpen(false)}
                      className={`text-lg transition-colors duration-300 font-medium ${active ? 'text-[#c8a849]' : 'text-white hover:text-[#c8a849]'}`}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                );
              })}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full"
              >
                <Link
                  to="/contact"
                  onClick={() => setIsOpen(false)}
                  className="bg-[#c8a849] text-gray-900 hover:bg-[#d9b854] shadow-lg font-bold py-3 px-8 rounded-full transition-all mt-4 inline-block w-full text-center"
                >
                  Rejoignez-Nous
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
