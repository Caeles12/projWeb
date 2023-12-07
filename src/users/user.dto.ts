export class UserDTO {
  firstname: string;

  lastname: string;

  age: number;

  constructor(firstname: string, lastname: string, age: number) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.age = age;
  }
}
