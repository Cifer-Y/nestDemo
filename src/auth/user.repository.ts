import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';
import { AuthSignUpAndInDto } from './dto/auth-sign-up-and-in.dto';
import { ConflictException, InternalServerErrorException } from '@nestjs/common';

import * as bcrypt from 'bcrypt'

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signUp(authSignUpAndInDto: AuthSignUpAndInDto): Promise<void> {
    const { username, password } = authSignUpAndInDto
    const user = new User()
    user.username = username
    user.salt = await bcrypt.genSalt();
    user.password = await this.hashPassword(password, user.salt)

    try {
      await user.save()
    } catch (e) {
      if(e.code === '23505') {
        throw new ConflictException('username already exists');
      } else {
        throw new InternalServerErrorException(e.message)
      }
    }

  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt)
  }
}
