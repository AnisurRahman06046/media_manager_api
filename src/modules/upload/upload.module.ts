import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';
import { StorageModule } from '../storage/storage.module';
import { FileModule } from '../file/file.module';
import { EventsModule } from '../events/events.module'; // 1. Import EventsModule

@Module({
  imports: [
    StorageModule,
    FileModule,
    EventsModule, // 2. Add it here so UploadService can access FilePublisher
  ],
  providers: [UploadService],
  controllers: [UploadController],
  exports: [UploadService],
})
export class UploadModule {}
