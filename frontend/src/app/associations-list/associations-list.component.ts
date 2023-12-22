import { Component, OnInit } from '@angular/core';
import { ApiHelperService } from '../services/api-helper.service';

@Component({
  selector: 'app-associations-list',
  templateUrl: './associations-list.component.html',
  styleUrl: './associations-list.component.css',
})
export class AssociationsListComponent implements OnInit {
  constructor(private api: ApiHelperService) {}

  ngOnInit(): void {
    this.api
      .get({ endpoint: '/associations' })
      .then((response) => (this.dataSource = response));
  }
  displayedColumns: string[] = ['id', 'name', 'users'];
  dataSource = [];
}
