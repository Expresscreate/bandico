import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, User, ArrowRight, ChevronRight, Search, Tag, TrendingUp, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageHeader from './PageHeader';
import { BLOG_POSTS } from './blogData';

const CATEGORIES = ['Tous', 'Actualités', 'Expertise MEAL', 'Impact Social', 'Bonnes Pratiques', 'Technologies', 'Environnement'];

const BlogPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('Tous');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPosts = BLOG_POSTS.filter((post) => {
    const matchesCategory = activeCategory === 'Tous' || post.category === activeCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredPost = BLOG_POSTS.find(post => post.featured);
  const topArticles = BLOG_POSTS.slice(1, 4);

  return (
    <div className="bg-white min-h-screen">
      <PageHeader 
        title="Notre Blog" 
        subtitle="Actualités, analyses d'experts et retours d'impact du terrain. Découvrez notre vision du développement."
        image="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2070&auto=format&fit=crop"
        breadcrumb={[{ label: 'Blog' }]}
      />

      <section className="py-24 relative overflow-hidden bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            
            {/* Left Content Area (Col Span 3) */}
            <div className="lg:col-span-3 space-y-12">
              
              {/* Featured Post */}
              <AnimatePresence mode='wait'>
                {featuredPost && activeCategory === 'Tous' && !searchQuery && (
                  <Link to={`/blog/${featuredPost.id}`}>
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="rounded-[2.5rem] overflow-hidden bg-white shadow-xl group border border-gray-100 relative mb-8"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 h-full">
                        <div className="relative h-64 md:h-auto overflow-hidden">
                          <img 
                            src={featuredPost.image} 
                            alt={featuredPost.title} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                          />
                          <div className="absolute top-6 left-6">
                            <span className="flex items-center gap-2 bg-[#2f6c44] text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg backdrop-blur-md">
                              <TrendingUp className="w-3.5 h-3.5" /> À la Une
                            </span>
                          </div>
                        </div>
                        
                        <div className="p-8 md:p-12 flex flex-col justify-center relative z-10">
                          <span className="text-[#c8a849] font-black uppercase tracking-widest text-[10px] mb-4">
                            {featuredPost.category}
                          </span>
                          <h2 className="text-3xl font-extrabold text-gray-900 mb-6 group-hover:text-[#2f6c44] transition-colors leading-tight">
                            {featuredPost.title}
                          </h2>
                          <p className="text-gray-500 font-light text-base mb-8 leading-relaxed">
                            {featuredPost.excerpt}
                          </p>
                          
                          <div className="flex flex-wrap items-center justify-between mt-auto pt-6 border-t border-gray-100 gap-4">
                            <div className="flex items-center gap-4 text-[10px] sm:text-xs font-bold text-gray-400">
                              <div className="flex items-center gap-1.5 bg-gray-50 px-2 py-1 rounded-lg">
                                <User className="w-3.5 h-3.5 text-[#c8a849]"/> {featuredPost.author}
                              </div>
                              <div className="flex items-center gap-1.5 bg-gray-50 px-2 py-1 rounded-lg">
                                <Calendar className="w-3.5 h-3.5 text-[#c8a849]"/> {featuredPost.date}
                              </div>
                            </div>
                            <span className="flex items-center gap-2 text-[#2f6c44] font-bold group-hover:text-[#1a4a2b] transition-colors">
                              Lire l'article <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                )}
              </AnimatePresence>

              {/* Grid Layout for regular posts */}
              {filteredPosts.filter(p => p.id !== featuredPost?.id || activeCategory !== 'Tous' || searchQuery).length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <AnimatePresence mode='popLayout'>
                    {filteredPosts.map((post, idx) => {
                      if (post.featured && activeCategory === 'Tous' && !searchQuery) return null;
                      
                      return (
                        <motion.div
                          layout
                          key={post.id}
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          transition={{ delay: idx * 0.05 }}
                          className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-500 group flex flex-col h-full"
                        >
                          <Link to={`/blog/${post.id}`} className="flex flex-col h-full">
                            <div className="relative h-56 overflow-hidden">
                              <img 
                                src={post.image} 
                                alt={post.title} 
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                              />
                              <div className="absolute top-4 left-4">
                                <span className="bg-white/90 backdrop-blur-sm text-gray-900 text-[10px] font-black px-3 py-1.5 rounded-lg shadow-sm">
                                  {post.category}
                                </span>
                              </div>
                            </div>
                            
                            <div className="p-8 flex flex-col flex-grow">
                              <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-[#2f6c44] transition-colors leading-snug line-clamp-2">
                                {post.title}
                              </h3>
                              <p className="text-gray-500 font-light text-sm mb-6 leading-relaxed flex-grow line-clamp-3">
                                {post.excerpt}
                              </p>
                              
                              <div className="flex flex-col gap-4 mt-auto pt-6 border-t border-gray-100">
                                <div className="flex items-center justify-between text-xs font-semibold text-gray-400">
                                  <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {post.date}</span>
                                  <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {post.readTime}</span>
                                </div>
                                
                                <span className="mt-2 w-full bg-gray-50 group-hover:bg-[#2f6c44] group-hover:text-white text-[#2f6c44] font-bold py-3 rounded-xl transition-all flex justify-center items-center gap-2 group-hover:shadow-md">
                                  Lire la suite <ChevronRight className="w-4 h-4" />
                                </span>
                              </div>
                            </div>
                          </Link>
                        </motion.div>
                      )
                    })}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="text-center py-20 bg-white rounded-[2.5rem] border border-gray-100">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-50 mb-6">
                    <Search className="w-8 h-8 text-gray-300" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Aucun article trouvé</h3>
                  <p className="text-gray-500 font-light max-w-sm mx-auto">Essayez de modifier vos filtres ou vos termes de recherche pour trouver ce que vous cherchez.</p>
                </div>
              )}

              {/* Load More Button */}
              {filteredPosts.length > 0 && (
                <div className="pt-8 flex justify-center">
                  <button className="px-8 py-4 bg-white border border-gray-200 text-gray-900 font-bold rounded-2xl shadow-sm hover:bg-gray-50 hover:shadow-md transition-all flex items-center gap-2">
                    Charger Plus d'Articles
                  </button>
                </div>
              )}
            </div>

            {/* Right Sidebar (Col Span 1) */}
            <div className="lg:col-span-1 space-y-10">
              
              {/* Search Widget */}
              <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2"><Search className="w-5 h-5 text-[#c8a849]" /> Recherche</h3>
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="Chercher..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-4 pr-10 py-3 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:ring-2 focus:ring-[#2f6c44] outline-none transition-all font-light text-sm"
                  />
                  <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                </div>
              </div>

              {/* Categories Widget */}
              <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2"><Tag className="w-5 h-5 text-[#c8a849]" /> Catégories</h3>
                <div className="flex flex-col gap-2">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`text-left px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 flex justify-between items-center ${
                        activeCategory === cat 
                        ? 'bg-[#2f6c44] text-white shadow-md' 
                        : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      {cat}
                      {activeCategory === cat && <ChevronRight className="w-4 h-4" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Top Articles Widget */}
              <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2"><TrendingUp className="w-5 h-5 text-[#c8a849]" /> Articles Populaires</h3>
                <div className="flex flex-col gap-6">
                  {topArticles.map((article) => (
                    <Link to={`/blog/${article.id}`} key={article.id} className="flex gap-4 group cursor-pointer border-b border-gray-50 pb-4 last:border-0 last:pb-0">
                      <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 shadow-sm">
                        <img src={article.image} alt={article.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      </div>
                      <div className="flex flex-col justify-center">
                        <h4 className="text-sm font-bold text-gray-900 group-hover:text-[#2f6c44] transition-colors line-clamp-2 leading-tight mb-2">
                          {article.title}
                        </h4>
                        <span className="text-[10px] text-gray-400 font-semibold flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {article.date}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogPage;
