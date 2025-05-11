import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { ObjectSchema } from 'yup';

@Injectable()
export class YupValidationPipe implements PipeTransform {
  constructor(private schema: ObjectSchema<any>) {}
  transform(value: any, metadata: ArgumentMetadata) {
    try {
      if (metadata.type === 'param') return value;
      return this.schema.validateSync(value, { abortEarly: false });
    } catch (err) {
      throw new BadRequestException(err.errors.join(', '));
    }
  }
}
