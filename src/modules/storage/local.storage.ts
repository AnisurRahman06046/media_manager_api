import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { StorageProvider, UploadResult } from './storage.interface';

@Injectable()
export class LocalStorage implements StorageProvider {
  private basePath = 'uploads';

  async upload(
    file: Express.Multer.File,
    tenantId: string,
  ): Promise<UploadResult> {
    const dir = `${this.basePath}/${tenantId}`;

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    const fileName = `${Date.now()}-${file.originalname}`;
    const fullPath = path.join(dir, fileName);

    fs.writeFileSync(fullPath, file.buffer);

    return {
      url: `/uploads/${tenantId}/${fileName}`,
      path: fullPath,
      key: fileName,
    };
  }

  async delete(filePath: string): Promise<void> {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  }
}
