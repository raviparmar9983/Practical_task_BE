import { HttpStatus } from '@nestjs/common';

export class CustomeError extends Error {
  statusCode = HttpStatus.BAD_REQUEST;
  status: false;
  data: null;
  constructor(message: string, statusCode = HttpStatus.BAD_REQUEST) {
    super();
    this.message = message;
    this.statusCode = statusCode;
  }
}
