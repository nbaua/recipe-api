import { IsBoolean, IsString } from 'class-validator';
export class Instruction {
  // @IsString()
  // _id: number;

  @IsBoolean()
  header:boolean;
  
  @IsString()
  step: string;

  @IsString()
  description: string;
}
