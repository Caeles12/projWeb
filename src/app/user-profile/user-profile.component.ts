import { Component, OnInit } from '@angular/core';
import { ApiHelperService } from '../services/api-helper.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css',
})
export class UserProfileComponent implements OnInit {
  constructor(private api: ApiHelperService) {}

  ngOnInit(): void {
    this.api
      .get({ endpoint: '/users/self' })
      .then((response) => console.log(response));
  }
}
