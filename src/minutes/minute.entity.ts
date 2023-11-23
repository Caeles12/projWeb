import { Association } from 'src/associations/association.entity';
import { User } from 'src/users/user.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Minute {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: string;

  @Column()
  content: string;

  @ManyToOne(() => Association, { eager: true })
  @JoinTable()
  association: Association;

  @ManyToMany(() => User, { eager: true })
  @JoinTable()
  voters: User[];

  constructor(
    id: number,
    date: string,
    content: string,
    association: Association,
    voters: User[],
  ) {
    this.id = id;
    this.date = date;
    this.content = content;
    this.association = association;
    this.voters = voters;
  }
}
