import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit, Trash2, Eye, EyeOff, Search, Loader2, Flame } from 'lucide-react';
import { productsAPI } from '../../../lib/api';

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const fetchProducts = () => {
    setLoading(true);
    productsAPI.adminList()
      .then(setProducts)
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchProducts(); }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Supprimer ce produit ?')) return;
    await productsAPI.delete(id);
    fetchProducts();
  };

  const filtered = products.filter(p =>
    p.name?.toLowerCase().includes(search.toLowerCase()) ||
    p.category?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-gray-900">Produits</h2>
          <p className="text-sm text-gray-500 font-light">{products.length} produit(s) au total</p>
        </div>
        <div className="flex gap-3 self-start">
          <Link to="/admin/shop/categories" className="border border-gray-200 text-gray-700 font-bold px-5 py-3 rounded-xl flex items-center gap-2 hover:bg-gray-50 transition-colors">
            Catégories
          </Link>
          <Link to="/admin/shop/new" className="bg-[#2f6c44] hover:bg-[#1a4a2b] text-white font-bold px-5 py-3 rounded-xl flex items-center gap-2 transition-colors">
            <Plus className="w-5 h-5" /> Nouveau
          </Link>
        </div>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Rechercher..."
          className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#2f6c44]/20" />
      </div>

      {loading ? (
        <div className="text-center py-20"><Loader2 className="w-8 h-8 animate-spin text-gray-400 mx-auto" /></div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(product => (
            <div key={product.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              {product.image_url && (
                <div className="h-40 overflow-hidden relative">
                  <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
                  {product.is_hot ? <span className="absolute top-3 right-3 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1"><Flame className="w-3 h-3" /> Hot</span> : null}
                  {!product.published && <span className="absolute top-3 left-3 bg-gray-800 text-white text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1"><EyeOff className="w-3 h-3" /> Masqué</span>}
                </div>
              )}
              <div className="p-5">
                <p className="text-xs text-gray-400 font-semibold mb-1">{product.category}</p>
                <h3 className="font-bold text-gray-900 mb-2">{product.name}</h3>
                <p className="text-lg font-black text-[#2f6c44] mb-4">{product.price_formatted}</p>
                <div className="flex gap-2">
                  <Link to={`/admin/shop/${product.id}/edit`} className="flex-1 text-center text-sm font-semibold bg-gray-50 hover:bg-gray-100 py-2 rounded-lg transition-colors flex items-center justify-center gap-1 text-gray-600">
                    <Edit className="w-3.5 h-3.5" /> Modifier
                  </Link>
                  <button onClick={() => handleDelete(product.id)} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;
