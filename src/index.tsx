import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';


const div = document.getElementById('conversu-plugin')

const root = ReactDOM.createRoot(div!);
root.render(
    <React.StrictMode>
        {div && (<App {...div.dataset} />)}
    </React.StrictMode>
);
