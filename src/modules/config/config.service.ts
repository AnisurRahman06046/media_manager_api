import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TenantConfig } from './config.entity';

@Injectable()
export class ConfigService {
  constructor(
    @InjectRepository(TenantConfig)
    private repo: Repository<TenantConfig>,
  ) {}

  getByTenantId(tenantId: string) {
    return this.repo.findOne({ where: { tenantId } });
  }
}
