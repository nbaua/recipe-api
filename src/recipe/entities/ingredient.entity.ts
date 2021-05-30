import { Column } from 'typeorm';

export class Ingredient {
  @Column()
  name: string;

  @Column()
  unit: string;

  @Column()
  amount: string;

  // @Column('text', { nullable: true })
  // keyword!: null | string;

  // @Column()
  // __typename: string;
}
