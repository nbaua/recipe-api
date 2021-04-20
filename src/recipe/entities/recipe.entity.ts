import {
  Column,
  CreateDateColumn,
  Entity,
  ObjectIdColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Ingredient } from './ingredient.entity';
import { Time } from './time.entity';

@Entity('recipe')
export class Recipe {
  @ObjectIdColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  category: string;

  @Column()
  pictureUrl: string;

  @Column()
  servings: string;

  @Column() //to-be deprecated
  source: string;

  @Column() //to-be deprecated
  sourceUrl: string;

  @Column(() => Time)
  times: Time[];

  @Column(() => Ingredient)
  ingredients: Ingredient[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
