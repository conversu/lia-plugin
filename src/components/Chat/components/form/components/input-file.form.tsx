import React, { ReactNode } from "react";
import { Input } from "@chakra-ui/react";

import { useChatForm } from "../provider/hook.form";

interface Props {
    children: ReactNode;
}


export function ChatFormInputFile({ children }: Props) {

    const {
        fileInputRef,
        handleFileChange
    } = useChatForm();


    return (
        <React.Fragment>
            {children}
            <Input
                type='file'
                display='none'
                ref={fileInputRef}
                onChange={event => handleFileChange(event)}
            />
        </React.Fragment>
    );
}