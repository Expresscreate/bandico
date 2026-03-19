import React, { useEffect, useState } from 'react';
import { Save, Loader2, RefreshCw } from 'lucide-react';
import { settingsAPI } from '../../../lib/api';
import ImageUploader from '../shared/ImageUploader';

interface SectionConfig {
  title: string;
  fields: { key: string; label: string; type: 'text' | 'textarea' | 'image' | 'color' }[];
}

const HOME_SECTIONS: SectionConfig[] = [
  {
    title: 'Hero (Bannière Principale)',
    fields: [
      { key: 'hero_badge', label: 'Texte du badge', type: 'text' },
      { key: 'hero_title', label: 'Titre principal', type: 'textarea' },
      { key: 'hero_subtitle', label: 'Sous-titre', type: 'textarea' },
      { key: 'hero_bg_image', label: 'Image de fond', type: 'image' },
      { key: 'hero_cta1_text', label: 'Bouton CTA 1 — Texte', type: 'text' },
      { key: 'hero_cta2_text', label: 'Bouton CTA 2 — Texte', type: 'text' },
    ]
  },
  {
    title: 'Trois Forces (Section 2)',
    fields: [
      { key: 'forces_badge', label: 'Badge', type: 'text' },
      { key: 'forces_title', label: 'Titre', type: 'text' },
      { key: 'forces_subtitle', label: 'Sous-titre', type: 'textarea' },
    ]
  },
  {
    title: 'Impact (Chiffres)',
    fields: [
      { key: 'impact_stat1_value', label: 'Stat 1 — Valeur', type: 'text' },
      { key: 'impact_stat1_label', label: 'Stat 1 — Label', type: 'text' },
      { key: 'impact_stat2_value', label: 'Stat 2 — Valeur', type: 'text' },
      { key: 'impact_stat2_label', label: 'Stat 2 — Label', type: 'text' },
      { key: 'impact_stat3_value', label: 'Stat 3 — Valeur', type: 'text' },
      { key: 'impact_stat3_label', label: 'Stat 3 — Label', type: 'text' },
      { key: 'impact_stat4_value', label: 'Stat 4 — Valeur', type: 'text' },
      { key: 'impact_stat4_label', label: 'Stat 4 — Label', type: 'text' },
    ]
  },
  {
    title: 'Adhésion (Membership)',
    fields: [
      { key: 'membership_title', label: 'Titre', type: 'text' },
      { key: 'membership_subtitle', label: 'Sous-titre', type: 'textarea' },
    ]
  },
];

const CONTACT_SECTIONS: SectionConfig[] = [
  {
    title: 'Informations de Contact',
    fields: [
      { key: 'contact_phone', label: 'Téléphone', type: 'text' },
      { key: 'contact_email', label: 'Email', type: 'text' },
      { key: 'contact_address', label: 'Adresse', type: 'textarea' },
      { key: 'contact_whatsapp', label: 'Numéro WhatsApp', type: 'text' },
      { key: 'contact_hours', label: 'Horaires d\'ouverture', type: 'text' },
    ]
  },
];

interface PageEditorProps {
  page: 'home' | 'contact';
}

const PageEditor: React.FC<PageEditorProps> = ({ page }) => {
  const sections = page === 'home' ? HOME_SECTIONS : CONTACT_SECTIONS;
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [openSection, setOpenSection] = useState<number>(0);

  useEffect(() => {
    setLoading(true);
    settingsAPI.getAll()
      .then(setSettings)
      .catch(() => setSettings({}))
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await settingsAPI.update(settings);
    } catch (err) { console.error(err); }
    finally { setSaving(false); }
  };

  const updateSetting = (key: string, value: string) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  if (loading) return <div className="flex items-center justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-gray-400" /></div>;

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-gray-900">{page === 'home' ? 'Page d\'Accueil' : 'Page Contact'}</h2>
          <p className="text-sm text-gray-500 font-light">Modifiez les textes et images de la page</p>
        </div>
        <button onClick={handleSave} disabled={saving} className="bg-[#2f6c44] hover:bg-[#1a4a2b] text-white font-bold px-6 py-3 rounded-xl flex items-center gap-2 disabled:opacity-50 self-start">
          {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
          {saving ? 'Enregistrement...' : 'Sauvegarder Tout'}
        </button>
      </div>

      <div className="space-y-4">
        {sections.map((section, idx) => (
          <div key={section.title} className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            <button
              onClick={() => setOpenSection(openSection === idx ? -1 : idx)}
              className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-gray-50 transition-colors"
            >
              <h3 className="font-bold text-gray-900">{section.title}</h3>
              <RefreshCw className={`w-4 h-4 text-gray-400 transition-transform ${openSection === idx ? 'rotate-180' : ''}`} />
            </button>
            
            {openSection === idx && (
              <div className="px-6 pb-6 space-y-5 border-t border-gray-50 pt-5">
                {section.fields.map(field => (
                  <div key={field.key}>
                    {field.type === 'image' ? (
                      <ImageUploader value={settings[field.key] || ''} onChange={(url) => updateSetting(field.key, url)} label={field.label} />
                    ) : field.type === 'textarea' ? (
                      <>
                        <label className="block text-sm font-bold text-gray-700 mb-1">{field.label}</label>
                        <textarea
                          value={settings[field.key] || ''}
                          onChange={(e) => updateSetting(field.key, e.target.value)}
                          rows={3}
                          className="w-full border border-gray-200 rounded-xl p-4 text-sm outline-none focus:ring-2 focus:ring-[#2f6c44]/20 resize-y"
                        />
                      </>
                    ) : (
                      <>
                        <label className="block text-sm font-bold text-gray-700 mb-1">{field.label}</label>
                        <input
                          type={field.type === 'color' ? 'color' : 'text'}
                          value={settings[field.key] || ''}
                          onChange={(e) => updateSetting(field.key, e.target.value)}
                          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#2f6c44]/20"
                        />
                      </>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PageEditor;
