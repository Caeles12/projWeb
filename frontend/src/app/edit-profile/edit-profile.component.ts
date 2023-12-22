import { Component } from '@angular/core';
import { ApiHelperService } from '../services/api-helper.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface User {
  id: number;
  firstname: string;
  lastname: string;
  age: number;
}

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css',
})
export class EditProfileComponent {
  user?: User;
  editProfileForm!: FormGroup;

  constructor(
    private api: ApiHelperService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.editProfileForm = this.formBuilder.group({
      firstname: [''],
      lastname: [''],
      password: [''],
    });
  }

  ngOnInit(): void {
    this.api.get({ endpoint: '/users/self' }).then((response) => {
      this.user = response;
      this.editProfileForm.setValue({
        firstname: this.user!.firstname,
        lastname: this.user!.lastname,
        password: '',
      });
    });
  }

  editProfile(): void {
    if (this.editProfileForm.valid) {
      // Le formulaire est valide, procédez à l'action de connexion
      var firstname = this.editProfileForm.value.firstname;
      if (firstname === this.user?.firstname) {
        firstname = undefined;
      }
      var lastname = this.editProfileForm.value.lastname;
      if (lastname === this.user?.lastname) {
        lastname = undefined;
      }
      var password = this.editProfileForm.value.password;
      if (password === '') {
        password = undefined;
      }

      this.api
        .put({
          endpoint: '/users/' + this.user?.id,
          data: {
            firstname: firstname,
            lastname: lastname,
            password: password,
          },
        })
        .then((response) => {
          this.router.navigateByUrl('/profile');
        });
    } else {
      // Le formulaire n'est pas valide, traitez cela en conséquence
      console.log(
        'Formulaire non valide. Veuillez remplir tous les champs obligatoires.'
      );
    }
  }
  cancel(): void {
    this.router.navigateByUrl('/profile');
  }
}
