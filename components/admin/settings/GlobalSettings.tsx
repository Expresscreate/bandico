import React, { useEffect, useState } from 'react';
import { Save, Loader2 } from 'lucide-react';
import { settingsAPI } from '../../../lib/api';

const SETTINGS_FIELDS = [
  { key: 'site_name', label: 'Nom du site', type: 'text' },
  { key: 'site_description', label: 'Description SEO', type: 'textarea' },
  { key: 'footer_description', label: 'Description du pied de page', type: 'textarea' },
  { key: 'social_facebook', label: 'Lien Facebook', type: 'text' },
  { key: 'social_twitter', label: 'Lien Twitter / X', type: 'text' },
  { key: 'social_linkedin', label: 'Lien LinkedIn', type: 'text' },
  { key: 'social_instagram', label: 'Lien Instagram', type: 'text' },
  { key: 'social_youtube', label: 'Lien YouTube', type: 'text' },
];

const GlobalSettings: React.FC = () => {
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setLoading(true);
    settingsAPI.getAll()
      .then(setSettings)
      .catch(() => setSettings({}))
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try { await settingsAPI.update(settings); }
    catch (err) { console.error(err); }
    finally { setSaving(false); }
  };

  if (loading) return <div className="flex items-center justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-gray-400" /></div>;

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-gray-900">Paramètres Généraux</h2>
          <p className="text-sm text-gray-500 font-light">SEO, réseaux sociaux et configuration globale</p>
        </div>
        <button onClick={handleSave} disabled={saving} className="bg-[#2f6c44] hover:bg-[#1a4a2b] text-white font-bold px-6 py-3 rounded-xl flex items-center gap-2 disabled:opacity-50 self-start">
          {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
          {saving ? 'Enregistrement...' : 'Sauvegarder'}
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-5">
        {SETTINGS_FIELDS.map(field => (
          <div key={field.key}>
            <label className="block text-sm font-bold text-gray-700 mb-1">{field.label}</label>
            {field.type === 'textarea' ? (
              <textarea
                value={settings[field.key] || ''}
                onChange={(e) => setSettings(prev => ({ ...prev, [field.key]: e.target.value }))}
                rows={3}
                className="w-full border border-gray-200 rounded-xl p-4 text-sm outline-none focus:ring-2 focus:ring-[#2f6c44]/20 resize-y"
              />
            ) : (
              <input
                type="text"
                value={settings[field.key] || ''}
                onChange={(e) => setSettings(prev => ({ ...prev, [field.key]: e.target.value }))}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#2f6c44]/20"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GlobalSettings;
