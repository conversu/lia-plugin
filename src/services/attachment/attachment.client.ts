import { domainApi } from "@services/api";
import { ApiPath } from "@utils/url";
import { IFile } from "@services/chat/chat.type";
import { IAttachment } from "./attachment.types";
import { AxiosResponse } from "axios";


interface ClientContent {
    upload: (file: IFile) => Promise<AxiosResponse<IAttachment | null>>;
}


export function useAttachmentClient(): ClientContent {

    async function upload(file: IFile): Promise<AxiosResponse<IAttachment | null>> {

        let type = file.type.startsWith('image') ? 'IMAGE' : 'DOCUMENT';

        const endpoint = new ApiPath('/attachment/upload').path('/:type').params({ type }).build();

        const formData = new FormData();
        formData.append('file', file.content);

        return await domainApi.post<IAttachment>(endpoint, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
    }

    return {
        upload
    }
}