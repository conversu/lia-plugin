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
                displayError={div.dataset.showOnError?.toLowerCase() === "true"}
                dataSet={div.dataset}
            >
                <App
                    allowDarkTheme={div.dataset.allowDarkTheme?.toLowerCase() === "true"}
                    height={div.dataset.maxHeight}
                    width={div.dataset.maxWidth}
                    border={div.dataset.border}
                    color={div.dataset.color}
                />
            </PluginProvider>
        )}
    </React.StrictMode>
);
