import React from 'react';
import { createRoot } from 'react-dom/client';
import ProfileApp from './ProfileApp';
import './index.css';
import './ProfileApp.css';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<ProfileApp />);



