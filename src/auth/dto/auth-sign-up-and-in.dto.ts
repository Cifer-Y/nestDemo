import { IsNotEmpty, Length } from 'class-validator';

export class AuthSignUpAndInDto {
  @IsNotEmpty()
  username: string

  @IsNotEmpty()
  @Length(6, 20)
  password: string
}
