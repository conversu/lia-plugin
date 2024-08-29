import { AttachmentType } from "@services/attachment/attachment.types";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";




export function useMedia(type: AttachmentType,src?: string | null) {

    async function fetch() {

        if (!src) {
            return null;
        }

        if(!src.startsWith('http') || type !== AttachmentType.DOCUMENT){

            return src;
        }

        const buffer = await axios.get(src, { responseType: 'arraybuffer' }).then(response => {
            return response.data;
        })
            .catch((err: AxiosError) => {

                if ([401, 403].includes(err.response?.status ?? 400)) {

                    // call presign Url
                    return null;
                }

                return null;
            });
        if (!buffer) {
            return 'data;';
        }
        const blob = new Blob([buffer], { type: 'application/pdf' });

        return URL.createObjectURL(blob);
    }


    return useQuery<string | null>([src], () => fetch(), {
        enabled: !!src,
        refetchInterval: 1000 * 60 * 60,
        cacheTime: 1000 * 60 * 60 * 8,
        retry: false,
        refetchOnMount: true
    })
}