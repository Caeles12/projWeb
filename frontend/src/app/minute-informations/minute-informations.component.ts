import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiHelperService } from '../services/api-helper.service';

interface Member {
  name: string;
  firstname: string;
  age: number;
  role: string;
  id: number;
}

interface Minute {
  id: number;
  date: Date;
  content: string;
  association: Association;
  voters: User[];
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
  role?: string;
}

@Component({
  selector: 'app-minute-informations',
  templateUrl: './minute-informations.component.html',
  styleUrl: './minute-informations.component.css',
})
export class MinuteInformationsComponent {
  minute?: Minute;

  displayedColumns: string[] = ['id', 'name', 'firstname', 'age', 'role'];
  displayedColumns2: string[] = ['id', 'date', 'content'];

  constructor(private api: ApiHelperService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((res) => {
      const id = +res.get('id')!;
      this.api.get({ endpoint: '/minutes/' + id }).then((response) => {
        this.minute = response;
        for (let i = 0; i < this.minute!.voters.length; i++) {
          this.minute!.voters[i].role = this.minute!.association.members.find(
            (x) => x.id === this.minute!.voters[i].id,
          )?.role;
        }
      });
    });
  }
}
