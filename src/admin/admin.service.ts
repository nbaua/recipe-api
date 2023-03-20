import { Injectable } from '@nestjs/common';
import { Connection, Repository } from 'typeorm';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { Admin } from './entities/admin.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AdminService {
  private adminRepository: Repository<Admin>;
  constructor(private _connection: Connection) {
    this.adminRepository = this._connection.getRepository(Admin);
  }


  async create(createAdminDto: CreateAdminDto) {
    const user = this.adminRepository.create();
    const found = await this.findByEmail(createAdminDto.email);

    if (found === null) {
      const newUser = this.adminRepository.create();

      newUser.email = createAdminDto.email;
      newUser.password = bcrypt.hashSync(
        createAdminDto.password,
        bcrypt.genSaltSync(10),
      );

      await this.adminRepository.save(newUser);

      delete user.password;
      return user;
    } else return null;
  }

  findOne(id: number) {
    return `This action returns a #${id} admin`;
  }

  update(id: number, updateAdminDto: UpdateAdminDto) {
    const dto = updateAdminDto;
    return `This action updates a #${id} admin`;
  }

  async findByEmail(email: string) {
    const admin = await this.adminRepository.findOne({
      where: {
        email: email,
      },
    });

    if (admin !== undefined) {
      return admin;
    } else return null;
  }
}
