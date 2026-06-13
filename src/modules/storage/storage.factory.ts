import { Injectable } from '@nestjs/common';
import { LocalStorage } from './local.storage';
import { S3Storage } from './s3.storage';
import { CloudinaryStorage } from './cloudinary.storage';
import { StorageProvider } from './storage.interface';

@Injectable()
export class StorageFactory {
  constructor(
    private local: LocalStorage,
    private s3: S3Storage,
    private cloudinary: CloudinaryStorage,
  ) {}

  getProvider(type: string): StorageProvider {
    switch (type) {
      case 'LOCAL':
        return this.local;

      case 'S3':
        return this.s3;

      case 'CLOUDINARY':
        return this.cloudinary;

      default:
        return this.local;
    }
  }
}
