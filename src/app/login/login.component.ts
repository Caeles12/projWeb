import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  login(): void {
    const username: string = (
      document.getElementById('username') as HTMLInputElement
    ).value;
    const password: string = (
      document.getElementById('password') as HTMLInputElement
    ).value;
    console.log(username, password);
  }
}
