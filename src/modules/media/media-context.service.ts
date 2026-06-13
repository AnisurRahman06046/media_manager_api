import { Injectable } from '@nestjs/common';

@Injectable()
export class MediaContextService {
  constructor(
    private readonly fileService: any, // assume existing
    private readonly tenantService: any,
    private readonly storageFactory: any,
  ) {}

  async load(fileId: string) {
    const file = await this.fileService.findById(fileId);

    const tenant = await this.tenantService.findById(file.tenantId);

    const storage = this.storageFactory.getProvider(tenant.storageType);

    return {
      file,
      tenant,
      storage,
    };
  }
}
