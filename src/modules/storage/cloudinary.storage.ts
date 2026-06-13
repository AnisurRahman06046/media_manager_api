import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { StorageProvider, UploadResult } from './storage.interface';

@Injectable()
export class CloudinaryStorage implements StorageProvider {
  constructor() {
    cloudinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.CLOUD_API_KEY,
      api_secret: process.env.CLOUD_API_SECRET,
    });
  }

  async upload(
    file: Express.Multer.File,
    tenantId: string,
  ): Promise<UploadResult> {
    const key = `${Date.now()}-${file.originalname.split('.')[0]}`;
    return this.uploadBuffer(file.buffer, key, tenantId, file.mimetype);
  }

  async uploadBuffer(
    buffer: Buffer,
    key: string,
    tenantId: string,
    mimeType: string,
  ): Promise<UploadResult> {
    const base64Data = buffer.toString('base64');
    const result = await cloudinary.uploader.upload(
      `data:${mimeType};base64,${base64Data}`,
      {
        folder: tenantId,
        public_id: key,
      },
    );

    return {
      url: result.secure_url,
      path: result.public_id,
      key: result.public_id,
    };
  }

  async download(urlPath: string): Promise<Buffer> {
    // Fetches the secure resource via URL link back to Node server context
    const response = await fetch(urlPath);
    if (!response.ok)
      throw new Error(
        `Could not fetch asset from Cloudinary: ${response.statusText}`,
      );
    const arrayBuffer = await response.arrayBuffer();
    return Buffer.from(arrayBuffer);
  }

  async delete(publicId: string): Promise<void> {
    await cloudinary.uploader.destroy(publicId);
  }
}
