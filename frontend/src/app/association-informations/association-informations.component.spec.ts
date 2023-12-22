import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociationInformationsComponent } from './association-informations.component';

describe('AssociationInformationsComponent', () => {
  let component: AssociationInformationsComponent;
  let fixture: ComponentFixture<AssociationInformationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AssociationInformationsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AssociationInformationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
