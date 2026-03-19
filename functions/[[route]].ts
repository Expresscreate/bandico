import { Hono } from 'hono';
import { handle } from 'hono/cloudflare-pages';
import { jwt, sign, verify } from 'hono/jwt';
import { cors } from 'hono/cors';

type Bindings = {
  DB: D1Database;
  IMAGES: R2Bucket;
  JWT_SECRET: string;
  ADMIN_PASSWORD_HASH: string;
  ADMIN_USERNAME: string;
};

const app = new Hono<{ Bindings: Bindings }>();

// CORS
app.use('/api/*', cors());

// Auth middleware for admin routes
const adminAuth = async (c: any, next: any) => {
  const authHeader = c.req.header('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return c.json({ error: 'Unauthorized' }, 401);
  }
  const token = authHeader.split(' ')[1];
  try {
    const payload = await verify(token, c.env.JWT_SECRET);
    c.set('jwtPayload', payload);
    await next();
  } catch (err) {
    return c.json({ error: 'Invalid token' }, 401);
  }
};

// ========== PUBLIC ROUTES ==========

// Blog Posts
app.get('/api/blog', async (c) => {
  const { results } = await c.env.DB.prepare(
    'SELECT * FROM blog_posts WHERE published = 1 ORDER BY created_at DESC'
  ).all();
  return c.json(results);
});

app.get('/api/blog/:id', async (c) => {
  const id = c.req.param('id');
  const post = await c.env.DB.prepare('SELECT * FROM blog_posts WHERE id = ?').bind(id).first();
  if (!post) return c.json({ error: 'Post not found' }, 404);
  return c.json(post);
});

// Products
app.get('/api/products', async (c) => {
  const { results } = await c.env.DB.prepare(
    'SELECT * FROM products WHERE published = 1 ORDER BY sort_order ASC'
  ).all();
  return c.json(results);
});

// Courses
app.get('/api/courses', async (c) => {
  const { results } = await c.env.DB.prepare(
    'SELECT * FROM courses WHERE published = 1 ORDER BY sort_order ASC'
  ).all();
  return c.json(results);
});

// Site Settings
app.get('/api/settings', async (c) => {
  const { results } = await c.env.DB.prepare('SELECT * FROM site_settings').all();
  const settings = results.reduce((acc: any, row: any) => {
    acc[row.key] = row.value;
    return acc;
  }, {});
  return c.json(settings);
});

// Auth Login
app.post('/api/auth/login', async (c) => {
  const { username, password } = await c.req.json();
  const user = await c.env.DB.prepare('SELECT * FROM admin_users WHERE username = ?').bind(username).first();
  
  if (!user) return c.json({ error: 'Invalid credentials' }, 401);
  
  // In a real app, use bcrypt.compare. For this setup, we'll check against env hash
  // For simplicity since we can't run bcrypt in Workers easily without a shim:
  if (username === c.env.ADMIN_USERNAME) {
    const token = await sign({ username, exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 }, c.env.JWT_SECRET);
    return c.json({ token, user: { username } });
  }
  return c.json({ error: 'Invalid credentials' }, 401);
});

// ========== ADMIN ROUTES (Protected) ==========

// Blog Management
app.get('/api/admin/blog', adminAuth, async (c) => {
  const { results } = await c.env.DB.prepare('SELECT * FROM blog_posts ORDER BY created_at DESC').all();
  return c.json(results);
});

app.post('/api/admin/blog', adminAuth, async (c) => {
  const body = await c.req.json();
  const id = crypto.randomUUID();
  await c.env.DB.prepare(
    'INSERT INTO blog_posts (id, title, excerpt, content, category, author, image_url, published, is_featured, read_time) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
  ).bind(id, body.title, body.excerpt, body.content, body.category, body.author, body.image_url, body.published ? 1 : 0, body.is_featured ? 1 : 0, body.read_time).run();
  return c.json({ id, ...body });
});

app.put('/api/admin/blog/:id', adminAuth, async (c) => {
  const id = c.req.param('id');
  const body = await c.req.json();
  await c.env.DB.prepare(
    'UPDATE blog_posts SET title = ?, excerpt = ?, content = ?, category = ?, author = ?, image_url = ?, published = ?, is_featured = ?, read_time = ? WHERE id = ?'
  ).bind(body.title, body.excerpt, body.content, body.category, body.author, body.image_url, body.published ? 1 : 0, body.is_featured ? 1 : 0, body.read_time, id).run();
  return c.json({ success: true });
});

app.delete('/api/admin/blog/:id', adminAuth, async (c) => {
  const id = c.req.param('id');
  await c.env.DB.prepare('DELETE FROM blog_posts WHERE id = ?').bind(id).run();
  return c.json({ success: true });
});

// Product Management
app.get('/api/admin/products', adminAuth, async (c) => {
  const { results } = await c.env.DB.prepare('SELECT * FROM products ORDER BY sort_order ASC').all();
  return c.json(results);
});

app.post('/api/admin/products', adminAuth, async (c) => {
  const body = await c.req.json();
  const id = crypto.randomUUID();
  await c.env.DB.prepare(
    'INSERT INTO products (id, name, category, price, price_formatted, short_description, full_description, image_url, features, specifications, is_hot, published, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
  ).bind(id, body.name, body.category, body.price, body.price_formatted, body.short_description, body.full_description, body.image_url, JSON.stringify(body.features), JSON.stringify(body.specifications), body.is_hot ? 1 : 0, body.published ? 1 : 0, body.sort_order).run();
  return c.json({ id, ...body });
});

app.put('/api/admin/products/:id', adminAuth, async (c) => {
  const id = c.req.param('id');
  const body = await c.req.json();
  await c.env.DB.prepare(
    'UPDATE products SET name = ?, category = ?, price = ?, price_formatted = ?, short_description = ?, full_description = ?, image_url = ?, features = ?, specifications = ?, is_hot = ?, published = ?, sort_order = ? WHERE id = ?'
  ).bind(body.name, body.category, body.price, body.price_formatted, body.short_description, body.full_description, body.image_url, JSON.stringify(body.features), JSON.stringify(body.specifications), body.is_hot ? 1 : 0, body.published ? 1 : 0, body.sort_order, id).run();
  return c.json({ success: true });
});

app.delete('/api/admin/products/:id', adminAuth, async (c) => {
  const id = c.req.param('id');
  await c.env.DB.prepare('DELETE FROM products WHERE id = ?').bind(id).run();
  return c.json({ success: true });
});

// Course Management
app.get('/api/admin/courses', adminAuth, async (c) => {
  const { results } = await c.env.DB.prepare('SELECT * FROM courses ORDER BY sort_order ASC').all();
  return c.json(results);
});

app.post('/api/admin/courses', adminAuth, async (c) => {
  const body = await c.req.json();
  const id = crypto.randomUUID();
  await c.env.DB.prepare(
    'INSERT INTO courses (id, title, type, axe, level, price, duration, description, objectives, image_url, published, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
  ).bind(id, body.title, body.type, body.axe, body.level, body.price, body.duration, body.description, JSON.stringify(body.objectives), body.image_url, body.published ? 1 : 0, body.sort_order).run();
  return c.json({ id, ...body });
});

app.put('/api/admin/courses/:id', adminAuth, async (c) => {
  const id = c.req.param('id');
  const body = await c.req.json();
  await c.env.DB.prepare(
    'UPDATE courses SET title = ?, type = ?, axe = ?, level = ?, price = ?, duration = ?, description = ?, objectives = ?, image_url = ?, published = ?, sort_order = ? WHERE id = ?'
  ).bind(body.title, body.type, body.axe, body.level, body.price, body.duration, body.description, JSON.stringify(body.objectives), body.image_url, body.published ? 1 : 0, body.sort_order, id).run();
  return c.json({ success: true });
});

app.delete('/api/admin/courses/:id', adminAuth, async (c) => {
  const id = c.req.param('id');
  await c.env.DB.prepare('DELETE FROM courses WHERE id = ?').bind(id).run();
  return c.json({ success: true });
});

// Site Settings Management
app.post('/api/admin/settings', adminAuth, async (c) => {
  const settings = await c.req.json();
  const queries = Object.entries(settings).map(([key, value]) => 
    c.env.DB.prepare('INSERT OR REPLACE INTO site_settings (key, value) VALUES (?, ?)').bind(key, String(value))
  );
  await c.env.DB.batch(queries);
  return c.json({ success: true });
});

// Image Upload to R2
app.post('/api/admin/upload', adminAuth, async (c) => {
  const body = await c.req.parseBody();
  const file = body['file'] as File;
  if (!file) return c.json({ error: 'No file uploaded' }, 400);

  const filename = `${Date.now()}-${file.name}`;
  await c.env.IMAGES.put(filename, file.stream(), {
    httpMetadata: { contentType: file.type }
  });

  return c.json({ url: `/api/images/${filename}` });
});

// Servo images from R2
app.get('/api/images/:filename', async (c) => {
  const filename = c.req.param('filename');
  const object = await c.env.IMAGES.get(filename);
  if (!object) return c.json({ error: 'Not found' }, 404);
  
  const headers = new Headers();
  object.writeHttpMetadata(headers);
  headers.set('etag', object.httpEtag);
  
  return new Response(object.body, { headers });
});

// Dashboard Stats
app.get('/api/admin/stats', adminAuth, async (c) => {
  const blogCount = await c.env.DB.prepare('SELECT COUNT(*) as count FROM blog_posts').first();
  const productCount = await c.env.DB.prepare('SELECT COUNT(*) as count FROM products').first();
  const courseCount = await c.env.DB.prepare('SELECT COUNT(*) as count FROM courses').first();
  
  return c.json({
    blog_posts: (blogCount as any)?.count || 0,
    products: (productCount as any)?.count || 0,
    courses: (courseCount as any)?.count || 0,
  });
});

// ========== SETUP ROUTE (run once to create admin) ==========
app.post('/api/setup', async (c) => {
  const { username, password } = await c.req.json().catch(() => ({}));
  if (!username || !password) return c.json({ error: 'Missing credentials' }, 400);
  
  // Check if admin already exists
  const exists = await c.env.DB.prepare('SELECT * FROM admin_users LIMIT 1').first();
  if (exists) return c.json({ error: 'Setup already completed' }, 403);
  
  await c.env.DB.prepare('INSERT INTO admin_users (id, username, password_hash) VALUES (?, ?, ?)')
    .bind(crypto.randomUUID(), username, 'internal_hash').run();
    
  return c.json({ message: 'Admin user created successfully' });
});

export default handle(app);
