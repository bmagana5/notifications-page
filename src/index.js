import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { ContentProvider } from './contexts/content.context';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ContentProvider>
      <App />
    </ContentProvider>
  </React.StrictMode>
);
