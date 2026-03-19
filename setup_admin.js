async function setup() {
  const url = 'https://bandico-group-site.pages.dev/api/setup';
  console.log(`Sending POST to ${url}...`);
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: 'admin', password: 'bandico2026' })
    });
    console.log(`Status: ${res.status}`);
    const text = await res.text();
    console.log(`Response: ${text.slice(0, 500)}`);
  } catch (e) {
    console.error(`Fetch error: ${e.message}`);
  }
}
setup();
