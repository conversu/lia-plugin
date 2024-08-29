import { Modal } from "@components/Modal";
import DocumentPreview from "./components/DocumentPreview";
import ImagePreview from "./components/ImagePreview";
import MediaDetail from "./components/MediaDetail";




export const MediaPreview = {
    Container: {
        Modal: Modal
    },
    Detail: MediaDetail,
    Media: {
        DOCUMENT: DocumentPreview,
        IMAGE: ImagePreview
    }
}