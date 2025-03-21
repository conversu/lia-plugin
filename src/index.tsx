import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { PluginProvider } from './services/plugin/provider';
import { PluginPosition } from './@types/plugin';
import { ThemeProvider } from './theme/theme.provider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SessionProvider } from './services/session/provider';
import { PluginMode } from './services/plugin/types';


const div = document.getElementById('conversu-plugin');

const QUERY_CLIENT = new QueryClient({
    defaultOptions: {
        mutations: {
            cacheTime: 1000 * 60 * 10, // 10 min
            retryDelay: 1000 * 60, // 1 min
            retry: 1,
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
                    maxHeight={div.dataset.maxHeight}
                    maxWidth={div.dataset.maxWidth}
                    height={div.dataset.height}
                    width={div.dataset.width}
                    startHour={div.dataset.startHour}
                    endHour={div.dataset.endHour}
                    mode={div.dataset.mode ? PluginMode[div.dataset.mode?.toUpperCase() as keyof typeof PluginMode] || PluginMode.POPOVER : PluginMode.POPOVER}
                    allowExpand={div.dataset.allowExpand === 'true'}
                    btnType={!!div.dataset.btnType ? div.dataset.btnType.toLowerCase() as 'circle' | 'badge' : 'circle'}
                >
                    <ThemeProvider
                        allowDarkTheme={div.dataset.allowDarkTheme?.toLowerCase() === "true"}
                    >
                        <SessionProvider>
                            <App
                                border={div.dataset.border}
                                zIndex={div.dataset.zIndex ? Number(div.dataset.zIndex) : 9998}
                                tooltipColor={div.dataset.tooltipColor}
                                username={div.dataset.user ?? div.dataset.username}
                                name={div.dataset.name}
                                className={div.className}
                                btn={{
                                    icon: div.dataset.btnIcon,
                                    type: !!div.dataset.btnType ? div.dataset.btnType.toLowerCase() as 'circle' | 'badge' : 'circle',
                                    color: div.dataset.color ?? div.dataset.btnColor,
                                    title: div.dataset.btnTitle
                                }}
                            />
                        </SessionProvider>
                    </ThemeProvider>
                </PluginProvider>
            </QueryClientProvider>
        )}
    </React.StrictMode>
);
