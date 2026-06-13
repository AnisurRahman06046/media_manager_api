import { Injectable } from '@nestjs/common';
import { FilePublisher } from '../events/publishers/file.publisher';
import { FileUploadedEvent } from '../events/contracts/file-uploaded.event';

@Injectable()
@Injectable()
export class UploadService {
  constructor(private readonly filePublisher: FilePublisher) {}

  // Explicitly accepts 3 parameters to match the controller call
  async upload(file: Express.Multer.File, tenant: any, config: any) {
    const savedFile = {
      id: 'file_' + Date.now(),
      tenantId: tenant?.id,
      mimeType: file.mimetype,
    };
    // ... rest of your code
    return savedFile;
  }
}
