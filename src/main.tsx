import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import './i18n';

// The static snapshot serves crawlers and visitors without JavaScript. React 19
// hoists Helmet's tags but does not adopt tags outside its root. Hand these four
// route-owned fields over once, before React mounts, so navigation cannot leave
// the original page's title/description/canonical/hreflang in the document.
// Keep verification tags, robots, social metadata and structured data intact.
document.head.querySelectorAll(
  'title, meta[name="description"], link[rel="canonical"], link[rel="alternate"][hreflang]',
).forEach(element => element.remove());

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
