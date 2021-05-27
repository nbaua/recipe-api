import { Injectable } from '@nestjs/common';
import { Connection, Repository } from 'typeorm';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { Admin } from './entities/admin.entity';

@Injectable()
export class AdminService {
  private adminRepository: Repository<Admin>;
  constructor(private _connection: Connection) {
    this.adminRepository = this._connection.getRepository(Admin);
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
