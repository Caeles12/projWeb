import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiHelperService } from '../services/api-helper.service';

interface Member {
  name: string;
  firstname: string;
  age: number;
  role: string;
  id: number;
}

interface Association {
  name: string;
  members: Member[];
  id: number;
}

interface User {
  id: number;
  firstname: string;
  lastname: string;
  age: number;
}

interface Minute {
  id: number;
  date: Date;
  content: string;
  association: Association;
  voters: User[];
}

@Component({
  selector: 'app-association-informations',
  templateUrl: './association-informations.component.html',
  styleUrl: './association-informations.component.css',
})
export class AssociationInformationsComponent {
  association?: Association;

  members: Member[] = [];

  minutes: Minute[] = [];

  displayedColumns: string[] = ['membre', 'role'];

  displayedColumns2: string[] = ['id', 'date', 'voters'];

  constructor(
    private api: ApiHelperService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((res) => {
      const id = +res.get('id')!;
      this.api.get({ endpoint: '/associations/' + id }).then((response) => {
        this.association = response;
        this.members = response.members;
      });
      this.api
        .get({ endpoint: '/associations/' + id + '/minutes' })
        .then((response) => {
          this.minutes = response;
        });
    });
  }

  editRoles(): void {
    this.router.navigateByUrl(
      '/associations/' + this.association!.id + '/edit',
    );
  }

  addMinute(): void {
    this.router.navigateByUrl(
      '/associations/' + this.association!.id + '/minute',
    );
  }
}
