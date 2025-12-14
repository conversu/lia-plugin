import { IBotLayoutProps } from './theme.types';


const breakpoints = {
    xs: '280px',
    sm: '320px',
    md: '480px',
    lg: '960px',
    xl: '1280px',
    '2xl': '1536px'
}

export const maxWidth = '1280px'


export const grayScale = {
    "900": "#181b23",
    "800": "#1f2029",
    "700": "#353646",
    "600": "#4b4d63",
    "500": "#616480",
    "400": "#797D9A",
    "300": "#9699B0",
    "200": "#B3B5C6",
    "100": "#D1D2DC",
    "75": "#D9D9D9",
    "50": "#EEEEF2",
    "25": "#fafafa"
}



export const global = {
    width: 'calc(var(--vw, 1vw) * 100)',
    maxWidth: '100%',
    maxHeight: '100%',
    margin: 0,
    padding: 0,
    boxSizing: 'border-box',
    CSS: {
        'WebkitFontSmoothing': 'antialiased',
    },
    overflowY: {
        base: undefined,
        sm: undefined,
        md: 'hidden',
        lg: 'hidden',
        xl: 'hidden'
    },
    overflowX: 'hidden',
}

export const conversuColors = {
    orange: '#FF5224',
    purple: '#410075',
    purpleDark: '#29004A'
}

export const sidebarStyle = {
    colorScheme: 'orange',
    bg: 'gray.50',
    color: 'gray.300',
    hoverColor: conversuColors.orange,
}



export const themeDark = {
    colors: {
        gray: grayScale,
        app: {
            primary: conversuColors.orange,
            secondary: conversuColors.purple,
            secondaryDark: conversuColors.purpleDark,
            black: '#090010',
            orange: conversuColors.orange,
            purple: conversuColors.purple,
            purpleDark: conversuColors.purpleDark
        }
    },
    fonts: {
        heading: 'Sora, sans-serif',
        body: 'Sora, sans-serif'
    },
    breakpoints: breakpoints,
};


export const themeLight = {
    colors: {
        gray: grayScale,
        app: {
            primary: conversuColors.purple,
            secondary: conversuColors.orange,
            secondaryDark: conversuColors.purpleDark,
            black: '#090010',
            orange: conversuColors.orange,
            purple: conversuColors.purple,
            purpleDark: conversuColors.purpleDark
        }
    },
    fonts: {
        heading: 'Sora, sans-serif',
        body: 'Sora, sans-serif'
    },
    breakpoints: breakpoints,
};

export const botCTELayout: IBotLayoutProps = {
    user: {
        bg: '#FEEBC8',
        color: themeLight.colors.app.orange
    },
    bot: {
        bg: themeLight.colors.gray[50],
        color: themeLight.colors.app.primary
    },
    agent: {
        bg: '#E9D8FD',
        color: themeLight.colors.app.purple
    },
    colors: {
        primary: themeLight.colors.app.primary,
        secondary: themeLight.colors.app.secondary
    }
};