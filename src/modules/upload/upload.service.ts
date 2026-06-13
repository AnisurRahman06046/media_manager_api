import { Injectable } from '@nestjs/common';
import { StorageFactory } from '../storage/storage.factory';
import { FileService } from '../file/file.service';

@Injectable()
export class UploadService {
  constructor(
    private storageFactory: StorageFactory,
    private fileService: FileService,
  ) {}

  async upload(file: Express.Multer.File, tenant: any) {
    const provider = this.storageFactory.getProvider(tenant.storageType);

    const stored = await provider.upload(file, tenant.id);

    return this.fileService.create({
      tenantId: tenant.id,
      originalName: file.originalname,
      storedName: stored.key,
      mimeType: file.mimetype,
      size: file.size,
      path: stored.path,
      url: stored.url,
    });
  }
}
