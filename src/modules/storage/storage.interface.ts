export interface UploadResult {
  url: string;
  path: string;
  key: string;
}

export interface StorageProvider {
  upload(file: Express.Multer.File, tenantId: string): Promise<any>;

  uploadBuffer(
    buffer: Buffer,
    key: string,
    tenantId: string,
    mimeType: string,
  ): Promise<any>;

  download(path: string): Promise<Buffer>;
}
