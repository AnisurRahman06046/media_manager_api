import { Worker } from 'bullmq';
import { redisConfig } from '../bull/bull.config';
import { MediaProcessingService } from '../../../media/media-processing.service';

export class ImageProcessor {
  constructor(private readonly mediaService: MediaProcessingService) {
    new Worker(
      'image-processing',
      async (job) => {
        if (job.name === 'generate-thumbnail') {
          return this.mediaService.generateThumbnail(job.data.fileId);
        }
      },
      {
        connection: redisConfig,
        concurrency: 5,
      },
    );
  }
}
