// API Client for Bandico CMS
const API_BASE = '/api';

// ========== Auth ==========
let authToken: string | null = null;

export const setToken = (token: string | null) => {
  authToken = token;
  if (token) {
    localStorage.setItem('bandico_admin_token', token);
  } else {
    localStorage.removeItem('bandico_admin_token');
  }
};

export const getToken = (): string | null => {
  if (authToken) return authToken;
  authToken = localStorage.getItem('bandico_admin_token');
  return authToken;
};

const authHeaders = (): Record<string, string> => {
  const token = getToken();
  return token ? { 'Authorization': `Bearer ${token}` } : {};
};

// ========== Generic fetch helpers ==========
async function fetchJSON<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${url}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...authHeaders(),
      ...options?.headers,
    },
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({ error: 'Request failed' }));
    throw new Error((error as any).error || `HTTP ${res.status}`);
  }
  return res.json();
}

// ========== Auth API ==========
export const authAPI = {
  login: (username: string, password: string) => 
    fetchJSON<{ token: string; username: string }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    }),
  me: () => fetchJSON<{ user: any }>('/auth/me'),
};

// ========== Blog API ==========
export const blogAPI = {
  list: () => fetchJSON<any[]>('/blog'),
  get: (id: string) => fetchJSON<any>(`/blog/${id}`),
  adminList: () => fetchJSON<any[]>('/admin/blog'),
  create: (data: any) => fetchJSON<{ id: string }>('/admin/blog', {
    method: 'POST', body: JSON.stringify(data),
  }),
  update: (id: string, data: any) => fetchJSON<any>(`/admin/blog/${id}`, {
    method: 'PUT', body: JSON.stringify(data),
  }),
  delete: (id: string) => fetchJSON<any>(`/admin/blog/${id}`, {
    method: 'DELETE',
  }),
};

// ========== Products API ==========
export const productsAPI = {
  list: () => fetchJSON<any[]>('/products'),
  get: (id: string) => fetchJSON<any>(`/products/${id}`),
  adminList: () => fetchJSON<any[]>('/admin/products'),
  create: (data: any) => fetchJSON<{ id: string }>('/admin/products', {
    method: 'POST', body: JSON.stringify(data),
  }),
  update: (id: string, data: any) => fetchJSON<any>(`/admin/products/${id}`, {
    method: 'PUT', body: JSON.stringify(data),
  }),
  delete: (id: string) => fetchJSON<any>(`/admin/products/${id}`, {
    method: 'DELETE',
  }),
};

// ========== Product Categories API ==========
export const categoriesAPI = {
  list: () => fetchJSON<any[]>('/product-categories'),
  create: (data: any) => fetchJSON<{ id: string }>('/admin/product-categories', {
    method: 'POST', body: JSON.stringify(data),
  }),
  update: (id: string, data: any) => fetchJSON<any>(`/admin/product-categories/${id}`, {
    method: 'PUT', body: JSON.stringify(data),
  }),
  delete: (id: string) => fetchJSON<any>(`/admin/product-categories/${id}`, {
    method: 'DELETE',
  }),
};

// ========== Courses API ==========
export const coursesAPI = {
  list: () => fetchJSON<any[]>('/courses'),
  get: (id: string) => fetchJSON<any>(`/courses/${id}`),
  adminList: () => fetchJSON<any[]>('/admin/courses'),
  create: (data: any) => fetchJSON<{ id: string }>('/admin/courses', {
    method: 'POST', body: JSON.stringify(data),
  }),
  update: (id: string, data: any) => fetchJSON<any>(`/admin/courses/${id}`, {
    method: 'PUT', body: JSON.stringify(data),
  }),
  delete: (id: string) => fetchJSON<any>(`/admin/courses/${id}`, {
    method: 'DELETE',
  }),
};

// ========== Settings API ==========
export const settingsAPI = {
  getAll: () => fetchJSON<Record<string, string>>('/settings'),
  get: (key: string) => fetchJSON<{ key: string; value: string }>(`/settings/${key}`),
  update: (data: Record<string, string>) => fetchJSON<any>('/admin/settings', {
    method: 'PUT', body: JSON.stringify(data),
  }),
};

// ========== Stats API ==========
export const statsAPI = {
  get: () => fetchJSON<{ blog_posts: number; products: number; courses: number }>('/admin/stats'),
};

// ========== Image Upload ==========
export const uploadImage = async (file: File): Promise<{ url: string; key: string }> => {
  const formData = new FormData();
  formData.append('file', file);
  
  const res = await fetch(`${API_BASE}/admin/upload`, {
    method: 'POST',
    headers: authHeaders(),
    body: formData,
  });
  
  if (!res.ok) throw new Error('Upload failed');
  return res.json();
};
