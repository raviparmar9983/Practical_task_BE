import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { modelKey } from 'src/constants/model.contants';
import { Model } from 'mongoose';
import { LoginDTO, UserDTO } from 'src/dtos/user.dtos';
import { comparePassword, hashGenerator } from 'src/utils/bcrypt';
import { messageKey } from 'src/constants/message.constants';
import { CustomeError } from 'src/utils/custome.Error';
import { JwtService } from 'src/utils/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(modelKey.users) private userModel: Model<UserDTO>,
    @Inject() private jwtService: JwtService,
  ) {}

  async registerUser(userData: UserDTO) {
    try {
      const hash = await hashGenerator(userData.hash);
      await this.userModel.create({ ...userData, hash });
      return {
        status: true,
        message: messageKey.userCreatedMessage,
      };
    } catch (error) {
      throw error;
    }
  }

  async loginUser(loginData: LoginDTO) {
    try {
      if (!loginData.email && !loginData.hash)
        throw new CustomeError(messageKey.pleaseProvideRequiredFields);
      const { email, hash: password } = loginData;
      const user = await this.userModel.findOne({
        email,
        isDeleted: false,
      });
      if (!user) {
        throw new CustomeError(messageKey.userNotFound, HttpStatus.NOT_FOUND);
      }
      const passwordMatch = await comparePassword(password, user.hash);
      if (!passwordMatch) throw new CustomeError(messageKey.invalidCredentials);
      const useData = {
        _id: user._id.toString(),
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        profilePic: user.profilePic,
      };
      const token = await this.jwtService.createToken(useData);
      return {
        status: true,
        message: messageKey.loginSuccessMessage,
        data: useData,
        token,
      };
    } catch (error) {
      throw error;
    }
  }
}
