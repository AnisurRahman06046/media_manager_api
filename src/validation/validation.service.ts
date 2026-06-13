import { Injectable } from '@nestjs/common';
import { FileValidator } from './file.validator';

@Injectable()
export class ValidationService {
  validate(file: Express.Multer.File, config: any) {
    FileValidator.validateSize(file, config);
    FileValidator.validateMime(file, config);
  }
}
