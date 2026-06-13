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
    const result = await cloudinary.uploader.upload(
      `data:${file.mimetype};base64,${file.buffer.toString('base64')}`,
      {
        folder: tenantId,
      },
    );

    return {
      url: result.secure_url,
      path: result.public_id,
      key: result.public_id,
    };
  }

  async delete(publicId: string): Promise<void> {
    await cloudinary.uploader.destroy(publicId);
  }
}
