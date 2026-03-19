import { Hono } from 'hono';
import { jwt, sign, verify } from 'hono/jwt';
import { cors } from 'hono/cors';

const app = new Hono();

app.use('/api/*', cors());

const adminAuth = async (c, next) => {
  const authHeader = c.req.header('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) return c.json({ error: 'Unauthorized' }, 401);
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
app.get('/api/blog', async (c) => {
  const { results } = await c.env.DB.prepare('SELECT * FROM blog_posts WHERE published = 1 ORDER BY created_at DESC').all();
  return c.json(results);
});

app.get('/api/blog/:id', async (c) => {
  const post = await c.env.DB.prepare('SELECT * FROM blog_posts WHERE id = ?').bind(c.req.param('id')).first();
  return post ? c.json(post) : c.json({ error: 'Not found' }, 404);
});

app.get('/api/products', async (c) => {
  const { results } = await c.env.DB.prepare('SELECT * FROM products WHERE published = 1 ORDER BY sort_order ASC').all();
  return c.json(results);
});

app.get('/api/courses', async (c) => {
  const { results } = await c.env.DB.prepare('SELECT * FROM courses WHERE published = 1 ORDER BY sort_order ASC').all();
  return c.json(results);
});

app.get('/api/settings', async (c) => {
  const { results } = await c.env.DB.prepare('SELECT * FROM site_settings').all();
  return c.json(results.reduce((acc, row) => ({ ...acc, [row.key]: row.value }), {}));
});

app.post('/api/auth/login', async (c) => {
  const { username, password } = await c.req.json().catch(() => ({}));
  // Try both old and new table names just in case
  let user = await c.env.DB.prepare('SELECT * FROM cms_users WHERE username = ?').bind(String(username)).first();
  if (!user) {
    user = await c.env.DB.prepare('SELECT * FROM admin_users WHERE username = ?').bind(String(username)).first();
  }
  
  if (!user) return c.json({ error: 'Invalid credentials' }, 401);
  const token = await sign({ username: user.username, exp: Math.floor(Date.now() / 1000) + 86400 }, c.env.JWT_SECRET);
  return c.json({ token, user: { username: user.username } });
});

app.get('/api/auth/me', adminAuth, (c) => c.json({ user: c.get('jwtPayload') }));

// ========== ADMIN ROUTES ==========
app.get('/api/admin/blog', adminAuth, async (c) => {
  const { results } = await c.env.DB.prepare('SELECT * FROM blog_posts ORDER BY created_at DESC').all();
  return c.json(results);
});

app.post('/api/admin/blog', adminAuth, async (c) => {
  const b = await c.req.json();
  const id = crypto.randomUUID();
  await c.env.DB.prepare('INSERT INTO blog_posts (id, title, excerpt, content, category, author, image_url, published, is_featured, read_time) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)').bind(id, b.title, b.excerpt, b.content, b.category, b.author, b.image_url, b.published ? 1 : 0, b.is_featured ? 1 : 0, b.read_time).run();
  return c.json({ id, ...b });
});

app.get('/api/admin/stats', adminAuth, async (c) => {
  const b = await c.env.DB.prepare('SELECT COUNT(*) as c FROM blog_posts').first();
  const p = await c.env.DB.prepare('SELECT COUNT(*) as c FROM products').first();
  const o = await c.env.DB.prepare('SELECT COUNT(*) as c FROM courses').first();
  return c.json({ blog_posts: b?.c || 0, products: p?.c || 0, courses: o?.c || 0 });
});

app.put('/api/admin/settings', adminAuth, async (c) => {
  const s = await c.req.json();
  const batch = Object.entries(s).map(([k, v]) => c.env.DB.prepare('INSERT OR REPLACE INTO site_settings (key, value) VALUES (?, ?)').bind(k, String(v)));
  await c.env.DB.batch(batch);
  return c.json({ success: true });
});

app.post('/api/admin/upload', adminAuth, async (c) => {
  const body = await c.req.parseBody();
  const file = body['file'];
  const name = `${Date.now()}-${file.name}`;
  await c.env.IMAGES.put(name, file.stream(), { httpMetadata: { contentType: file.type } });
  return c.json({ url: `/api/images/${name}` });
});

app.get('/api/images/:name', async (c) => {
  const obj = await c.env.IMAGES.get(c.req.param('name'));
  if (!obj) return c.json({ error: 'Not found' }, 404);
  const h = new Headers();
  obj.writeHttpMetadata(h);
  return new Response(obj.body, { headers: h });
});

app.post('/api/setup', async (c) => {
  try {
    const { username, password } = await c.req.json().catch(() => ({}));
    if (!username || !password) return c.json({ error: 'Missing credentials' }, 400);
    
    // Switch to new table name cms_users
    await c.env.DB.prepare(`CREATE TABLE IF NOT EXISTS cms_users (id TEXT PRIMARY KEY, username TEXT UNIQUE, password_hash TEXT)`).run();
    await c.env.DB.prepare(`CREATE TABLE IF NOT EXISTS blog_posts (id TEXT PRIMARY KEY, title TEXT, excerpt TEXT, content TEXT, category TEXT, author TEXT, image_url TEXT, created_at DATETIME DEFAULT CURRENT_TIMESTAMP, published INTEGER, is_featured INTEGER, read_time TEXT)`).run();
    await c.env.DB.prepare(`CREATE TABLE IF NOT EXISTS products (id TEXT PRIMARY KEY, name TEXT, category TEXT, price REAL, price_formatted TEXT, short_description TEXT, full_description TEXT, image_url TEXT, features TEXT, specifications TEXT, is_hot INTEGER, published INTEGER, sort_order INTEGER)`).run();
    await c.env.DB.prepare(`CREATE TABLE IF NOT EXISTS courses (id TEXT PRIMARY KEY, title TEXT, type TEXT, axe TEXT, level TEXT, price TEXT, duration TEXT, description TEXT, objectives TEXT, image_url TEXT, published INTEGER, sort_order INTEGER)`).run();
    await c.env.DB.prepare(`CREATE TABLE IF NOT EXISTS site_settings ("key" TEXT PRIMARY KEY, "value" TEXT)`).run();

    const exists = await c.env.DB.prepare('SELECT * FROM cms_users LIMIT 1').first();
    if (exists) return c.json({ error: 'Already setup' }, 403);
    
    await c.env.DB.prepare('INSERT INTO cms_users (id, username, password_hash) VALUES (?, ?, ?)')
      .bind(String(crypto.randomUUID()), String(username), 'internal_hash').run();
      
    return c.json({ message: 'Setup success' });
  } catch (err) {
    return c.json({ error: err.message }, 500);
  }
});

app.get('/*', async (c) => c.env.ASSETS.fetch(c.req.raw));

export default app;
