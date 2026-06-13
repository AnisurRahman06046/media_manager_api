import { Injectable } from '@nestjs/common';
import { MediaContextService } from './media-context.service';
import { VariantEngine } from '../variants/variant.engine';

// 1. Declare the type signature for individual file variants
interface VariantResult {
  type: string;
  url: string;
  width: number;
  height: number;
}

@Injectable()
export class MediaProcessingService {
  constructor(
    private readonly context: MediaContextService,
    private readonly variantEngine: VariantEngine,
  ) {}

  async generateThumbnail(fileId: string) {
    const ctx = await this.context.load(fileId);
    const { file, storage } = ctx;

    console.log('Processing:', file.id);

    // 1. DOWNLOAD ORIGINAL
    const originalBuffer = await storage.download(file.path);

    // 2. GENERATE ALL VARIANTS
    const variants = await this.variantEngine.generateVariants(originalBuffer);

    // 3. UPLOAD EACH VARIANT
    // 🛠️ Typify the array here to prevent the TS 'never' exception
    const uploadedVariants: VariantResult[] = [];

    for (const variant of variants) {
      const key = `${file.id}-${variant.type}.jpg`;

      const upload = await storage.uploadBuffer(
        variant.buffer,
        key,
        file.tenantId,
        'image/jpeg',
      );

      uploadedVariants.push({
        type: variant.type,
        url: upload.url,
        width: variant.width,
        height: variant.height,
      });
    }

    // 4. SAVE VARIANTS TO DB
    await this.saveVariants(file.id, uploadedVariants);

    return uploadedVariants;
  }

  async saveVariants(fileId: string, variants: VariantResult[]) {
    console.log('Saving variants for:', fileId);
    // later: insert into file_variants table
  }
}
