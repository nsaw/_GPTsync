self.addEventListener('install', e => { e.waitUntil((async()=>{
  const keys = await caches.keys(); await Promise.all(keys.map(k=>caches.delete(k)));
  self.skipWaiting(); })()); });
self.addEventListener('activate', e => { e.waitUntil((async()=>{
  const regs = await self.registration.unregister();
  const clients = await self.clients.matchAll({includeUncontrolled:true,type:'all'});
  clients.forEach(c => c.navigate(c.url)); })()); });
self.addEventListener('fetch', e => { /* no caching, pass-through to network */ });
