import { Lightbulb, Layers, Users, GraduationCap, CheckCircle, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Formation: React.FC = () => {
  const fadeUpVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  return (
    <section id="formation" className="py-24 bg-gray-50 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUpVariant}
          className="text-center mb-16"
        >
          <span className="inline-block bg-[#c8a849]/10 border border-[#c8a849]/30 text-[#c8a849] rounded-full px-5 py-1.5 text-sm font-semibold mb-4 shadow-sm">Bandico Formation</span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
            Développez Vos <span className="text-[#c8a849]">Compétences Professionnelles</span>
          </h2>
          <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto font-light leading-relaxed">
            Plateforme de formation MOOC offrant des cours pratiques en entrepreneuriat, gestion de projets, et développement personnel pour transformer votre carrière.
          </p>
        </motion.div>
        
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-24"
        >
          <motion.div variants={fadeUpVariant}><SkillCard title="Entrepreneuriat" description="Créer et développer votre entreprise" icon={<Lightbulb className="w-6 h-6" />} /></motion.div>
          <motion.div variants={fadeUpVariant}><SkillCard title="Gestion de Projets" description="Planifier et piloter efficacement" color="green" icon={<Layers className="w-6 h-6" />} /></motion.div>
          <motion.div variants={fadeUpVariant}><SkillCard title="Leadership" description="Développer vos qualités de leader" icon={<Users className="w-6 h-6" />} /></motion.div>
          <motion.div variants={fadeUpVariant}><SkillCard title="Aptitudes Digitales" description="Maîtriser les outils numériques" color="green" icon={<GraduationCap className="w-6 h-6" />} /></motion.div>
        </motion.div>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUpVariant}
          className="text-center mb-16"
        >
          <h3 className="text-3xl font-extrabold text-gray-900 tracking-tight">Formations Populaires</h3>
        </motion.div>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24"
        >
          <motion.div variants={fadeUpVariant} className="h-full">
            <CourseCard 
              category="6 semaines" 
              title="Créer et Lancer Votre Entreprise" 
              description="De l'idée au lancement : business plan, financement, marketing et gestion quotidienne." 
              students="45+ inscrits"
              image="https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=2074&auto=format&fit=crop"
              tag="Nouveau"
              color="yellow"
            />
          </motion.div>
          <motion.div variants={fadeUpVariant} className="h-full">
            <CourseCard 
              category="8 semaines" 
              title="Management de Projets Efficace" 
              description="Maîtrisez la planification, le suivi budgétaire et la gestion d'équipe pour réussir vos projets." 
              students="78+ inscrits"
              image="https://images.unsplash.com/photo-1540317580384-e5d43616b9aa?q=80&w=2070&auto=format&fit=crop"
              tag="Populaire"
              color="green"
            />
          </motion.div>
          <motion.div variants={fadeUpVariant} className="h-full">
            <CourseCard 
              category="4 semaines" 
              title="Leadership & Communication" 
              description="Développez votre influence, inspirez votre équipe et communiquez avec impact." 
              students="62+ inscrits"
              image="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop"
              color="green"
            />
          </motion.div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-white p-10 md:p-16 rounded-[3rem] shadow-soft border border-gray-100 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
        >
          <div>
            <h3 className="text-3xl font-bold mb-8 text-gray-900 tracking-tight">Pourquoi Choisir Bandico Formation ?</h3>
            <ul className="space-y-6">
              <BenefitItem title="Certificat Reconnu" description="Obtenez un certificat valorisant à la fin de chaque formation" />
              <BenefitItem title="Flexibilité Totale" description="Apprenez à votre rythme, où et quand vous voulez" />
              <BenefitItem title="Formateurs Experts" description="Apprenez des professionnels expérimentés du terrain" />
              <BenefitItem title="Communauté Active" description="Échangez avec d'autres apprenants et créez votre réseau" />
            </ul>
          </div>
          <div className="relative h-[400px] rounded-3xl overflow-hidden group">
            <img src="/african_students_laptop.png" alt="Jeunes étudiants africains" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"/>
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent"></div>
            <div className="absolute bottom-6 left-6 right-6">
              <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl w-full text-white">
                <p className="text-4xl font-extrabold mb-1 drop-shadow-md">200+</p>
                <p className="font-medium text-white/90">Apprenants formés avec succès</p>
              </div>
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-16"
        >
          <Link to="/formations" className="group bg-[#c8a849] text-gray-900 hover:bg-[#b0933c] hover:shadow-glow font-bold py-4 px-10 rounded-full transition-all duration-300 inline-flex items-center gap-3 hover:-translate-y-1">
            <GraduationCap className="h-6 w-6"/> Découvrir Toutes Les Formations
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

const SkillCard: React.FC<{title: string; description: string; color?: 'green' | 'yellow'; icon: React.ReactNode}> = ({ title, description, color='yellow', icon }) => {
  const borderColor = color === 'green' ? 'border-[#2f6c44]' : 'border-[#c8a849]';
  const iconBg = color === 'green' ? 'bg-[#2f6c44]/10 text-[#2f6c44]' : 'bg-[#c8a849]/10 text-[#c8a849]';
  
  return (
    <div className={`h-full bg-white p-8 rounded-3xl shadow-sm hover:shadow-lg border border-gray-100 hover:border-transparent transition-all duration-300 group`}>
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${iconBg} group-hover:scale-110 transition-transform`}>
        {icon}
      </div>
      <h4 className="font-bold text-xl mb-3 text-gray-900">{title}</h4>
      <p className="text-gray-600 font-light leading-relaxed">{description}</p>
    </div>
  );
}

const CourseCard: React.FC<{category: string; title: string; description: string; students: string; tag?: string; color: 'green' | 'yellow'; image: string}> = ({ category, title, description, students, tag, color, image}) => {
  const headerBg = color === 'green' ? 'bg-[#1a2e22]/80' : 'bg-[#c8a849]/80';
  
  return (
    <div className="bg-white rounded-[2rem] shadow-soft hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 overflow-hidden flex flex-col h-full group">
      <div className="relative h-56 overflow-hidden">
        <img src={image} alt={title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
        <div className={`absolute inset-0 ${headerBg} opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-6 text-center text-white`}>
          <p className="font-medium text-sm drop-shadow-md">{description}</p>
        </div>
        {tag && <span className={`absolute top-4 right-4 ${color === 'green' ? 'bg-[#2f6c44] text-white' : 'bg-white text-gray-900'} text-xs font-bold px-3 py-1.5 rounded-full shadow-lg z-10`}>{tag}</span>}
        <div className="absolute top-4 left-4">
          <span className="bg-white/20 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest border border-white/30">
            {category}
          </span>
        </div>
      </div>
      <div className="p-8 flex flex-col flex-grow">
        <h4 className="font-bold text-2xl mb-3 text-gray-900 leading-tight group-hover:text-[#2f6c44] transition-colors">{title}</h4>
        <div className="flex justify-between items-center mt-auto pt-6 border-t border-gray-100">
          <span className="font-bold text-sm text-gray-500 bg-gray-50 px-3 py-1 rounded-lg">{students}</span>
          <Link to="/formations" className={`font-bold text-sm flex items-center group/link ${color === 'green' ? 'text-[#2f6c44]' : 'text-[#c8a849]'}`}>
            Voir Détails <ChevronRight className="h-4 w-4 ml-1 transform transition-transform group-hover/link:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}

const BenefitItem: React.FC<{title: string; description: string}> = ({ title, description }) => (
  <li className="flex items-start bg-gray-50/50 p-4 rounded-2xl hover:bg-gray-50 transition-colors">
    <div className="bg-[#2f6c44]/10 p-2 rounded-xl mr-4 flex-shrink-0 mt-1">
      <CheckCircle className="h-6 w-6 text-[#2f6c44]" />
    </div>
    <div>
      <h5 className="font-bold text-gray-900 mb-1">{title}</h5>
      <p className="text-gray-600 font-light">{description}</p>
    </div>
  </li>
);

export default Formation;
