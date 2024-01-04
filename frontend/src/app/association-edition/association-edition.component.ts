import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiHelperService } from '../services/api-helper.service';

interface User {
  name: string;
  id: number;
}

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

@Component({
  selector: 'app-association-edition',
  templateUrl: './association-edition.component.html',
  styleUrl: './association-edition.component.css',
})
export class AssociationEditionComponent {
  editForm!: FormGroup;
  newRoles!: FormArray;

  association!: Association;
  allUsers: User[] = [];

  constructor(
    private api: ApiHelperService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
  ) {
    this.editForm = this.formBuilder.group({
      newRoles: this.formBuilder.array([]),
    });
    this.newRoles = this.editForm.get('newRoles') as FormArray;
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((res) => {
      const id = +res.get('id')!;
      this.api.get({ endpoint: '/associations/' + id }).then((response) => {
        this.association = response;
        this.editForm = this.formBuilder.group({
          newRoles: this.formBuilder.array([]),
        });
        this.newRoles = this.editForm.get('newRoles') as FormArray;
        for (let u of this.association.members) {
          console.log(u);
          console.log(u.id);
          const roleForm = this.formBuilder.group({
            userId: u.id,
            role: [''],
          });
          this.newRoles.push(roleForm);
        }
      });
    });
    this.api.get({ endpoint: '/users' }).then((response) => {
      this.allUsers = response.map((us: any) => {
        const user: User = {
          name: us.firstname + ' ' + us.lastname,
          id: us.id,
        };
        return user;
      });
    });
  }

  idToUser(id: number): User | null {
    for (let us of this.allUsers) {
      if (us.id == id) {
        return us;
      }
    }
    return null;
  }

  updateRole(): void {
    this.api.put({
      endpoint: `/users/this.userId/roles/${this.association.id}`,
      data: { name: 'A voir' },
    });
  }
}
