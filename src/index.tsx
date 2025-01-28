import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { PluginProvider } from './services/plugin/provider';
import { PluginPosition } from './@types/plugin';
import { ThemeProvider } from './theme/theme.provider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';


const div = document.getElementById('conversu-plugin');

const QUERY_CLIENT = new QueryClient({
    defaultOptions: {
        mutations: {
            cacheTime: 1000 * 60 * 10, // 10 min
            retryDelay: 1000 * 60 // 1 min
        }
    },
})

const root = ReactDOM.createRoot(div!);
root.render(
    <React.StrictMode>
        {div && (
            <QueryClientProvider client={QUERY_CLIENT}>
                <PluginProvider
                    token={div.dataset.token}
                    displayError={div.dataset.showOnError?.toLowerCase() === "true"}
                    dataSet={div.dataset}
                    position={div.dataset.position ? div.dataset.position as PluginPosition : undefined}
                    buttonSize={div.dataset.buttonSize ? Number(div.dataset.buttonSize) : undefined}
                    height={div.dataset.maxHeight}
                    width={div.dataset.maxWidth}
                    startHour={div.dataset.startHour}
                    endHour={div.dataset.endHour}
                >
                    <ThemeProvider
                        allowDarkTheme={div.dataset.allowDarkTheme?.toLowerCase() === "true"}
                    >
                        <App
                            border={div.dataset.border}
                            color={div.dataset.color}
                            zIndex={div.dataset.zIndex ? Number(div.dataset.zIndex) : 9998}
                            tooltipColor={div.dataset.tooltipColor}
                            user={div.dataset.user}
                        />
                    </ThemeProvider>
                </PluginProvider>
            </QueryClientProvider>
        )}
    </React.StrictMode>
);
