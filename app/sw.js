const C="expenses-v4",FILES=["./","index.html","manifest.webmanifest","icon.png","icon-192.png","apple-touch-icon.png","pdf.min.js","pdf.worker.min.js"];
self.addEventListener("install",e=>e.waitUntil(caches.open(C).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting())));
self.addEventListener("activate",e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim())));
// network first (so updates arrive), cache fallback (so it works offline)
self.addEventListener("fetch",e=>{if(e.request.method!=="GET"||!e.request.url.startsWith(self.location.origin))return;
  e.respondWith(fetch(e.request).then(r=>{const c2=r.clone();caches.open(C).then(c=>c.put(e.request,c2));return r;}).catch(()=>caches.match(e.request)));});
