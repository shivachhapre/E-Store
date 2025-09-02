import React from 'react';
import { createRoot } from 'react-dom/client';
import HomeApp from './HomeApp';
import './index.css';
import './HomeApp.css';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<HomeApp />);



