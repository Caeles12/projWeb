import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../services/token-storage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiHelperService } from '../services/api-helper.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  id: number;
  firstname: string;
  lastname: string;
  age: number;
}

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css',
})
export class NavComponent implements OnInit {
  opened = false;
  searchId: number | undefined;
  searchType: 'user' | 'association' = 'user';

  allUsers!: User[];
  allAssociations!: Association[];

  constructor(
    private api: ApiHelperService,
    private tokenStorageService: TokenStorageService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
  ) {}
  ngOnInit(): void {
    this.api.get({ endpoint: '/associations/' }).then((response) => {
      this.allAssociations = response;
    });
    this.api.get({ endpoint: '/users/' }).then((response) => {
      this.allUsers = response;
    });
  }

  get isLogged(): boolean {
    return this.tokenStorageService.isLogged();
  }

  logout(): void {
    this.tokenStorageService.clear();
    this.router.navigateByUrl('/login');
  }

  toggleSideBar() {
    this.opened = !this.opened;
    console.log(this.opened);
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

  search(): void {
    if (this.searchType === 'user') {
      this.searchUserById();
    } else if (this.searchType === 'association') {
      this.searchAssociationById();
    }
  }

  searchAssociationById(): void {
    if (this.searchId !== undefined && this.searchId > 0) {
      const associationExists = this.allAssociations.some(
        (association) => association.id === this.searchId,
      );

      if (associationExists) {
        this.router.navigateByUrl(`/associations/${this.searchId}`);
      } else {
        this.openSnackBar('Association not found with the specified ID');
      }
    } else {
      this.openSnackBar('Invalid association ID');
    }
  }

  searchUserById(): void {
    if (this.searchId !== undefined && this.searchId > 0) {
      const userExists = this.allUsers.some(
        (user) => user.id === this.searchId,
      );

      if (userExists) {
        this.router.navigateByUrl(`/users/${this.searchId}`);
      } else {
        this.openSnackBar('User not found with the specified ID');
      }
    } else {
      this.openSnackBar('Invalid user ID');
    }
  }

  private openSnackBar(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 5000, // Duration in milliseconds
    });
  }
}
