import { TenantService } from '../../modules/tenant/tenant.service';
import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class TenantMiddleware implements NestMiddleware {
  constructor(private tenantService: TenantService) {}

  async use(req: any, res: any, next: () => void) {
    const apiKey = req.headers['x-api-key'];

    if (!apiKey) throw new UnauthorizedException('Missing API key');

    const tenant = await this.tenantService.findByApiKey(apiKey);

    if (!tenant) throw new UnauthorizedException('Invalid API key');

    req.tenant = tenant;

    next();
  }
}
