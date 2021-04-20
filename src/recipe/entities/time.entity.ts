import { Column } from 'typeorm';

export class Time {
  @Column()
  type: string;

  @Column()
  hr: string;

  @Column()
  min: string;
}
