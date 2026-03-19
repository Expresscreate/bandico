import React, { useState } from 'react';
import { Star, Heart, Users, Check, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import MembershipModal from './MembershipModal';

const Membership: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState('Membre Actif');

  const openModal = (role: string) => {
    setSelectedRole(role);
    setIsModalOpen(true);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <section id="membership" className="py-24 bg-gray-50 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={itemVariants}
          className="text-center mb-16"
        >
          <span className="inline-block bg-[#c8a849]/10 text-[#c8a849] border border-[#c8a849]/30 rounded-full px-5 py-1.5 text-sm font-semibold mb-4 shadow-sm">Rejoignez la Communauté</span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">Devenez Membre de Bandico Group</h2>
          <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto font-light leading-relaxed">
            Ensemble, nous sommes plus forts. Rejoignez une communauté engagée pour la dignité humaine et le développement durable.
          </p>
        </motion.div>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch mb-20"
        >
          <motion.div variants={itemVariants}>
            <MembershipCard
              icon={<Star className="h-8 w-8 text-[#c8a849]" />}
              title="Membre Actif"
              description="Participez activement aux projets, votez aux assemblées générales et contribuez directement à nos missions."
              features={["Droit de vote aux AG", "Participation aux projets", "Formations exclusives", "Réseautage privilégié"]}
              buttonText="Devenir Membre Actif"
              onButtonClick={() => openModal('Membre Actif')}
              popular
            />
          </motion.div>
          <motion.div variants={itemVariants}>
            <MembershipCard
              icon={<Heart className="h-8 w-8 text-[#2f6c44]" />}
              title="Membre Sympathisant"
              description="Soutenez nos actions à travers des contributions ponctuelles et restez informé de nos activités."
              features={["Newsletter régulière", "Invitations aux événements", "Dons ponctuels", "Badge communautaire"]}
              buttonText="Devenir Sympathisant"
              onButtonClick={() => openModal('Membre Sympathisant')}
            />
          </motion.div>
          <motion.div variants={itemVariants}>
            <MembershipCard
              icon={<Users className="h-8 w-8 text-[#1a2e22]" />}
              title="Membre Honoraire"
              description="Reconnaissance spéciale pour contribution exceptionnelle au développement de nos missions."
              features={["Statut honorifique", "Nomination officielle", "Rôle consultatif", "Reconnaissance publique"]}
              buttonText="Devenir Membre Honoraire"
              onButtonClick={() => openModal('Membre Honoraire')}
            />
          </motion.div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="bg-gradient-to-r from-[#1a2e22] via-[#2f6c44] to-[#1a2e22] p-10 sm:p-14 rounded-[2.5rem] shadow-2xl flex flex-col md:flex-row justify-between items-center text-white relative overflow-hidden"
        >
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent pointer-events-none"></div>

          <div className="relative z-10 md:mr-10">
            <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">Prêt à Faire la <span className="text-[#c8a849]">Différence</span> ?</h3>
            <p className="text-green-100/90 text-lg max-w-2xl font-light leading-relaxed">Rejoignez des centaines de membres engagés pour créer un impact positif dans nos communautés. Ensemble, nous pouvons transformer des vies.</p>
          </div>
          <div className="relative z-10 flex-shrink-0 mt-8 md:mt-0 flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <button 
              onClick={() => openModal('Membre Actif')}
              className="bg-[#c8a849] text-gray-900 hover:bg-[#b0933c] font-bold py-4 px-8 rounded-full transition-all duration-300 text-center hover:shadow-glow hover:-translate-y-1"
            >
              Devenir Membre
            </button>
            <a href="#contact" className="group bg-transparent border-2 border-white/30 hover:bg-white hover:border-white hover:text-[#1a2e22] text-white font-bold py-4 px-8 rounded-full transition-all duration-300 text-center inline-flex justify-center items-center gap-2 hover:-translate-y-1 backdrop-blur-sm">En Savoir Plus <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" /></a>
          </div>
        </motion.div>
      </div>

      <MembershipModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        selectedRole={selectedRole} 
      />
    </section>
  );
};

interface MembershipCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
  buttonText: string;
  onButtonClick: () => void;
  popular?: boolean;
}

const MembershipCard: React.FC<MembershipCardProps> = ({ icon, title, description, features, buttonText, onButtonClick, popular }) => {
  const cardClasses = `h-full bg-white p-10 rounded-[2.5rem] shadow-soft hover:shadow-xl transition-all duration-300 flex flex-col group hover:-translate-y-2 border ${popular ? 'border-[#c8a849] ring-4 ring-[#c8a849]/10 relative' : 'border-gray-100'}`;
  
  const buttonClasses = popular 
    ? 'bg-[#1a2e22] text-white hover:bg-gray-800 hover:shadow-lg' 
    : (title === 'Membre Sympathisant' 
        ? 'bg-[#c8a849] text-gray-900 hover:bg-[#b0933c] hover:shadow-glow' 
        : 'bg-gray-100 text-gray-800 hover:bg-gray-200');
        
  const iconBg = popular 
    ? 'bg-[#c8a849]/10' 
    : (title === 'Membre Sympathisant' ? 'bg-[#2f6c44]/10' : 'bg-gray-100');

  return (
    <div className={cardClasses}>
      {popular && (
        <div className="absolute top-0 inset-x-0 flex justify-center">
          <div className="bg-[#c8a849] text-gray-900 text-xs font-bold px-4 py-1.5 rounded-b-xl shadow-md uppercase tracking-wide">
            Le plus populaire
          </div>
        </div>
      )}
      
      <div className={`w-20 h-20 rounded-2xl flex items-center justify-center mb-8 ${iconBg} group-hover:scale-110 transition-transform duration-500`}>
        {icon}
      </div>
      
      <h3 className="text-2xl font-bold mb-4 text-gray-900">{title}</h3>
      <p className="text-gray-600 mb-8 flex-grow font-light leading-relaxed">{description}</p>
      
      <div className="w-full h-px bg-gray-100 mb-8"></div>
      
      <ul className="space-y-4 mb-10">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <div className={`mt-1 mr-3 rounded-full p-1 bg-green-50`}>
              <Check className={`h-4 w-4 ${popular ? 'text-[#c8a849]' : 'text-[#2f6c44]'}`} />
            </div>
            <span className="text-gray-700 font-medium">{feature}</span>
          </li>
        ))}
      </ul>
      
      <button 
        onClick={onButtonClick}
        className={`font-bold py-4 px-6 rounded-full transition-all duration-300 text-center mt-auto ${buttonClasses}`}
      >
        {buttonText}
      </button>
    </div>
  );
};

export default Membership;
