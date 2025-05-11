import { HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JWTPayLoadDTO } from 'src/dtos/comman.dtos';
import { EncryptJWT, jwtDecrypt } from 'jose';
@Injectable()
export class JwtService {
  private readonly secret: Uint8Array;
  private readonly encHeader = { alg: 'dir', enc: 'A256GCM' };

  constructor(private configService: ConfigService) {
    const secretKey = this.configService.get<string>('JWT_SECRET');
    this.secret = new TextEncoder().encode(secretKey);
  }

  async createToken(userData: JWTPayLoadDTO) {
    const expiryTime =
      this.configService.get<string>('JWT_ACCESSTOKENTIME') ?? '10m';

    const token = new EncryptJWT({ userData })
      .setIssuedAt()
      .setProtectedHeader(this.encHeader)
      .setExpirationTime(expiryTime);

    const accessToken = await token.encrypt(this.secret);
    return { accessToken };
  }

  async jwtTokenVerifier(token: string) {
    try {
      const payload = await jwtDecrypt(token, this.secret, {
        contentEncryptionAlgorithms: ['A256GCM'],
        keyManagementAlgorithms: ['dir'],
      });

      return {
        ...payload,
        success: true,
      };
    } catch (err) {
      return {
        status: HttpStatus.FORBIDDEN,
        message: err.message,
        success: false,
      };
    }
  }
}
