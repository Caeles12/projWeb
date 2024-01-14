import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AssociationInformationsComponent } from './association-informations.component';

describe('AssociationInformationsComponent', () => {
  let component: AssociationInformationsComponent;
  let fixture: ComponentFixture<AssociationInformationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule, HttpClientTestingModule],
      declarations: [AssociationInformationsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AssociationInformationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
