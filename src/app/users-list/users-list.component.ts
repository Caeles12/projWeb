import { Component, OnInit } from '@angular/core';
import { ApiHelperService } from '../services/api-helper.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.css',
})
export class UsersListComponent implements OnInit {
  constructor(private api: ApiHelperService) {}

  ngOnInit(): void {
    this.api
      .get({ endpoint: '/users' })
      .then((response) => (this.dataSource = response));
  }
  displayedColumns: string[] = ['id', 'lastname', 'firstname', 'age'];
  dataSource = [];
}
