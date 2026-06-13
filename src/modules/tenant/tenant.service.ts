import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tenant } from './entities/tenant.entity';

@Injectable()
export class TenantService {
  constructor(
    @InjectRepository(Tenant)
    private repo: Repository<Tenant>,
  ) {}

  findByApiKey(apiKey: string) {
    return this.repo.findOne({ where: { apiKey } });
  }
}
