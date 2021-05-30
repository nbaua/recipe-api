import { IsString } from 'class-validator';
export class Ingredient {
  @IsString()
  name: string;

  @IsString()
  unit: string;

  @IsString()
  amount: string;

  // @IsString()
  // keyword!: null | string;

  // @IsString()
  // __typename: string;
}
