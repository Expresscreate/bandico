import React from 'react';
import { ShieldCheck, Globe, Users, ShoppingBag, Star, ArrowRight, ShoppingCart } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Shop: React.FC = () => {
  const fadeUpVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  return (
    <section id="shop" className="py-24 bg-white relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUpVariant}
          className="text-center mb-16"
        >
          <span className="inline-block bg-[#1a2e22] text-white rounded-full px-5 py-1.5 text-sm font-semibold mb-4 shadow-md">Bandico Shop</span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
            Commerce <span className="text-[#2f6c44]">Éthique</span> & Service <span className="text-[#c8a849]">Exceptionnel</span>
          </h2>
          <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto font-light leading-relaxed">
            Des produits de qualité avec un engagement unique au Cameroun : service client d'excellence, garanties longues durées et politique de retour transparente.
          </p>
        </motion.div>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24"
        >
          <motion.div variants={fadeUpVariant}>
            <FeatureCard title="Garantie Longue Durée" description="Bénéficiez de garanties étendues sur tous nos produits pour une tranquillité d'esprit totale." color="green"/>
          </motion.div>
          <motion.div variants={fadeUpVariant}>
            <FeatureCard title="Retour Facile" description="Politique de retour et de remboursement unique au Cameroun, simple et sans tracas." color="yellow"/>
          </motion.div>
          <motion.div variants={fadeUpVariant}>
            <FeatureCard title="SAV Réactif" description="Service après-vente disponible et attentif pour vous accompagner au quotidien." color="green"/>
          </motion.div>
        </motion.div>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUpVariant}
          className="text-center mb-12"
        >
          <h3 className="text-3xl font-extrabold text-gray-900 tracking-tight">Nos Catégories de Produits</h3>
        </motion.div>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-24"
        >
          <motion.div variants={fadeUpVariant}><CategoryCard title="Électronique" description="Ordinateurs, smartphones, accessoires" /></motion.div>
          <motion.div variants={fadeUpVariant}><CategoryCard title="Maison & Bureau" description="Mobilier, décoration, équipement" /></motion.div>
          <motion.div variants={fadeUpVariant}><CategoryCard title="Mode & Lifestyle" description="Vêtements, chaussures, accessoires" /></motion.div>
          <motion.div variants={fadeUpVariant}><CategoryCard title="Éducation" description="Livres, fournitures scolaires, matériel" /></motion.div>
        </motion.div>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUpVariant}
          className="text-center mb-12"
        >
          <h3 className="text-3xl font-extrabold text-gray-900 tracking-tight">Produits en Vedette</h3>
        </motion.div>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24"
        >
          <motion.div variants={fadeUpVariant}>
            <ProductCard 
              name="Ordinateur Portable Pro" 
              price="382,500 FCFA" 
              oldPrice="450,000 FCFA" 
              tag="-15%" 
              tagColor="bg-red-500 text-white" 
              imageUrl="https://images.unsplash.com/photo-1589156280159-27698a70f29b?q=80&w=1926&auto=format&fit=crop"
            />
          </motion.div>
          <motion.div variants={fadeUpVariant}>
            <ProductCard 
              name="Chaise de Bureau Ergonomique" 
              price="125,000 FCFA" 
              tag="Nouveau" 
              tagColor="bg-[#c8a849] text-gray-900"
              imageUrl="https://images.unsplash.com/photo-1580480055273-228ff5388ef8?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            />
          </motion.div>
          <motion.div variants={fadeUpVariant}>
            <ProductCard 
              name="Kit Scolaire Complet" 
              price="35,000 FCFA"
              imageUrl="https://images.unsplash.com/photo-1456735190827-d1262f71b8a3?q=80&w=2048&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            />
          </motion.div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="bg-gray-50 border border-gray-100 p-10 md:p-16 rounded-[3rem]"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-extrabold text-gray-900 tracking-tight">Pourquoi Acheter Chez Bandico Shop ?</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <ShopBenefit icon={<Star className="h-8 w-8 text-[#2f6c44]" />} title="Qualité Garantie" description="Produits sélectionnés avec soin" />
            <ShopBenefit icon={<Globe className="h-8 w-8 text-[#2f6c44]" />} title="Livraison Rapide" description="Partout au Cameroun" />
            <ShopBenefit icon={<ShieldCheck className="h-8 w-8 text-[#2f6c44]" />} title="Paiement Sécurisé" description="Transactions protégées" />
            <ShopBenefit icon={<Users className="h-8 w-8 text-[#2f6c44]" />} title="Satisfaction Client" description="Notre priorité absolue" />
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-16"
        >
          <Link to="/boutique" className="bg-[#1a2e22] text-white hover:bg-gray-800 focus:ring-4 focus:ring-gray-300 font-bold py-4 px-10 rounded-full transition-all duration-300 inline-flex items-center gap-3 shadow-lg hover:shadow-xl hover:-translate-y-1">
            <ShoppingBag className="h-5 w-5"/> Explorer La Boutique Complète
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

const FeatureCard: React.FC<{title: string; description: string; color: 'green' | 'yellow'}> = ({ title, description, color}) => {
  const bgClass = color === 'green' ? 'bg-[#2f6c44] text-white' : 'bg-[#c8a849] text-gray-900';
  
  return(
    <div className={`${bgClass} p-10 rounded-3xl shadow-lg hover:shadow-xl transition-shadow duration-300 h-full flex flex-col`}>
      <h4 className="font-bold text-2xl mb-4 leading-tight">{title}</h4>
      <p className="font-light leading-relaxed opacity-90">{description}</p>
    </div>
  );
};

const CategoryCard: React.FC<{title: string; description: string}> = ({ title, description }) => (
  <div className="bg-gray-50 border border-gray-100 p-8 rounded-3xl text-center hover:bg-white hover:shadow-lg transition-all duration-300 cursor-pointer group">
    <div className="w-20 h-20 bg-white rounded-2xl mx-auto mb-6 shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-300 group-hover:bg-[#2f6c44]/5">
    </div>
    <h4 className="font-bold text-lg text-gray-900 mb-2">{title}</h4>
    <p className="text-sm text-gray-500 font-light">{description}</p>
  </div>
);

const ProductCard: React.FC<{name: string; price: string; oldPrice?: string; tag?: string; tagColor?: string; imageUrl: string}> = ({ name, price, oldPrice, tag, tagColor, imageUrl }) => (
  <div className="bg-white border border-gray-100 rounded-[2rem] overflow-hidden group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 relative">
    <div className="bg-gray-50 h-64 relative overflow-hidden">
      <img src={imageUrl} alt={name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
      {tag && <span className={`absolute top-4 left-4 ${tagColor} text-xs font-bold px-3 py-1.5 rounded-full shadow-md z-10 uppercase tracking-wide`}>{tag}</span>}
      
      {/* Quick actions overlay */}
      <div className="absolute inset-x-0 bottom-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-gray-900/80 to-transparent flex justify-center">
        <button className="bg-white text-gray-900 font-bold py-2.5 px-6 rounded-full flex items-center gap-2 hover:bg-[#c8a849] transition-colors duration-300 shadow-md transform translate-y-4 group-hover:translate-y-0 text-sm">
          <ShoppingCart className="w-4 h-4" /> Ajouter au Panier
        </button>
      </div>
    </div>
    <div className="p-8">
      <h4 className="font-bold text-xl text-gray-900 mb-2 line-clamp-1">{name}</h4>
      <div className="flex items-end gap-3 mt-4">
        <p className="font-extrabold text-2xl text-[#2f6c44] leading-none">{price}</p>
        {oldPrice && <p className="text-sm text-gray-400 line-through mb-0.5">{oldPrice}</p>}
      </div>
    </div>
  </div>
);

const ShopBenefit: React.FC<{icon: React.ReactNode, title: string, description: string}> = ({ icon, title, description }) => (
  <div className="flex flex-col items-center">
    <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-6 shadow-soft border border-gray-50 text-[#2f6c44] hover:scale-110 transition-transform duration-300">
      {icon}
    </div>
    <h5 className="font-bold text-gray-900 text-lg mb-2">{title}</h5>
    <p className="text-sm text-gray-500 font-light">{description}</p>
  </div>
);

export default Shop;
