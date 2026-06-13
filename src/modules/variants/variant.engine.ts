import { Injectable } from '@nestjs/common';
import { IMAGE_VARIANTS } from './variant.types';

@Injectable()
export class VariantEngine {
  async generateVariants(buffer: Buffer) {
    const results: any[] = [];

    for (const [type, config] of Object.entries(IMAGE_VARIANTS)) {
      const processed = await this.resize(buffer, config.width, config.height);

      results.push({
        type,
        buffer: processed,
        width: config.width,
        height: config.height,
      });
    }

    return results;
  }

  async resize(buffer: Buffer, width: number, height: number): Promise<Buffer> {
    // Later we will use sharp()
    console.log(`Resizing to ${width}x${height}`);

    return buffer;
  }
}
