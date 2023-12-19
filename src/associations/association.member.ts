export class Member {
  name: string;
  firstname: string;
  age: number;
  role: string;
  id: number;

  constructor(
    name: string,
    firstname: string,
    age: number,
    role: string,
    id: number,
  ) {
    this.name = name;
    this.firstname = firstname;
    this.age = age;
    this.role = role;
    this.id = id;
  }
}
