import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Save, ArrowLeft, Loader2, Eye, EyeOff, Star } from 'lucide-react';
import { blogAPI } from '../../../lib/api';
import ImageUploader from '../shared/ImageUploader';

const CATEGORIES = ['Actualités', 'Expertise MEAL', 'Impact Social', 'Bonnes Pratiques', 'Technologies', 'Environnement'];

const BlogEditor: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditing = !!id;

  const [form, setForm] = useState({
    title: '',
    excerpt: '',
    content: '',
    category: 'Actualités',
    author: '',
    image_url: '',
    featured: false,
    published: true,
    read_time: '3 min',
  });
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (isEditing) {
      setLoading(true);
      blogAPI.get(id!)
        .then((post) => setForm({
          title: post.title || '',
          excerpt: post.excerpt || '',
          content: post.content || '',
          category: post.category || 'Actualités',
          author: post.author || '',
          image_url: post.image_url || '',
          featured: !!post.featured,
          published: !!post.published,
          read_time: post.read_time || '3 min',
        }))
        .catch(() => navigate('/admin/blog'))
        .finally(() => setLoading(false));
    }
  }, [id]);

  const handleSave = async () => {
    if (!form.title.trim()) return;
    setSaving(true);
    try {
      if (isEditing) {
        await blogAPI.update(id!, form);
      } else {
        await blogAPI.create(form);
      }
      navigate('/admin/blog');
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const updateField = (field: string, value: any) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  // Auto-calculate read time from content
  useEffect(() => {
    const words = form.content.split(/\s+/).filter(Boolean).length;
    const minutes = Math.max(1, Math.ceil(words / 200));
    updateField('read_time', `${minutes} min`);
  }, [form.content]);

  if (loading) {
    return <div className="flex items-center justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-gray-400" /></div>;
  }

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/admin/blog')} className="p-2 text-gray-400 hover:text-gray-900 rounded-lg transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h2 className="text-2xl font-extrabold text-gray-900">
            {isEditing ? 'Modifier l\'Article' : 'Nouvel Article'}
          </h2>
        </div>
        <button
          onClick={handleSave}
          disabled={saving || !form.title.trim()}
          className="bg-[#2f6c44] hover:bg-[#1a4a2b] text-white font-bold px-6 py-3 rounded-xl flex items-center gap-2 transition-colors disabled:opacity-50 self-start"
        >
          {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
          {saving ? 'Enregistrement...' : 'Enregistrer'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content (2/3) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Title */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <label className="block text-sm font-bold text-gray-700 mb-2">Titre de l'article</label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => updateField('title', e.target.value)}
              placeholder="Entrez le titre de l'article..."
              className="w-full text-2xl font-bold text-gray-900 border-none outline-none placeholder:text-gray-300 bg-transparent"
            />
          </div>

          {/* Excerpt */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <label className="block text-sm font-bold text-gray-700 mb-2">Extrait / Résumé</label>
            <textarea
              value={form.excerpt}
              onChange={(e) => updateField('excerpt', e.target.value)}
              rows={3}
              placeholder="Un court résumé de l'article..."
              className="w-full text-gray-600 border border-gray-200 rounded-xl p-4 outline-none focus:ring-2 focus:ring-[#2f6c44]/20 resize-y font-light"
            />
          </div>

          {/* Content (WYSIWYG area) */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <label className="block text-sm font-bold text-gray-700 mb-2">Contenu de l'article</label>
            <p className="text-xs text-gray-400 mb-3">Utilisez la syntaxe Markdown : ### pour les titres, **gras**, - pour les listes</p>
            <textarea
              value={form.content}
              onChange={(e) => updateField('content', e.target.value)}
              rows={20}
              placeholder="Écrivez le contenu complet de votre article ici...&#10;&#10;### Sous-titre&#10;&#10;Votre texte avec **mots en gras**&#10;&#10;- Point 1&#10;- Point 2"
              className="w-full text-gray-700 border border-gray-200 rounded-xl p-4 outline-none focus:ring-2 focus:ring-[#2f6c44]/20 resize-y font-mono text-sm leading-relaxed"
            />
            <p className="text-xs text-gray-400 mt-2">Temps de lecture estimé : {form.read_time}</p>
          </div>
        </div>

        {/* Sidebar (1/3) */}
        <div className="space-y-6">
          {/* Featured Image */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <ImageUploader value={form.image_url} onChange={(url) => updateField('image_url', url)} label="Image à la Une" />
          </div>

          {/* Meta */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
            <h3 className="font-bold text-gray-900">Paramètres</h3>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Catégorie</label>
              <select
                value={form.category}
                onChange={(e) => updateField('category', e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#2f6c44]/20 bg-white"
              >
                {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Auteur</label>
              <input
                type="text"
                value={form.author}
                onChange={(e) => updateField('author', e.target.value)}
                placeholder="Nom de l'auteur"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#2f6c44]/20"
              />
            </div>

            {/* Toggles */}
            <div className="space-y-3 pt-4 border-t border-gray-100">
              <label className="flex items-center justify-between cursor-pointer group">
                <span className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  {form.published ? <Eye className="w-4 h-4 text-green-500" /> : <EyeOff className="w-4 h-4 text-gray-400" />}
                  Publié
                </span>
                <input type="checkbox" checked={form.published} onChange={(e) => updateField('published', e.target.checked)}
                  className="w-10 h-6 rounded-full appearance-none bg-gray-200 checked:bg-[#2f6c44] transition-colors cursor-pointer relative
                  before:content-[''] before:absolute before:top-1 before:left-1 before:w-4 before:h-4 before:bg-white before:rounded-full before:transition-transform checked:before:translate-x-4"
                />
              </label>
              <label className="flex items-center justify-between cursor-pointer group">
                <span className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <Star className={`w-4 h-4 ${form.featured ? 'text-[#c8a849]' : 'text-gray-400'}`} />
                  Article Vedette
                </span>
                <input type="checkbox" checked={form.featured} onChange={(e) => updateField('featured', e.target.checked)}
                  className="w-10 h-6 rounded-full appearance-none bg-gray-200 checked:bg-[#c8a849] transition-colors cursor-pointer relative
                  before:content-[''] before:absolute before:top-1 before:left-1 before:w-4 before:h-4 before:bg-white before:rounded-full before:transition-transform checked:before:translate-x-4"
                />
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogEditor;
