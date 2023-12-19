import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { UsersListComponent } from './users-list/users-list.component';
import { authGuard } from './guards/auth.guard';
import { AssociationsListComponent } from './associations-list/associations-list.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { UserInformationsComponent } from './user-informations/user-informations.component';
import { AssociationInformationsComponent } from './association-informations/association-informations.component';

const routes: Routes = [
  { path: 'users', component: UsersListComponent, canActivate: [authGuard] },
  {
    path: 'users/:id',
    component: UserInformationsComponent,
    canActivate: [authGuard],
  },
  {
    path: 'associations',
    component: AssociationsListComponent,
  },
  {
    path: 'associations/:id',
    component: AssociationInformationsComponent,
    canActivate: [authGuard],
  },
  {
    path: 'profile',
    component: UserProfileComponent,
    canActivate: [authGuard],
  },
  {
    path: 'profile/edit',
    component: EditProfileComponent,
    canActivate: [authGuard],
  },
  { path: 'login', component: LoginComponent },
  { path: '**', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
