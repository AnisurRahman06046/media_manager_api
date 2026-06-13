import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('tenant_configs')
export class TenantConfig {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  tenantId: string;

  @Column({ default: 5 })
  maxFileSizeMB: number;

  @Column('text', {
    array: true,
    default: () => "ARRAY['image/png','image/jpeg']",
  })
  allowedMimeTypes: string[];

  @Column({ default: true })
  enableCompression: boolean;

  @Column({ default: true })
  enableThumbnail: boolean;
}
