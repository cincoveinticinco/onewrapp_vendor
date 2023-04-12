import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputArrayGroupComponent } from './input-array-group.component';

describe('InputArrayGroupComponent', () => {
  let component: InputArrayGroupComponent;
  let fixture: ComponentFixture<InputArrayGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputArrayGroupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputArrayGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
