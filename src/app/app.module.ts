import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsersListComponent } from './users-list/users-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenHttpInterceptor } from './interceptors/token.interceptor';

import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { LoginComponent } from './login/login.component';
import { NavComponent } from './nav/nav.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

import { ReactiveFormsModule } from '@angular/forms';
import { AssociationsListComponent } from './associations-list/associations-list.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { UserInformationsComponent } from './user-informations/user-informations.component';

@NgModule({
  declarations: [
    AppComponent,
    UsersListComponent,
    LoginComponent,
    NavComponent,
    AssociationsListComponent,
    UserProfileComponent,
    EditProfileComponent,
    UserInformationsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatTableModule,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenHttpInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
