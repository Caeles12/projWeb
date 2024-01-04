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
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { LoginComponent } from './login/login.component';
import { MatDividerModule } from '@angular/material/divider';
import { NavComponent } from './nav/nav.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

import { ReactiveFormsModule } from '@angular/forms';
import { AssociationsListComponent } from './associations-list/associations-list.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { UserInformationsComponent } from './user-informations/user-informations.component';
import { AssociationInformationsComponent } from './association-informations/association-informations.component';
import { MinuteInformationsComponent } from './minute-informations/minute-informations.component';
import { AssociationCreationComponent } from './association-creation/association-creation.component';
import { AssociationEditionComponent } from './association-edition/association-edition.component';
import { MinuteCreationComponent } from './minute-creation/minute-creation.component';

import { MAT_DATE_LOCALE } from '@angular/material/core';
import { UserCreationComponent } from './user-creation/user-creation.component';
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
    AssociationInformationsComponent,
    MinuteInformationsComponent,
    AssociationCreationComponent,
    AssociationEditionComponent,
    MinuteCreationComponent,
    UserCreationComponent,
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
    MatToolbarModule,
    MatSidenavModule,
    MatDividerModule,
    MatListModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatStepperModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenHttpInterceptor,
      multi: true,
    },
    { provide: MAT_DATE_LOCALE, useValue: 'fr-FR' },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
