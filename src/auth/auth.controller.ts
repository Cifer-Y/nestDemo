import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthSignUpAndInDto } from './dto/auth-sign-up-and-in.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {
  }

  @Post('signup')
  signUp(@Body(ValidationPipe) authSignUpAndInDto: AuthSignUpAndInDto): Promise<void> {
    return this.authService.signUp(authSignUpAndInDto)
  }

  @Post('signin')
  signIn(@Body(ValidationPipe) authSignUpAndInDto: AuthSignUpAndInDto): Promise<{ token: string }> {
    return this.authService.signIn(authSignUpAndInDto)
  }
}
