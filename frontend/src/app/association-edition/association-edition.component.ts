import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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

@Component({
  selector: 'app-association-edition',
  templateUrl: './association-edition.component.html',
  styleUrl: './association-edition.component.css',
})
export class AssociationEditionComponent {
  editForm!: FormGroup;
  newRoles!: FormArray;

  association!: Association;
  members!: Member[];

  constructor(
    private api: ApiHelperService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
  ) {
    this.editForm = this.formBuilder.group({
      newRoles: this.formBuilder.array([]),
    });
    this.newRoles = this.editForm.get('roles') as FormArray;
  }

  ngOnInit(): void {
    this.api
      .get({ endpoint: '/associations/' + this.association.id })
      .then((response: Association) => {
        this.association = response;
        this.members = response.members;
      });
  }

  generateRolesForm(): void {
    for (let u of this.members) {
      const roleForm = this.formBuilder.group({
        userId: u.id,
        role: [''],
      });
      this.newRoles.push(roleForm);
    }
  }

  updateRole(): void {
    this.api.put({
      endpoint: `/users/this.userId/roles/${this.association.id}`,
      data: { name: 'A voir' },
    });
  }
}
