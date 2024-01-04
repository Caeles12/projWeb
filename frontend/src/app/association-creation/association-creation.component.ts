import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import {
  Form,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ApiHelperService } from '../services/api-helper.service';
import { Observable, map, startWith } from 'rxjs';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatStepperModule } from '@angular/material/stepper';

interface User {
  name: string;
  id: number;
}

@Component({
  selector: 'app-association-creation',
  templateUrl: './association-creation.component.html',
  styleUrl: './association-creation.component.css',
})
export class AssociationCreationComponent {
  separatorKeysCodes: number[] = [ENTER, COMMA];
  userCtrl = new FormControl('');
  filteredUsers: Observable<User[]>;
  users: number[] = [];
  allUsers: User[] = [];
  roles!: FormArray;

  createAssociationForm1!: FormGroup;
  createAssociationForm2!: FormGroup;
  createAssociationForm3!: FormGroup;

  @ViewChild('userInput') userInput?: ElementRef<HTMLInputElement>;

  announcer = inject(LiveAnnouncer);

  constructor(
    private api: ApiHelperService,
    private router: Router,
    private formBuilder: FormBuilder,
  ) {
    this.filteredUsers = this.userCtrl.valueChanges.pipe(
      startWith(null),
      map((user: string | null) => this._filter(user)),
    );
    this.createAssociationForm1 = this.formBuilder.group({
      name: [''],
    });
    this.createAssociationForm2 = this.formBuilder.group({
      users: this.userCtrl,
    });
    this.createAssociationForm3 = this.formBuilder.group({
      roles: this.formBuilder.array([]),
    });
    this.roles = this.createAssociationForm3.get('roles') as FormArray;
  }

  ngOnInit(): void {
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

  generateRolesForm(): void {
    this.createAssociationForm3 = this.formBuilder.group({
      roles: this.formBuilder.array([]),
    });
    this.roles = this.createAssociationForm3.get('roles') as FormArray;
    for (let u of this.users) {
      const roleForm = this.formBuilder.group({
        userId: u,
        role: [''],
      });
      this.roles.push(roleForm);
    }
  }

  remove(user: number): void {
    const index = this.users.indexOf(user);

    if (index >= 0) {
      this.users.splice(index, 1);
      this.announcer.announce(`Removed ${user}`);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    const id = this.nameToID(event.option.viewValue);
    if (!this.users.includes(id)) {
      this.users.push(id);
    }
    this.userInput!.nativeElement.value = '';
    this.userCtrl.setValue(null);
  }

  private _filter(value: string | null): User[] {
    if (value == null) {
      value = '';
    }
    const filterValue = value.toLowerCase();

    return this.allUsers.filter(
      (user) =>
        user.name.toLowerCase().includes(filterValue) &&
        !this.users.includes(user.id),
    );
  }

  private nameToID(name: string): number {
    let id = -1;
    for (let user of this.allUsers) {
      if (user.name === name) {
        id = user.id;
      }
    }
    return id;
  }

  idToUser(id: number): User | null {
    for (let us of this.allUsers) {
      if (us.id == id) {
        return us;
      }
    }
    return null;
  }

  send(): void {
    if (
      this.createAssociationForm1.valid &&
      this.createAssociationForm2.valid &&
      this.createAssociationForm3.valid
    ) {
      // Le formulaire est valide, procédez à l'action de connexion
      var name = this.createAssociationForm1.value.name;
      var roles = this.roles.value;

      this.api
        .post({
          endpoint: '/associations',
          data: {
            name: name,
            idUsers: this.users,
          },
        })
        .then(async (response) => {
          for (let role of roles) {
            await this.api.post({
              endpoint: '/roles',
              data: {
                name: role.role,
                idUser: role.userId,
                idAssociation: response.id,
              },
            });
          }
          this.router.navigateByUrl('/associations');
        });
    } else {
      // Le formulaire n'est pas valide, traitez cela en conséquence
      console.log(
        'Formulaire non valide. Veuillez remplir tous les champs obligatoires.',
      );
    }
  }
}
