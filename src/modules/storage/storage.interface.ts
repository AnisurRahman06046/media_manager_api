export interface UploadResult {
  url: string;
  path: string;
  key: string;
}

export interface StorageProvider {
  upload(file: Express.Multer.File, tenantId: string): Promise<UploadResult>;
  delete(path: string): Promise<void>;
}
