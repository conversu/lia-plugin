import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { PluginProvider } from './services/plugin/provider';
import { PluginPosition } from './@types/plugin';
import { ThemeProvider } from './theme/theme.provider';


const div = document.getElementById('conversu-plugin')

const root = ReactDOM.createRoot(div!);
root.render(
    <React.StrictMode>
        {div && (
            <PluginProvider
                token={div.dataset.token}
                displayError={div.dataset.showOnError?.toLowerCase() === "true"}
                dataSet={div.dataset}
                position={div.dataset.position ? div.dataset.position as PluginPosition : undefined}
                buttonSize={div.dataset.buttonSize ? Number(div.dataset.buttonSize) : undefined}
                height={div.dataset.maxHeight}
                width={div.dataset.maxWidth}
            >
                <ThemeProvider
                    allowDarkTheme={div.dataset.allowDarkTheme?.toLowerCase() === "true"}
                >
                    <App
                        border={div.dataset.border}
                        color={div.dataset.color}
                        zIndex={div.dataset.zIndex ? Number(div.dataset.zIndex) : 9998}
                    />
                </ThemeProvider>
            </PluginProvider>
        )}
    </React.StrictMode>
);
