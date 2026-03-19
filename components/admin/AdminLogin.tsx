import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import { Lock, User, AlertCircle, Loader2 } from 'lucide-react';

const AdminLogin: React.FC = () => {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(username, password);
    } catch (err: any) {
      setError(err.message || 'Identifiants invalides');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0b1a12] via-[#1a2e22] to-[#0b1a12] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <img src="/logo-bandecolong.png" alt="Bandico Group" className="h-12 mx-auto brightness-0 invert mb-6" />
          <h1 className="text-3xl font-extrabold text-white mb-2">Administration</h1>
          <p className="text-white/50 font-light text-sm">Connectez-vous pour gérer le contenu du site</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 space-y-6 shadow-2xl">
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-xl text-sm flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" /> {error}
            </div>
          )}
          
          <div>
            <label className="block text-white/70 text-xs font-bold mb-2 uppercase tracking-wider">Nom d'utilisateur</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-white/5 border border-white/10 text-white pl-12 pr-4 py-4 rounded-xl focus:ring-2 focus:ring-[#c8a849] focus:border-transparent outline-none transition-all placeholder:text-white/20"
                placeholder="admin"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-white/70 text-xs font-bold mb-2 uppercase tracking-wider">Mot de passe</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/5 border border-white/10 text-white pl-12 pr-4 py-4 rounded-xl focus:ring-2 focus:ring-[#c8a849] focus:border-transparent outline-none transition-all placeholder:text-white/20"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#c8a849] hover:bg-[#d9b854] text-gray-900 font-bold py-4 rounded-xl transition-all shadow-lg disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Se Connecter'}
          </button>
        </form>

        <p className="text-center text-white/20 text-xs mt-8">Bandico Group CMS © 2026</p>
      </div>
    </div>
  );
};

export default AdminLogin;
