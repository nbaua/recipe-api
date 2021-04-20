import { Type } from 'class-transformer';
import {
  IsArray,
  IsString,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { Ingredient } from './ingredient.dto';
import { Time } from './time.dto';

export class CreateRecipeDto {
  @IsString()
  @MinLength(4, {
    message: 'Name is too short',
  })
  @MaxLength(50, {
    message: 'Name is too long',
  })
  name: string;

  @IsString()
  category: string;

  @IsString()
  pictureUrl: string;

  @IsString()
  servings: string;

  @IsString() //to-be deprecated
  source: string;

  @IsString() //to-be deprecated
  sourceUrl: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Time)
  times: Time[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Ingredient)
  ingredients: Ingredient[];
}
