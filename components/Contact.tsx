import React from 'react';
import { MapPin, Mail, Phone, Clock, Send, Facebook, Twitter, Linkedin, Instagram, Youtube } from 'lucide-react';
import { motion } from 'framer-motion';

const Contact: React.FC = () => {
  const fadeUpVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  return (
    <section id="contact" className="py-24 bg-[#111827] text-white relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#2f6c44]/20 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-[#c8a849]/10 blur-[100px] rounded-full"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUpVariant}
          className="text-center mb-16"
        >
          <span className="inline-block bg-[#2f6c44]/20 border border-[#2f6c44]/30 text-[#4ade80] rounded-full px-5 py-1.5 text-sm font-semibold mb-4 shadow-sm">Contactez-Nous</span>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">Prenons <span className="text-[#c8a849]">Contact</span></h2>
          <p className="mt-6 text-xl text-gray-400 max-w-3xl mx-auto font-light leading-relaxed">
            Nous sommes là pour répondre à vos questions, discuter de partenariats ou vous accompagner dans votre engagement avec Bandico Group.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-3 bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 p-10 rounded-[2.5rem] shadow-2xl relative"
          >
            <h3 className="text-3xl font-bold mb-8 text-white tracking-tight">Envoyez-nous un Message</h3>
            <form action="https://formsubmit.co/bandico.cmr@gmail.com" method="POST" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">Nom Complet *</label>
                  <input type="text" id="name" name="name" required className="w-full bg-gray-900/50 border border-gray-700 rounded-2xl shadow-inner py-4 px-5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#c8a849] focus:border-transparent transition-all" placeholder="Votre nom" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">Email *</label>
                  <input type="email" id="email" name="email" required className="w-full bg-gray-900/50 border border-gray-700 rounded-2xl shadow-inner py-4 px-5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#c8a849] focus:border-transparent transition-all" placeholder="votre.email@ex.com" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-400 mb-2">Téléphone</label>
                  <input type="tel" id="phone" name="phone" className="w-full bg-gray-900/50 border border-gray-700 rounded-2xl shadow-inner py-4 px-5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#c8a849] focus:border-transparent transition-all" placeholder="+237 ..." />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-400 mb-2">Sujet *</label>
                  <select id="subject" name="subject" required className="w-full bg-gray-900/50 border border-gray-700 rounded-2xl shadow-inner py-4 px-5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#c8a849] focus:border-transparent transition-all appearance-none cursor-pointer">
                      <option className="bg-gray-800 text-gray-400" value="Sélectionnez un sujet">Sélectionnez un sujet</option>
                      <option className="bg-gray-800 text-white" value="Partenariat">Partenariat</option>
                      <option className="bg-gray-800 text-white" value="Adhésion">Adhésion</option>
                      <option className="bg-gray-800 text-white" value="Question générale">Question générale</option>
                  </select>
                </div>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-2">Message *</label>
                <textarea id="message" name="message" required rows={5} className="w-full bg-gray-900/50 border border-gray-700 rounded-2xl shadow-inner py-4 px-5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#c8a849] focus:border-transparent transition-all resize-none" placeholder="Décrivez votre demande ou question..."></textarea>
              </div>

              {/* Anti-spam formsubmit config */}
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_template" value="table" />

              <div className="pt-2">
                <button type="submit" className="w-full flex justify-center items-center gap-3 py-4 px-6 border border-transparent rounded-2xl shadow-lg text-lg font-bold text-gray-900 bg-[#c8a849] hover:bg-[#b0933c] focus:outline-none focus:ring-4 focus:ring-[#c8a849]/30 transition-all duration-300 hover:-translate-y-1 active:scale-95">
                  <Send className="h-5 w-5"/> Envoyer le Message
                </button>
              </div>
              <p className="text-sm text-gray-500 text-center font-light pt-4">Vos informations sont protégées et resteront confidentielles.</p>
            </form>
          </motion.div>
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="lg:col-span-2 space-y-6"
          >
            <motion.div variants={fadeUpVariant} className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 p-10 rounded-[2.5rem] shadow-2xl h-full flex flex-col">
              <h3 className="text-2xl font-bold mb-8 tracking-tight">Informations de Contact</h3>
              <ul className="space-y-8 flex-grow">
                <li className="flex items-start group">
                  <div className="bg-gray-900 p-4 rounded-2xl mr-5 group-hover:bg-[#c8a849]/10 transition-colors border border-gray-800 group-hover:border-[#c8a849]/30"><MapPin className="h-6 w-6 text-[#c8a849] flex-shrink-0" /></div>
                  <div>
                    <strong className="block text-white mb-1">Adresse</strong>
                    <span className="text-gray-400 font-light leading-relaxed">Maroua, Région de l'Extrême-Nord, Cameroun</span>
                  </div>
                </li>
                <li className="flex items-start group">
                  <div className="bg-gray-900 p-4 rounded-2xl mr-5 group-hover:bg-[#c8a849]/10 transition-colors border border-gray-800 group-hover:border-[#c8a849]/30"><Mail className="h-6 w-6 text-[#c8a849] flex-shrink-0" /></div>
                  <div>
                    <strong className="block text-white mb-1">Email</strong>
                    <a href="mailto:contact@bandicogroup.org" className="text-gray-400 font-light hover:text-[#c8a849] transition-colors">contact@bandicogroup.org</a>
                  </div>
                </li>
                <li className="flex items-start group">
                  <div className="bg-gray-900 p-4 rounded-2xl mr-5 group-hover:bg-[#c8a849]/10 transition-colors border border-gray-800 group-hover:border-[#c8a849]/30"><Phone className="h-6 w-6 text-[#c8a849] flex-shrink-0" /></div>
                  <div>
                    <strong className="block text-white mb-1">Téléphone</strong>
                    <a href="tel:+237691728282" className="text-gray-400 font-light hover:text-[#c8a849] transition-colors">+237 691 72 82 82</a>
                  </div>
                </li>
              </ul>
              
              <div className="mt-12 pt-8 border-t border-gray-700/50">
                <h3 className="text-xl font-bold mb-6 tracking-tight">Réseaux Sociaux</h3>
                <div className="flex gap-4">
                  {[
                    { icon: <Facebook className="h-5 w-5" />, href: "#" },
                    { icon: <Twitter className="h-5 w-5" />, href: "#" },
                    { icon: <Linkedin className="h-5 w-5" />, href: "#" },
                    { icon: <Instagram className="h-5 w-5" />, href: "#" },
                    { icon: <Youtube className="h-5 w-5" />, href: "#" }
                  ].map((social, i) => (
                    <a key={i} href={social.href} className="bg-gray-900 text-gray-400 p-3.5 rounded-2xl hover:bg-[#c8a849] hover:text-gray-900 transition-all duration-300 border border-gray-800 hover:border-transparent hover:-translate-y-1 hover:shadow-glow">
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
             <motion.div variants={fadeUpVariant} className="bg-gradient-to-br from-[#1a4a2b] to-[#11311b] border border-[#2f6c44]/30 p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
              <div className="absolute -right-6 -top-6 text-white/5 rotate-12 pointer-events-none">
                <Clock className="w-48 h-48" />
              </div>
              <h3 className="text-2xl font-bold mb-8 flex items-center gap-4 text-white tracking-tight relative z-10">
                <div className="bg-white/10 p-3 rounded-2xl backdrop-blur-sm"><Clock className="h-6 w-6"/></div> 
                Heures d'Ouverture
              </h3>
              <div className="space-y-4 relative z-10 font-light">
                <div className="flex justify-between items-center py-3 border-b border-white/10">
                  <span className="text-gray-300">Lundi - Vendredi</span>
                  <span className="font-bold text-white bg-white/10 px-3 py-1 rounded-lg">8h00 - 17h00</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-white/10">
                  <span className="text-gray-300">Samedi</span>
                  <span className="font-bold text-white bg-white/10 px-3 py-1 rounded-lg">9h00 - 14h00</span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-gray-300">Dimanche</span>
                  <span className="font-bold text-red-300 bg-red-500/10 px-3 py-1 rounded-lg border border-red-500/20">Fermé</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
