import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit, Trash2, Loader2, Search, GraduationCap } from 'lucide-react';
import { coursesAPI } from '../../../lib/api';

const CourseList: React.FC = () => {
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const fetchCourses = () => {
    setLoading(true);
    coursesAPI.adminList()
      .then(setCourses)
      .catch(() => setCourses([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchCourses(); }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Supprimer ce cours ?')) return;
    await coursesAPI.delete(id);
    fetchCourses();
  };

  const filtered = courses.filter(c =>
    c.title?.toLowerCase().includes(search.toLowerCase()) ||
    c.axe?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-gray-900">Formations</h2>
          <p className="text-sm text-gray-500 font-light">{courses.length} cours au total</p>
        </div>
        <Link to="/admin/formations/new" className="bg-[#2f6c44] hover:bg-[#1a4a2b] text-white font-bold px-5 py-3 rounded-xl flex items-center gap-2 transition-colors self-start">
          <Plus className="w-5 h-5" /> Nouveau Cours
        </Link>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Rechercher..."
          className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#2f6c44]/20" />
      </div>

      {loading ? (
        <div className="text-center py-20"><Loader2 className="w-8 h-8 animate-spin text-gray-400 mx-auto" /></div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
          <GraduationCap className="w-12 h-12 text-gray-200 mx-auto mb-4" />
          <p className="text-gray-500">Aucun cours trouvé</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 text-left">
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Cours</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase hidden md:table-cell">Axe</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase hidden lg:table-cell">Type</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase hidden lg:table-cell">Prix</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(course => (
                <tr key={course.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      {course.image_url && <img src={course.image_url} alt="" className="w-10 h-10 rounded-lg object-cover flex-shrink-0" />}
                      <div>
                        <p className="font-bold text-gray-900 text-sm">{course.title}</p>
                        <p className="text-xs text-gray-400">{course.level} · {course.duration}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 hidden md:table-cell">
                    <span className="text-xs font-semibold bg-[#2f6c44]/10 text-[#2f6c44] px-3 py-1 rounded-full">{course.axe?.split(' ')[0]}</span>
                  </td>
                  <td className="px-6 py-4 text-xs text-gray-500 capitalize hidden lg:table-cell">{course.type}</td>
                  <td className="px-6 py-4 text-sm font-bold text-gray-900 hidden lg:table-cell">{course.price}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link to={`/admin/formations/${course.id}/edit`} className="p-2 text-gray-400 hover:text-[#2f6c44] hover:bg-[#2f6c44]/5 rounded-lg transition-colors">
                        <Edit className="w-4 h-4" />
                      </Link>
                      <button onClick={() => handleDelete(course.id)} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
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

export default CourseList;
