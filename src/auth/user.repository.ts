import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';
import { AuthSignUpAndInDto } from './dto/auth-sign-up-and-in.dto';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signUp(authSignUpAndInDto: AuthSignUpAndInDto): Promise<void> {
    const { username, password } = authSignUpAndInDto
    const user = new User()
    user.username = username
    user.password = password
    await user.save()
  }
}
