import {
  Column,
  CreateDateColumn,
  Entity,
  ObjectIdColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Ingredient } from './ingredient.entity';
import { Instruction } from './instruction.entity';
import { Time } from './time.entity';

@Entity('recipe')
export class Recipe {
  @ObjectIdColumn()
  id: string;

  @Column()
  category: string;

  @Column()
  description: string;

  @Column(() => Ingredient)
  ingredients: Ingredient[];

  @Column(() => Instruction)
  instructions: Instruction[];

  @Column()
  likes: number;

  @Column()
  name: string;

  @Column()
  pictureUrl: string;

  @Column()
  published: boolean;

  @Column()
  servings: string;

  @Column() //to-be deprecated
  sourceUrl: string;

  @Column(() => Time)
  times: Time[];

  @Column()
  views: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
