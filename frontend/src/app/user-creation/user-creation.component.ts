import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiHelperService } from '../services/api-helper.service';

@Component({
  selector: 'app-user-creation',
  templateUrl: './user-creation.component.html',
  styleUrl: './user-creation.component.css',
})
export class UserCreationComponent {
  editProfileForm!: FormGroup;

  constructor(
    private api: ApiHelperService,
    private router: Router,
    private formBuilder: FormBuilder,
  ) {
    this.editProfileForm = this.formBuilder.group({
      firstname: [''],
      lastname: [''],
      password: [''],
      age: 0,
    });
  }

  createUser(): void {
    if (this.editProfileForm.valid) {
      // Le formulaire est valide, procédez à l'action de connexion
      var firstname = this.editProfileForm.value.firstname;
      var lastname = this.editProfileForm.value.lastname;
      var password = this.editProfileForm.value.password;
      var age = this.editProfileForm.value.age;

      this.api
        .post({
          endpoint: '/users',
          data: {
            firstname: firstname,
            lastname: lastname,
            password: password,
            age: age,
          },
        })
        .then((response) => {
          this.router.navigateByUrl('/users');
        });
    } else {
      // Le formulaire n'est pas valide, traitez cela en conséquence
      console.log(
        'Formulaire non valide. Veuillez remplir tous les champs obligatoires.',
      );
    }
  }
  cancel(): void {
    this.router.navigateByUrl('/users');
  }
}
