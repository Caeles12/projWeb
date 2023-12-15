import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiHelperService } from '../services/api-helper.service';
import { TokenStorageService } from '../services/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private api: ApiHelperService,
    private tokenStorageService: TokenStorageService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  login(): void {
    if (this.loginForm.valid) {
      // Le formulaire est valide, procédez à l'action de connexion
      const username = this.loginForm.value.username;
      const password = this.loginForm.value.password;

      this.api
        .post({ endpoint: '/auth/login', data: { username, password } })
        .then((response) =>
          this.tokenStorageService.save(response.access_token)
        );
    } else {
      // Le formulaire n'est pas valide, traitez cela en conséquence
      console.log(
        'Formulaire non valide. Veuillez remplir tous les champs obligatoires.'
      );
    }
  }
}
