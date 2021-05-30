import { IsString } from 'class-validator';
export class Instruction {
  // @IsString()
  // _id: number;

  @IsString()
  step: string;

  @IsString()
  description: string;
}
