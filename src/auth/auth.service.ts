import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { AuthDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
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
}
