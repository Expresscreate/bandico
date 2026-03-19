import { Send, Facebook, Twitter, Linkedin, Instagram, Youtube } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0b0f19] text-gray-400 relative overflow-hidden border-t border-gray-800">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-1/4 w-[50%] h-px bg-gradient-to-r from-transparent via-[#2f6c44]/50 to-transparent"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">

          <div className="lg:col-span-4">
            <div className="flex items-center space-x-2 mb-6">
              <img src="/logo-bandecolong.png" alt="Bandico Group" className="h-[45px] w-auto brightness-0 invert opacity-90" />
            </div>
            <p className="text-sm text-gray-400 mb-8 leading-relaxed font-light pr-8">
              Bandico Group unit l'action humanitaire, la formation professionnelle et le commerce éthique pour promouvoir la dignité humaine et le développement durable.
            </p>
            <div className="flex space-x-4">
              {[
                { icon: <Facebook className="h-5 w-5" />, href: "#" },
                { icon: <Twitter className="h-5 w-5" />, href: "#" },
                { icon: <Linkedin className="h-5 w-5" />, href: "#" },
                { icon: <Instagram className="h-5 w-5" />, href: "#" },
                { icon: <Youtube className="h-5 w-5" />, href: "#" }
              ].map((social, i) => (
                <a key={i} href={social.href} className="bg-gray-800/50 text-gray-400 p-3 rounded-xl hover:bg-[#c8a849] hover:text-gray-900 transition-all duration-300 border border-gray-800 hover:border-transparent hover:-translate-y-1">
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2 lg:col-start-6">
            <h4 className="font-bold text-white mb-6 text-lg tracking-wide">Liens Rapides</h4>
            <ul className="space-y-3 text-sm font-light">
              {[
                { name: 'Accueil', href: '/' },
                { name: 'Bandico Association', href: '/contact' },
                { name: 'Bandico Formation', href: '/formations' },
                { name: 'Bandico Shop', href: '/boutique' },
                { name: 'Contact', href: '/contact' }
              ].map((item, i) => (
                <li key={i}>
                  <Link to={item.href} className="hover:text-[#c8a849] transition-colors flex items-center group">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#c8a849] mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="font-bold text-white mb-6 text-lg tracking-wide">Ressources</h4>
            <ul className="space-y-3 text-sm font-light">
              {['Devenir Membre', 'Statuts & Règlement', "Rapports d'Activités", 'Documentation', 'Partenariats', 'Mentions Légales'].map((item, i) => (
                <li key={i}>
                  <a href="#" className="hover:text-[#c8a849] transition-colors flex items-center group">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#c8a849] mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="font-bold text-white mb-6 text-lg tracking-wide">Newsletter</h4>
            <p className="text-sm text-gray-400 mb-6 font-light">Restez informé de nos actions et de notre impact.</p>
            <form className="flex mb-8 drop-shadow-sm">
              <input type="email" placeholder="Votre adresse email" className="bg-gray-900 border border-gray-700 text-white w-full py-3 px-4 rounded-l-xl focus:outline-none focus:ring-1 focus:ring-[#c8a849] focus:border-transparent transition-all placeholder-gray-600 font-light text-sm" />
              <button type="submit" className="bg-[#2f6c44] hover:bg-[#1a4a2b] text-white p-3 rounded-r-xl transition-colors border border-[#2f6c44] hover:border-[#1a4a2b]">
                <Send className="h-5 w-5" />
              </button>
            </form>
            <div>
              <ul className="text-sm space-y-2 text-gray-400 font-light">
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#2f6c44]"></span> Maroua, Cameroun</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#2f6c44]"></span> <a href="mailto:contact@bandicogroup.org" className="hover:text-white transition-colors">contact@bandicogroup.org</a></li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#2f6c44]"></span> <a href="tel:+237691728282" className="hover:text-white transition-colors">+237 691 72 82 82</a></li>
              </ul>
            </div>
          </div>

        </div>
        
        <div className="pt-8 border-t border-gray-800 text-sm text-gray-500 flex flex-col md:flex-row justify-between items-center font-light">
          <p>&copy; {new Date().getFullYear()} Bandico Group. Tous droits réservés.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Politique de Confidentialité</a>
            <a href="#" className="hover:text-white transition-colors">Conditions d'Utilisation</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
