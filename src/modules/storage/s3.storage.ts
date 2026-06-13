import { Injectable } from '@nestjs/common';
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3';
import { StorageProvider, UploadResult } from './storage.interface';

@Injectable()
export class S3Storage implements StorageProvider {
  // Added ?? '' to satisfy TypeScript's strict string typing
  private s3 = new S3Client({
    region: process.env.AWS_REGION ?? '',
    credentials: {
      accessKeyId: process.env.AWS_KEY ?? '',
      secretAccessKey: process.env.AWS_SECRET ?? '',
    },
  });

  private bucket = process.env.AWS_BUCKET!;

  async upload(
    file: Express.Multer.File,
    tenantId: string,
  ): Promise<UploadResult> {
    const key = `${tenantId}/${Date.now()}-${file.originalname}`;

    await this.s3.send(
      new PutObjectCommand({
        Bucket: this.bucket,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
      }),
    );

    return {
      url: `https://${this.bucket}.s3.amazonaws.com/${key}`,
      path: key,
      key,
    };
  }

  async delete(key: string): Promise<void> {
    await this.s3.send(
      new DeleteObjectCommand({
        Bucket: this.bucket,
        Key: key,
      }),
    );
  }
}
