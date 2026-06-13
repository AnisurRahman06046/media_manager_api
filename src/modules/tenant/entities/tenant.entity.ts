import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('tenants')
export class Tenant {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  apiKey: string;
  @Column({ default: 'LOCAL' })
  storageType: 'LOCAL' | 'S3' | 'CLOUDINARY';

  @CreateDateColumn()
  createdAt: Date;
}
