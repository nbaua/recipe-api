import { Column } from 'typeorm';

export class Instruction {
  @Column()
  _id: number;

  @Column('text', { nullable: true })
  step: string;

  @Column('text', { nullable: true })
  description: string;
}
