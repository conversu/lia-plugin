import { ReactNode } from "react";
import { RenderIf } from "./RenderIf";

interface Props {
    condition?: boolean;
    children?: ReactNode | ReactNode[];
}

export function RenderElse({ condition = false, children }: Props) {

    return (
        <RenderIf condition={!condition}>
            {children}
        </RenderIf>
    );
}