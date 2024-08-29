import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';


const div = document.getElementById('conversu-plugin')

const root = ReactDOM.createRoot(div);
root.render(
  <React.StrictMode>
    <App token={div.dataset.token} />
  </React.StrictMode>
);
