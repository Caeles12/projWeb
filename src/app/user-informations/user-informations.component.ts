import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiHelperService } from '../services/api-helper.service';

interface User {
  id: number;
  firstname: string;
  lastname: string;
  age: number;
}

interface Role {
  role: string;
  associationName: string;
  associationId: number;
}

@Component({
  selector: 'app-user-informations',
  templateUrl: './user-informations.component.html',
  styleUrl: './user-informations.component.css',
})
export class UserInformationsComponent {
  user?: User;

  roles: Role[] = [];
  displayedColumns: string[] = ['association', 'role'];

  constructor(private api: ApiHelperService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((res) => {
      const id = +res.get('id')!;
      this.api
        .get({ endpoint: '/users/' + id })
        .then((response) => (this.user = response));
      this.api
        .get({ endpoint: '/users/' + id + '/roles' })
        .then((response) => (this.roles = response));
    });
  }
}
