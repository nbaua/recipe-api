import { IsString } from 'class-validator';
export class Time {
  @IsString()
  type: string;

  @IsString()
  hr: string;

  @IsString()
  min: string;
}
