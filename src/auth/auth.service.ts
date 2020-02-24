import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { AuthSignUpAndInDto } from './dto/auth-sign-up-and-in.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository
  ) {}

  async signUp(authSignUpAndInDto: AuthSignUpAndInDto): Promise<void> {
    return this.userRepository.signUp(authSignUpAndInDto)
  }

  async signIn(authSignUpAndInDto: AuthSignUpAndInDto): Promise<string> {
    const username = await this.userRepository.validateUserPassword(authSignUpAndInDto)
    if(username) {
      return 'JWT token'
    } else {
      throw new UnauthorizedException('username or password invalid')
    }
  }
}
