import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  lastname: string;

  @Column()
  firstname: string;

  @Column()
  age: number;

  constructor(id: number, lastname: string, firstname: string, age: number) {
    this.id = id;
    this.lastname = lastname;
    this.firstname = firstname;
    this.age = age;
  }
}
