import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { PluginProvider } from './services/plugin/provider';


const div = document.getElementById('conversu-plugin')

const root = ReactDOM.createRoot(div!);
root.render(
    <React.StrictMode>
        {div && (
            <PluginProvider
                token={div.dataset.token}
            >
                <App
                    allowDarkTheme={div.dataset['allow-dark-theme']?.toLowerCase() === "true"}
                    height={div.dataset['max-height']}
                    width={div.dataset['max-width']}
                />
            </PluginProvider>
        )}
    </React.StrictMode>
);
