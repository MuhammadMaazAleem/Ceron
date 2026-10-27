import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/pearl-theme.css'
import './index.css'
import App from './App.tsx'
import { Analytics } from '@vercel/analytics/react'
import { ErrorBoundary } from './components/common/ErrorBoundary.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary fallbackTitle="Application encountered a critical error">
      <App />
    </ErrorBoundary>
    <Analytics />
  </StrictMode>,
)

// Register Service Worker for PWA in Production; unregister in dev to ensure fresh HMR
if ('serviceWorker' in navigator) {
  if (import.meta.env.PROD) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js').then(
        (reg) => {
          console.log('Ceron Academic SW registered successfully with scope:', reg.scope);
        },
        (err) => {
          console.warn('Ceron Academic SW registration failed:', err);
        }
      );
    });
  } else {
    // In local dev, remove any stale SW so browser always serves fresh Vite code
    navigator.serviceWorker.getRegistrations().then((registrations) => {
      for (const reg of registrations) {
        reg.unregister();
      }
    });
    if (window.caches) {
      caches.keys().then((names) => {
        for (const name of names) {
          caches.delete(name);
        }
      });
    }
  }
}
