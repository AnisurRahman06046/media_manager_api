import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Module } from './tenant/.module';
import { TenantModule } from './modules/tenant/tenant.module';
import { FileModule } from './modules/file/file.module';
import { StorageModule } from './modules/storage/storage.module';
import { UploadModule } from './modules/upload/upload.module';

@Module({
  imports: [Module, TenantModule, FileModule, StorageModule, UploadModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
