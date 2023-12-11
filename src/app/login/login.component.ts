import { Component } from '@angular/core';
import { ApiHelperService } from '../services/api-helper.service';
import { TokenStorageService } from '../services/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(
    private api: ApiHelperService,
    private tokenStorageService: TokenStorageService
  ) {}

  login(): void {
    const username: string = (
      document.getElementById('username') as HTMLInputElement
    ).value;
    const password: string = (
      document.getElementById('password') as HTMLInputElement
    ).value;
    this.api
      .post({ endpoint: '/auth/login', data: { username, password } })
      .then((response) => this.tokenStorageService.save(response.access_token));
  }
}
