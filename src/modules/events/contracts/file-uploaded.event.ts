export class FileUploadedEvent {
  constructor(
    public readonly fileId: string,
    public readonly tenantId: string,
    public readonly mimeType: string,
  ) {}
}
