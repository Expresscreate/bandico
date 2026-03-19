import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Save, ArrowLeft, Loader2, Plus, X } from 'lucide-react';
import { coursesAPI } from '../../../lib/api';
import ImageUploader from '../shared/ImageUploader';

const AXES = [
  'Conception & Architecture MEAL',
  'Collecte & Digitalisation',
  'Analyse & Visualisation',
  'Redevabilité & Éthique',
  'Leadership & Gestion MEAL'
];
const LEVELS = ['Débutant', 'Intermédiaire', 'Avancé', 'Expert'];
const TYPES = ['module', 'programme'];

const CourseEditor: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditing = !!id;

  const [form, setForm] = useState({
    title: '', type: 'module', axe: AXES[0], level: LEVELS[0],
    price: '', duration: '', description: '', objectives: [] as string[],
    image_url: '', published: true, sort_order: 0,
  });
  const [newObjective, setNewObjective] = useState('');
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (isEditing) {
      setLoading(true);
      coursesAPI.get(id!).then((c) => setForm({
        title: c.title || '', type: c.type || 'module', axe: c.axe || AXES[0],
        level: c.level || LEVELS[0], price: c.price || '', duration: c.duration || '',
        description: c.description || '', objectives: c.objectives || [],
        image_url: c.image_url || '', published: c.published !== undefined ? !!c.published : true,
        sort_order: c.sort_order || 0,
      })).catch(() => navigate('/admin/formations')).finally(() => setLoading(false));
    }
  }, [id]);

  const handleSave = async () => {
    if (!form.title.trim()) return;
    setSaving(true);
    try {
      if (isEditing) { await coursesAPI.update(id!, form); }
      else { await coursesAPI.create(form); }
      navigate('/admin/formations');
    } catch (err) { console.error(err); }
    finally { setSaving(false); }
  };

  const u = (field: string, value: any) => setForm(prev => ({ ...prev, [field]: value }));
  const addObjective = () => { if (newObjective.trim()) { u('objectives', [...form.objectives, newObjective.trim()]); setNewObjective(''); }};
  const removeObjective = (i: number) => u('objectives', form.objectives.filter((_, idx) => idx !== i));

  if (loading) return <div className="flex items-center justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-gray-400" /></div>;

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/admin/formations')} className="p-2 text-gray-400 hover:text-gray-900 rounded-lg"><ArrowLeft className="w-5 h-5" /></button>
          <h2 className="text-2xl font-extrabold text-gray-900">{isEditing ? 'Modifier le Cours' : 'Nouveau Cours'}</h2>
        </div>
        <button onClick={handleSave} disabled={saving || !form.title.trim()} className="bg-[#2f6c44] hover:bg-[#1a4a2b] text-white font-bold px-6 py-3 rounded-xl flex items-center gap-2 disabled:opacity-50 self-start">
          {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />} {saving ? 'Enregistrement...' : 'Enregistrer'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Titre du cours</label>
              <input type="text" value={form.title} onChange={(e) => u('title', e.target.value)} placeholder="Ex: Introduction au cadre logique"
                className="w-full text-xl font-bold border-none outline-none placeholder:text-gray-300 bg-transparent" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Type</label>
                <select value={form.type} onChange={(e) => u('type', e.target.value)} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none bg-white">
                  {TYPES.map(t => <option key={t} value={t}>{t === 'module' ? 'Module Individuel' : 'Programme Complet'}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Axe Stratégique</label>
                <select value={form.axe} onChange={(e) => u('axe', e.target.value)} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none bg-white">
                  {AXES.map(a => <option key={a}>{a}</option>)}
                </select>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Niveau</label>
                <select value={form.level} onChange={(e) => u('level', e.target.value)} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none bg-white">
                  {LEVELS.map(l => <option key={l}>{l}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Prix</label>
                <input type="text" value={form.price} onChange={(e) => u('price', e.target.value)} placeholder="50,000 FCFA"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Durée</label>
                <input type="text" value={form.duration} onChange={(e) => u('duration', e.target.value)} placeholder="12 heures"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <label className="block text-sm font-bold text-gray-700 mb-1">Description</label>
            <textarea value={form.description} onChange={(e) => u('description', e.target.value)} rows={8}
              className="w-full border border-gray-200 rounded-xl p-4 text-sm outline-none resize-y focus:ring-2 focus:ring-[#2f6c44]/20" />
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <label className="block text-sm font-bold text-gray-700 mb-3">Objectifs d'apprentissage</label>
            {form.objectives.map((obj, i) => (
              <div key={i} className="flex items-center gap-2 mb-2 bg-gray-50 rounded-lg px-3 py-2">
                <span className="text-xs font-bold text-[#2f6c44] w-6">{i + 1}.</span>
                <span className="text-sm text-gray-700 flex-1">{obj}</span>
                <button onClick={() => removeObjective(i)}><X className="w-3 h-3 text-gray-400 hover:text-red-500" /></button>
              </div>
            ))}
            <div className="flex gap-2 mt-2">
              <input type="text" value={newObjective} onChange={(e) => setNewObjective(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && addObjective()}
                placeholder="Ajouter un objectif..." className="flex-1 border border-gray-200 rounded-xl px-4 py-2 text-sm outline-none" />
              <button onClick={addObjective} className="bg-gray-100 px-3 rounded-xl hover:bg-gray-200"><Plus className="w-4 h-4" /></button>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <ImageUploader value={form.image_url} onChange={(url) => u('image_url', url)} label="Image du Cours" />
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
            <h3 className="font-bold text-gray-900">Options</h3>
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-sm font-semibold text-gray-700">Publié</span>
              <input type="checkbox" checked={form.published} onChange={(e) => u('published', e.target.checked)}
                className="w-10 h-6 rounded-full appearance-none bg-gray-200 checked:bg-[#2f6c44] transition-colors cursor-pointer relative before:content-[''] before:absolute before:top-1 before:left-1 before:w-4 before:h-4 before:bg-white before:rounded-full before:transition-transform checked:before:translate-x-4" />
            </label>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Ordre</label>
              <input type="number" value={form.sort_order} onChange={(e) => u('sort_order', parseInt(e.target.value) || 0)}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseEditor;
