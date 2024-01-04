import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
    private router: Router,
    private formBuilder: FormBuilder,
  ) {
    this.editForm = this.formBuilder.group({
      nomAsso: [''],
      newRoles: this.formBuilder.array([]),
    });
    this.newRoles = this.editForm.get('newRoles') as FormArray;
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((res) => {
      const id = +res.get('id')!;
      this.api.get({ endpoint: '/associations/' + id }).then((response) => {
        this.association = response;
        for (let u of this.association.members) {
          const roleForm = this.formBuilder.group({
            userId: u.id,
            role: [u.role],
          });
          this.newRoles.push(roleForm);
        }
        this.editForm.patchValue({
          nomAsso: [this.association.name],
        });
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

  update(): void {
    var newRoles = this.newRoles.value;
    var newAssoName = this.editForm.value.nomAsso;
    console.log(newAssoName);
    for (let role of newRoles) {
      this.api.put({
        endpoint: `/roles/${role.userId}/${this.association.id}`,
        data: {
          name: role.role,
          idUser: role.userId,
          idAssociation: this.association.id,
        },
      });
    }
    console.log(newAssoName);
    this.api
      .put({
        endpoint: `/associations/${this.association.id}`,
        data: {
          name: newAssoName,
          idUsers: this.association.members.map((x) => x.id),
        },
      })
      .then((response) => {
        this.router.navigateByUrl('/associations/' + this.association.id);
      });
  }
}
