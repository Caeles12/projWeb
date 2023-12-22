export class UserDTO {
  firstname: string;

  lastname: string;

  age: number;

  id: number;

  constructor(firstname: string, lastname: string, age: number, id: number) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.age = age;
    this.id = id;
  }
}
