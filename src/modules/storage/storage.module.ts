import { Module } from '@nestjs/common';
import { StorageFactory } from './storage.factory';
import { LocalStorage } from './local.storage';
import { S3Storage } from './s3.storage';
import { CloudinaryStorage } from './cloudinary.storage';

@Module({
  providers: [StorageFactory, LocalStorage, S3Storage, CloudinaryStorage],
  exports: [StorageFactory],
})
export class StorageModule {}
