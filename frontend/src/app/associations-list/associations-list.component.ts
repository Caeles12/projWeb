import { Component, OnInit } from '@angular/core';
import { ApiHelperService } from '../services/api-helper.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-associations-list',
  templateUrl: './associations-list.component.html',
  styleUrl: './associations-list.component.css',
})
export class AssociationsListComponent implements OnInit {
  constructor(private api: ApiHelperService, private router: Router) {}

  ngOnInit(): void {
    this.api
      .get({ endpoint: '/associations' })
      .then((response) => (this.dataSource = response));
  }
  displayedColumns: string[] = ['id', 'name', 'users'];
  dataSource = [];

  add(): void {
    this.router.navigateByUrl('/associations/new');
  }
}
