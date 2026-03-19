import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Clock, BadgeCheck, MessageCircle, Search, Filter, ShoppingCart, Star, X, LayoutGrid, Layers, ArrowRight, Target, ClipboardList, BarChart3, Users, Briefcase } from 'lucide-react';
import PageHeader from './PageHeader';

const axesInfo: Record<string, { title: string; mission: string; icon: React.ReactNode; image: string }> = {
  "Axe 0": { 
    title: "Orientation & Diagnostic", 
    mission: "Clarifier votre positionnement et construire un plan de développement sur mesure pour votre carrière MEAL.",
    icon: <Users className="w-8 h-8" />,
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=2070&auto=format&fit=crop"
  },
  "Axe 1": { 
    title: "Fondamentaux du Secteur & Gestion de Projet", 
    mission: "Acquérir la culture humanitaire et maîtriser les outils de pilotage indispensables (Cadre Logique, Cycle de Projet).",
    icon: <Layers className="w-8 h-8" />,
    image: "/bandico-formation-ico.jpg"
  },
  "Axe 2": { 
    title: "Compétences Techniques MEAL (Cœur de Métier)", 
    mission: "De la collecte mobile à l'analyse avancée, maîtrisez l'ensemble de la chaîne de valeur de la donnée.",
    icon: <BarChart3 className="w-8 h-8" />,
    image: "/meal_data.png"
  },
  "Axe 3": { 
    title: "Aptitudes Transversales & Soft Skills", 
    mission: "Transformer l'expertise technique en impact réel par une communication professionnelle d'excellence.",
    icon: <MessageCircle className="w-8 h-8" />,
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=2070&auto=format&fit=crop"
  },
  "Axe 4": { 
    title: "Accompagnement Carrière & Employabilité", 
    mission: "Faire la différence sur le marché du travail grâce à un portfolio solide et une préparation intensive aux recrutements.",
    icon: <Briefcase className="w-8 h-8" />,
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=2071&auto=format&fit=crop"
  }
};

interface Module {
  id: string;
  title: string;
  axe: number;
  level?: 'Débutant' | 'Intermédiaire' | 'Expert' | 'Transversal' | 'Carrière';
  price: string;
  duration: string;
  description: string;
  details: string[];
  image: string;
}

interface Programme {
  id: string;
  axe: number;
  title: string;
  subtitle: string;
  price: string;
  modules: string[]; // IDs of modules
  image: string;
  description: string;
}

const modules: Module[] = [
  // AXE 0
  { id: "m0.1", axe: 0, title: "Diagnostic initial & positionnement", price: "15,000 FCFA", duration: "1 semaine", image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2026&auto=format&fit=crop", description: "Clarifier votre profil et vos objectifs pour personnaliser votre parcours.", details: ["Auto-évaluation compétences", "Identification du profil", "Entretien individuel"] },
  { id: "m0.2", axe: 0, title: "Projet professionnel & plan de développement", price: "15,000 FCFA", duration: "1 semaine", image: "/african_students_laptop.png", description: "Élaboration d'un plan de carrière réaliste et ambitieux.", details: ["Cartographie des métiers", "Objectifs d'apprentissage SMART"] },
  
  // AXE 1
  { id: "m1.1", axe: 1, title: "Secteur Humanitaire, Développement & Nexus", price: "30,000 FCFA", duration: "2 semaines", image: "https://images.unsplash.com/photo-1509099836639-18ba1795216d?q=80&w=2070&auto=format&fit=crop", description: "Comprendre les acteurs et les enjeux du secteur HDPN.", details: ["Principes humanitaires", "Nexus HDPN", "Acteurs clés (ONU, ONG)"] },
  { id: "m1.2", axe: 1, title: "Logframe & Indicateurs (Fondamentaux)", price: "35,000 FCFA", duration: "2 semaines", image: "/meal_beginner.png", description: "Maîtrisez la chaîne de résultats et la structure du cadre logique.", details: ["Chaîne de résultats", "Structure logframe", "Indicateurs SMART"] },
  { id: "m1.3", axe: 1, title: "Cycle de projet & place du MEAL", price: "30,000 FCFA", duration: "2 semaines", image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=2070&auto=format&fit=crop", description: "Le rôle crucial des données MEAL à chaque étape du projet.", details: ["Identification & Conception", "Suivi & Évaluation finale", "Prise de décision"] },

  // AXE 2 - NIVEAU 1
  { id: "m2.1", axe: 2, level: "Débutant", title: "Introduction au MEAL", price: "25,000 FCFA", duration: "2 semaines", image: "/meal_beginner.png", description: "Les concepts de base : Monitoring, Evaluation, Accountability & Learning.", details: ["Concepts Monitoring & Evaluation", "Terminologie (KPI, Impact)", "Rôle du MEAL"] },
  { id: "m2.3", axe: 2, level: "Débutant", title: "Collecte de données – Bases", price: "35,000 FCFA", duration: "2 semaines", image: "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?q=80&w=2006&auto=format&fit=crop", description: "Fondamentaux de la collecte quantitative et qualitative.", details: ["Types de données", "Outils de base", "Introduction Kobo/ODK"] },
  { id: "m2.4", axe: 2, level: "Débutant", title: "Introduction au Reporting MEAL", price: "30,000 FCFA", duration: "2 semaines", image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=2070&auto=format&fit=crop", description: "Structure d'un bon rapport orienté résultats.", details: ["Rapports mensuels/trimestriels", "Transformation de données en messages"] },

  // AXE 2 - NIVEAU 2
  { id: "m2.7", axe: 2, level: "Intermédiaire", title: "Conception d'un Plan MEAL (PMEL)", price: "50,000 FCFA", duration: "3 semaines", image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop", description: "Développement d'une matrice MEAL complète.", details: ["Matrice MEAL", "Fréquences & Responsabilités"] },
  { id: "m2.10", axe: 2, level: "Intermédiaire", title: "Analyse des données & visualisation", price: "60,000 FCFA", duration: "4 semaines", image: "/meal_data.png", description: "Tableaux croisés et mini-dashboards (Excel/Power BI).", details: ["Analyse descriptive", "Tableaux croisés dynamiques", "Graphiques impactants"] },

  // AXE 2 - NIVEAU 3
  { id: "m2.13", axe: 2, level: "Expert", title: "Architecture stratégique MEAL", price: "90,000 FCFA", duration: "4 semaines", image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop", description: "Harmonisation multi-projets et direction stratégique.", details: ["MEAL SOP", "Dashboards stratégiques", "Multi-bailleurs"] },

  // AXE 3
  { id: "m3.1", axe: 3, level: "Transversal", title: "Communication professionnelle", price: "25,000 FCFA", duration: "2 semaines", image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=2070&auto=format&fit=crop", description: "Emails, comptes-rendus et présentations orales.", details: ["Rédaction de notes", "Pitch de résultats", "Logiciels collaboration"] },

  // AXE 4
  { id: "m4.1", axe: 4, level: "Carrière", title: "Portfolio & Employabilité", price: "40,000 FCFA", duration: "3 semaines", image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=2071&auto=format&fit=crop", description: "Simulation d'entretiens et construction de portfolio.", details: ["CV & Lettre orientés résultats", "Simulation entretiens", "Portfolio LinkedIn"] },
];

const programmes: Programme[] = [
  { id: "p0", axe: 0, title: "Orientation & Diagnostic", subtitle: "Pack Complet Axe 0", price: "25,000 FCFA", modules: ["m0.1", "m0.2"], image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=2071&auto=format&fit=crop", description: "Le parcours indispensable pour définir son identité de professionnel MEAL." },
  { id: "p1", axe: 1, title: "Secteur & Gestion de Projet", subtitle: "Pack Complet Axe 1", price: "80,000 FCFA", modules: ["m1.1", "m1.2", "m1.3"], image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop", description: "Maîtrisez les fondamentaux du secteur et les outils de pilotage de projet." },
  { id: "p2.1", axe: 2, title: "Fondamentaux MEAL", subtitle: "Niveau 1 Débutant", price: "80,000 FCFA", modules: ["m2.1", "m2.3", "m2.4"], image: "/meal_beginner.png", description: "Devenez opérationnel sur les bases du suivi, de la collecte et du reporting." },
  { id: "p2.2", axe: 2, title: "Systèmes MEAL & Analyse", subtitle: "Niveau 2 Intermédiaire", price: "100,000 FCFA", modules: ["m2.7", "m2.10"], image: "/meal_data.png", description: "Concevez et gérez des systèmes de données avancés pour vos interventions." },
  { id: "p2.3", axe: 2, title: "Leadership MEAL Expert", subtitle: "Niveau 3 Stratégique", price: "150,000 FCFA", modules: ["m2.13"], image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop", description: "Prenez la direction technique MEAL à l'échelle d'une organisation." },
];

const CoursesPage: React.FC = () => {
  const [viewMode, setViewMode] = useState<'modules' | 'programmes'>('programmes');
  const [filter, setFilter] = useState('Tous');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState<Module | Programme | null>(null);

  const levels = ['Tous', 'Débutant', 'Intermédiaire', 'Expert', 'Transversal', 'Carrière'];
  const axes = ['Tous', 'Axe 0', 'Axe 1', 'Axe 2', 'Axe 3', 'Axe 4'];

  const filteredItems = (viewMode === 'modules' ? modules : programmes).filter(item => {
    const axeName = `Axe ${item.axe}`;
    const matchesFilter = filter === 'Tous' || (viewMode === 'modules' ? (item as Module).level === filter : axeName === filter);
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleWhatsApp = (title: string, type: string) => {
    const number = "+237691728282";
    const message = `Bonjour MEAL ACADEMY, j'aimerais m'inscrire au ${type === 'modules' ? 'module' : 'programme'} : ${title}`;
    window.open(`https://wa.me/${number}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="bg-white min-h-screen">
      <PageHeader 
        title="MEAL ACADEMY" 
        subtitle="Devenez un expert du Suivi, de l'Évaluation, de la Redevabilité et de l'Apprentissage."
        image="/geralt-students-3982520_1280.jpg"
        imagePosition="object-[center_30%]"
        breadcrumb={[{ label: 'Formations' }]}
      />

      {/* Presentation & Mission Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <span className="text-[#c8a849] font-bold tracking-widest uppercase text-sm mb-4 block">À Propos de MEAL Academy</span>
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-8 leading-tight">Notre Mission : <span className="text-[#2f6c44]">Professionnaliser</span> l'humanitaire.</h2>
              <p className="text-lg text-gray-600 font-light leading-relaxed mb-8">
                MEAL Academy est une initiative de Bandico Group dédiée à la formation d'excellence pour les acteurs du développement. Nous comblons le fossé entre la théorie académique et les exigences du terrain humanitaire.
              </p>
              <div className="space-y-6">
                <div className="flex gap-5">
                  <div className="mt-1 bg-[#2f6c44]/10 p-3 rounded-2xl flex-shrink-0"><Target className="w-6 h-6 text-[#2f6c44]" /></div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Notre Objectif</h4>
                    <p className="text-gray-600 text-sm font-light">Former 1000 experts certifiés d'ici 2027 capables de piloter des interventions à fort impact social.</p>
                  </div>
                </div>
                <div className="flex gap-5">
                  <div className="mt-1 bg-[#c8a849]/10 p-3 rounded-2xl flex-shrink-0"><Users className="w-6 h-6 text-[#c8a849]" /></div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Public Cible</h4>
                    <p className="text-gray-600 text-sm font-light">Étudiants en fin de cycle, professionnels en reconversion, staffs d'ONG et acteurs du terrain humanitaire.</p>
                  </div>
                </div>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="relative">
              <div className="aspect-square rounded-[3rem] overflow-hidden shadow-2xl relative z-10">
                <img src="/bandico-formation-ico.jpg" className="w-full h-full object-cover" alt="Collaborative learning" />
              </div>
              <div className="absolute -bottom-10 -left-10 bg-[#2f6c44] p-10 rounded-[2.5rem] shadow-xl text-white z-20 hidden md:block max-w-xs">
                <p className="text-3xl font-black mb-2">95%</p>
                <p className="text-sm font-light text-white/80">De taux de satisfaction et d'amélioration immédiate des compétences techniques.</p>
              </div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[#c8a849]/10 rounded-full blur-[100px] -z-10"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Architecture Explanation Section */}
      <section className="py-24 bg-gray-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-6">Une Architecture en <span className="text-[#c8a849]">5 Axes Stratégiques</span></h2>
            <p className="text-gray-600 max-w-2xl mx-auto font-light">
              Notre parcours est structuré pour vous accompagner du diagnostic initial jusqu'à votre épanouissement professionnel.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-6 pb-8 pt-4">
            {Object.entries(axesInfo).map(([key, info], idx) => (
              <motion.div 
                key={key}
                initial={{ opacity: 0, scale: 0.95, y: 30 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="bg-white p-6 md:p-8 rounded-[2.5rem] shadow-md border-2 border-gray-200/60 hover:shadow-xl hover:border-[#c8a849]/40 transition-all group w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] flex-shrink-0"
              >
                <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#c8a849]/10 group-hover:scale-110 transition-all text-[#2f6c44]">
                  {info.icon}
                </div>
                <h4 className="font-bold text-gray-900 mb-3 text-lg">{key} : {info.title}</h4>
                <p className="text-sm text-gray-500 font-light leading-relaxed">{info.mission}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 relative overflow-hidden" id="courses-grid">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-gray-900 mb-4">Parcourez Nos Formations</h2>
            <p className="text-gray-500 font-light">Choisissez la modalité qui convient à votre rythme d'apprentissage.</p>
          </div>
          
          {/* View Toggle */}
          <div className="flex justify-center mb-16">
            <div className="bg-gray-100 p-1.5 rounded-[1.5rem] flex items-center shadow-inner">
              <button 
                onClick={() => {setViewMode('programmes'); setFilter('Tous');}}
                className={`flex items-center gap-2 px-8 py-3 rounded-xl font-bold transition-all ${viewMode === 'programmes' ? 'bg-[#2f6c44] text-white shadow-xl' : 'text-gray-500 hover:text-gray-700'}`}
              >
                <Layers className="w-5 h-5" /> Programmes (Axes)
              </button>
              <button 
                onClick={() => {setViewMode('modules'); setFilter('Tous');}}
                className={`flex items-center gap-2 px-8 py-3 rounded-xl font-bold transition-all ${viewMode === 'modules' ? 'bg-[#2f6c44] text-white shadow-xl' : 'text-gray-500 hover:text-gray-700'}`}
              >
                <LayoutGrid className="w-5 h-5" /> Modules Individuels
              </button>
            </div>
          </div>

          {/* Controls */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-16 bg-gray-50 p-6 rounded-[2rem] border border-gray-100">
            <div className="relative flex-grow max-w-lg">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input 
                type="text" 
                placeholder={`Rechercher un ${viewMode === 'modules' ? 'module' : 'programme'}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-2xl focus:ring-2 focus:ring-[#2f6c44] outline-none transition-all font-light"
              />
            </div>
            
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center text-sm font-semibold text-gray-500 mr-2">
                <Filter className="w-4 h-4 mr-2" /> {viewMode === 'modules' ? 'Niveau :' : 'Axe :'}
              </div>
              {(viewMode === 'modules' ? levels : axes).map((opt) => (
                <button
                  key={opt}
                  onClick={() => setFilter(opt)}
                  className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                    filter === opt 
                    ? 'bg-[#2f6c44] text-white shadow-lg shadow-emerald-900/20' 
                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {/* Axis Banner (Visible when an axis is filtered in Program mode) */}
          <AnimatePresence mode='wait'>
            {viewMode === 'programmes' && filter !== 'Tous' && axesInfo[filter] && (
              <motion.div 
                key={filter}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mb-16 bg-[#1a2e22] rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/10"
              >
                <div className="grid grid-cols-1 md:grid-cols-3">
                  <div className="md:col-span-2 p-10 md:p-16 text-white flex flex-col justify-center">
                    <span className="bg-[#c8a849] text-gray-900 text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-[0.2em] mb-6 w-max">Mission de l'Axe</span>
                    <h3 className="text-3xl md:text-4xl font-black mb-6 leading-tight">{filter} : {axesInfo[filter].title}</h3>
                    <p className="text-lg text-white/70 font-light leading-relaxed italic border-l-4 border-[#c8a849] pl-6 uppercase tracking-wider">{axesInfo[filter].mission}</p>
                  </div>
                  <div className="h-64 md:h-auto relative overflow-hidden hidden md:block">
                    <img src={axesInfo[filter].image} className="absolute inset-0 w-full h-full object-cover" alt={filter} />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#1a2e22] via-transparent to-transparent"></div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Grid section header if no specific axis selected */}
          {filter === 'Tous' && (
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
              <div>
                <h3 className="text-2xl font-black text-gray-900">{viewMode === 'programmes' ? 'Programmes Certifiants' : 'Catalogue des Modules'}</h3>
                <p className="text-gray-500 font-light text-sm">{viewMode === 'programmes' ? 'Parcours complets structurés par axes stratégiques.' : 'Apprentissage à la carte selon vos besoins immédiats.'}</p>
              </div>
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            <AnimatePresence mode='popLayout'>
              {filteredItems.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  onClick={() => setSelectedItem(item)}
                  className="bg-white border border-gray-100 rounded-[2.5rem] overflow-hidden shadow-soft hover:shadow-xl transition-all duration-500 group cursor-pointer flex flex-col h-full"
                >
                  <div className="relative h-64 overflow-hidden">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute top-4 left-4">
                      <span className="bg-[#2f6c44] text-white text-[10px] font-bold px-4 py-1.5 rounded-full uppercase tracking-widest backdrop-blur-md">
                        Axe {item.axe}
                      </span>
                    </div>
                  </div>
                  <div className="p-8 flex flex-col flex-grow">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[#c8a849] text-xs font-bold uppercase">
                        {viewMode === 'modules' ? (item as Module).level : (item as Programme).subtitle}
                      </span>
                      {viewMode === 'modules' && (
                        <div className="flex items-center text-gray-400 text-[10px] font-bold">
                          <Clock className="w-3.5 h-3.5 mr-1" /> {(item as Module).duration}
                        </div>
                      )}
                    </div>
                    <h3 className="text-lg font-extrabold text-gray-900 mb-4 leading-tight group-hover:text-[#2f6c44] transition-colors line-clamp-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-500 text-sm font-light leading-relaxed mb-6 line-clamp-3">
                      {item.description}
                    </p>
                    <div className="mt-auto pt-6 border-t border-gray-100 flex items-center justify-between">
                      <div>
                        <p className="text-[10px] uppercase font-bold text-gray-400">Prix</p>
                        <p className="text-lg font-black text-gray-900">{item.price}</p>
                      </div>
                      <div className="bg-gray-50 p-2 rounded-xl text-[#2f6c44] group-hover:bg-[#2f6c44] group-hover:text-white transition-colors">
                        <ArrowRight className="w-5 h-5" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Modal */}
          <AnimatePresence>
            {selectedItem && (
              <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 md:p-8">
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedItem(null)} className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" />
                <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} className="bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-[3rem] relative shadow-2xl z-10">
                  <button onClick={() => setSelectedItem(null)} className="absolute top-6 right-6 z-20 bg-white/20 hover:bg-white/40 p-2 rounded-full backdrop-blur-md transition-colors">
                    <X className="w-6 h-6 text-gray-900" />
                  </button>
                  <div className="grid grid-cols-1 lg:grid-cols-2">
                    <div className="h-64 lg:h-auto relative overflow-hidden">
                      <img src={selectedItem.image} alt={selectedItem.title} className="w-full h-full object-cover" />
                      <div className="absolute top-6 left-6">
                        <span className="bg-[#c8a849] text-gray-900 text-xs font-bold px-4 py-2 rounded-full uppercase tracking-widest shadow-lg">Axe {selectedItem.axe}</span>
                      </div>
                    </div>
                    <div className="p-8 md:p-12">
                      <h4 className="text-[#2f6c44] font-bold text-sm uppercase tracking-[0.2em] mb-4">
                        {viewMode === 'modules' ? 'Module de Formation' : 'Parcours Certifiant'}
                      </h4>
                      <h2 className="text-3xl font-black text-gray-900 mb-2 leading-tight">{selectedItem.title}</h2>
                      {viewMode === 'programmes' && <p className="text-[#c8a849] font-bold text-lg mb-6">{(selectedItem as Programme).subtitle}</p>}
                      
                      <div className="mb-10 text-gray-600 font-light leading-relaxed">
                        <p className="mb-6">{selectedItem.description}</p>
                        
                        <h5 className="font-bold text-gray-900 text-xs uppercase tracking-widest mb-4 flex items-center gap-2">
                          <Target className="w-4 h-4 text-[#c8a849]" /> Contenu du {viewMode === 'modules' ? 'Module' : 'Programme'}
                        </h5>
                        
                        <div className="space-y-3">
                          {viewMode === 'modules' ? (
                            (selectedItem as Module).details.map((detail, idx) => (
                              <div key={idx} className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl border border-gray-100">
                                <BadgeCheck className="w-4 h-4 text-[#2f6c44] flex-shrink-0" />
                                <span className="text-sm">{detail}</span>
                              </div>
                            ))
                          ) : (
                            (selectedItem as Programme).modules.map((mId) => {
                              const mod = modules.find(m => m.id === mId);
                              return mod ? (
                                <div key={mId} className="bg-gray-50 p-4 rounded-xl border border-gray-100 mb-2">
                                  <p className="text-sm font-bold text-gray-900 mb-1">{mod.title}</p>
                                  <p className="text-xs text-gray-500 font-light">{mod.description}</p>
                                </div>
                              ) : null;
                            })
                          )}
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row items-center gap-6 pt-6 border-t border-gray-100">
                        <div className="flex-grow">
                          <p className="text-[10px] uppercase font-bold text-gray-400 mb-1">Investissement</p>
                          <p className="text-3xl font-black text-gray-900">{selectedItem.price}</p>
                        </div>
                        <button 
                          onClick={() => handleWhatsApp(selectedItem.title, viewMode)}
                          className="w-full sm:w-auto bg-[#2f6c44] hover:bg-[#1a4a2b] text-white font-bold py-5 px-10 rounded-2xl flex items-center justify-center gap-3 transition-all shadow-xl shadow-emerald-900/20"
                        >
                          S'inscrire Maintenant <ShoppingCart className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>

          {/* Motivational Section */}
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-32 p-10 md:p-16 bg-[#1a2e22] rounded-[3rem] text-white relative overflow-hidden">
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-extrabold mb-6 leading-tight text-[#c8a849]">Expertise MEAL</h2>
                <p className="text-white/70 mb-10 font-light text-lg">Choisissez entre une montée en compétences ciblée par module ou une transformation complète via nos programmes certifiants par Axes.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="flex items-start gap-4">
                    <ClipboardList className="w-6 h-6 text-[#c8a849]" />
                    <p className="text-sm font-light"><span className="font-bold">80% Pratique</span> simulation terrain et études de cas.</p>
                  </div>
                  <div className="flex items-start gap-4">
                    <BarChart3 className="w-6 h-6 text-[#c8a849]" />
                    <p className="text-sm font-light"><span className="font-bold">Portfolio</span> livrables concrets pour vos recrutements.</p>
                  </div>
                </div>
              </div>
              <div className="flex justify-center lg:justify-end">
                <div className="bg-white/5 backdrop-blur-xl p-8 rounded-[2.5rem] border border-white/10 max-w-sm">
                  <h4 className="font-bold text-xl mb-4 text-[#c8a849]">Un doute sur votre niveau ?</h4>
                  <p className="text-white/70 font-light text-sm mb-8 leading-relaxed">Nos experts vous accompagnent gratuitement pour choisir le parcours adapté à votre profil.</p>
                  <a href="https://wa.me/+237691728282" target="_blank" rel="noopener noreferrer" className="w-full bg-white text-gray-900 font-bold py-4 rounded-2xl flex items-center justify-center gap-3 hover:bg-[#c8a849] transition-all">Contacter un conseiller <MessageCircle className="w-5 h-5" /></a>
                </div>
              </div>
            </div>
            <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4"><div className="w-96 h-96 bg-[#c8a849]/10 rounded-full blur-[100px]"></div></div>
          </motion.div>

        </div>
      </section>
    </div>
  );
};

export default CoursesPage;
