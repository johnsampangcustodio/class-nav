// Minimal no-op service worker to enable PWA install prompts where supported.
// Does not intercept fetch events to avoid changing app functionality.
self.addEventListener('install', () => {
  // no-op
});
self.addEventListener('activate', (event) => {
  // Ensure immediate control of pages on reload without affecting network
  event.waitUntil(self.clients.claim());
});
