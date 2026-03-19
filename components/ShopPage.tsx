import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingBag, 
  Search, 
  Filter, 
  ShoppingCart, 
  X, 
  Plus, 
  Minus, 
  Trash2, 
  CheckCircle, 
  ChevronRight,
  ChevronLeft,
  ArrowRight,
  Info,
  LayoutGrid,
  List,
  Star,
  ChevronDown,
  Zap,
  ShieldCheck,
  Rocket
} from 'lucide-react';
import PageHeader from './PageHeader';
import { useCart } from './CartContext';

// Import the correct Product interface shape from its context or define it to match
interface Product {
  id: string;
  name: string;
  category: string;
  features: string[];
  price: number;
  priceFormatted: string;
  shortDescription: string;
  fullDescription: string;
  image: string;
  specifications: Record<string, string>;
  isHot?: boolean; // Keep for UI indicators
  rating?: number; // Keep for UI indicators
  reviews?: number; // Keep for UI indicators
}

const generateProducts = (): Product[] => {
  const categories = ["Electronics", "Fashion", "Sports", "Beauty", "Computer", "Maison & Bureau"];
  const baseProducts: Product[] = [
    {
      id: "p1",
      name: "3D Television",
      category: "Electronics",
      price: 210000,
      priceFormatted: "210,000 FCFA",
      features: ["Premium", "Garantie 2 ans"],
      shortDescription: "Experience true immersion with our latest 3D Smart TV technology.",
      fullDescription: "High-definition 3D viewing with smart connectivity and immersive sound system. Perfect for professional presentations or home cinema.",
      image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?q=80&w=2070&auto=format&fit=crop",
      specifications: { "Écran": "55 pouces 4K", "Ports": "4x HDMI, 2x USB", "OS": "Android TV" },
      rating: 4,
      reviews: 1,
      isHot: false
    },
    {
      id: "p2",
      name: "Alarm Clock With Lamp",
      category: "Electronics",
      price: 60000,
      priceFormatted: "60,000 FCFA",
      features: ["Hot", "Neuf"],
      shortDescription: "Wake up naturally with simulated sunrise and soothing alarms.",
      fullDescription: "Smart alarm clock with adjustable LED lamp and multiple wake-up sounds. Enhances your sleep quality and morning routine.",
      image: "https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?q=80&w=2071&auto=format&fit=crop",
      specifications: { "Luminosité": "Adjustable", "Alarme": "Nature sounds", "Connectivité": "Bluetooth" },
      isHot: true,
      rating: 0,
      reviews: 0
    },
    {
      id: "p3",
      name: "MacBook Pro M2 - 14\"",
      category: "Computer",
      price: 1350000,
      priceFormatted: "1,350,000 FCFA",
      features: ["Premium", "Performance"],
      shortDescription: "Puissance phénoménale pour les professionnels du MEAL and du design.",
      fullDescription: "Le nouveau MacBook Pro with puce M2 offre une autonomie de batterie record and des performances de processeur de pointe. Idéal pour l'analyse de données massives and le montage vidéo haute résolution.",
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1926&auto=format&fit=crop",
      specifications: { "Processeur": "Puce M2 Pro", "Mémoire": "16 Go RAM", "Stockage": "512 Go SSD" },
      rating: 5,
      reviews: 12,
      isHot: false
    },
    {
      id: "p4",
      name: "Professional Camera",
      category: "Electronics",
      price: 1250000,
      priceFormatted: "1,250,000 FCFA",
      features: ["Garantie", "Premium"],
      shortDescription: "Capturez des données visuelles d'une précision incroyable.",
      fullDescription: "Full-frame sensor, 4K video recording, and advanced autofocus system. Perfect for reporting and high-quality documentation.",
      image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1964&auto=format&fit=crop",
      specifications: { "Capteur": "30.4 MP Full-frame", "Vidéo": "4K 60fps", "Focus": "Dual Pixel AF" },
      rating: 4,
      reviews: 5,
      isHot: false
    },
    {
      id: "p5",
      name: "Chaise Ergonomique OfficeMax",
      category: "Maison & Bureau",
      price: 185000,
      priceFormatted: "185,000 FCFA",
      features: ["Premium", "Garantie 5 ans"],
      shortDescription: "Améliorez votre productivité with un confort d'assise supérieur.",
      fullDescription: "Conçue pour des sessions de travail prolongées, cette chaise offre un soutien lombaire ajustable and une maille respirante haute qualité.",
      image: "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?q=80&w=1974&auto=format&fit=crop",
      specifications: { "Soutien": "Adjustable Lumbar", "Matériau": "Maille & Acier", "Poids Max": "150kg" },
      rating: 5,
      reviews: 8,
      isHot: false
    },
    {
      id: "p6",
      name: "Kit Solaire Bandico 500W",
      category: "Énergie",
      price: 450000,
      priceFormatted: "450,000 FCFA",
      features: ["Local", "Durabilité"],
      shortDescription: "Énergie autonome pour vos équipements de bureau and maison.",
      fullDescription: "Le pack complet pour assurer la continuité de votre travail même en cas de coupure. Comprend 2 panneaux solaires, une batterie lithium and l'onduleur.",
      image: "https://images.unsplash.com/photo-1508514177221-18d167165327?q=80&w=2070&auto=format&fit=crop",
      specifications: { "Puissance": "500W", "Batterie": "100Ah Lithium", "Type": "Kit complet" },
      rating: 4,
      reviews: 3,
      isHot: true
    }
  ];

  const products: Product[] = [];
  for (let i = 1; i <= 60; i++) {
    const base = baseProducts[(i - 1) % baseProducts.length];
    products.push({
      ...base,
      id: `p${i}`,
      name: `${base.name} ${i > baseProducts.length ? `(ID: ${i})` : ''}`,
      price: base.price + (i % 5) * 1000,
      priceFormatted: `${(base.price + (i % 5) * 1000).toLocaleString()} FCFA`,
      isHot: i % 7 === 0,
      rating: Math.floor(Math.random() * 2) + 4 // Random rating between 4-5
    });
  }
  return products;
};

const allProducts = generateProducts();

const categories = [
  "Electronics", "Fashion", "Sports", "Beauty", "Computer", "Maison & Bureau", "Énergie"
];

const featuresList = [
  "Neuf", "Hot", "Garantie", "Premium", "Local", "Promotion"
];

const priceRanges = [
  { label: "Sous 50,000 FCFA", min: 0, max: 50000 },
  { label: "50,000 - 200,000 FCFA", min: 50000, max: 200000 },
  { label: "200,000 - 1,000,000 FCFA", min: 200000, max: 1000000 },
  { label: "Plus de 1,000,000 FCFA", min: 1000000, max: 100000000 }
];

const ShopPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState("Tri par défaut");
  const [showCount, setShowCount] = useState(12);
  const [viewType, setViewType] = useState<"grid" | "list">("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const { addToCart } = useCart();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Filter and Sort Logic
  const filteredProducts = useMemo(() => {
    let result = allProducts.filter(p => {
      const matchesCategory = !selectedCategory || p.category === selectedCategory;
      const matchesFeatures = selectedFeatures.length === 0 || selectedFeatures.every(f => p.features.includes(f) || (f === "Hot" && p.isHot));
      const matchesPrice = selectedPriceRange === null || (p.price >= priceRanges[selectedPriceRange].min && p.price < priceRanges[selectedPriceRange].max);
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesFeatures && matchesPrice && matchesSearch;
    });

    if (sortBy === "Prix: Croissant") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "Prix: Décroissant") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "Note") {
      result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }

    return result;
  }, [selectedCategory, selectedFeatures, selectedPriceRange, sortBy, searchQuery]);

  const totalPages = Math.ceil(filteredProducts.length / showCount);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * showCount,
    currentPage * showCount
  );

  const toggleFeature = (feature: string) => {
    setSelectedFeatures(prev => 
      prev.includes(feature) ? prev.filter(f => f !== feature) : [...prev, feature]
    );
    setCurrentPage(1);
  };

  return (
    <div className="bg-[#f8f9fa] min-h-screen">
      <PageHeader 
        title="BANDICO SHOP" 
        subtitle="Qualité certifiée, commerce éthique and soutien à l'artisanat local pour un impact durable au Cameroun."
        image="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop"
        breadcrumb={[{ label: 'Boutique' }]}
      />

      {/* Intro Landing Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-[#2f6c44] font-bold uppercase tracking-widest text-sm"
            >
              Écosystème Commercial
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-black text-gray-900 mt-4 mb-6 leading-tight"
            >
              Le commerce au service du <span className="text-[#c8a849]">développement local</span>.
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-gray-600 font-light leading-relaxed"
            >
              Bandico Shop est une vitrine dédiée à l'excellence. Nous connectons les acheteurs exigeants aux meilleurs produits technologiques et artisanaux, tout en garantissant une rémunération équitable pour nos producteurs.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: <ShieldCheck className="w-8 h-8" />, title: "Qualité Certifiée", desc: "Chaque article est rigoureusement testé par nos experts." },
              { icon: <Rocket className="w-8 h-8" />, title: "Logistique Rapide", desc: "Livraison sécurisée partout au Cameroun et à l'international." },
              { icon: <Zap className="w-8 h-8" />, title: "Impact Social", desc: "60% de nos bénéfices artisanaux soutiennent les producteurs locaux." }
            ].map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-gray-50 p-10 rounded-[3rem] border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
              >
                <div className="bg-[#2f6c44]/10 w-16 h-16 rounded-2xl flex items-center justify-center text-[#2f6c44] mb-8">
                  {feature.icon}
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h4>
                <p className="text-gray-500 font-light leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Sidebar */}
          <aside className="lg:w-80 flex-shrink-0">
            <div className="bg-white p-10 rounded-[3rem] shadow-soft space-y-12 sticky top-28 border border-gray-50">
              {/* Search */}
              <div>
                <h3 className="font-black text-gray-900 mb-8 uppercase tracking-widest text-xs flex items-center justify-between">
                  Recherche <div className="w-6 h-0.5 bg-[#c8a849]" />
                </h3>
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="Chercher un produit..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-5 py-4 text-sm focus:ring-2 focus:ring-[#2f6c44]/20 outline-none transition-all"
                  />
                  <Search className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                </div>
              </div>

              {/* Categories */}
              <div>
                <h3 className="font-black text-gray-900 mb-8 uppercase tracking-widest text-xs flex items-center justify-between">
                  Catégories <div className="w-6 h-0.5 bg-[#c8a849]" />
                </h3>
                <ul className="space-y-4">
                  <li>
                    <button 
                      onClick={() => setSelectedCategory(null)}
                      className={`text-sm transition-all hover:text-[#2f6c44] flex items-center justify-between w-full group ${!selectedCategory ? 'font-bold text-[#2f6c44]' : 'text-gray-500'}`}
                    >
                      <span className="group-hover:translate-x-1 transition-transform">Toutes</span>
                      <ChevronRight className={`w-3 h-3 ${!selectedCategory ? 'opacity-100' : 'opacity-0'}`} />
                    </button>
                  </li>
                  {categories.map(cat => (
                    <li key={cat}>
                      <button 
                        onClick={() => setSelectedCategory(cat)}
                        className={`text-sm transition-all hover:text-[#2f6c44] flex items-center justify-between w-full group ${selectedCategory === cat ? 'font-bold text-[#2f6c44]' : 'text-gray-500'}`}
                      >
                        <span className="group-hover:translate-x-1 transition-transform">{cat}</span>
                        <ChevronRight className={`w-3 h-3 ${selectedCategory === cat ? 'opacity-100' : 'opacity-0'}`} />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Features Filter */}
              <div>
                <h3 className="font-black text-gray-900 mb-8 uppercase tracking-widest text-xs flex items-center justify-between">
                  Filtres <div className="w-6 h-0.5 bg-[#c8a849]" />
                </h3>
                <div className="space-y-3">
                  {featuresList.map(feature => (
                    <label key={feature} className="flex items-center group cursor-pointer py-1">
                      <input 
                        type="checkbox" 
                        checked={selectedFeatures.includes(feature)}
                        onChange={() => toggleFeature(feature)}
                        className="hidden" 
                      />
                      <div className={`w-5 h-5 rounded-lg border-2 mr-4 flex items-center justify-center transition-all ${selectedFeatures.includes(feature) ? 'bg-[#2f6c44] border-[#2f6c44]' : 'border-gray-200 group-hover:border-[#2f6c44]'}`}>
                        {selectedFeatures.includes(feature) && <CheckCircle className="w-3 h-3 text-white" />}
                      </div>
                      <span className={`text-sm transition-colors ${selectedFeatures.includes(feature) ? 'text-[#2f6c44] font-bold' : 'text-gray-500 group-hover:text-gray-900'}`}>{feature}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Filter */}
              <div>
                <h3 className="font-black text-gray-900 mb-8 uppercase tracking-widest text-xs flex items-center justify-between">
                  Tranche de Prix <div className="w-6 h-0.5 bg-[#c8a849]" />
                </h3>
                <ul className="space-y-4">
                  {priceRanges.map((range, idx) => (
                    <li key={idx}>
                      <button 
                        onClick={() => setSelectedPriceRange(selectedPriceRange === idx ? null : idx)}
                        className={`text-sm transition-all hover:text-[#2f6c44] flex items-center justify-between w-full group ${selectedPriceRange === idx ? 'font-bold text-[#2f6c44]' : 'text-gray-500'}`}
                      >
                        <span className="group-hover:translate-x-1 transition-transform">{range.label}</span>
                        <div className={`w-1.5 h-1.5 rounded-full ${selectedPriceRange === idx ? 'bg-[#2f6c44]' : 'bg-transparent group-hover:bg-gray-200'}`} />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-grow">
            
            {/* Top Toolbar */}
            <div className="bg-white p-8 rounded-[3rem] shadow-soft mb-12 flex flex-col md:flex-row items-center justify-between gap-8 border border-gray-50">
              <div className="flex flex-col sm:flex-row items-center gap-10">
                <div className="flex items-center gap-4">
                  <span className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Trier par:</span>
                  <div className="relative group">
                    <select 
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="appearance-none bg-gray-50 border border-gray-100 rounded-2xl px-8 py-3.5 text-xs font-black text-gray-700 outline-none focus:ring-2 focus:ring-[#2f6c44]/20 cursor-pointer pr-12 transition-all"
                    >
                      <option>Tri par défaut</option>
                      <option>Note</option>
                      <option>Prix: Croissant</option>
                      <option>Prix: Décroissant</option>
                    </select>
                    <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <span className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Afficher:</span>
                  <select 
                    value={showCount}
                    onChange={(e) => { setShowCount(Number(e.target.value)); setCurrentPage(1); }}
                    className="bg-gray-50 border border-gray-100 rounded-2xl px-6 py-3.5 text-xs font-black text-gray-700 outline-none cursor-pointer transition-all"
                  >
                    <option value={12}>12</option>
                    <option value={24}>24</option>
                    <option value={48}>48</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="h-10 w-px bg-gray-100 hidden md:block" />
                <div className="flex items-center gap-3 p-2 bg-gray-50 rounded-[1.5rem]">
                  <button 
                    onClick={() => setViewType("grid")}
                    className={`p-3 rounded-2xl transition-all ${viewType === "grid" ? "bg-white text-[#2f6c44] shadow-md" : "text-gray-400 hover:text-gray-600"}`}
                  >
                    <LayoutGrid className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={() => setViewType("list")}
                    className={`p-3 rounded-2xl transition-all ${viewType === "list" ? "bg-white text-[#2f6c44] shadow-md" : "text-gray-400 hover:text-gray-600"}`}
                  >
                    <List className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Product List/Grid */}
            <div className={viewType === "grid" 
              ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8" 
              : "space-y-8"
            }>
              <AnimatePresence mode="popLayout">
                {paginatedProducts.map(product => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    viewType={viewType} 
                    onAddToCart={() => addToCart(product)}
                    onViewDetails={() => setSelectedProduct(product)}
                  />
                ))}
              </AnimatePresence>
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-40 bg-white rounded-[4rem] shadow-soft border border-gray-50">
                <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
                  <Search className="w-10 h-10 text-gray-200" />
                </div>
                <h3 className="text-2xl font-black text-gray-900 mb-2">Aucun produit trouvé</h3>
                <p className="text-gray-500 font-light">Essayez de modifier vos filtres ou votre recherche.</p>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-24 flex flex-col sm:flex-row items-center justify-between gap-10 border-t border-gray-100 pt-12">
                <p className="text-sm font-medium text-gray-400">
                  Affichage de <span className="text-gray-900 font-black">{(currentPage - 1) * showCount + 1}-{Math.min(currentPage * showCount, filteredProducts.length)}</span> sur <span className="text-gray-900 font-black">{filteredProducts.length}</span> Produits
                </p>

                <div className="flex items-center gap-4">
                  <button 
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(prev => prev - 1)}
                    className="flex items-center gap-3 px-8 py-4 rounded-2xl bg-white border border-gray-100 text-xs font-black uppercase tracking-widest text-gray-600 hover:border-[#2f6c44] hover:text-[#2f6c44] disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-soft"
                  >
                    <ChevronLeft className="w-4 h-4" /> Précédent
                  </button>
                  
                  <div className="flex items-center gap-3">
                    {[...Array(totalPages)].map((_, i) => {
                      const page = i + 1;
                      if (totalPages > 5 && Math.abs(page - currentPage) > 1 && page !== 1 && page !== totalPages) {
                        if (Math.abs(page - currentPage) === 2) return <span key={page} className="px-1 text-gray-300">...</span>;
                        return null;
                      }
                      return (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`w-14 h-14 rounded-2xl text-sm font-black transition-all ${currentPage === page ? "bg-[#2f6c44] text-white shadow-2xl shadow-emerald-900/30 active:scale-95" : "bg-white border border-gray-100 text-gray-400 hover:border-[#2f6c44] hover:text-[#2f6c44]"}`}
                        >
                          {page}
                        </button>
                      );
                    })}
                  </div>

                  <button 
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(prev => prev + 1)}
                    className="flex items-center gap-3 px-8 py-4 rounded-2xl bg-white border border-gray-100 text-xs font-black uppercase tracking-widest text-gray-600 hover:border-[#2f6c44] hover:text-[#2f6c44] disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-soft"
                  >
                    Suivant <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Final Dual CTA Section */}
      <section className="py-24 bg-gray-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-[#2f6c44] p-16 rounded-[4rem] text-white relative overflow-hidden group shadow-2xl"
            >
              <div className="absolute inset-0 opacity-20 pointer-events-none">
                <img src="https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?q=80&w=2070&auto=format&fit=crop" alt="Background" className="w-full h-full object-cover mix-blend-overlay" />
              </div>
              <div className="absolute top-0 right-0 p-16 opacity-10 group-hover:scale-110 transition-transform duration-700">
                <Zap className="w-40 h-40" />
              </div>
              <h3 className="text-3xl font-black mb-6">Vous êtes un Artisan ?</h3>
              <p className="text-white/80 text-lg font-light mb-12 leading-relaxed relative z-10">
                Boostez votre visibilité and vendez vos créations sur une plateforme premium. Nous gérons la logistique and le support client pour vous.
              </p>
              <a href="/contact" className="inline-flex items-center gap-4 bg-[#c8a849] text-gray-900 font-black py-6 px-12 rounded-[2rem] shadow-2xl hover:-translate-y-2 transition-all active:scale-95 relative z-10">
                Devenir Vendeur <ArrowRight className="w-5 h-5" />
              </a>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white p-16 rounded-[4rem] border border-gray-100 shadow-2xl relative overflow-hidden group"
            >
              <div className="absolute inset-0 opacity-5 pointer-events-none">
                <img src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=2070&auto=format&fit=crop" alt="Background" className="w-full h-full object-cover" />
              </div>
              <div className="absolute top-0 right-0 p-16 text-[#c8a849] opacity-10 group-hover:scale-110 transition-transform duration-700">
                <ShoppingBag className="w-40 h-40" />
              </div>
              <h3 className="text-3xl font-black text-gray-900 mb-6">Besoin d'aide ?</h3>
              <p className="text-gray-500 text-lg font-light mb-12 leading-relaxed relative z-10">
                Notre équipe d'experts est disponible pour vous conseiller and vous orienter dans vos choix technologiques and artisanaux.
              </p>
              <a href="/contact" className="inline-flex items-center gap-4 bg-[#1a2e22] text-white font-black py-6 px-12 rounded-[2rem] shadow-2xl hover:-translate-y-2 transition-all active:scale-95 relative z-10">
                Contactez-nous <ArrowRight className="w-5 h-5" />
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Product Details Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              onClick={() => setSelectedProduct(null)} 
              className="absolute inset-0 bg-gray-900/70 backdrop-blur-md" 
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 30 }} 
              animate={{ opacity: 1, scale: 1, y: 0 }} 
              exit={{ opacity: 0, scale: 0.9, y: 30 }} 
              className="bg-white w-full max-w-6xl max-h-[95vh] overflow-y-auto rounded-[5rem] relative shadow-2xl z-10 flex flex-col md:flex-row overflow-hidden border border-white/20"
            >
              <button 
                onClick={() => setSelectedProduct(null)} 
                className="absolute top-8 right-8 z-20 bg-gray-900/5 hover:bg-gray-900/10 p-4 rounded-full transition-all active:scale-90"
              >
                <X className="w-6 h-6 text-gray-900" />
              </button>
              
              <div className="w-full md:w-1/2 bg-gray-50 relative">
                <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-full object-cover min-h-[400px]" />
                {selectedProduct.isHot && (
                  <div className="absolute top-10 left-10 bg-red-500 text-white font-black px-6 py-2 rounded-full uppercase tracking-widest text-xs shadow-2xl">
                    Populaire
                  </div>
                )}
              </div>

              <div className="w-full md:w-1/2 p-12 md:p-20 flex flex-col">
                <span className="text-[#c8a849] font-black text-[10px] uppercase tracking-[0.4em] mb-6 block">{selectedProduct.category}</span>
                <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-8 leading-tight">{selectedProduct.name}</h2>
                
                <div className="flex items-center gap-2 mb-8">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-5 h-5 ${i < (selectedProduct.rating || 0) ? "fill-[#ffc107] text-[#ffc107]" : "text-gray-100"}`} />
                  ))}
                  <span className="text-xs text-gray-400 font-black ml-4">({selectedProduct.reviews} Avis certifiés)</span>
                </div>

                <p className="text-4xl font-black text-[#2f6c44] mb-10">{selectedProduct.priceFormatted}</p>

                <p className="text-gray-500 font-light leading-relaxed mb-12 text-lg">
                  {selectedProduct.fullDescription}
                </p>

                <div className="mb-12">
                  <h5 className="font-black text-gray-900 text-xs uppercase tracking-widest mb-8 flex items-center gap-4">
                    Spécifications <div className="h-0.5 bg-gray-100 flex-grow" />
                  </h5>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {Object.entries(selectedProduct.specifications).map(([key, val]) => (
                      <div key={key} className="flex flex-col p-5 bg-gray-50 rounded-[2rem] border border-gray-100">
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{key}</span>
                        <span className="text-sm font-bold text-gray-900">{val}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-auto flex flex-col sm:flex-row gap-6">
                  <button 
                    onClick={() => { addToCart(selectedProduct); setSelectedProduct(null); }}
                    className="flex-grow bg-[#2f6c44] hover:bg-[#1a4a2b] text-white font-black py-7 px-12 rounded-[2.5rem] shadow-2xl shadow-emerald-900/30 transition-all hover:-translate-y-2 active:scale-95 flex items-center justify-center gap-4 text-sm uppercase tracking-widest"
                  >
                    Ajouter au Panier <ShoppingCart className="w-5 h-5" />
                  </button>
                  <button className="p-7 border border-gray-100 rounded-[2.5rem] hover:bg-gray-50 transition-all text-gray-400 hover:text-gray-900">
                    <Info className="w-6 h-6" />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

const ProductCard: React.FC<{ 
  product: Product, 
  viewType: "grid" | "list",
  onAddToCart: () => void,
  onViewDetails: () => void
}> = ({ product, viewType, onAddToCart, onViewDetails }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className={`group bg-white rounded-[3.5rem] overflow-hidden transition-all duration-500 ${viewType === "grid" ? "hover:shadow-soft flex flex-col h-full border border-transparent hover:border-gray-50" : "flex flex-col sm:flex-row gap-10 p-8 border border-transparent hover:border-gray-100 hover:shadow-soft"}`}
    >
      {/* Image Section */}
      <div 
        onClick={onViewDetails}
        className={`relative overflow-hidden bg-gray-50 cursor-pointer ${viewType === "grid" ? "aspect-square" : "w-full sm:w-80 h-80 flex-shrink-0 rounded-[2.5rem]"}`}
      >
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
        />
        {product.isHot && (
          <span className="absolute top-8 left-8 bg-black text-white text-[10px] font-black px-5 py-2 rounded-full uppercase tracking-[0.2em] shadow-2xl z-10">
            HOT
          </span>
        )}
        <div className="absolute inset-0 bg-[#2f6c44]/0 group-hover:bg-[#2f6c44]/5 transition-colors duration-500" />
      </div>

      {/* Info Section */}
      <div className={`flex flex-col ${viewType === "grid" ? "p-8 flex-grow" : "flex-grow py-4 pr-6"}`}>
        <div className="flex justify-between items-start mb-4">
          <div>
            <p className="text-[10px] uppercase font-black text-[#c8a849] mb-3 tracking-[0.2em]">{product.category}</p>
            <h4 
              onClick={onViewDetails}
              className="font-bold text-base text-gray-900 group-hover:text-[#2f6c44] transition-colors cursor-pointer leading-tight"
            >
              {product.name}
            </h4>
          </div>
        </div>
        

        <div className="flex items-baseline gap-4 mb-8">
          <p className="text-base font-black text-gray-900">{product.priceFormatted}</p>
        </div>

        {viewType === "list" && (
          <p className="text-gray-500 text-lg font-light leading-relaxed mb-10 line-clamp-3">
            {product.shortDescription}
          </p>
        )}

        <div className="mt-auto flex flex-col sm:flex-row items-center gap-4">
          <button 
            onClick={onAddToCart}
            className="w-full bg-[#2f6c44] hover:bg-[#1a4a2b] text-white font-black py-5 px-8 rounded-[1.5rem] transition-all shadow-xl shadow-emerald-900/10 active:scale-95 flex items-center justify-center gap-3 text-xs uppercase tracking-widest"
          >
            Panier <ShoppingCart className="w-4 h-4" />
          </button>
          <button 
            onClick={onViewDetails}
            className="w-full sm:w-auto p-5 border border-gray-100 rounded-[1.5rem] hover:bg-gray-50 transition-all hover:border-[#2f6c44]/30 text-gray-400 hover:text-[#2f6c44]"
          >
            <Info className="w-5 h-5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ShopPage;
