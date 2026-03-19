import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit, Trash2, Eye, EyeOff, Star, Search, Loader2 } from 'lucide-react';
import { blogAPI } from '../../../lib/api';

const BlogList: React.FC = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const fetchPosts = () => {
    setLoading(true);
    blogAPI.adminList()
      .then(setPosts)
      .catch(() => setPosts([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchPosts(); }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Supprimer cet article ?')) return;
    await blogAPI.delete(id);
    fetchPosts();
  };

  const filtered = posts.filter(p => 
    p.title?.toLowerCase().includes(search.toLowerCase()) ||
    p.category?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-gray-900">Articles du Blog</h2>
          <p className="text-sm text-gray-500 font-light">{posts.length} article(s) au total</p>
        </div>
        <Link to="/admin/blog/new" className="bg-[#2f6c44] hover:bg-[#1a4a2b] text-white font-bold px-5 py-3 rounded-xl flex items-center gap-2 transition-colors self-start">
          <Plus className="w-5 h-5" /> Nouvel Article
        </Link>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Rechercher..."
          className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#2f6c44]/20"
        />
      </div>

      {loading ? (
        <div className="text-center py-20"><Loader2 className="w-8 h-8 animate-spin text-gray-400 mx-auto" /></div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
          <p className="text-gray-500">Aucun article trouvé</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 text-left">
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Article</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase hidden md:table-cell">Catégorie</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase hidden lg:table-cell">Date</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase text-center">Statut</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((post) => (
                <tr key={post.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      {post.image_url && (
                        <img src={post.image_url} alt="" className="w-12 h-12 rounded-lg object-cover flex-shrink-0" />
                      )}
                      <div>
                        <p className="font-bold text-gray-900 text-sm">{post.title}</p>
                        <p className="text-xs text-gray-400 mt-1 line-clamp-1">{post.excerpt}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 hidden md:table-cell">
                    <span className="text-xs font-semibold bg-gray-100 text-gray-600 px-3 py-1 rounded-full">{post.category}</span>
                  </td>
                  <td className="px-6 py-4 text-xs text-gray-400 hidden lg:table-cell">{post.created_at?.slice(0, 10)}</td>
                  <td className="px-6 py-4 text-center">
                    {post.published ? (
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-green-600 bg-green-50 px-3 py-1 rounded-full"><Eye className="w-3 h-3" /> Publié</span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-gray-400 bg-gray-100 px-3 py-1 rounded-full"><EyeOff className="w-3 h-3" /> Brouillon</span>
                    )}
                    {post.featured ? <Star className="w-4 h-4 text-[#c8a849] inline ml-2" /> : null}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link to={`/admin/blog/${post.id}/edit`} className="p-2 text-gray-400 hover:text-[#2f6c44] hover:bg-[#2f6c44]/5 rounded-lg transition-colors">
                        <Edit className="w-4 h-4" />
                      </Link>
                      <button onClick={() => handleDelete(post.id)} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default BlogList;
