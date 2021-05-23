import * as bcrypt from 'bcrypt';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ObjectIdColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('user')
export class User extends BaseEntity {
  @ObjectIdColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column({ type: String })
  password: string;

  @Column({ type: String, array: true })
  favoriteRecipes: string[];

  @Column({ type: String, array: true })
  likedRecipes: string[];

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;

  async validatePassword(password: string): Promise<boolean> {
    const result = bcrypt.compareSync(password, this.password);
    return result;
  }
}
