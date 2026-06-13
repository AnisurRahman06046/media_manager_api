import { Injectable } from '@nestjs/common';
import { StorageFactory } from '../storage/storage.factory';
import { FileService } from '../file/file.service';
import { ValidationService } from '../../validation/validation.service';

@Injectable()
export class UploadService {
  constructor(
    private storageFactory: StorageFactory,
    private fileService: FileService,
    private validationService: ValidationService,
  ) {}

  async upload(file: Express.Multer.File, tenant: any, config: any) {
    // 1. VALIDATE FIRST
    this.validationService.validate(file, config);

    // 2. SELECT STORAGE
    const provider = this.storageFactory.getProvider(tenant.storageType);

    // 3. UPLOAD FILE
    const stored = await provider.upload(file, tenant.id);

    // 4. SAVE METADATA
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
