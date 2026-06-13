import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('file_variants')
export class FileVariant {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  fileId: string;

  @Column()
  type: string;
  // thumb | small | medium | webp

  @Column()
  url: string;

  @Column()
  width: number;

  @Column()
  height: number;

  @Column()
  size: number;
}
