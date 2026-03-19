import React from 'react';
import { BookOpen, GraduationCap, ShoppingBag, ChevronRight, Star, ShieldCheck, Scale, ThumbsUp, Sparkles, Heart, CheckCircle, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const ThreeForces: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <section className="py-20 sm:py-32 bg-gray-50 relative overflow-hidden">
      {/* Decorative background blur */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#c8a849]/5 rounded-full filter blur-[100px] pointer-events-none"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={itemVariants}
          className="text-center mb-16"
        >
          <span className="inline-block bg-[#2f6c44]/10 text-[#2f6c44] border border-[#2f6c44]/20 rounded-full px-4 py-1.5 text-sm font-semibold mb-4 shadow-sm">Un Groupe, Trois Forces</span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">Au Service de l'Humanité</h2>
          <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto font-light leading-relaxed">
            Bandico Group est une organisation à but non lucratif qui regroupe trois entités complémentaires dédiées à la promotion de la dignité humaine et au développement durable.
          </p>
        </motion.div>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20"
        >
          <motion.div variants={itemVariants}>
            <Card 
              icon={<BookOpen className="h-8 w-8 text-[#2f6c44]" />} 
              title="Bandico Association" 
              description="Notre branche humanitaire œuvre pour l'éducation, l'autonomisation des femmes et des jeunes, la paix et le développement communautaire à travers des projets concrets."
              linkText="En savoir plus"
              href="#association"
            />
          </motion.div>
          <motion.div variants={itemVariants}>
            <Card 
              icon={<GraduationCap className="h-8 w-8 text-[#c8a849]" />} 
              title="Bandico Formation" 
              description="Notre plateforme de formation professionnelle offre des cours en entrepreneuriat, gestion de projets et développement de compétences avec une approche MOOC innovante."
              linkText="Voir les formations"
              href="/formations"
              featured
            />
          </motion.div>
          <motion.div variants={itemVariants}>
            <Card 
              icon={<ShoppingBag className="h-8 w-8 text-[#2f6c44]" />} 
              title="Bandico Shop" 
              description="Notre boutique en ligne propose des produits de qualité avec un service client exceptionnel, des garanties longues durées et une politique de retour unique au Cameroun."
              linkText="Entrer dans la boutique"
              href="#shop"
            />
          </motion.div>
        </motion.div>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={itemVariants}
          className="bg-white p-10 rounded-3xl shadow-soft border border-gray-100 relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#c8a849]/10 to-transparent rounded-bl-full pointer-events-none transition-transform duration-700 group-hover:scale-110"></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 relative z-10">
            <div>
              <h3 className="text-3xl font-bold mb-6 flex items-center text-gray-900">
                <div className="bg-[#2f6c44]/10 p-2 rounded-xl mr-4">
                  <BookOpen className="h-7 w-7 text-[#2f6c44]" />
                </div>
                Notre Mission
              </h3>
              <p className="text-gray-600 mb-8 text-lg font-light leading-relaxed">Promouvoir la dignité humaine à travers des actions concrètes qui favorisent l'éducation, l'autonomisation économique, la paix sociale et le développement durable en alignement avec les Objectifs de Développement Durable (ODD).</p>
              <ul className="space-y-4">
                <li className="flex items-start p-3 bg-gray-50 rounded-xl">
                  <CheckCircle className="h-6 w-6 text-[#2f6c44] mr-3 mt-0.5 flex-shrink-0" /> 
                  <span className="text-gray-700 font-medium">Organisation apolitique et socio-économique</span>
                </li>
                <li className="flex items-start p-3 bg-gray-50 rounded-xl">
                  <CheckCircle className="h-6 w-6 text-[#2f6c44] mr-3 mt-0.5 flex-shrink-0" /> 
                  <span className="text-gray-700 font-medium">Engagement envers l'intégrité et la transparence</span>
                </li>
                <li className="flex items-start p-3 bg-gray-50 rounded-xl">
                  <CheckCircle className="h-6 w-6 text-[#2f6c44] mr-3 mt-0.5 flex-shrink-0" /> 
                  <span className="text-gray-700 font-medium">Focus sur l'impact mesurable et durable</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-3xl font-bold mb-6 flex items-center text-gray-900">
                <div className="bg-[#c8a849]/10 p-2 rounded-xl mr-4">
                  <Star className="h-7 w-7 text-[#c8a849]" />
                </div>
                Nos Valeurs
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <ValueCard icon={<Heart className="h-6 w-6 text-[#2f6c44]"/>} title="Dignité" />
                <ValueCard icon={<ShieldCheck className="h-6 w-6 text-[#2f6c44]"/>} title="Intégrité" />
                <ValueCard icon={<Scale className="h-6 w-6 text-[#2f6c44]"/>} title="Équité" />
                <ValueCard icon={<ThumbsUp className="h-6 w-6 text-[#2f6c44]"/>} title="Respect" />
                <ValueCard icon={<Users className="h-6 w-6 text-[#2f6c44]"/>} title="Compassion" />
                <ValueCard icon={<Sparkles className="h-6 w-6 text-[#2f6c44]"/>} title="Excellence" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

interface CardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  linkText: string;
  href: string;
  featured?: boolean;
}

const Card: React.FC<CardProps> = ({ icon, title, description, linkText, href, featured }) => (
  <div className={`h-full bg-white p-8 rounded-3xl shadow-soft hover:shadow-xl transition-all duration-300 flex flex-col hover:-translate-y-2 border border-gray-100 ${featured ? 'ring-2 ring-[#c8a849]/50 relative overflow-hidden' : ''}`}>
    {featured && <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 to-[#c8a849]"></div>}
    
    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-sm ${featured ? 'bg-[#c8a849]/10' : 'bg-[#2f6c44]/10'}`}>
      {icon}
    </div>
    <h3 className="text-2xl font-bold mb-3 text-gray-900">{title}</h3>
    <p className="text-gray-600 mb-6 flex-grow leading-relaxed font-light">{description}</p>
    <Link to={href} className={`font-semibold inline-flex items-center mt-auto group ${featured ? 'text-[#c8a849] hover:text-yellow-600' : 'text-[#2f6c44] hover:text-[#1a4a2b]'}`}>
      {linkText} <ChevronRight className="h-5 w-5 ml-1 transition-transform group-hover:translate-x-1" />
    </Link>
  </div>
);

const ValueCard: React.FC<{icon: React.ReactNode, title: string}> = ({ icon, title }) => (
  <div className="bg-white border border-gray-100 p-5 rounded-2xl flex flex-col items-center justify-center text-center space-y-3 hover:shadow-md transition-all duration-300 hover:-translate-y-1">
    <div className="bg-gray-50 p-3 rounded-full">
      {icon}
    </div>
    <span className="font-semibold text-gray-800">{title}</span>
  </div>
);

export default ThreeForces;