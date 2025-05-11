import { Injectable } from '@nestjs/common';

@Injectable()
export class FileService {
  getPublicFilePath(filename: string): string {
    return `/assets/${filename}`;
  }
}
