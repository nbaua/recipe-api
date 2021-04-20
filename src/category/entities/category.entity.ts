import {
  Column,
  CreateDateColumn,
  Entity,
  ObjectIdColumn,
  // PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('category')
export class Category {
  @ObjectIdColumn()
  id: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  title: string;

  @Column()
  description: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
