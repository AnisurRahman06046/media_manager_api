import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { File } from './entity/file.entity';

@Injectable()
export class FileService {
  constructor(
    @InjectRepository(File)
    private repo: Repository<File>,
  ) {}

  create(data: Partial<File>) {
    const file = this.repo.create(data);
    return this.repo.save(file);
  }

  findById(id: string) {
    return this.repo.findOne({ where: { id } });
  }
}
