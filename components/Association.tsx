import React from 'react';
import { CheckCircle, BookOpen, Users, Heart, Globe, GraduationCap } from 'lucide-react';
import { motion } from 'framer-motion';

const Association: React.FC = () => {
  const fadeUpVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  return (
    <section id="association" className="py-24 bg-white relative">
      {/* Decorative blobs */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-gray-50 to-transparent pointer-events-none"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUpVariant}
          className="text-center mb-16"
        >
          <span className="inline-block bg-[#2f6c44]/10 text-[#2f6c44] border border-[#2f6c44]/20 rounded-full px-5 py-1.5 text-sm font-semibold mb-4 shadow-sm">Bandico Association</span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
            Action Humanitaire & <span className="text-[#2f6c44]">Développement Communautaire</span>
          </h2>
          <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto font-light leading-relaxed">
            Notre branche humanitaire œuvre pour l'éducation, l'autonomisation et le développement durable des communautés à travers des projets concrets et mesurables.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative h-[500px] rounded-[2.5rem] overflow-hidden shadow-2xl group"
          >
            <img src="https://images.unsplash.com/photo-1589156229687-496a31ad1d1f?q=80&w=1926&auto=format&fit=crop" alt="African women working" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-8 w-full">
              <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl">
                <p className="text-xl font-bold text-white mb-2 tracking-wide">"Ensemble pour la dignité humaine"</p>
                <p className="text-gray-200 font-light">Des actions concrètes alignées sur les Objectifs de Développement Durable</p>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <div className="mb-12">
              <motion.h3 variants={fadeUpVariant} className="text-3xl font-bold mb-6 text-gray-900 flex items-center gap-3">
                <div className="bg-[#2f6c44]/10 p-2 rounded-xl"><CheckCircle className="text-[#2f6c44] w-6 h-6" /></div>
                Nos Objectifs
              </motion.h3>
              <ul className="space-y-4">
                {[
                  "Promouvoir l'éducation et le soutien scolaire pour les enfants et jeunes défavorisés",
                  "Autonomiser les femmes et les jeunes à travers des activités génératrices de revenus",
                  "Promouvoir la paix, la cohésion sociale et la protection de l'environnement",
                  "Soutenir le développement durable et l'atteinte des ODD"
                ].map((text, i) => (
                  <motion.li key={i} variants={fadeUpVariant} className="flex items-start bg-gray-50 hover:bg-[#2f6c44]/5 p-4 rounded-2xl transition-colors border border-gray-100">
                    <CheckCircle className="h-6 w-6 text-[#2f6c44] mr-4 mt-0.5 flex-shrink-0" /> 
                    <span className="text-gray-700 font-medium leading-relaxed">{text}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
            
            <motion.div variants={fadeUpVariant}>
              <h3 className="text-2xl font-bold mb-6 text-gray-900 border-b border-gray-100 pb-4">Domaines d'Intervention</h3>
              <div className="grid grid-cols-2 gap-4">
                <DomainCard icon={<BookOpen className="h-6 w-6 text-white"/>} title="Éducation" color="bg-[#1a2e22]" hoverColor="hover:bg-gray-800"/>
                <DomainCard icon={<Users className="h-6 w-6 text-gray-900"/>} title="Femmes & Jeunes" color="bg-[#c8a849]" hoverColor="hover:bg-[#b0933c] text-gray-900"/>
                <DomainCard icon={<Heart className="h-6 w-6 text-white"/>} title="Paix & Cohésion" color="bg-[#2f6c44]" hoverColor="hover:bg-[#1a4a2b]"/>
                <DomainCard icon={<Globe className="h-6 w-6 text-[#2f6c44]"/>} title="Environnement" color="bg-[#2f6c44]/10 group-hover:bg-[#2f6c44] text-[#2f6c44] transition-colors" hoverColor="hover:bg-[#2f6c44]"/>
              </div>
            </motion.div>
          </motion.div>
        </div>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUpVariant}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">Nos Projets & Micro-Projets</h2>
        </motion.div>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          <motion.div variants={fadeUpVariant} className="h-full">
            <ProjectCard
              icon={<GraduationCap className="h-8 w-8 text-[#2f6c44]" />}
              title="Bourses d'Études"
              description="Programme de bourses scolaires pour enfants défavorisés avec suivi personnalisé et fournitures complètes."
              stat="120+ bénéficiaires"
            />
          </motion.div>
          <motion.div variants={fadeUpVariant} className="h-full">
            <ProjectCard
              icon={<Users className="h-8 w-8 text-[#c8a849]" />}
              title="AGR Femmes"
              description="Activités génératrices de revenus pour autonomiser économiquement les femmes : commerce, artisanat, agriculture."
              stat="80+ entrepreneures"
              featured
            />
          </motion.div>
          <motion.div variants={fadeUpVariant} className="h-full">
            <ProjectCard
              icon={<Globe className="h-8 w-8 text-[#2f6c44]" />}
              title="Reboisement"
              description="Campagnes de plantation d'arbres et sensibilisation environnementale pour lutter contre la désertification."
              stat="5,000+ arbres plantés"
            />
          </motion.div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-16"
        >
          <a href="#contact" className="bg-[#2f6c44] text-white hover:bg-[#1a4a2b] font-bold py-4 px-10 rounded-full transition-all duration-300 inline-block shadow-lg hover:shadow-xl hover:-translate-y-1">
            Soutenir Nos Projets
          </a>
        </motion.div>
      </div>
    </section>
  );
};

const DomainCard: React.FC<{icon: React.ReactNode; title: string; color: string; hoverColor?: string}> = ({ icon, title, color, hoverColor }) => (
  <div className={`${color} ${hoverColor} p-5 rounded-2xl flex items-center space-x-3 transition-colors duration-300 shadow-sm cursor-pointer group`}>
    <div className="group-hover:scale-110 transition-transform duration-300">
      {icon}
    </div>
    <span className={`font-bold ${color.includes('bg-[#c8a849]') || color.includes('text-[#2f6c44]') ? 'text-gray-900 group-hover:text-white' : 'text-white'}`}>{title}</span>
  </div>
);

const ProjectCard: React.FC<{icon: React.ReactNode; title: string; description: string; stat: string; featured?: boolean}> = ({ icon, title, description, stat, featured}) => (
  <div className={`h-full bg-white p-8 rounded-[2rem] border ${featured ? 'border-[#c8a849]/30 ring-2 ring-[#c8a849]/10' : 'border-gray-100'} hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col group`}>
    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${featured ? 'bg-[#c8a849]/10' : 'bg-gray-50 group-hover:bg-[#2f6c44]/5'} transition-colors duration-300 mb-6`}>
      {icon}
    </div>
    <h3 className="text-2xl font-bold mb-4 text-gray-900">{title}</h3>
    <p className="text-gray-600 mb-6 flex-grow leading-relaxed font-light">{description}</p>
    <div className={`inline-flex items-center font-bold px-4 py-2 rounded-xl mt-auto w-max ${featured ? 'bg-[#c8a849]/10 text-[#c8a849]' : 'bg-[#2f6c44]/10 text-[#2f6c44]'}`}>
      {stat}
    </div>
  </div>
);

export default Association;
