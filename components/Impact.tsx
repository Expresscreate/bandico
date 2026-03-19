import React from 'react';
import { Users, Layers, GraduationCap, UserPlus, BookOpen, Lightbulb, Heart, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const Impact: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  const fadeUpVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <section className="py-24 bg-[#1a2e22] text-white relative overflow-hidden">
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#2f6c44]/40 rounded-full filter blur-[100px] pointer-events-none mix-blend-screen"></div>
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-[#c8a849]/20 rounded-full filter blur-[100px] pointer-events-none mix-blend-screen"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUpVariant}
          className="text-center mb-16"
        >
          <span className="inline-block bg-[#c8a849]/20 border border-[#c8a849]/30 text-[#c8a849] rounded-full px-5 py-1.5 text-sm font-semibold mb-4 shadow-glow">Notre Impact</span>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">Transformer des Vies, Bâtir l'Avenir</h2>
          <p className="mt-6 text-xl text-green-100/80 max-w-3xl mx-auto font-light leading-relaxed">
            Nos actions concrètes créent un impact mesurable dans les communautés que nous servons.
          </p>
        </motion.div>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-20"
        >
          <motion.div variants={fadeUpVariant}>
            <StatCard icon={<Users className="h-8 w-8 text-[#c8a849]" />} value="500+" label="Bénéficiaires Directs" />
          </motion.div>
          <motion.div variants={fadeUpVariant}>
            <StatCard icon={<Layers className="h-8 w-8 text-[#c8a849]" />} value="25+" label="Projets Réalisés" />
          </motion.div>
          <motion.div variants={fadeUpVariant}>
            <StatCard icon={<GraduationCap className="h-8 w-8 text-[#c8a849]" />} value="200+" label="Formations Dispensées" />
          </motion.div>
          <motion.div variants={fadeUpVariant}>
            <StatCard icon={<UserPlus className="h-8 w-8 text-[#c8a849]" />} value="15+" label="Partenariats Actifs" />
          </motion.div>
        </motion.div>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 text-gray-900"
        >
          <motion.div variants={fadeUpVariant}>
            <FocusArea
              icon={<BookOpen className="h-6 w-6 text-[#1a2e22]" />}
              title="Éducation & Formation"
              description="Soutien scolaire, bourses d'études, et formation professionnelle pour autonomiser la jeunesse."
              stat="150+ jeunes formés"
            />
          </motion.div>
          <motion.div variants={fadeUpVariant}>
            <FocusArea
              icon={<Lightbulb className="h-6 w-6 text-[#1a2e22]" />}
              title="Autonomisation des Femmes"
              description="Activités génératrices de revenus et micro-projets pour l'indépendance économique des femmes."
              stat="80+ femmes entrepreneures"
            />
          </motion.div>
          <motion.div variants={fadeUpVariant}>
            <FocusArea
              icon={<Heart className="h-6 w-6 text-[#1a2e22]" />}
              title="Paix & Durabilité"
              description="Promotion de la paix sociale, protection de l'environnement et développement durable."
              stat="10+ initiatives ODD"
            />
          </motion.div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-16"
        >
          <a href="#association" className="group bg-[#c8a849] hover:bg-[#b0933c] text-gray-900 focus:ring-4 focus:ring-yellow-300 font-bold py-4 px-10 rounded-full transition-all duration-300 inline-flex items-center gap-2 hover:-translate-y-1 hover:shadow-glow">
            Découvrir Nos Projets <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

interface StatCardProps {
  icon: React.ReactNode;
  value: string;
  label: string;
}

const StatCard: React.FC<StatCardProps> = ({ icon, value, label }) => (
  <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl text-center hover:bg-white/10 transition-colors duration-300 group">
    <div className="mb-5 inline-flex items-center justify-center w-16 h-16 bg-white/5 rounded-2xl group-hover:scale-110 transition-transform duration-300">
      {icon}
    </div>
    <p className="text-5xl font-black mb-2 tracking-tight">{value}</p>
    <p className="text-green-100/70 font-medium">{label}</p>
  </div>
);

interface FocusAreaProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  stat: string;
}

const FocusArea: React.FC<FocusAreaProps> = ({ icon, title, description, stat }) => (
  <div className="h-full bg-white p-8 rounded-3xl shadow-soft hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 flex flex-col">
    <div className="flex items-center mb-5">
      <div className="bg-[#c8a849]/20 p-3 rounded-2xl mr-4">
        {icon}
      </div>
      <h3 className="text-xl font-bold leading-tight">{title}</h3>
    </div>
    <p className="text-gray-600 mb-6 flex-grow font-light leading-relaxed">{description}</p>
    <div className="inline-flex items-center text-[#2f6c44] font-semibold bg-[#2f6c44]/10 py-1.5 px-3 rounded-lg w-max">
      {stat}
    </div>
  </div>
);

export default Impact;
