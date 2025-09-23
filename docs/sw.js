const CACHE_NAME = 'slice-weston-v2';
const STATIC_CACHE = 'slice-static-v2';
const VIDEO_CACHE = 'slice-videos-v2';
const urlsToCache = [
  '/',
  '/about',
  '/whats-included',
  '/catering',
  '/celebrations',
  '/gallery',
  '/testimonials',
  '/contact',
  '/faq',
  '/meet-the-owner'
];

// Cache static assets - these should be relative to the root since SW runs at root level
const staticAssets = [
  '/logo.png',
  '/OGlogo.png',
  '/footerPhoto.png',
  '/floorPlan.jpg',
  '/media/1.mp4',
  '/media/3.mp4',
  '/media/4.mp4',
  '/media/6.mp4',
  '/media/8.mp4',
  '/media/10.mp4',
  '/media/11.mp4',
  '/media/homePerfectSection.mp4',
  '/backgroundVideo.mp4',
  '/promoSeptember.mp4',
  '/sliceAugust.mp4',
  '/video1.mp4',
  '/video2.mp4',
  '/Category/catering.mp4',
  '/Category/gallery.mp4',
  '/MeetTheOwner/1.jpg',
  '/MeetTheOwner/2.png',
  '/MeetTheOwner/3.png',
  '/MeetTheOwner/4.png',
  '/MeetTheOwner/5.png'
];

// Install event - cache resources with error handling
self.addEventListener('install', (event) => {
  event.waitUntil(
    Promise.all([
      caches.open(CACHE_NAME).then((cache) => {
        console.log('Opened main cache');
        return Promise.allSettled(
          urlsToCache.map(url => 
            cache.add(url).catch(err => {
              console.warn(`Failed to cache ${url}:`, err);
              return null;
            })
          )
        );
      }),
      caches.open(STATIC_CACHE).then((cache) => {
        console.log('Opened static cache');
        return Promise.allSettled(
          staticAssets.map(asset => 
            cache.add(asset).catch(err => {
              console.warn(`Failed to cache static asset ${asset}:`, err);
              return null;
            })
          )
        );
      }),
      caches.open(VIDEO_CACHE).then((cache) => {
        console.log('Opened video cache');
        const videoAssets = staticAssets.filter(asset => asset.endsWith('.mp4'));
        return Promise.allSettled(
          videoAssets.map(video => 
            cache.add(video).catch(err => {
              console.warn(`Failed to cache video ${video}:`, err);
              return null;
            })
          )
        );
      })
    ]).catch((error) => {
      console.error('Cache installation failed:', error);
    })
  );
});

// Fetch event - serve from cache if available with better error handling
self.addEventListener('fetch', (event) => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') {
    return;
  }

  // Skip requests to external domains
  if (!event.request.url.startsWith(self.location.origin)) {
    return;
  }

  // Skip requests for development assets in dev mode
  if (event.request.url.includes('localhost:5173') && 
      (event.request.url.includes('__vite') || 
       event.request.url.includes('@vite') ||
       event.request.url.includes('@react-refresh') ||
       event.request.url.includes('node_modules') ||
       event.request.url.includes('src/main.tsx') ||
       event.request.url.includes('?t='))) {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached version if available
        if (response) {
          return response;
        }

        // Fetch from network with error handling
        return fetch(event.request)
          .then((response) => {
            // Don't cache non-successful responses
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Clone the response before caching
            const responseToCache = response.clone();

            // Determine which cache to use based on file type
            const isVideo = event.request.url.endsWith('.mp4');
            const cacheToUse = isVideo ? VIDEO_CACHE : CACHE_NAME;

            caches.open(cacheToUse)
              .then((cache) => {
                cache.put(event.request, responseToCache);
              })
              .catch((error) => {
                console.warn('Failed to cache response:', error);
              });

            return response;
          })
          .catch((error) => {
            console.warn('Fetch failed:', error);
            // Return a fallback response for navigation requests
            if (event.request.mode === 'navigate') {
              return caches.match('/');
            }
            return new Response('Network error', { status: 503 });
          });
      })
      .catch((error) => {
        console.error('Cache match failed:', error);
        return fetch(event.request);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Background sync for offline functionality
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    event.waitUntil(doBackgroundSync());
  }
});

function doBackgroundSync() {
  // Handle background sync tasks
  console.log('Background sync triggered');
  return Promise.resolve();
}

// Handle push notifications (if needed in the future)
self.addEventListener('push', (event) => {
  if (event.data) {
    const data = event.data.json();
    const options = {
      body: data.body,
      icon: '/icon-192x192.png',
      badge: '/badge-72x72.png',
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: 1
      }
    };

    event.waitUntil(
      self.registration.showNotification(data.title, options)
    );
  }
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow('/')
  );
});
