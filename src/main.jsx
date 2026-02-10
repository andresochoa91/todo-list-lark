import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import AppContext from './AppContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppContext />
  </StrictMode>
);
