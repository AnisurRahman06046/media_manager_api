import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';
import { StorageModule } from '../storage/storage.module';
import { FileModule } from '../file/file.module';

import { ValidationService } from '../../validation/validation.service';

@Module({
  imports: [StorageModule, FileModule],
  providers: [
    UploadService,
    ValidationService, // 2. Register it directly here!
  ],
  controllers: [UploadController],
  exports: [UploadService],
})
export class UploadModule {}
