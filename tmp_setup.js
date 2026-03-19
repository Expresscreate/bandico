async function setup() {
  const url = 'https://bandico-group-site.pages.dev/api/setup';
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: 'admin', password: 'bandico2026' })
  });
  const data = await res.json();
  console.log(data);
}
setup();
