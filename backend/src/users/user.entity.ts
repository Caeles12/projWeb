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

  @Column()
  password: string;

  constructor(
    id: number,
    lastname: string,
    firstname: string,
    age: number,
    password: string,
  ) {
    this.id = id;
    this.lastname = lastname;
    this.firstname = firstname;
    this.age = age;
    this.password = password;
  }
}
