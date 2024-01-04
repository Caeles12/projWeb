import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinuteCreationComponent } from './minute-creation.component';

describe('MinuteCreationComponent', () => {
  let component: MinuteCreationComponent;
  let fixture: ComponentFixture<MinuteCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MinuteCreationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MinuteCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
