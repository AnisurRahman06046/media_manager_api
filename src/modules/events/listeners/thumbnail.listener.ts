import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { FileUploadedEvent } from '../contracts/file-uploaded.event';
import { ImageQueueService } from '../../worker/queues/image.queue'; // 👈 Fixed path string

@Injectable()
export class ThumbnailListener {
  constructor(private readonly imageQueue: ImageQueueService) {}

  @OnEvent('file.uploaded')
  async handle(event: FileUploadedEvent) {
    if (!event.mimeType && !event.mimeType.startsWith('image/')) return;

    await this.imageQueue.addThumbnailJob(event.fileId);
  }
}
