import { Component, OnInit } from '@angular/core';
import { ApiHelperService } from '../services/api-helper.service';
import { Router } from '@angular/router';

interface User {
  id: number;
  firstname: string;
  lastname: string;
  age: number;
}

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css',
})
export class UserProfileComponent implements OnInit {
  user?: User;

  constructor(private api: ApiHelperService, private router: Router) {}

  ngOnInit(): void {
    this.api
      .get({ endpoint: '/users/self' })
      .then((response) => (this.user = response));
  }

  editUser(): void {
    this.router.navigateByUrl('/profile/edit');
  }
}
