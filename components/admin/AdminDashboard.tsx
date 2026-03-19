import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FileText, ShoppingBag, GraduationCap, Plus, ArrowRight, Loader2 } from 'lucide-react';
import { statsAPI } from '../../lib/api';

const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState({ blog_posts: 0, products: 0, courses: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    statsAPI.get()
      .then(setStats)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const cards = [
    { label: 'Articles Blog', count: stats.blog_posts, icon: FileText, color: 'bg-blue-500', href: '/admin/blog', addHref: '/admin/blog/new' },
    { label: 'Produits', count: stats.products, icon: ShoppingBag, color: 'bg-emerald-500', href: '/admin/shop', addHref: '/admin/shop/new' },
    { label: 'Formations', count: stats.courses, icon: GraduationCap, color: 'bg-amber-500', href: '/admin/formations', addHref: '/admin/formations/new' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Tableau de Bord</h2>
        <p className="text-gray-500 font-light">Vue d'ensemble de votre contenu</p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((card) => (
            <div key={card.label} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-6">
                <div className={`${card.color} w-12 h-12 rounded-xl flex items-center justify-center text-white`}>
                  <card.icon className="w-6 h-6" />
                </div>
                <span className="text-4xl font-black text-gray-900">{card.count}</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-4">{card.label}</h3>
              <div className="flex gap-3">
                <Link to={card.href} className="flex-1 text-center text-sm font-semibold text-gray-600 bg-gray-50 hover:bg-gray-100 py-2 rounded-lg transition-colors flex items-center justify-center gap-1">
                  Voir <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <Link to={card.addHref} className="flex-1 text-center text-sm font-semibold text-white bg-[#2f6c44] hover:bg-[#1a4a2b] py-2 rounded-lg transition-colors flex items-center justify-center gap-1">
                  <Plus className="w-3.5 h-3.5" /> Ajouter
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h3 className="font-bold text-gray-900 mb-4">Actions Rapides</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { label: 'Nouvel Article', href: '/admin/blog/new', icon: FileText },
            { label: 'Nouveau Produit', href: '/admin/shop/new', icon: ShoppingBag },
            { label: 'Nouveau Cours', href: '/admin/formations/new', icon: GraduationCap },
            { label: 'Modifier l\'Accueil', href: '/admin/pages/home', icon: Plus },
          ].map((action) => (
            <Link key={action.label} to={action.href} className="flex items-center gap-3 px-4 py-3 bg-gray-50 hover:bg-[#2f6c44]/5 rounded-xl transition-colors group">
              <action.icon className="w-5 h-5 text-gray-400 group-hover:text-[#2f6c44]" />
              <span className="text-sm font-semibold text-gray-700 group-hover:text-[#2f6c44]">{action.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
