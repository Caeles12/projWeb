import { Component, OnInit } from '@angular/core';

export class User {
  constructor(
    public id: number,
    public password: string,
    public lastname: string,
    public firstname: string,
    public age: number
  ) {}
}
const users: User[] = [
  new User(0, 'mdp1', 'Doe', 'John', 23),
  new User(1, 'mdp2', 'Doe', 'Jane', 32),
];

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.css',
})
export class UsersListComponent implements OnInit {
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  displayedColumns: string[] = ['id', 'lastname', 'firstname', 'age'];
  dataSource = users;
}
