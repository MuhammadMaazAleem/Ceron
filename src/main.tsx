import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/pearl-theme.css'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

// Register Service Worker for PWA / Mobile Phone Installation
if ('serviceWorker' in navigator) {
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
}
