import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from 'src/repositories/user.repository';
import { RegistrationDto } from './dto/registration.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    private saltRounds = 10;

    constructor(
        private userRepository: UserRepository,
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

    async getHash( password: string ): Promise<string> {
        return await bcrypt.hash(password, this.saltRounds);
    }
    
}
