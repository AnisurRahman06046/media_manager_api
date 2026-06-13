import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { StorageProvider, UploadResult } from './storage.interface';

@Injectable()
export class LocalStorage implements StorageProvider {
  async upload(
    file: Express.Multer.File,
    tenantId: string,
  ): Promise<UploadResult> {
    const key = `${Date.now()}-${file.originalname}`;
    return this.uploadBuffer(file.buffer, key, tenantId, file.mimetype);
  }

  async uploadBuffer(
    buffer: Buffer,
    key: string,
    tenantId: string,
    mimeType: string,
  ): Promise<UploadResult> {
    const dir = `uploads/${tenantId}/variants`;

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    const fullPath = path.join(dir, key);
    fs.writeFileSync(fullPath, buffer);

    return {
      url: `/uploads/${tenantId}/variants/${key}`,
      path: fullPath,
      key,
    };
  }

  async download(filePath: string): Promise<Buffer> {
    return fs.readFileSync(filePath);
  }
}
