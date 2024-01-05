import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
  waitForAsync,
} from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ApiHelperService } from '../services/api-helper.service';
import { TokenStorageService } from '../services/token-storage.service';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let apiHelperServiceSpy: jasmine.SpyObj<ApiHelperService>;
  let tokenStorageServiceSpy: jasmine.SpyObj<TokenStorageService>;
  let routerServiceSpy: jasmine.SpyObj<Router>;

  beforeEach(fakeAsync(() => {
    const apiSpy = jasmine.createSpyObj('ApiHelperService', ['post']);
    const tokenSpy = jasmine.createSpyObj('TokenStorageService', [
      'isLogged',
      'save',
    ]);
    const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);

    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule,
        HttpClientTestingModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatInputModule,
        BrowserAnimationsModule,
      ],
      declarations: [LoginComponent],
      providers: [
        FormBuilder,
        { provide: ApiHelperService, useValue: apiSpy },
        { provide: TokenStorageService, useValue: tokenSpy },
        { provide: Router, useValue: routerSpy },
      ],
    }).compileComponents();

    apiHelperServiceSpy = TestBed.inject(
      ApiHelperService,
    ) as jasmine.SpyObj<ApiHelperService>;
    tokenStorageServiceSpy = TestBed.inject(
      TokenStorageService,
    ) as jasmine.SpyObj<TokenStorageService>;
    routerServiceSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the login form', () => {
    expect(component.loginForm).toBeDefined();
    expect(component.loginForm.get('username')).toBeDefined();
    expect(component.loginForm.get('password')).toBeDefined();
  });

  it('should log in and redirect to /profile', waitForAsync(() => {
    tokenStorageServiceSpy.isLogged.and.returnValue(false);
    const username = 'testUser';
    const password = 'testPassword';

    apiHelperServiceSpy.post.and.returnValue(
      Promise.resolve({ access_token: 'testToken' }),
    );

    component.loginForm.setValue({ username, password });

    component.login();

    fixture.whenStable().then(() => {
      expect(tokenStorageServiceSpy.save).toHaveBeenCalledWith('testToken');
      expect(routerServiceSpy.navigateByUrl).toHaveBeenCalledWith('/profile');
    });
  }));

  it('should not navigate if not logged in', () => {
    tokenStorageServiceSpy.isLogged.and.returnValue(false);

    component.ngOnInit();

    expect(routerServiceSpy.navigateByUrl).not.toHaveBeenCalled();
  });

  it('should log in when form is valid', fakeAsync(() => {
    const username = '3';
    const password = 'password';

    component.loginForm.setValue({ username, password });

    apiHelperServiceSpy.post.and.returnValue(
      Promise.resolve({ access_token: 'testToken' }),
    );

    component.login();

    fixture.whenStable().then(() => {
      expect(apiHelperServiceSpy.post).toHaveBeenCalledWith({
        endpoint: '/auth/login',
        data: { username, password },
      });

      tick();

      expect(tokenStorageServiceSpy.save).toHaveBeenCalledWith('testToken');
      expect(routerServiceSpy.navigateByUrl).toHaveBeenCalledWith('/profile');
    });
  }));

  it('should not log in when form is invalid', () => {
    component.loginForm.setValue({ username: '', password: '' });

    component.login();

    expect(apiHelperServiceSpy.post).not.toHaveBeenCalled();
  });
});
