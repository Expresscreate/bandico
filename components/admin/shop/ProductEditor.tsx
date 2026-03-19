import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Save, ArrowLeft, Loader2, Plus, X, Flame } from 'lucide-react';
import { productsAPI } from '../../../lib/api';
import ImageUploader from '../shared/ImageUploader';

const CATEGORIES = ['Electronics', 'Fashion', 'Sports', 'Beauty', 'Computer', 'Maison & Bureau'];

const ProductEditor: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditing = !!id;

  const [form, setForm] = useState({
    name: '', category: CATEGORIES[0], price: 0, price_formatted: '',
    short_description: '', full_description: '', image_url: '',
    features: [] as string[], specifications: {} as Record<string, string>,
    is_hot: false, published: true, sort_order: 0,
  });
  const [newFeature, setNewFeature] = useState('');
  const [newSpecKey, setNewSpecKey] = useState('');
  const [newSpecVal, setNewSpecVal] = useState('');
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (isEditing) {
      setLoading(true);
      productsAPI.get(id!).then((p) => setForm({
        name: p.name || '', category: p.category || CATEGORIES[0],
        price: p.price || 0, price_formatted: p.price_formatted || '',
        short_description: p.short_description || '', full_description: p.full_description || '',
        image_url: p.image_url || '', features: p.features || [],
        specifications: p.specifications || {}, is_hot: !!p.is_hot,
        published: p.published !== undefined ? !!p.published : true, sort_order: p.sort_order || 0,
      })).catch(() => navigate('/admin/shop')).finally(() => setLoading(false));
    }
  }, [id]);

  const handleSave = async () => {
    if (!form.name.trim()) return;
    setSaving(true);
    try {
      if (isEditing) { await productsAPI.update(id!, form); } 
      else { await productsAPI.create(form); }
      navigate('/admin/shop');
    } catch (err) { console.error(err); } 
    finally { setSaving(false); }
  };

  const u = (field: string, value: any) => setForm(prev => ({ ...prev, [field]: value }));

  const addFeature = () => { if (newFeature.trim()) { u('features', [...form.features, newFeature.trim()]); setNewFeature(''); }};
  const removeFeature = (i: number) => u('features', form.features.filter((_, idx) => idx !== i));
  const addSpec = () => { if (newSpecKey.trim()) { u('specifications', { ...form.specifications, [newSpecKey.trim()]: newSpecVal.trim() }); setNewSpecKey(''); setNewSpecVal(''); }};
  const removeSpec = (key: string) => { const s = { ...form.specifications }; delete s[key]; u('specifications', s); };

  // Auto-format price
  useEffect(() => {
    if (form.price > 0) u('price_formatted', form.price.toLocaleString('fr-FR') + ' FCFA');
  }, [form.price]);

  if (loading) return <div className="flex items-center justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-gray-400" /></div>;

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/admin/shop')} className="p-2 text-gray-400 hover:text-gray-900 rounded-lg"><ArrowLeft className="w-5 h-5" /></button>
          <h2 className="text-2xl font-extrabold text-gray-900">{isEditing ? 'Modifier le Produit' : 'Nouveau Produit'}</h2>
        </div>
        <button onClick={handleSave} disabled={saving || !form.name.trim()} className="bg-[#2f6c44] hover:bg-[#1a4a2b] text-white font-bold px-6 py-3 rounded-xl flex items-center gap-2 disabled:opacity-50 self-start">
          {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />} {saving ? 'Enregistrement...' : 'Enregistrer'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Info */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Nom du produit</label>
              <input type="text" value={form.name} onChange={(e) => u('name', e.target.value)} placeholder="Ex: 3D Television"
                className="w-full text-xl font-bold border-none outline-none placeholder:text-gray-300 bg-transparent" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Catégorie</label>
                <select value={form.category} onChange={(e) => u('category', e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#2f6c44]/20 bg-white">
                  {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Prix (FCFA)</label>
                <input type="number" value={form.price} onChange={(e) => u('price', parseInt(e.target.value) || 0)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#2f6c44]/20" />
              </div>
            </div>
          </div>

          {/* Descriptions */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Description courte</label>
              <textarea value={form.short_description} onChange={(e) => u('short_description', e.target.value)} rows={2}
                className="w-full border border-gray-200 rounded-xl p-4 text-sm outline-none resize-y focus:ring-2 focus:ring-[#2f6c44]/20" />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Description complète</label>
              <textarea value={form.full_description} onChange={(e) => u('full_description', e.target.value)} rows={6}
                className="w-full border border-gray-200 rounded-xl p-4 text-sm outline-none resize-y focus:ring-2 focus:ring-[#2f6c44]/20" />
            </div>
          </div>

          {/* Features */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <label className="block text-sm font-bold text-gray-700 mb-3">Caractéristiques</label>
            <div className="flex flex-wrap gap-2 mb-3">
              {form.features.map((f, i) => (
                <span key={i} className="bg-gray-100 text-gray-700 text-xs font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1">
                  {f} <button onClick={() => removeFeature(i)}><X className="w-3 h-3 text-gray-400 hover:text-red-500" /></button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input type="text" value={newFeature} onChange={(e) => setNewFeature(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && addFeature()}
                placeholder="Ajouter..." className="flex-1 border border-gray-200 rounded-xl px-4 py-2 text-sm outline-none" />
              <button onClick={addFeature} className="bg-gray-100 px-3 rounded-xl hover:bg-gray-200"><Plus className="w-4 h-4" /></button>
            </div>
          </div>

          {/* Specifications */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <label className="block text-sm font-bold text-gray-700 mb-3">Spécifications</label>
            {Object.entries(form.specifications).map(([key, val]) => (
              <div key={key} className="flex items-center gap-3 mb-2 bg-gray-50 rounded-lg px-3 py-2">
                <span className="text-xs font-bold text-gray-500 w-24">{key}</span>
                <span className="text-xs text-gray-700 flex-1">{val}</span>
                <button onClick={() => removeSpec(key)}><X className="w-3 h-3 text-gray-400 hover:text-red-500" /></button>
              </div>
            ))}
            <div className="flex gap-2 mt-2">
              <input type="text" value={newSpecKey} onChange={(e) => setNewSpecKey(e.target.value)} placeholder="Clé" className="w-28 border border-gray-200 rounded-xl px-3 py-2 text-xs outline-none" />
              <input type="text" value={newSpecVal} onChange={(e) => setNewSpecVal(e.target.value)} placeholder="Valeur" className="flex-1 border border-gray-200 rounded-xl px-3 py-2 text-xs outline-none" />
              <button onClick={addSpec} className="bg-gray-100 px-3 rounded-xl hover:bg-gray-200"><Plus className="w-4 h-4" /></button>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <ImageUploader value={form.image_url} onChange={(url) => u('image_url', url)} label="Image du Produit" />
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
            <h3 className="font-bold text-gray-900">Options</h3>
            <label className="flex items-center justify-between cursor-pointer">
              <span className="flex items-center gap-2 text-sm font-semibold text-gray-700"><Flame className={`w-4 h-4 ${form.is_hot ? 'text-red-500' : 'text-gray-400'}`} /> Hot / Tendance</span>
              <input type="checkbox" checked={form.is_hot} onChange={(e) => u('is_hot', e.target.checked)}
                className="w-10 h-6 rounded-full appearance-none bg-gray-200 checked:bg-red-500 transition-colors cursor-pointer relative before:content-[''] before:absolute before:top-1 before:left-1 before:w-4 before:h-4 before:bg-white before:rounded-full before:transition-transform checked:before:translate-x-4" />
            </label>
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-sm font-semibold text-gray-700">Publié</span>
              <input type="checkbox" checked={form.published} onChange={(e) => u('published', e.target.checked)}
                className="w-10 h-6 rounded-full appearance-none bg-gray-200 checked:bg-[#2f6c44] transition-colors cursor-pointer relative before:content-[''] before:absolute before:top-1 before:left-1 before:w-4 before:h-4 before:bg-white before:rounded-full before:transition-transform checked:before:translate-x-4" />
            </label>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Ordre d'affichage</label>
              <input type="number" value={form.sort_order} onChange={(e) => u('sort_order', parseInt(e.target.value) || 0)}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductEditor;
