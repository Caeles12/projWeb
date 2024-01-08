import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociationEditionComponent } from './association-edition.component';

describe('AssociationEditionComponent', () => {
  let component: AssociationEditionComponent;
  let fixture: ComponentFixture<AssociationEditionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AssociationEditionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AssociationEditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
