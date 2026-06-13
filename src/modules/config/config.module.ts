import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TenantConfig } from './config.entity';
import { ConfigService } from './config.service';

@Module({
  imports: [TypeOrmModule.forFeature([TenantConfig])],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule {}
