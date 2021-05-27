import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateAdminDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
