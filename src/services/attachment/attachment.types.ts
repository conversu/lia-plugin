


export enum AttachmentType {
  AUDIO = 'AUDIO',
  DOCUMENT = 'DOCUMENT',
  IMAGE = 'IMAGE',
  OTHER = 'OTHER'
}

export interface IAttachment {
  uuid: string;
  // folder: string;
  // bucket: string;
  // region: string;
  // key: string;
  originalName: string;
  mimeType: string;
  extension: string;
  type: AttachmentType;
  size: number;
  url: string;
  urlExpiration: number;
  // createdAt: number;
  // updatedAt: number;
  // status: 'PERMANENT' | 'TEMPORARY';
}