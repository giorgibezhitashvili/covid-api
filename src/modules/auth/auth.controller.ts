import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/login.dto';
import { RegistrationDto } from './dto/registration.dto';

@Controller('auth')
export class AuthController {
    constructor( private readonly authService: AuthService ) {
    }
  
    @Post('signup')
    async signUp( @Body() registrationDto: RegistrationDto ){
      return await this.authService.signUp(registrationDto);
    }

    @Post('signin')
    async signIn(@Body() signInDto: SignInDto){
      return await this.authService.signIn(signInDto);
    }

}
