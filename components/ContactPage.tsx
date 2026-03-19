import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, Send, Globe, MessageSquare } from 'lucide-react';
import PageHeader from './PageHeader';

const ContactPage: React.FC = () => {
  const contactInfo = [
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Téléphone / WhatsApp",
      details: ["+237 691 72 82 82"],
      color: "bg-blue-50 text-blue-600"
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email",
      details: ["contact@bandicogroup.org", "info@bandicogroup.org"],
      color: "bg-emerald-50 text-emerald-600"
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Localisation",
      details: ["Maroua, Cameroun", "Quartier Administratif"],
      color: "bg-amber-50 text-amber-600"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Heures d'ouverture",
      details: ["Lun - Ven: 8h00 - 18h00", "Sam: 9h00 - 13h00"],
      color: "bg-purple-50 text-purple-600"
    }
  ];

  return (
    <div className="bg-white">
      <PageHeader 
        title="Contactez-Nous" 
        subtitle="Nous sommes à votre écoute pour toute question concernant nos programmes humanitaires, nos formations ou nos services commerciaux."
        image="https://images.unsplash.com/photo-1534536281715-e28d76689b4d?q=80&w=2070&auto=format&fit=crop"
        breadcrumb={[{ label: 'Contact' }]}
      />

      <section className="py-24 relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-[#2f6c44]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-[#c8a849]/5 rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            
            {/* Contact Details side */}
            <div className="lg:col-span-1 space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Restons en Contact</h2>
                <p className="text-gray-600 font-light leading-relaxed mb-8">
                  Que vous soyez un futur partenaire, un étudiant ou un client, notre équipe s'engage à vous répondre dans les plus brefs délais.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-6">
                {contactInfo.map((info, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start p-6 bg-gray-50 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow"
                  >
                    <div className={`${info.color} p-3 rounded-xl mr-5`}>
                      {info.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-1">{info.title}</h4>
                      {info.details.map((detail, dIndex) => (
                        <p key={dIndex} className="text-gray-500 font-light text-sm">{detail}</p>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>


            </div>

            {/* Contact Form side */}
            <div className="lg:col-span-2">
              <motion.div 
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="bg-white p-8 md:p-12 rounded-[3rem] shadow-soft border border-gray-100"
              >
                <div className="mb-10 text-center lg:text-left">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Envoyez-nous un Message</h3>
                  <p className="text-gray-500 font-light">Remplissez le formulaire ci-dessous et nous vous contacterons sous 24h.</p>
                </div>

                <form action="https://formsubmit.co/bandico.cmr@gmail.com" method="POST" className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-700 ml-1">Nom Complet</label>
                      <input 
                        type="text" 
                        name="name"
                        required
                        placeholder="Jean Dupont" 
                        className="w-full px-6 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-[#2f6c44] focus:border-transparent outline-none transition-all placeholder:text-gray-400 font-light"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-700 ml-1">Adresse Email</label>
                      <input 
                        type="email" 
                        name="email"
                        required
                        placeholder="jean@exemple.com" 
                        className="w-full px-6 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-[#2f6c44] focus:border-transparent outline-none transition-all placeholder:text-gray-400 font-light"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-700 ml-1">Sujet</label>
                      <select name="subject" required className="w-full px-6 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-[#2f6c44] focus:border-transparent outline-none transition-all font-light appearance-none">
                        <option value="Information Générale">Information Générale</option>
                        <option value="Bandico Association">Bandico Association</option>
                        <option value="Bandico Formation">Bandico Formation</option>
                        <option value="Bandico Shop">Bandico Shop</option>
                        <option value="Autre">Autre</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-700 ml-1">Téléphone / WhatsApp</label>
                      <input 
                        type="tel" 
                        name="phone"
                        required
                        placeholder="+237 ..." 
                        className="w-full px-6 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-[#2f6c44] focus:border-transparent outline-none transition-all placeholder:text-gray-400 font-light"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 ml-1">Votre Message</label>
                    <textarea 
                      name="message"
                      required
                      rows={6} 
                      placeholder="Comment pouvons-nous vous aider ?" 
                      className="w-full px-6 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-[#2f6c44] focus:border-transparent outline-none transition-all placeholder:text-gray-400 font-light resize-none"
                    ></textarea>
                  </div>

                  {/* Anti-spam formsubmit config */}
                  <input type="hidden" name="_captcha" value="false" />
                  <input type="hidden" name="_template" value="table" />

                  <div className="pt-4">
                    <button type="submit" className="w-full bg-[#2f6c44] hover:bg-[#1a4a2b] text-white font-bold py-5 px-10 rounded-2xl shadow-xl shadow-emerald-900/10 transition-all duration-300 flex items-center justify-center gap-3 transform hover:-translate-y-1 active:scale-95">
                      Envoyer le Message <Send className="w-5 h-5" />
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
};

export default ContactPage;
