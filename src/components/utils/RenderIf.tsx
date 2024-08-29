import { ReactNode } from "react";

interface Props {
    condition?: boolean;
    children?: ReactNode | ReactNode[];
}

export function RenderIf({condition = true, children} : Props){

    if(condition){

        return (<>{children}</>);
    }

    return (<></>);
}