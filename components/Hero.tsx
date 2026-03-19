import React from 'react';
import { MapPin, Globe, CheckCircle, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import heroBg from '../hero_bg.png';

const Hero: React.FC = () => {
  return (
    <section className="relative bg-gray-900 text-white min-h-screen flex items-center justify-center pt-20" style={{ backgroundImage: `url(${heroBg})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' }}>
      <div className="absolute inset-0 bg-gradient-to-b from-[#1a2e22]/90 via-gray-900/80 to-gray-900"></div>
      
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-20 z-10 w-full">
        <div className="max-w-4xl text-center mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center justify-center bg-[#c8a849]/10 border border-[#c8a849]/30 text-[#c8a849] backdrop-blur-sm text-sm font-semibold py-1.5 px-4 rounded-full mb-8 shadow-glow"
          >
            "Bandico : Actions de Foi"
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-extrabold leading-tight mb-6 tracking-tight drop-shadow-lg"
          >
            Ensemble, Bâtissons un Avenir de <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#c8a849] to-yellow-200">Dignité</span> et de <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#c8a849] to-yellow-200">Prospérité</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-2xl text-gray-300 max-w-3xl mx-auto mb-12 font-light leading-relaxed drop-shadow-md"
          >
            Bandico Group unit trois forces transformatrices : action humanitaire, formation professionnelle et commerce éthique pour promouvoir le développement durable au Cameroun et au-delà.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap justify-center gap-5"
          >
            <Link to="/contact" className="group bg-[#2f6c44] hover:bg-[#1a4a2b] text-white font-bold py-3.5 px-8 rounded-full transition-all duration-300 flex items-center gap-2 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#2f6c44]/30">
              Rejoignez l'Impact <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link to="/formations" className="bg-[#c8a849] hover:bg-[#b0933c] text-gray-900 font-bold py-3.5 px-8 rounded-full transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#c8a849]/30">
              Nos Formations
            </Link>
            <Link to="/boutique" className="bg-transparent border-2 border-white/60 hover:bg-white hover:text-gray-900 text-white font-bold py-3.5 px-8 rounded-full transition-all duration-300 hover:-translate-y-1 hover:shadow-xl backdrop-blur-sm">
              Visiter Bandico Shop
            </Link>
          </motion.div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-20 md:mt-32 grid grid-cols-1 md:grid-cols-3 gap-8 text-center max-w-5xl mx-auto border-t border-white/10 pt-10"
        >
          <div className="flex flex-col items-center justify-center space-y-3 group">
            <div className="bg-white/5 p-4 rounded-full group-hover:bg-[#c8a849]/20 transition-colors duration-300 outline outline-1 outline-white/10">
              <MapPin className="w-8 h-8 text-[#c8a849]" />
            </div>
            <div>
              <p className="font-semibold text-lg drop-shadow">Basé à</p>
              <p className="text-gray-400 font-medium">Maroua, Cameroun</p>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center space-y-3 group">
            <div className="bg-white/5 p-4 rounded-full group-hover:bg-[#c8a849]/20 transition-colors duration-300 outline outline-1 outline-white/10">
              <Globe className="w-8 h-8 text-[#c8a849]" />
            </div>
            <div>
              <p className="font-semibold text-lg drop-shadow">Portée</p>
              <p className="text-gray-400 font-medium">Nationale & Internationale</p>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center space-y-3 group">
            <div className="bg-white/5 p-4 rounded-full group-hover:bg-[#c8a849]/20 transition-colors duration-300 outline outline-1 outline-white/10">
              <CheckCircle className="w-8 h-8 text-[#c8a849]" />
            </div>
            <div>
              <p className="font-semibold text-lg drop-shadow">Focus</p>
              <p className="text-gray-400 font-medium">Objectifs de Développement Durable</p>
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Decorative Blur Orbs */}
      <div className="absolute top-1/4 left-10 w-64 h-64 bg-[#c8a849] rounded-full mix-blend-multiply filter blur-[128px] opacity-20 pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-[#2f6c44] rounded-full mix-blend-multiply filter blur-[128px] opacity-30 pointer-events-none"></div>
    </section>
  );
};

export default Hero;
