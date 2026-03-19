import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  image?: string;
  imagePosition?: string;
  breadcrumb?: { label: string; href?: string }[];
}

const PageHeader: React.FC<PageHeaderProps> = ({ 
  title, 
  subtitle, 
  image = 'https://images.unsplash.com/photo-1589156280159-27698a70f29b?q=80&w=2070&auto=format&fit=crop',
  imagePosition = 'object-center',
  breadcrumb = []
}) => {
  return (
    <section className="relative h-[450px] flex items-center overflow-hidden pt-20">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={image} 
          alt={title} 
          className={`w-full h-full object-cover ${imagePosition}`}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1a2e22]/90 via-[#1a2e22]/70 to-transparent"></div>
        <div className="absolute inset-0 bg-[#1a2e22]/20 backdrop-blur-[2px]"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl"
        >
          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
            {title}
          </h1>
          
          {subtitle && (
            <p className="text-xl text-white/80 font-light max-w-2xl leading-relaxed border-l-4 border-[#c8a849] pl-6 mb-8">
              {subtitle}
            </p>
          )}

          {/* Breadcrumb moved to bottom */}
          <nav className="flex items-center space-x-2 text-white/70 text-sm bg-white/5 backdrop-blur-md w-fit px-4 py-2 rounded-full border border-white/10">
            <Link to="/" className="hover:text-[#c8a849] transition-colors flex items-center gap-1">
              <Home className="w-4 h-4" /> Accueil
            </Link>
            {breadcrumb.map((item, index) => (
              <React.Fragment key={index}>
                <ChevronRight className="w-4 h-4 opacity-50" />
                {item.href ? (
                  <Link to={item.href} className="hover:text-[#c8a849] transition-colors">
                    {item.label}
                  </Link>
                ) : (
                  <span className="text-[#c8a849] font-medium">{item.label}</span>
                )}
              </React.Fragment>
            ))}
          </nav>
        </motion.div>
      </div>

      {/* No bottom gradient as per request for sharp separation */}
    </section>
  );
};

export default PageHeader;
