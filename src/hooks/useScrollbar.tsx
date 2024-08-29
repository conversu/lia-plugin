import { useBreakpoints } from "@providers/breakpoint/breakpoint.hook";
import { useTheme } from "@theme/theme.hook";


export interface ScrollBarProps {
    width?: string | null;
    track?: string | null;
    thumb?: string | null;
    thumbHover?: string | null;
    borderRadius?: string | null;
}


export function useScrollbar(props?: ScrollBarProps) {

    const { scrollbarStyle } = useTheme();
    const { isShortVersion } = useBreakpoints();

    return {
        scrollProps: {
            '::-webkit-scrollbar': {
                'width': props?.width ?? scrollbarStyle[isShortVersion ? 'short' : 'large'].width
            },
            /* Track */
            '::-webkit-scrollbar-track': {
                'background': props?.track ?? scrollbarStyle[isShortVersion ? 'short' : 'large'].track
            },
            /* Handle */
            '::-webkit-scrollbar-thumb': {
                'background': props?.thumb ?? scrollbarStyle[isShortVersion ? 'short' : 'large'].thumb,
                'borderRadius': props?.borderRadius ?? scrollbarStyle.borderRadius,
                'cursor': 'pointer'
            },
            /* Handle on hover */
            '::-webkit-scrollbar-thumb:hover': {
                'background': props?.thumbHover ?? scrollbarStyle[isShortVersion ? 'short' : 'large'].thumbHover
            }
        }
    }
}