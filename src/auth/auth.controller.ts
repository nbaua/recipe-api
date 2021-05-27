import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async login(@Body() authDto: AuthDto) {
    return this.authService.login(authDto);
  }

  @Post('admin')
  async adminLogin(@Body() authDto: AuthDto) {
    return this.authService.adminLogin(authDto);
  }
}
