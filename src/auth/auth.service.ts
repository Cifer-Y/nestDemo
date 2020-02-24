import { Injectable } from '@nestjs/common';
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
}
