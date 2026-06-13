import { Injectable } from '@nestjs/common';
import { Queue } from 'bullmq';
import { redisConfig } from '../bull/bull.config';

@Injectable()
export class ImageQueueService {
  private queue: Queue;

  constructor() {
    this.queue = new Queue('image-processing', {
      connection: redisConfig,
    });
  }

  async addThumbnailJob(fileId: string) {
    await this.queue.add(
      'generate-thumbnail',
      { fileId },
      {
        attempts: 3,
        backoff: {
          type: 'exponential',
          delay: 3000,
        },
      },
    );
  }
}
