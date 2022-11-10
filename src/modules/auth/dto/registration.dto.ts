import { IsNotEmpty, IsEmail } from 'class-validator';

export class RegistrationDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  first_name: string;

  @IsNotEmpty()
  last_name: string;

}
