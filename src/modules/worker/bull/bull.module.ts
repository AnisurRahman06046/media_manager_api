import { Module } from '@nestjs/common';
import { redisConfig } from './bull.config';

@Module({
  providers: [
    {
      provide: 'REDIS_CONFIG',
      useValue: redisConfig,
    },
  ],
  exports: ['REDIS_CONFIG'],
})
export class BullModule {}
