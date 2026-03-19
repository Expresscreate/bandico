import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, User, Clock, Share2, Facebook, Twitter, Linkedin, Search, Tag, TrendingUp, ChevronRight } from 'lucide-react';
import { BLOG_POSTS } from './blogData';
import PageHeader from './PageHeader';

const CATEGORIES = ['Tous', 'Actualités', 'Expertise MEAL', 'Impact Social', 'Bonnes Pratiques', 'Technologies', 'Environnement'];

const BlogPostPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const post = BLOG_POSTS.find(p => p.id === id);
  const topArticles = BLOG_POSTS.filter(p => p.id !== id).slice(0, 4);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-6xl font-black text-gray-900 mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-8">L'article que vous recherchez n'existe pas ou a été déplacé.</p>
        <button 
          onClick={() => navigate('/blog')}
          className="bg-[#2f6c44] text-white px-8 py-4 rounded-full font-bold hover:bg-[#1a4a2b] transition-colors"
        >
          Retourner au Blog
        </button>
      </div>
    );
  }

  // Related posts matching category
  const relatedPosts = BLOG_POSTS.filter(p => p.category === post.category && p.id !== post.id).slice(0, 3);

  // Parse markdown-like content for rendering
  const renderContent = (text: string) => {
    return text.split('\n').map((paragraph, index) => {
      if (!paragraph.trim()) return <br key={index} />;
      
      if (paragraph.startsWith('### ')) {
        return <h3 key={index} className="text-2xl font-bold text-gray-900 mt-10 mb-4">{paragraph.replace('### ', '')}</h3>;
      }

      if (/^\d+\.\s/.test(paragraph.trim())) {
        return <li key={index} className="ml-6 mb-2 text-gray-600 leading-relaxed font-light list-decimal">{paragraph.replace(/^\d+\.\s/, '')}</li>;
      }
      
      if (paragraph.trim().startsWith('- ')) {
        return <li key={index} className="ml-6 mb-2 text-gray-600 leading-relaxed font-light list-disc">{paragraph.replace('- ', '')}</li>;
      }
      
      // Handle bold
      const boldRegex = /\*\*(.*?)\*\*/g;
      
      if (boldRegex.test(paragraph)) {
        const parts = paragraph.split(boldRegex);
        return (
          <p key={index} className="text-gray-600 leading-relaxed font-light mb-6 text-lg">
            {parts.map((part, i) => (i % 2 === 1 ? <strong key={i} className="font-bold text-gray-900">{part}</strong> : part))}
          </p>
        );
      }
      
      return <p key={index} className="text-gray-600 leading-relaxed font-light mb-6 text-lg">{paragraph}</p>;
    });
  };

  return (
    <div className="bg-white min-h-screen">
      <PageHeader 
        title={post.title} 
        image="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2070&auto=format&fit=crop"
        breadcrumb={[
          { label: 'Blog', href: '/blog' },
          { label: post.category }
        ]}
      />

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <button 
            onClick={() => navigate('/blog')}
            className="flex items-center gap-2 text-sm font-bold text-[#c8a849] hover:text-gray-900 transition-colors mb-10"
          >
            <ArrowLeft className="w-4 h-4" /> Retour au Blog
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            
            {/* Main Article Content (Col Span 3) */}
            <div className="lg:col-span-3">
              <article className="bg-white rounded-[3rem] shadow-sm border border-gray-100 overflow-hidden">
                
                {/* Featured Image at Top of Article */}
                <div className="w-full h-72 md:h-96 overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover" 
                  />
                </div>

                <div className="p-8 md:p-14 lg:p-20">
                  {/* Meta Info */}
                  <div className="flex flex-wrap items-center gap-4 md:gap-6 mb-12 pb-8 border-b border-gray-100">
                    <span className="bg-[#c8a849]/10 text-[#c8a849] font-black text-xs px-4 py-2 rounded-lg uppercase tracking-wider">
                      {post.category}
                    </span>
                    <div className="flex items-center gap-2 text-sm text-gray-500 font-medium">
                      <User className="w-4 h-4 text-[#2f6c44]" /> {post.author}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500 font-medium">
                      <Calendar className="w-4 h-4 text-[#2f6c44]" /> {post.date}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500 font-medium ml-auto">
                      <Clock className="w-4 h-4 text-gray-400" /> {post.readTime} de lecture
                    </div>
                  </div>

                  {/* Content */}
                  <div className="prose prose-lg max-w-none prose-p:text-gray-600 prose-headings:text-gray-900">
                    <p className="text-2xl text-gray-900 font-light italic border-l-4 border-[#c8a849] pl-6 py-2 mb-12 leading-relaxed">
                      {post.excerpt}
                    </p>
                    
                    <div className="mt-8">
                      {renderContent(post.content || '')}
                    </div>
                  </div>

                  {/* Share Footer */}
                  <div className="mt-16 pt-8 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-6">
                    <p className="font-bold text-gray-900 text-sm flex items-center gap-2">
                      <Share2 className="w-4 h-4" /> Partager cet article
                    </p>
                    <div className="flex items-center gap-3">
                      <button className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-500 hover:bg-[#1877f2] hover:text-white transition-colors">
                        <Facebook className="w-4 h-4" />
                      </button>
                      <button className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-500 hover:bg-[#1da1f2] hover:text-white transition-colors">
                        <Twitter className="w-4 h-4" />
                      </button>
                      <button className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-500 hover:bg-[#0a66c2] hover:text-white transition-colors">
                        <Linkedin className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            </div>

            {/* Right Sidebar (Col Span 1) */}
            <div className="lg:col-span-1 space-y-10">

              {/* About Author Widget */}
              <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2"><User className="w-5 h-5 text-[#c8a849]" /> Auteur</h3>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-[#2f6c44]/10 flex items-center justify-center text-[#2f6c44] font-bold text-lg">
                    {post.author.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-sm">{post.author}</p>
                    <p className="text-xs text-gray-400">Bandico Group</p>
                  </div>
                </div>
                <p className="text-xs text-gray-500 font-light leading-relaxed">
                  Contributeur actif au sein de Bandico Group, partageant son expertise en développement humanitaire et MEAL.
                </p>
              </div>

              {/* Categories Widget */}
              <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2"><Tag className="w-5 h-5 text-[#c8a849]" /> Catégories</h3>
                <div className="flex flex-col gap-2">
                  {CATEGORIES.filter(c => c !== 'Tous').map((cat) => (
                    <Link
                      key={cat}
                      to="/blog"
                      className={`text-left px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 flex justify-between items-center ${
                        post.category === cat 
                        ? 'bg-[#2f6c44] text-white shadow-md' 
                        : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      {cat}
                      {post.category === cat && <ChevronRight className="w-4 h-4" />}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Top Articles Widget */}
              <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2"><TrendingUp className="w-5 h-5 text-[#c8a849]" /> Autres Articles</h3>
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

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-24 bg-white border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h3 className="text-3xl font-black text-gray-900 mb-12">Articles <span className="text-[#c8a849]">Similaires</span></h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost, idx) => (
                <Link to={`/blog/${relatedPost.id}`} key={relatedPost.id}>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="bg-gray-50 rounded-[2rem] shadow-sm border border-transparent overflow-hidden hover:shadow-xl hover:border-gray-200 transition-all duration-500 group flex flex-col h-full"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={relatedPost.image} 
                        alt={relatedPost.title} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                      />
                    </div>
                    
                    <div className="p-8 flex flex-col flex-grow">
                      <h4 className="text-lg font-bold text-gray-900 mb-4 group-hover:text-[#2f6c44] transition-colors leading-snug line-clamp-2">
                        {relatedPost.title}
                      </h4>
                      <p className="text-gray-500 font-light text-sm mb-6 line-clamp-2">
                        {relatedPost.excerpt}
                      </p>
                      <div className="mt-auto flex items-center gap-1.5 text-xs text-gray-400 font-semibold">
                        <Calendar className="w-3.5 h-3.5" /> {relatedPost.date}
                      </div>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default BlogPostPage;
