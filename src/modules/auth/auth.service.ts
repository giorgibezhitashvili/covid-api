import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from 'src/repositories/user.repository';
import { RegistrationDto } from './dto/registration.dto';
import * as bcrypt from 'bcrypt';
import { SignInDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    private saltRounds = 10;

    constructor(
        private userRepository: UserRepository,
        private readonly jwtService: JwtService
    ) {
    }
    
    async signUp(registrationDto: RegistrationDto){
        const { email } = registrationDto;
        const userByMail = await this.userRepository.getUserByEmail(email);
        if(userByMail){
            throw new BadRequestException('email already in use');
        }

        registrationDto.password = await this.getHash(registrationDto.password);
        const newUser = await this.userRepository.signUp(registrationDto);
        return await this.userRepository.getUserById(newUser.id);
    }

    async signIn(signInDto: SignInDto){        
        const {email, password} = signInDto;
        const user = await this.userRepository.getUserByEmail(email);
        if(!user){
            throw new UnauthorizedException('email or password is incorrect');
        }
        const checkPassword = await this.compareHash(password, user.password);
        if(!checkPassword){
            throw new UnauthorizedException('email or password is incorrect.');
        }

        const payload = { email, id: user.id};
        return {
            access_token: await this.signJWT(payload),
            user: await this.userRepository.getUserById(user.id)
        };
    }

    async getHash( password: string ): Promise<string> {
        return await bcrypt.hash(password, this.saltRounds);
    }

    async compareHash(password: string, hash: string): Promise<boolean>{
        return await bcrypt.compare(password, hash);
    }

    async signJWT(payload){
        return await this.jwtService.sign(payload);
    }
    
}
