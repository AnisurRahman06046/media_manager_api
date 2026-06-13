import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class StorageService {
  private basePath = 'uploads';

  async upload(file: Express.Multer.File, tenantId: string) {
    const dir = `${this.basePath}/${tenantId}`;

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    const fileName = `${Date.now()}-${file.originalname}`;
    const fullPath = path.join(dir, fileName);

    fs.writeFileSync(fullPath, file.buffer);

    return {
      path: fullPath,
      url: `/uploads/${tenantId}/${fileName}`,
      storedName: fileName,
    };
  }
}
