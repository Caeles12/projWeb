import { Component, Inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiHelperService } from '../services/api-helper.service';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { AsyncPipe } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

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

export interface DialogData {
  users: Member[];
  selectedUser: number;
  assignedRole: string;
}

@Component({
  selector: 'app-association-edition',
  templateUrl: './association-edition.component.html',
  styleUrl: './association-edition.component.css',
})
export class AssociationEditionComponent {
  editForm!: FormGroup;
  newRoles!: FormArray;
  showAddUserPopup: boolean = false;

  association!: Association;
  newMembers: number[] = [];
  allUsers: User[] = [];

  constructor(
    private api: ApiHelperService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
  ) {
    this.editForm = this.formBuilder.group({
      nomAsso: '',
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
          nomAsso: this.association.name,
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

  openDialog(): void {
    const availableUsers = this.allUsers.filter(
      (x) => !this.newRoles.value.find((y: any) => y.userId === x.id),
    );
    if (availableUsers.length === 0) {
      return;
    }
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      data: {
        users: availableUsers,
        selectedUser: null,
        assignedRole: null,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.addUser(result.user, result.role);
      }
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

  addUser(id: number, role: string): void {
    const roleForm = this.formBuilder.group({
      userId: id,
      role: [role],
    });
    this.newRoles.push(roleForm);
    this.newMembers.push(id);
  }

  removeUser(id: number): void {
    this.newRoles.removeAt(
      this.newRoles.value.findIndex((x: any) => x.userId === id),
    );
    delete this.newMembers[this.newMembers.findIndex((x) => x === id)];
  }

  update(): void {
    var newRoles = this.newRoles.value;
    var newAssoName = this.editForm.value.nomAsso;
    for (let role of newRoles) {
      this.api
        .put({
          endpoint: `/roles/${role.userId}/${this.association.id}`,
          data: {
            name: role.role,
            idUser: role.userId,
            idAssociation: this.association.id,
          },
        })
        .then((response) => {
          if (response.error) {
            this.api.post({
              endpoint: '/roles',
              data: {
                name: role.role,
                idUser: role.userId,
                idAssociation: this.association.id,
              },
            });
          }
        });
    }
    this.api
      .put({
        endpoint: `/associations/${this.association.id}`,
        data: {
          name: newAssoName,
          idUsers: this.newRoles.value.map((x: any) => x.userId),
        },
      })
      .then((response) => {
        this.router.navigateByUrl('/associations/' + this.association.id);
      });
  }

  delete(): void {
    this.api
      .delete({ endpoint: '/associations/' + this.association!.id })
      .then((response) => {
        this.router.navigateByUrl('/associations');
      });
  }
}

@Component({
  selector: 'select-user-dialog',
  templateUrl: './select-user-dialog.html',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatAutocompleteModule,
    AsyncPipe,
  ],
})
export class DialogOverviewExampleDialog {
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
