import { Body, Controller, Post } from '@nestjs/common';
import { AuthSignUpAndInDto } from './dto/auth-sign-up-and-in.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {
  }

  @Post('signup')
  signUp(@Body() authSignUpAndInDto: AuthSignUpAndInDto): Promise<void> {
    return this.authService.signUp(authSignUpAndInDto)
  }
}
