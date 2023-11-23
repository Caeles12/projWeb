import { User } from 'src/users/user.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Association {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => User, { eager: true })
  @JoinTable()
  users: User[];

  constructor(id: number, users: User[], name: string) {
    this.id = id;
    this.name = name;
    this.users = users;
  }
}
