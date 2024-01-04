import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../services/token-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css',
})
export class NavComponent implements OnInit {
  opened = false;

  constructor(
    private tokenStorageService: TokenStorageService,
    private router: Router,
  ) {}
  ngOnInit(): void {}

  get isLogged(): boolean {
    return this.tokenStorageService.isLogged();
  }

  logout(): void {
    this.tokenStorageService.clear();
    this.router.navigateByUrl('/login');
  }

  toggleSideBar() {
    this.opened = !this.opened;
  }

  navigateAssociations(): void {
    this.router.navigateByUrl('/associations');
  }

  navigateUsers(): void {
    this.router.navigateByUrl('/users');
  }

  navigateProfile(): void {
    this.router.navigateByUrl('/profile');
  }
}
