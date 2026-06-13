import { Injectable, Logger } from '@nestjs/common'; // Added NestJS Logger
import { OnEvent } from '@nestjs/event-emitter';
import { FileUploadedEvent } from '../contracts/file-uploaded.event';

@Injectable()
export class AuditListener {
  private readonly logger = new Logger(AuditListener.name);

  // Removed broken TypeORM @InjectRepository(any) setup temporarily
  constructor() {}

  @OnEvent('file.uploaded')
  async handle(event: FileUploadedEvent) {
    // Safely logs the event payload without throwing runtime metadata errors
    this.logger.log(
      `[AUDITLOG] - UPLOAD - File ID: ${event.fileId} | Tenant ID: ${event.tenantId}`,
    );

    /* Once you build your database entity later, you can restore this:
    await this.auditRepository.insert({
      event: 'UPLOAD',
      fileId: event.fileId,
      tenantId: event.tenantId,
    });
    */
  }
}
