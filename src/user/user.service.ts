import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Connection, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  private userRepository: Repository<User>;
  constructor(private _connection: Connection) {
    this.userRepository = this._connection.getRepository(User);
  }

  async create(createUserDto: CreateUserDto) {
    const user = this.userRepository.create();
    const found = await this.findByEmail(createUserDto.email);

    if (found === null) {
      const newUser = this.userRepository.create();

      newUser.email = createUserDto.email;
      newUser.password = bcrypt.hashSync(
        createUserDto.password,
        bcrypt.genSaltSync(10),
      );
      newUser.favoriteRecipes = [];
      newUser.likedRecipes = [];

      await this.userRepository.save(newUser);

      delete user.password;
      return user;
    } else return null;
  }

  async showById(id: number): Promise<User> {
    const user = await this.userRepository.findOne({where : {id: id}});
    delete user.password;
    return user;
  }

  async findById(id: number) {
    return await User.findOne({where : {id: id}});
  }

  async findByEmail(email: string) {
    const user = await this.userRepository.findOne({
      where: {
        email: email,
      },
    });

    if (user !== undefined) {
      return user;
    } else return null;
  }
}
