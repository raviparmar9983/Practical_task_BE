import { Global, Module } from '@nestjs/common';
import { AuthModule } from 'src/controllers/v1/auth/auth.module';
import { JwtService } from 'src/utils/jwt';

@Global()
@Module({
  imports: [AuthModule],
  providers: [JwtService],
  exports: [JwtService],
})
export class Modules {}
