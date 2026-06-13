import { Injectable } from '@nestjs/common';
import { MediaContextService } from './media-context.service';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class MediaProcessingService {
  constructor(private readonly contextService: MediaContextService) {}

  async generateThumbnail(fileId: string) {
    const ctx = await this.contextService.load(fileId);

    const { file, storage } = ctx;

    console.log('Processing file:', file.id);

    // 1. DOWNLOAD ORIGINAL FILE
    const originalBuffer = await storage.download(file.path);

    // 2. GENERATE THUMBNAIL (SIMPLIFIED)
    const thumbnailBuffer = await this.createThumbnail(originalBuffer);

    // 3. UPLOAD THUMBNAIL BACK TO STORAGE
    const thumbnailKey = `thumb-${file.id}.jpg`;

    const uploadResult = await storage.uploadBuffer(
      thumbnailBuffer,
      thumbnailKey,
      file.tenantId,
      'image/jpeg',
    );

    // 4. UPDATE DB (store variant)
    await this.saveVariant(file.id, uploadResult.url);

    return uploadResult;
  }

  async createThumbnail(buffer: Buffer): Promise<Buffer> {
    // later we will use sharp library
    console.log('Generating thumbnail...');
    return buffer;
  }

  async saveVariant(fileId: string, url: string) {
    console.log('Saving variant for:', fileId, url);

    // later connect to DB table: file_variants
  }
}
