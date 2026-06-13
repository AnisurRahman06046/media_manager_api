import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  ConfigModule as NestConfigModule,
  ConfigService as NestConfigService,
} from '@nestjs/config'; // 1. Alias NestJS Config
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TenantModule } from './modules/tenant/tenant.module';
import { FileModule } from './modules/file/file.module';
import { StorageModule } from './modules/storage/storage.module';
import { UploadModule } from './modules/upload/upload.module';

// 2. Import your custom database ConfigModule with an Alias
import { ConfigModule as TenantConfigModule } from './modules/config/config.module';

import { TenantMiddleware } from './common/middleware/tenant.middleware';
import { ConfigMiddleware } from './common/middleware/config.middleware';

@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRootAsync({
      imports: [NestConfigModule],
      inject: [NestConfigService],
      useFactory: (configService: NestConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),

    TenantModule,
    FileModule,
    StorageModule,
    UploadModule,
    TenantConfigModule, // 3. Include your custom module here so AppModule can resolve ConfigService
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TenantMiddleware, ConfigMiddleware).forRoutes('*');
  }
}
