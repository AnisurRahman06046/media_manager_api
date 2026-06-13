import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { FileUploadedEvent } from '../contracts/file-uploaded.event';

@Injectable()
export class FilePublisher {
  constructor(private readonly eventEmitter: EventEmitter2) {}

  publishFileUploaded(event: FileUploadedEvent) {
    this.eventEmitter.emit('file.uploaded', event);
  }
}
