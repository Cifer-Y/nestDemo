import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { AuthSignUpAndInDto } from './dto/auth-sign-up-and-in.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService
  ) {}

  async signUp(authSignUpAndInDto: AuthSignUpAndInDto): Promise<void> {
    return this.userRepository.signUp(authSignUpAndInDto)
  }

  async signIn(authSignUpAndInDto: AuthSignUpAndInDto): Promise<{token: string}> {
    const username = await this.userRepository.validateUserPassword(authSignUpAndInDto)
    if(!username) {
      throw new UnauthorizedException('username or password invalid')
    }
    const payload: JwtPayload = {username}
    const token = this.jwtService.sign(payload)
    return { token }
  }
}
