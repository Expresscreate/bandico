import React, { useState } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { 
  LayoutDashboard, FileText, ShoppingBag, GraduationCap, Settings, 
  Home, Phone, LogOut, ChevronLeft, ChevronRight, Menu, X
} from 'lucide-react';

const NAV_ITEMS = [
  { label: 'Dashboard', icon: LayoutDashboard, href: '/admin' },
  { label: 'Pages', icon: Home, href: '/admin/pages', children: [
    { label: 'Accueil', href: '/admin/pages/home' },
    { label: 'Contact', href: '/admin/pages/contact' },
  ]},
  { label: 'Blog', icon: FileText, href: '/admin/blog', children: [
    { label: 'Tous les Articles', href: '/admin/blog' },
    { label: 'Nouvel Article', href: '/admin/blog/new' },
  ]},
  { label: 'Boutique', icon: ShoppingBag, href: '/admin/shop', children: [
    { label: 'Produits', href: '/admin/shop' },
    { label: 'Nouveau Produit', href: '/admin/shop/new' },
    { label: 'Catégories', href: '/admin/shop/categories' },
  ]},
  { label: 'Formations', icon: GraduationCap, href: '/admin/formations', children: [
    { label: 'Cours', href: '/admin/formations' },
    { label: 'Nouveau Cours', href: '/admin/formations/new' },
  ]},
  { label: 'Paramètres', icon: Settings, href: '/admin/settings' },
];

const AdminLayout: React.FC = () => {
  const { username, logout } = useAuth();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const isActive = (href: string) => {
    if (href === '/admin') return location.pathname === '/admin';
    return location.pathname.startsWith(href);
  };

  const toggleSection = (label: string) => {
    setExpandedSection(expandedSection === label ? null : label);
  };

  const Sidebar = () => (
    <div className={`flex flex-col h-full bg-[#0b1a12] text-white transition-all duration-300 ${collapsed ? 'w-20' : 'w-72'}`}>
      {/* Logo */}
      <div className="p-6 border-b border-white/5 flex items-center justify-between">
        {!collapsed && <img src="/logo-bandecolong.png" alt="Bandico" className="h-8 brightness-0 invert" />}
        <button onClick={() => setCollapsed(!collapsed)} className="text-white/50 hover:text-white p-1 hidden lg:block">
          {collapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        {NAV_ITEMS.map((item) => (
          <div key={item.label}>
            {item.children ? (
              <>
                <button
                  onClick={() => toggleSection(item.label)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    isActive(item.href) ? 'bg-[#2f6c44]/30 text-[#c8a849]' : 'text-white/60 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <item.icon className="w-5 h-5 flex-shrink-0" />
                  {!collapsed && (
                    <>
                      <span className="flex-1 text-left">{item.label}</span>
                      <ChevronRight className={`w-4 h-4 transition-transform ${expandedSection === item.label ? 'rotate-90' : ''}`} />
                    </>
                  )}
                </button>
                {!collapsed && expandedSection === item.label && (
                  <div className="ml-8 mt-1 space-y-1">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        to={child.href}
                        onClick={() => setMobileOpen(false)}
                        className={`block px-4 py-2 rounded-lg text-xs font-medium transition-all ${
                          location.pathname === child.href ? 'text-[#c8a849] bg-[#c8a849]/10' : 'text-white/40 hover:text-white/70'
                        }`}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <Link
                to={item.href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  isActive(item.href) ? 'bg-[#2f6c44]/30 text-[#c8a849]' : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                {!collapsed && <span>{item.label}</span>}
              </Link>
            )}
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-white/5">
        {!collapsed && (
          <div className="flex items-center gap-3 mb-3 px-2">
            <div className="w-9 h-9 rounded-full bg-[#c8a849]/20 flex items-center justify-center text-[#c8a849] text-sm font-bold">
              {(username || 'A')[0].toUpperCase()}
            </div>
            <div>
              <p className="text-sm font-bold text-white/80">{username}</p>
              <p className="text-[10px] text-white/30">Administrateur</p>
            </div>
          </div>
        )}
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-red-400/70 hover:text-red-400 hover:bg-red-400/5 transition-all"
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          {!collapsed && <span>Déconnexion</span>}
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block flex-shrink-0">
        <Sidebar />
      </div>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setMobileOpen(false)} />
          <div className="relative h-full w-72 z-10">
            <Sidebar />
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-4">
            <button onClick={() => setMobileOpen(true)} className="lg:hidden text-gray-500 hover:text-gray-900">
              <Menu className="w-6 h-6" />
            </button>
            <h1 className="text-lg font-bold text-gray-900">
              {NAV_ITEMS.find(i => isActive(i.href))?.label || 'Admin'}
            </h1>
          </div>
          <Link to="/" target="_blank" className="text-sm text-[#2f6c44] font-semibold hover:underline">
            ← Voir le site
          </Link>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
