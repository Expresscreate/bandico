import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';

interface MembershipModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedRole: string;
}

const MembershipModal: React.FC<MembershipModalProps> = ({ isOpen, onClose, selectedRole }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 sm:p-6 lg:p-8">
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            onClick={onClose} 
            className="absolute inset-0 bg-gray-900/60 backdrop-blur-md" 
          />
          
          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 20 }} 
            animate={{ scale: 1, opacity: 1, y: 0 }} 
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="bg-white w-full max-w-xl rounded-[2.5rem] relative shadow-2xl z-10 flex flex-col overflow-hidden max-h-[90vh]"
          >
            {/* Header */}
            <div className="p-8 border-b border-gray-100 flex items-center justify-between bg-white sticky top-0 z-20">
              <div className="flex items-center gap-4">
                <div className="bg-[#2f6c44]/10 p-3 rounded-2xl">
                  <User className="w-6 h-6 text-[#2f6c44]" />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-gray-900">Demande d'Adhésion</h2>
                  <p className="text-sm text-gray-400 font-light">Rejoignez Bandico Group</p>
                </div>
              </div>
              <button onClick={onClose} className="bg-gray-100 hover:bg-gray-200 p-2.5 rounded-full transition-colors">
                <X className="w-6 h-6 text-gray-900" />
              </button>
            </div>

            {/* Form */}
            <div className="flex-grow overflow-y-auto p-8">
              <form 
                action="https://formsubmit.co/bandico.cmr@gmail.com" 
                method="POST" 
                className="space-y-5"
              >
                {/* Configuration FormSubmit */}
                <input type="hidden" name="_subject" value={`Nouvelle demande d'adhésion : ${selectedRole}`} />
                <input type="hidden" name="_template" value="table" />
                <input type="hidden" name="_next" value={window.location.href} />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Nom</label>
                    <div className="relative">
                      <input 
                        type="text" 
                        name="nom" 
                        required 
                        className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-3 px-11 text-gray-900 focus:ring-2 focus:ring-[#c8a849] focus:border-transparent transition-all outline-none" 
                        placeholder="Votre nom"
                      />
                      <User className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Prénom</label>
                    <div className="relative">
                      <input 
                        type="text" 
                        name="prenom" 
                        required 
                        className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-3 px-11 text-gray-900 focus:ring-2 focus:ring-[#c8a849] focus:border-transparent transition-all outline-none" 
                        placeholder="Votre prénom"
                      />
                      <User className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Email</label>
                  <div className="relative">
                    <input 
                      type="email" 
                      name="email" 
                      required 
                      className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-3 px-11 text-gray-900 focus:ring-2 focus:ring-[#c8a849] focus:border-transparent transition-all outline-none" 
                      placeholder="votre@email.com"
                    />
                    <Mail className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Téléphone</label>
                  <div className="relative">
                    <input 
                      type="tel" 
                      name="telephone" 
                      required 
                      className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-3 px-11 text-gray-900 focus:ring-2 focus:ring-[#c8a849] focus:border-transparent transition-all outline-none" 
                      placeholder="+237 ..."
                    />
                    <Phone className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Adresse</label>
                  <div className="relative">
                    <input 
                      type="text" 
                      name="adresse" 
                      required 
                      className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-3 px-11 text-gray-900 focus:ring-2 focus:ring-[#c8a849] focus:border-transparent transition-all outline-none" 
                      placeholder="Ville, Quartier"
                    />
                    <MapPin className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Rôle souhaité</label>
                  <select 
                    name="role" 
                    defaultValue={selectedRole}
                    className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-3 px-5 text-gray-900 focus:ring-2 focus:ring-[#c8a849] focus:border-transparent transition-all outline-none appearance-none"
                  >
                    <option value="Membre Actif">Membre Actif</option>
                    <option value="Membre Sympathisant">Membre Sympathisant</option>
                    <option value="Membre Honoraire">Membre Honoraire</option>
                  </select>
                </div>

                <div className="pt-4">
                  <button 
                    type="submit" 
                    className="w-full bg-[#1a2e22] hover:bg-gray-900 text-white font-bold py-4 rounded-2xl shadow-xl flex items-center justify-center gap-3 transition-all hover:-translate-y-1 active:scale-[0.98]"
                  >
                    Envoyer ma demande <Send className="w-5 h-5" />
                  </button>
                </div>
                
                <p className="text-[10px] text-gray-400 text-center font-light">
                  En envoyant ce formulaire, vous acceptez d'être contacté par l'équipe de Bandico Group pour finaliser votre adhésion.
                </p>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default MembershipModal;
