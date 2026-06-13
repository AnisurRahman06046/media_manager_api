import { Injectable } from '@nestjs/common';
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
  GetObjectCommand,
} from '@aws-sdk/client-s3';
import { StorageProvider, UploadResult } from './storage.interface';

@Injectable()
export class S3Storage implements StorageProvider {
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
    return this.uploadBuffer(file.buffer, key, tenantId, file.mimetype);
  }

  async uploadBuffer(
    buffer: Buffer,
    key: string,
    tenantId: string,
    mimeType: string,
  ): Promise<UploadResult> {
    await this.s3.send(
      new PutObjectCommand({
        Bucket: this.bucket,
        Key: key,
        Body: buffer,
        ContentType: mimeType,
      }),
    );

    return {
      url: `https://${this.bucket}.s3.amazonaws.com/${key}`,
      path: key,
      key,
    };
  }

  async download(path: string): Promise<Buffer> {
    const response = await this.s3.send(
      new GetObjectCommand({
        Bucket: this.bucket,
        Key: path,
      }),
    );

    if (!response.Body) throw new Error('S3 file response empty');
    return Buffer.from(await response.Body.transformToByteArray());
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
