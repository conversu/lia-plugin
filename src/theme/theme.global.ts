import { TextProps } from '@chakra-ui/react';
import { isMobileDevice } from '@utils/utils';
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

export const fontsStyles = {
    h1: {
        fontWeight: 'normal',
        textAlign: 'center',
        lineHeight: '120%',
        fontSize: '1rem',
    } as TextProps,
    h2: {
        fontWeight: 'normal',
        textAlign: 'center',
        lineHeight: '110%',
        fontSize: '1rem',
    } as TextProps,
    h3: {
        fontWeight: 'normal',
        textAlign: 'center',
        lineHeight: '110%',
        fontSize: '1rem',
    } as TextProps,
    h4: {
        fontWeight: 'normal',
        textAlign: 'center',
        lineHeight: '110%',
        fontSize: '1rem',
    } as TextProps,
    h5: {
        fontWeight: 'light',
        textAlign: 'center',
        maxW: maxWidth,
        fontSize: '1rem',
    } as TextProps,
    p: {
        fontWeight: 'light',
        textAlign: 'left',
        lineHeight: '110%',
        fontSize: '1rem',
    } as TextProps,
    span: {
        fontWeight: 'normal'
    } as TextProps,
}

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

const components = {
    a: {
        'text-decoration': 'none'
    },
    img: {
        'pointer-events': 'none',
        'user-select': 'none'
    }
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
    ...fontsStyles,
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

export const inputGlobalProps = {
    base: {
        errorBorderColor: 'red.500',
        variant: 'outline',
        rounded: 'md',
        p: '2',
        size: 'md',
        fontSize: {
            base: '0.875rem',
            sm: '0.875rem',
            md: '1rem',
            lg: '1rem',
            xl: '1rem'
        },
    },
    dark: {
        bgColor: 'transparent',
        borderColor: 'white',
        color: 'white',
        _focus: {
            color: conversuColors.orange
        },
        focusBorderColor: conversuColors.orange,
        _hover: {
            borderColor: conversuColors.orange
        },
        _disabled: {
            bgColor: 'transparent',
            borderColor: 'gray.200',
            color: 'gray.200',
            cursor: 'not-allowed'
        },
        _invalid: {
            bgColor: 'transparent',
            color: 'red.500',
            border: '2px solid red'
        },
        _placeholder: {
            color: 'gray.100',
            fontWeight: 'light',
            fontSize: '1rem'
        },
    },
    light: {
        bgColor: 'white',
        borderColor: 'gray.500',
        color: conversuColors.purple,
        _focus: {
            color: conversuColors.purple
        },
        focusBorderColor: conversuColors.purple,
        _hover: {
            borderColor: conversuColors.purple
        },
        _disabled: {
            bgColor: 'white',
            borderColor: 'gray.300',
            color: 'gray.300',
            cursor: 'not-allowed'
        },
        _invalid: {
            bgColor: 'white',
            color: 'red.500',
            border: '2px solid red'
        },
        _placeholder: {
            color: 'gray.100',
            fontWeight: 'light',
            fontSize: '1rem'
        },
    }
}

export const scrollbarStyle = {
    base: {
        borderRadius: '0.25rem'
    },
    dark: {
        short: {
            width: isMobileDevice() ? '2px' : '0.6rem',
            track: grayScale[900],
            thumb: grayScale[700],
            thumbHover: grayScale[500],
        },
        large: {
            width: '0.6rem',
            track: grayScale[700],
            thumb: grayScale[800],
            thumbHover: grayScale[900],
        }
    },
    light: {
        short: {
            width: isMobileDevice() ? '2px' : '0.6rem',
            track: 'white',
            thumb: grayScale[100],
            thumbHover: grayScale[200],
        },
        large: {
            width: '0.6rem',
            track: 'white',
            thumb: grayScale[100],
            thumbHover: grayScale[200],
        }
    }
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
    components: components
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
    components: components
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