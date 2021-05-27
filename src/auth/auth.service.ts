import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AdminService } from 'src/admin/admin.service';
import { Admin } from 'src/admin/entities/admin.entity';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { AuthDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private adminService: AdminService,
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(authDto: AuthDto) {
    const user = await this.validateUser(authDto);

    const payload = {
      userId: user.id,
      email: user.email,
    };

    return {
      token: this.jwtService.sign(payload),
      fr: user.favoriteRecipes, // to save a api call on load
      lr: user.likedRecipes, // to save a api call on load
      id: user.id,
    };
  }

  async validateUser(authDto: AuthDto): Promise<User> {
    const { email, password } = authDto;

    const user = await this.usersService.findByEmail(email);
    // const pwd = user.password;
    if (!(await user?.validatePassword(password))) {
      throw new UnauthorizedException();
    }

    return user;
  }

  /* ADMIN */

  async adminLogin(authDto: AuthDto) {
    const admin = await this.validateAdminUser(authDto);

    const payload = {
      userId: admin.id,
      email: admin.email,
    };

    return {
      token: this.jwtService.sign(payload),
      id: admin.id,
    };
  }

  async validateAdminUser(authDto: AuthDto): Promise<Admin> {
    const { email, password } = authDto;

    const admin = await this.adminService.findByEmail(email);
    // const pwd = user.password;
    if (!(await admin?.validatePassword(password))) {
      throw new UnauthorizedException();
    }

    return admin;
  }
}
