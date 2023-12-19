import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinuteInformationsComponent } from './minute-informations.component';

describe('MinuteInformationsComponent', () => {
  let component: MinuteInformationsComponent;
  let fixture: ComponentFixture<MinuteInformationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MinuteInformationsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MinuteInformationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
