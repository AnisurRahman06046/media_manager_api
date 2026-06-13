import { Injectable, NestMiddleware } from '@nestjs/common';
// Fix the relative path to go into modules/config/
import { ConfigService } from '../../modules/config/config.service';

@Injectable()
export class ConfigMiddleware implements NestMiddleware {
  // TypeScript now accurately targets your custom service
  constructor(private readonly configService: ConfigService) {}

  async use(req: any, res: any, next: () => void) {
    const tenant = req.tenant;

    if (!tenant) return next();

    const config = await this.configService.getByTenantId(tenant.id);

    req.config = config;

    next();
  }
}
