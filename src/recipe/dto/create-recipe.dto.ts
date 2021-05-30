import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { Ingredient } from './ingredient.dto';
import { Instruction } from './instruction.dto';
import { Time } from './time.dto';

export class CreateRecipeDto {
  @IsString()
  category: string;

  @IsString()
  description: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Ingredient)
  ingredients: Ingredient[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Instruction)
  instructions: Instruction[];

  @IsNumber()
  likes: number;

  @IsString()
  @MinLength(4, {
    message: 'Name is too short',
  })
  @MaxLength(250, {
    message: 'Name is too long',
  })
  name: string;

  @IsString()
  pictureUrl: string;

  @IsBoolean()
  published: boolean;

  @IsString()
  servings: string;

  @IsString() //to-be deprecated
  sourceUrl: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Time)
  times: Time[];

  @IsNumber()
  views: number;
}
