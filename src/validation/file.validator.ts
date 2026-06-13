import { BadRequestException } from '@nestjs/common';

export class FileValidator {
  static validateSize(file: Express.Multer.File, config: any) {
    const maxBytes = config.maxFileSizeMB * 1024 * 1024;

    if (file.size > maxBytes) {
      throw new BadRequestException(
        `File too large. Max allowed: ${config.maxFileSizeMB}MB`,
      );
    }
  }

  static validateMime(file: Express.Multer.File, config: any) {
    if (!config.allowedMimeTypes.includes(file.mimetype)) {
      throw new BadRequestException(`File type not allowed: ${file.mimetype}`);
    }
  }
}
