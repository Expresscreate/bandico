async function test() {
  const urls = [
    'https://bandico-group-site.pages.dev/ping',
    'https://bandico-group-site.pages.dev/api/setup'
  ];
  for (const url of urls) {
    try {
      const res = await fetch(url);
      console.log(`${url}: ${res.status}`);
      const text = await res.text();
      console.log(`Response: ${text.slice(0, 100)}`);
    } catch (e) {
      console.log(`${url}: Error ${e.message}`);
    }
  }
}
test();
