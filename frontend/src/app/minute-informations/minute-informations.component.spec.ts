import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { MinuteInformationsComponent } from './minute-informations.component';

describe('MinuteInformationsComponent', () => {
  let component: MinuteInformationsComponent;
  let fixture: ComponentFixture<MinuteInformationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule, HttpClientTestingModule],
      declarations: [MinuteInformationsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MinuteInformationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
