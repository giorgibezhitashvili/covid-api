import { Injectable } from "@nestjs/common";
import { User } from "src/entities/user.entity";
import { RegistrationDto } from "src/modules/auth/dto/registration.dto";
import { DataSource } from "typeorm";
import { BaseRepository } from "./base.repository";

@Injectable()
export class UserRepository  extends BaseRepository<User> {
  constructor(private dataSource: DataSource)
  {
      super(User, dataSource.createEntityManager());
  }

  async getUserByEmail(email:string){
    return await this.createQueryBuilder('u').where('email = :email', { email }).getOne();
  }

  async signUp(registrationDto: RegistrationDto){
    const { email, password, first_name, last_name} = registrationDto;
    const user =  new User;
    user.email = email;
    user.password = password;
    user.first_name = first_name;
    user.last_name = last_name;

    return await this.save(user);
  }

  async getUserById(userId){
    return await this.createQueryBuilder('u').where('id = :userId', { userId }).getOne();
  }
} 
