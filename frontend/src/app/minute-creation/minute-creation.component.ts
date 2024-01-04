import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiHelperService } from '../services/api-helper.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { Observable, map, startWith } from 'rxjs';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

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
  name: string;
  id: number;
}

@Component({
  selector: 'app-minute-creation',
  templateUrl: './minute-creation.component.html',
  styleUrl: './minute-creation.component.css',
})
export class MinuteCreationComponent {
  association?: Association;
  createMinuteForm!: FormGroup;

  separatorKeysCodes: number[] = [ENTER, COMMA];
  userCtrl = new FormControl('');
  filteredUsers: Observable<User[]>;
  users: number[] = [];
  allUsers: User[] = [];

  @ViewChild('userInput') userInput?: ElementRef<HTMLInputElement>;

  constructor(
    private api: ApiHelperService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
  ) {
    this.filteredUsers = this.userCtrl.valueChanges.pipe(
      startWith(null),
      map((user: string | null) => this._filter(user)),
    );
    this.createMinuteForm = this.formBuilder.group({
      date: [''],
      content: [''],
      voters: this.userCtrl,
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((res) => {
      const id = +res.get('id')!;
      this.api.get({ endpoint: '/associations/' + id }).then((response) => {
        this.association = response;
        this.allUsers = response.members.map((member: Member) => {
          const user: User = {
            name: member.firstname + ' ' + member.name,
            id: member.id,
          };
          return user;
        });
      });
    });
  }

  remove(user: number): void {
    const index = this.users.indexOf(user);

    if (index >= 0) {
      this.users.splice(index, 1);
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

  createMinute(): void {
    if (this.createMinuteForm.valid) {
      const content = this.createMinuteForm.value.content;
      const date = this.createMinuteForm.value.date.toLocaleString('fr-FR');
      this.api
        .post({
          endpoint: '/minutes',
          data: {
            content: content,
            date: date,
            idVoters: this.users.join(','),
            idAssociation: this.association!.id,
          },
        })
        .then((response) => {
          this.router.navigateByUrl('/associations/' + this.association!.id);
        });
    }
  }

  cancel(): void {
    this.router.navigateByUrl('/profile');
  }
}
