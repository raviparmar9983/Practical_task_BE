import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Res,
  UsePipes,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO, UserDTO } from 'src/dtos/user.dtos';
import { userValidator } from 'src/validators/user.validator';
import { Response } from 'express';
import { handleError } from 'src/utils/handleError';
import { YupValidationPipe } from 'src/comman/pipe/yup.validator';
@Controller('v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('/register')
  @UsePipes(new YupValidationPipe(userValidator))
  async registerUser(@Body() userData: UserDTO, @Res() res: Response) {
    try {
      const user = await this.authService.registerUser(userData);
      res.status(HttpStatus.CREATED).json(user);
    } catch (error) {
      await handleError(res, error);
    }
  }

  @Post('/login')
  async loginUser(@Body() loginData: LoginDTO, @Res() res: Response) {
    try {
      const loginInfo = await this.authService.loginUser(loginData);
      res.status(HttpStatus.OK).json(loginInfo);
    } catch (error) {
      await handleError(res, error);
    }
  }
}
