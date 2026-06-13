import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { FileUploadedEvent } from '../contracts/file-uploaded.event';
// Adjust this queue import path according to your project structure
// import { BackupQueueService } from '../../worker/queues/backup.queue.service';

@Injectable()
export class BackupListener {
  constructor(private readonly backupQueue: any) {} // Replace 'any' with your actual worker service

  @OnEvent('file.uploaded')
  async handle(event: FileUploadedEvent) {
    await this.backupQueue.add('backup-file', {
      fileId: event.fileId,
    });
  }
}
