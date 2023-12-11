import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable, lastValueFrom } from 'rxjs';
import { base_url } from '../services/api-helper.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.css',
})
export class UsersListComponent implements OnInit {
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    const resquest: Observable<any> = this.http.get(base_url + '/users', {
      observe: 'response',
    });
    lastValueFrom(resquest).then(
      (response) => (this.dataSource = response.body)
    );
  }
  displayedColumns: string[] = ['id', 'lastname', 'firstname', 'age'];
  dataSource = [];
}
