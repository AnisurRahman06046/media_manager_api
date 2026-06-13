import { Injectable } from '@nestjs/common';
import { StorageService } from '../storage/storage.service';
import { FileService } from '../file/file.service';

@Injectable()
export class UploadService {
  constructor(
    private storage: StorageService,
    private fileService: FileService,
  ) {}

  async upload(file: Express.Multer.File, tenant: any) {
    const stored = await this.storage.upload(file, tenant.id);

    return this.fileService.create({
      tenantId: tenant.id,
      originalName: file.originalname,
      storedName: stored.storedName,
      mimeType: file.mimetype,
      size: file.size,
      path: stored.path,
      url: stored.url,
    });
  }
}
