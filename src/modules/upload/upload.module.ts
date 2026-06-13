import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';
import { StorageModule } from '../storage/storage.module'; // 1. Import StorageModule
import { FileModule } from '../file/file.module'; // 2. Import FileModule

@Module({
  imports: [
    StorageModule, // 3. Add StorageModule to give UploadService access to StorageService
    FileModule, // 4. Add FileModule to give UploadService access to FileService
  ],
  providers: [UploadService],
  controllers: [UploadController],
  exports: [UploadService],
})
export class UploadModule {}
