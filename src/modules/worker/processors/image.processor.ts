import { Worker } from 'bullmq';
import { redisConfig } from '../bull/bull.config';

export class ImageProcessor {
  private worker: Worker;

  constructor() {
    this.worker = new Worker(
      'image-processing',
      async (job) => {
        if (job.name === 'generate-thumbnail') {
          await this.generateThumbnail(job.data.fileId);
        }
      },
      {
        connection: redisConfig,
        concurrency: 5,
      },
    );
  }

  async generateThumbnail(fileId: string) {
    console.log('Generating thumbnail for:', fileId);

    // later we will plug MediaProcessingService here
  }
}
